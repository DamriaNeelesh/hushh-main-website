import json
from typing import Any, Optional

from app.config import Settings
from app.hushh_intelligence.schemas.identity_exploration import (
    ActionCard,
    DossierIdentitySnapshot,
    DossierSection,
    GroundingChunk,
    ProofPoint,
    SearchIntent,
    SearchHistoryTurn,
    WebSearchExpansion,
    StructuredDossierSynthesis,
    StructuredIdentitySynthesis,
    StructuredSearchSynthesis,
    normalize_warning_codes,
)
from app.hushh_intelligence.services.identity_jobs import (
    DossierSynthesisOutput,
    IdentityExplorationOutput,
    ProcessingDependencyError,
    ReverseGeocodedAddress,
    SearchSynthesisOutput,
)


class GeminiGroundedIdentityExplorer:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings

        try:
            from google import genai
            from google.genai import types
        except ImportError as error:
            raise RuntimeError("google-genai is not installed") from error

        self._types = types
        self._client = genai.Client(
            vertexai=True,
            project=settings.google_cloud_project,
            location=settings.google_cloud_location,
            http_options=types.HttpOptions(api_version="v1"),
        )

    def explore(
        self,
        *,
        name: str,
        email: str,
        latitude: float,
        longitude: float,
        confidence_score: int,
        address: Optional[ReverseGeocodedAddress],
    ) -> IdentityExplorationOutput:
        grounded_text, grounding_chunks = self._collect_grounded_context(
            prompt=self._build_grounded_prompt(
                name=name,
                email=email,
                latitude=latitude,
                longitude=longitude,
                address=address,
            ),
            latitude=latitude,
            longitude=longitude,
            enable_maps=self._settings.identity_enable_maps_grounding,
        )
        synthesis = self._structure_grounded_context(
            name=name,
            email=email,
            confidence_score=confidence_score,
            grounded_text=grounded_text,
            grounding_chunks=grounding_chunks,
            address=address,
        )

        return IdentityExplorationOutput(
            summary=synthesis.summary,
            profiles=synthesis.profiles,
            report=synthesis.report,
            warnings=normalize_warning_codes(synthesis.warnings),
            grounding_chunks=grounding_chunks,
        )

    def search(
        self,
        *,
        query: str,
        intent: SearchIntent,
        job_context: dict[str, Any],
        history: list[SearchHistoryTurn],
    ) -> SearchSynthesisOutput:
        latitude, longitude = self._resolve_maps_coordinates(job_context)

        grounded_text, grounding_chunks = self._collect_grounded_context(
            prompt=self._build_search_prompt(
                query=query,
                intent=intent,
                job_context=job_context,
                history=history,
            ),
            latitude=latitude,
            longitude=longitude,
            enable_maps=intent in {SearchIntent.LOCAL, SearchIntent.GENERAL}
            and self._settings.identity_enable_maps_grounding,
        )
        synthesis = self._structure_search_context(
            query=query,
            intent=intent,
            grounded_text=grounded_text,
            grounding_chunks=grounding_chunks,
            job_context=job_context,
            history=history,
        )

        return SearchSynthesisOutput(
            answer=synthesis.answer,
            summary=synthesis.summary,
            proof_points=synthesis.proof_points,
            action_cards=synthesis.action_cards,
            suggestions=synthesis.suggestions,
            impact_snapshot=synthesis.impact_snapshot,
            warnings=normalize_warning_codes(synthesis.warnings),
            confidence=synthesis.confidence,
            grounding_chunks=grounding_chunks,
        )

    def dossier(
        self,
        *,
        job_context: dict[str, Any],
    ) -> DossierSynthesisOutput:
        latitude, longitude = self._resolve_maps_coordinates(job_context)

        grounded_text, grounding_chunks = self._collect_grounded_context(
            prompt=self._build_dossier_prompt(job_context=job_context),
            latitude=latitude,
            longitude=longitude,
            enable_maps=self._settings.identity_enable_maps_grounding,
        )
        synthesis = self._structure_dossier_context(
            grounded_text=grounded_text,
            grounding_chunks=grounding_chunks,
            job_context=job_context,
        )

        return DossierSynthesisOutput(
            headline=synthesis.headline,
            executive_summary=synthesis.executive_summary,
            identity_snapshot=synthesis.identity_snapshot,
            professional_presence=synthesis.professional_presence,
            digital_footprint=synthesis.digital_footprint,
            reputation_signals=synthesis.reputation_signals,
            regional_context=synthesis.regional_context,
            suggestions=synthesis.suggestions,
            warnings=normalize_warning_codes(synthesis.warnings),
            confidence=synthesis.confidence,
            grounding_chunks=grounding_chunks,
        )

    def web_search(
        self,
        *,
        query: str,
        intent: SearchIntent,
        history: list[SearchHistoryTurn],
    ) -> SearchSynthesisOutput:
        expansion = self._expand_web_query(query=query, intent=intent, history=history)
        grounded_text, grounding_chunks = self._collect_grounded_context(
            prompt=self._build_web_search_prompt(
                query=query,
                intent=intent,
                history=history,
                expansion=expansion,
            ),
            latitude=None,
            longitude=None,
            enable_maps=False,
        )
        synthesis = self._structure_web_search_context(
            query=query,
            intent=intent,
            grounded_text=grounded_text,
            grounding_chunks=grounding_chunks,
            history=history,
            expansion=expansion,
        )

        return SearchSynthesisOutput(
            answer=synthesis.answer,
            summary=synthesis.summary,
            proof_points=synthesis.proof_points,
            action_cards=synthesis.action_cards,
            suggestions=synthesis.suggestions,
            impact_snapshot=None,
            warnings=normalize_warning_codes(synthesis.warnings),
            confidence=synthesis.confidence,
            grounding_chunks=grounding_chunks,
        )

    def _collect_grounded_context(
        self,
        *,
        prompt: str,
        latitude: Optional[float],
        longitude: Optional[float],
        enable_maps: bool,
    ) -> tuple[str, list[GroundingChunk]]:
        tools = [self._types.Tool(google_search=self._types.GoogleSearch())]

        retrieval_config = None
        if enable_maps and latitude is not None and longitude is not None:
            tools.append(
                self._types.Tool(
                    google_maps=self._types.GoogleMaps(enable_widget=False)
                )
            )
            retrieval_config = self._types.RetrievalConfig(
                lat_lng=self._types.LatLng(
                    latitude=latitude,
                    longitude=longitude,
                ),
                language_code=self._settings.maps_language_code,
            )

        try:
            response = self._client.models.generate_content(
                model=self._settings.identity_model,
                contents=prompt,
                config=self._types.GenerateContentConfig(
                    tools=tools,
                    tool_config=self._types.ToolConfig(
                        retrieval_config=retrieval_config,
                    )
                    if retrieval_config is not None
                    else None,
                    temperature=0.8,
                ),
            )
        except Exception as error:  # pragma: no cover - external dependency
            raise ProcessingDependencyError(
                code="grounded_search_failed",
                message="Gemini grounding request failed",
                retryable=True,
            ) from error

        grounded_text = (getattr(response, "text", None) or "").strip()
        if not grounded_text:
            raise ProcessingDependencyError(
                code="grounded_search_empty",
                message="Gemini grounding returned an empty response",
                retryable=True,
            )

        return grounded_text, self._extract_grounding_chunks(response)

    def _structure_grounded_context(
        self,
        *,
        name: str,
        email: str,
        confidence_score: int,
        grounded_text: str,
        grounding_chunks: list[GroundingChunk],
        address: Optional[ReverseGeocodedAddress],
    ) -> StructuredIdentitySynthesis:
        sources_json = json.dumps(
            [chunk.model_dump(mode="json") for chunk in grounding_chunks],
            ensure_ascii=True,
        )
        prompt = f"""
You are producing a structured identity exploration result for Hushh.
Use only the grounded material below. Do not invent unsupported facts.

Person:
- name: {name}
- email: {email}
- confidence_score: {confidence_score}
- resolved_address: {address.formatted_address if address else "unresolved"}

Grounded narrative:
{grounded_text}

Grounded sources:
{sources_json}

Return JSON that:
- groups public profile links into linkedin, github, websites, socials, mentions
- summarizes only publicly supported professional or social footprint
- sets warnings to include ambiguous_match when multiple plausible matches exist
- sets warnings to include no_match when there is no credible public match
- keeps snippets short and factual
""".strip()

        try:
            response = self._client.models.generate_content(
                model=self._settings.identity_model,
                contents=prompt,
                config=self._types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_json_schema=StructuredIdentitySynthesis.model_json_schema(),
                ),
            )
        except Exception as error:  # pragma: no cover - external dependency
            raise ProcessingDependencyError(
                code="structured_synthesis_failed",
                message="Structured Gemini synthesis failed",
                retryable=True,
            ) from error

        raw_json = (getattr(response, "text", None) or "").strip()
        if not raw_json:
            raise ProcessingDependencyError(
                code="structured_synthesis_empty",
                message="Structured Gemini synthesis returned an empty response",
                retryable=True,
            )

        try:
            return StructuredIdentitySynthesis.model_validate_json(raw_json)
        except Exception as error:
            raise ProcessingDependencyError(
                code="invalid_model_output",
                message="Gemini structured output did not match the expected schema",
                retryable=True,
            ) from error

    def _structure_search_context(
        self,
        *,
        query: str,
        intent: SearchIntent,
        grounded_text: str,
        grounding_chunks: list[GroundingChunk],
        job_context: dict[str, Any],
        history: list[SearchHistoryTurn],
    ) -> StructuredSearchSynthesis:
        sources_json = json.dumps(
            [chunk.model_dump(mode="json") for chunk in grounding_chunks],
            ensure_ascii=True,
        )
        context_json = json.dumps(job_context.get("completed_items") or [], ensure_ascii=True)
        history_json = json.dumps(
            [turn.model_dump(mode="json") for turn in history],
            ensure_ascii=True,
        )
        prompt = f"""
You are Hushh Intelligence.
Answer the user's query using only the grounded material and the known identity context.
Do not invent facts that are not supported by the grounded evidence.

Search intent: {intent.value}
User query: {query}

Identity context:
{context_json}

Recent thread:
{history_json}

Grounded narrative:
{grounded_text}

Grounded sources:
{sources_json}

Return JSON that:
- answers the query directly
- provides a concise summary
- includes 2 to 4 proof_points with claim, evidence, and citations tied to grounded source titles
- includes 2 to 4 action_cards with a title, description, and optional follow-up query
- proposes 3 to 5 useful follow-up suggestions
- includes an impact snapshot summarizing what is publicly available on the internet
- assigns confidence between 0 and 100
- adds ambiguous_match or low_confidence warnings only when justified by the evidence
""".strip()

        try:
            response = self._client.models.generate_content(
                model=self._settings.identity_model,
                contents=prompt,
                config=self._types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_json_schema=StructuredSearchSynthesis.model_json_schema(),
                ),
            )
        except Exception as error:  # pragma: no cover - external dependency
            raise ProcessingDependencyError(
                code="structured_search_failed",
                message="Structured Hushh Intelligence search failed",
                retryable=True,
            ) from error

        raw_json = (getattr(response, "text", None) or "").strip()
        if not raw_json:
            raise ProcessingDependencyError(
                code="structured_search_empty",
                message="Structured Hushh Intelligence search returned an empty response",
                retryable=True,
            )

        try:
            return StructuredSearchSynthesis.model_validate_json(raw_json)
        except Exception as error:
            raise ProcessingDependencyError(
                code="invalid_search_model_output",
                message="Search response did not match the expected schema",
                retryable=True,
            ) from error

    def _expand_web_query(
        self,
        *,
        query: str,
        intent: SearchIntent,
        history: list[SearchHistoryTurn],
    ) -> WebSearchExpansion:
        history_json = json.dumps(
            [turn.model_dump(mode="json") for turn in history],
            ensure_ascii=True,
        )
        prompt = f"""
You are planning a next-generation grounded web search workflow.
Turn the user's request into a concise research objective and a small set of focused follow-up searches.

Intent: {intent.value}
User query: {query}
Recent thread:
{history_json}

Return JSON with:
- search_objective
- answer_angle
- expanded_queries containing 3 to 5 concrete search directions
""".strip()

        try:
            response = self._client.models.generate_content(
                model=self._settings.identity_model,
                contents=prompt,
                config=self._types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_json_schema=WebSearchExpansion.model_json_schema(),
                ),
            )
        except Exception as error:  # pragma: no cover - external dependency
            raise ProcessingDependencyError(
                code="web_search_expansion_failed",
                message="Web search planning failed",
                retryable=True,
            ) from error

        raw_json = (getattr(response, "text", None) or "").strip()
        if not raw_json:
            raise ProcessingDependencyError(
                code="web_search_expansion_empty",
                message="Web search planning returned an empty response",
                retryable=True,
            )

        try:
            return WebSearchExpansion.model_validate_json(raw_json)
        except Exception as error:
            raise ProcessingDependencyError(
                code="invalid_web_search_plan",
                message="Web search planning did not match the expected schema",
                retryable=True,
            ) from error

    def _structure_web_search_context(
        self,
        *,
        query: str,
        intent: SearchIntent,
        grounded_text: str,
        grounding_chunks: list[GroundingChunk],
        history: list[SearchHistoryTurn],
        expansion: WebSearchExpansion,
    ) -> StructuredSearchSynthesis:
        sources_json = json.dumps(
            [chunk.model_dump(mode="json") for chunk in grounding_chunks],
            ensure_ascii=True,
        )
        history_json = json.dumps(
            [turn.model_dump(mode="json") for turn in history],
            ensure_ascii=True,
        )
        expansion_json = json.dumps(expansion.model_dump(mode="json"), ensure_ascii=True)
        prompt = f"""
You are Hushh Web Intelligence.
Use only grounded web evidence to answer the user's query better than a classic search page.
Do not invent facts.

Intent: {intent.value}
User query: {query}
Recent thread:
{history_json}
Search plan:
{expansion_json}

Grounded narrative:
{grounded_text}

Grounded sources:
{sources_json}

Return JSON that:
- answers the query directly
- provides a concise summary
- includes 2 to 4 proof_points with claim, evidence, and citations tied to grounded source titles
- includes 2 to 4 action_cards with a title, description, and optional follow-up query
- proposes 3 to 5 useful follow-up suggestions
- keeps impact_snapshot empty or null
- assigns confidence between 0 and 100
- adds warnings only when justified by weak, stale, or conflicting evidence
""".strip()

        try:
            response = self._client.models.generate_content(
                model=self._settings.identity_model,
                contents=prompt,
                config=self._types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_json_schema=StructuredSearchSynthesis.model_json_schema(),
                ),
            )
        except Exception as error:  # pragma: no cover - external dependency
            raise ProcessingDependencyError(
                code="structured_web_search_failed",
                message="Structured web search failed",
                retryable=True,
            ) from error

        raw_json = (getattr(response, "text", None) or "").strip()
        if not raw_json:
            raise ProcessingDependencyError(
                code="structured_web_search_empty",
                message="Structured web search returned an empty response",
                retryable=True,
            )

        try:
            return StructuredSearchSynthesis.model_validate_json(raw_json)
        except Exception as error:
            raise ProcessingDependencyError(
                code="invalid_web_search_output",
                message="Web search response did not match the expected schema",
                retryable=True,
            ) from error

    def _structure_dossier_context(
        self,
        *,
        grounded_text: str,
        grounding_chunks: list[GroundingChunk],
        job_context: dict[str, Any],
    ) -> StructuredDossierSynthesis:
        sources_json = json.dumps(
            [chunk.model_dump(mode="json") for chunk in grounding_chunks],
            ensure_ascii=True,
        )
        context_json = json.dumps(job_context.get("completed_items") or [], ensure_ascii=True)
        prompt = f"""
You are Hushh Intelligence producing the first deep dossier after user consent.
Use only grounded evidence plus the known identity context.
Do not invent unsupported facts.

Known identity context:
{context_json}

Grounded narrative:
{grounded_text}

Grounded sources:
{sources_json}

Return JSON that:
- creates a headline and executive summary
- fills identity_snapshot with name, email, formatted_address, location_context, notable_domains, and public_profile_count
- explains professional_presence, digital_footprint, reputation_signals, and regional_context using concise bullet points
- proposes 3 to 5 useful next questions
- assigns confidence between 0 and 100
- adds ambiguous_match, low_confidence, or no_match warnings only when justified by evidence
""".strip()

        try:
            response = self._client.models.generate_content(
                model=self._settings.identity_model,
                contents=prompt,
                config=self._types.GenerateContentConfig(
                    response_mime_type="application/json",
                    response_json_schema=StructuredDossierSynthesis.model_json_schema(),
                ),
            )
        except Exception as error:  # pragma: no cover - external dependency
            raise ProcessingDependencyError(
                code="structured_dossier_failed",
                message="Structured Hushh Intelligence dossier failed",
                retryable=True,
            ) from error

        raw_json = (getattr(response, "text", None) or "").strip()
        if not raw_json:
            raise ProcessingDependencyError(
                code="structured_dossier_empty",
                message="Structured Hushh Intelligence dossier returned an empty response",
                retryable=True,
            )

        try:
            return StructuredDossierSynthesis.model_validate_json(raw_json)
        except Exception as error:
            raise ProcessingDependencyError(
                code="invalid_dossier_model_output",
                message="Dossier response did not match the expected schema",
                retryable=True,
            ) from error

    def _build_grounded_prompt(
        self,
        *,
        name: str,
        email: str,
        latitude: float,
        longitude: float,
        address: Optional[ReverseGeocodedAddress],
    ) -> str:
        address_text = address.formatted_address if address and address.formatted_address else "address unavailable"
        return f"""
Investigate the public digital footprint for the most likely person match.

Known identifiers:
- name: {name}
- email: {email}
- address context: {address_text}
- coordinates: {latitude}, {longitude}

Find and summarize only public information that is relevant to professional and social footprint:
- LinkedIn profile
- GitHub profile
- personal or company websites
- social media presence
- public mentions or news

If multiple people share the same name, use the email and location context to identify the best match.
If the evidence is weak or conflicting, say so clearly.
""".strip()

    def _build_search_prompt(
        self,
        *,
        query: str,
        intent: SearchIntent,
        job_context: dict[str, Any],
        history: list[SearchHistoryTurn],
    ) -> str:
        context_json = json.dumps(job_context.get("completed_items") or [], ensure_ascii=True)
        history_json = json.dumps(
            [turn.model_dump(mode="json") for turn in history],
            ensure_ascii=True,
        )
        return f"""
You are Hushh Intelligence operating a consented personal search console.

Intent: {intent.value}
User query: {query}

Known identity context:
{context_json}

Recent thread:
{history_json}

Search for public evidence relevant to the query. Emphasize:
- person-specific matches over generic same-name results
- public web, professional, social, reputation, and local context depending on the search intent
- high-signal internet evidence with citations

If the user context is weak or ambiguous, say so clearly and prefer caution.
""".strip()

    def _build_web_search_prompt(
        self,
        *,
        query: str,
        intent: SearchIntent,
        history: list[SearchHistoryTurn],
        expansion: WebSearchExpansion,
    ) -> str:
        history_json = json.dumps(
            [turn.model_dump(mode="json") for turn in history],
            ensure_ascii=True,
        )
        expansion_json = json.dumps(expansion.model_dump(mode="json"), ensure_ascii=True)
        return f"""
You are Hushh Web Intelligence operating a next-generation grounded search console.

Intent: {intent.value}
User query: {query}
Recent thread:
{history_json}
Search plan:
{expansion_json}

Search the open web using the plan above. Prefer:
- high-signal primary sources and credible reporting
- direct evidence over SEO filler
- useful contradictions, tradeoffs, and concrete facts
- support for an answer-first experience with proof and next moves

If evidence is weak or conflicting, say so clearly.
""".strip()

    def _build_dossier_prompt(
        self,
        *,
        job_context: dict[str, Any],
    ) -> str:
        context_json = json.dumps(job_context.get("completed_items") or [], ensure_ascii=True)
        return f"""
You are Hushh Intelligence preparing the first completed dossier for a consented user.

Known identity context:
{context_json}

Search for public evidence that sharpens:
- the strongest likely identity match
- professional presence
- public footprint and mentions
- reputation or ambiguity signals
- regional relevance tied to the known location context

Prefer person-specific evidence over generic same-name results.
If evidence is weak, conflicting, or ambiguous, make that explicit.
""".strip()

    @staticmethod
    def _resolve_maps_coordinates(job_context: dict[str, Any]) -> tuple[Optional[float], Optional[float]]:
        primary_item = (job_context.get("completed_items") or [{}])[0]
        location = primary_item.get("location") or {}
        latitude = location.get("latitude")
        longitude = location.get("longitude")

        if not isinstance(latitude, (int, float)) or not isinstance(longitude, (int, float)):
            return None, None

        return float(latitude), float(longitude)

    def _extract_grounding_chunks(self, response: Any) -> list[GroundingChunk]:
        candidates = getattr(response, "candidates", None) or []
        if not candidates:
            return []

        metadata = getattr(candidates[0], "grounding_metadata", None)
        if metadata is None:
            metadata = getattr(candidates[0], "groundingMetadata", None)

        chunks = getattr(metadata, "grounding_chunks", None) if metadata is not None else None
        if chunks is None and metadata is not None:
            chunks = getattr(metadata, "groundingChunks", None)
        if not chunks:
            return []

        normalized: list[GroundingChunk] = []
        seen: set[tuple[str, str]] = set()

        for chunk in chunks:
            candidates_for_source = [
                ("search", getattr(chunk, "web", None)),
                ("maps", getattr(chunk, "maps", None)),
                ("retrieved", getattr(chunk, "retrieved_context", None)),
                ("retrieved", getattr(chunk, "retrievedContext", None)),
            ]

            for source_type, source in candidates_for_source:
                if source is None:
                    continue
                title = getattr(source, "title", None) or getattr(source, "place_name", None)
                uri = (
                    getattr(source, "uri", None)
                    or getattr(source, "google_maps_uri", None)
                    or getattr(source, "googleMapsUri", None)
                )
                if not title or not uri:
                    continue
                key = (title, uri)
                if key in seen:
                    continue
                seen.add(key)
                normalized.append(
                    GroundingChunk(title=title, uri=uri, source_type=source_type)
                )

        return normalized

    def close(self) -> None:
        self._client.close()
