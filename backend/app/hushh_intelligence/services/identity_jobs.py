from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
import json
import logging
from typing import Any, Optional, Protocol

from app.config import Settings
from app.core.enums import ItemStatus, JobStatus, WarningCode
from app.hushh_intelligence.repositories.identity_jobs import (
    IdentityJobRepository,
    ItemRecord,
    JobRecord,
)
from app.hushh_intelligence.schemas.identity_exploration import (
    ActionCard,
    AddressResult,
    CleanupExpiredJobsResponse,
    CreateIdentityExplorationJobRequest,
    CreateIdentityExplorationJobResponse,
    DossierIdentitySnapshot,
    DossierSection,
    GroundingChunk,
    HushhIntelligenceDossierRequest,
    HushhIntelligenceDossierResponse,
    HushhIntelligenceSearchRequest,
    HushhIntelligenceSearchResponse,
    HushhIntelligenceWebSearchRequest,
    HushhIntelligenceWebSearchResponse,
    IdentityExplorationJobItemResponse,
    IdentityExplorationJobResponse,
    IdentityExplorationResult,
    ItemError,
    OsintCard,
    OsintIntelligence,
    ProofPoint,
    ProfileCollections,
    SearchImpactSnapshot,
    SearchIntent,
    SearchSuggestion,
    SearchHistoryTurn,
    StructuredIdentitySynthesis,
    StructuredSearchSynthesis,
    normalize_warning_codes,
)
from app.hushh_intelligence.services.confidence import compute_confidence
from app.services.task_queue import TaskQueue, WorkerTaskPayload


@dataclass(frozen=True)
class ReverseGeocodedAddress:
    formatted_address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    country: Optional[str]
    place_id: Optional[str]


@dataclass(frozen=True)
class IdentityExplorationOutput:
    summary: str
    profiles: ProfileCollections
    report: object
    warnings: list[str]
    grounding_chunks: list[GroundingChunk]


@dataclass(frozen=True)
class SearchSynthesisOutput:
    answer: str
    summary: str
    proof_points: list[ProofPoint]
    action_cards: list[ActionCard]
    suggestions: list[SearchSuggestion]
    impact_snapshot: Optional[SearchImpactSnapshot]
    warnings: list[str]
    confidence: int
    grounding_chunks: list[GroundingChunk]


@dataclass(frozen=True)
class DossierSynthesisOutput:
    headline: str
    executive_summary: str
    identity_snapshot: DossierIdentitySnapshot
    professional_presence: DossierSection
    digital_footprint: DossierSection
    reputation_signals: DossierSection
    regional_context: DossierSection
    suggestions: list[SearchSuggestion]
    warnings: list[str]
    confidence: int
    grounding_chunks: list[GroundingChunk]


class ReverseGeocoder(Protocol):
    def reverse_geocode(self, *, latitude: float, longitude: float) -> Optional[ReverseGeocodedAddress]:
        ...


class OsintEnricher(Protocol):
    def enrich(
        self,
        *,
        email: str,
        address: Optional[ReverseGeocodedAddress],
        profiles: ProfileCollections,
        grounding_chunks: list[GroundingChunk],
    ) -> OsintIntelligence:
        ...


class IdentityExplorer(Protocol):
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
        ...

    def search(
        self,
        *,
        query: str,
        intent: SearchIntent,
        job_context: dict[str, Any],
        history: list[SearchHistoryTurn],
    ) -> SearchSynthesisOutput:
        ...

    def dossier(
        self,
        *,
        job_context: dict[str, Any],
    ) -> DossierSynthesisOutput:
        ...

    def web_search(
        self,
        *,
        query: str,
        intent: SearchIntent,
        history: list[SearchHistoryTurn],
    ) -> SearchSynthesisOutput:
        ...


class IdentityJobNotFoundError(Exception):
    pass


class IdentityJobItemNotFoundError(Exception):
    pass


class IdentityJobIncompleteError(Exception):
    pass


class RetryableWorkerError(Exception):
    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.message = message


class ProcessingDependencyError(Exception):
    def __init__(self, *, code: str, message: str, retryable: bool) -> None:
        super().__init__(message)
        self.code = code
        self.message = message
        self.retryable = retryable

    def as_payload(self) -> dict[str, Any]:
        return {
            "code": self.code,
            "message": self.message,
            "retryable": self.retryable,
        }


class IdentityJobService:
    def __init__(
        self,
        *,
        settings: Settings,
        repository: IdentityJobRepository,
        task_queue: TaskQueue,
        geocoder: ReverseGeocoder,
        explorer: IdentityExplorer,
        osint_enricher: OsintEnricher,
        logger: logging.Logger,
    ) -> None:
        self._settings = settings
        self._repository = repository
        self._task_queue = task_queue
        self._geocoder = geocoder
        self._explorer = explorer
        self._osint_enricher = osint_enricher
        self._logger = logger

    def create_job(
        self,
        payload: CreateIdentityExplorationJobRequest,
        *,
        submitted_by: Optional[str],
    ) -> CreateIdentityExplorationJobResponse:
        if len(payload.items) > self._settings.max_batch_size:
            raise ValueError(
                f"items must contain at most {self._settings.max_batch_size} entries"
            )

        expires_at = datetime.now(timezone.utc) + timedelta(days=self._settings.job_ttl_days)
        job = self._repository.create_job(
            items=[
                {
                    "name": item.name,
                    "email": item.email,
                    "latitude": item.location.latitude,
                    "longitude": item.location.longitude,
                    "accuracy_meters": item.location.accuracy_meters,
                    "observed_at": item.location.timestamp,
                }
                for item in payload.items
            ],
            submitted_by=submitted_by,
            expires_at=expires_at,
            max_attempts=self._settings.max_item_attempts,
        )

        try:
            for item in job.items:
                self._task_queue.enqueue_identity_item(
                    WorkerTaskPayload(job_id=job.job_id, item_id=item.item_id)
                )
        except Exception as error:
            self._logger.exception("job_dispatch_failed job_id=%s", job.job_id)
            self._repository.mark_job_dispatch_failed(
                job.job_id,
                {
                    "code": "task_enqueue_failed",
                    "message": "Failed to enqueue identity exploration tasks",
                    "retryable": True,
                },
            )
            raise ProcessingDependencyError(
                code="task_enqueue_failed",
                message="Failed to enqueue identity exploration tasks",
                retryable=True,
            ) from error

        self._logger.info("job_created job_id=%s", job.job_id)
        return CreateIdentityExplorationJobResponse(
            job_id=job.job_id,
            status=job.status,
            submitted_count=job.submitted_count,
            created_at=job.created_at,
            expires_at=job.expires_at,
        )

    def get_job(self, job_id: str) -> IdentityExplorationJobResponse:
        job = self._repository.get_job(job_id)
        if job is None:
            raise IdentityJobNotFoundError(job_id)
        return self._serialize_job(job)

    def search(
        self,
        payload: HushhIntelligenceSearchRequest,
    ) -> HushhIntelligenceSearchResponse:
        job = self._repository.get_job(payload.job_id)
        if job is None:
            raise IdentityJobNotFoundError(payload.job_id)

        if job.status not in {JobStatus.COMPLETED.value, JobStatus.PARTIAL_FAILURE.value}:
            raise IdentityJobIncompleteError(payload.job_id)

        completed_items = self._completed_items(job)
        if not completed_items:
            raise IdentityJobIncompleteError(payload.job_id)

        search_context = self._build_search_context(job, completed_items)

        try:
            synthesis = self._explorer.search(
                query=payload.query,
                intent=payload.intent,
                job_context=search_context,
                history=payload.history,
            )
        except ProcessingDependencyError:
            raise
        except Exception as error:
            raise ProcessingDependencyError(
                code="intelligence_search_failed",
                message="Grounded Hushh Intelligence search failed",
                retryable=True,
            ) from error

        warnings = normalize_warning_codes(
            synthesis.warnings
            + [
                warning
                for item in completed_items
                for warning in ((item.result.warnings if item.result else []) or [])
            ]
        )
        sources = self._dedupe_grounding_chunks(
            [*search_context["existing_sources"], *synthesis.grounding_chunks]
        )

        return HushhIntelligenceSearchResponse(
            job_id=payload.job_id,
            intent=payload.intent,
            answer=synthesis.answer,
            summary=synthesis.summary,
            sources=sources,
            proof_points=synthesis.proof_points,
            action_cards=synthesis.action_cards,
            suggestions=synthesis.suggestions,
            impact_snapshot=synthesis.impact_snapshot,
            osint_cards=self._build_osint_cards(completed_items),
            warnings=warnings,
            confidence=synthesis.confidence,
        )

    def web_search(
        self,
        payload: HushhIntelligenceWebSearchRequest,
    ) -> HushhIntelligenceWebSearchResponse:
        try:
            synthesis = self._explorer.web_search(
                query=payload.query,
                intent=payload.intent,
                history=payload.history,
            )
        except ProcessingDependencyError:
            raise
        except Exception as error:
            raise ProcessingDependencyError(
                code="web_search_failed",
                message="Grounded web search failed",
                retryable=True,
            ) from error

        return HushhIntelligenceWebSearchResponse(
            intent=payload.intent,
            answer=synthesis.answer,
            summary=synthesis.summary,
            sources=self._dedupe_grounding_chunks(synthesis.grounding_chunks),
            proof_points=synthesis.proof_points,
            action_cards=synthesis.action_cards,
            suggestions=synthesis.suggestions,
            warnings=normalize_warning_codes(synthesis.warnings),
            confidence=synthesis.confidence,
        )

    def dossier(
        self,
        payload: HushhIntelligenceDossierRequest,
    ) -> HushhIntelligenceDossierResponse:
        job = self._repository.get_job(payload.job_id)
        if job is None:
            raise IdentityJobNotFoundError(payload.job_id)

        if job.status not in {JobStatus.COMPLETED.value, JobStatus.PARTIAL_FAILURE.value}:
            raise IdentityJobIncompleteError(payload.job_id)

        completed_items = self._completed_items(job)
        if not completed_items:
            raise IdentityJobIncompleteError(payload.job_id)

        dossier_context = self._build_search_context(job, completed_items)

        try:
            synthesis = self._explorer.dossier(job_context=dossier_context)
        except ProcessingDependencyError:
            raise
        except Exception as error:
            raise ProcessingDependencyError(
                code="intelligence_dossier_failed",
                message="Grounded Hushh Intelligence dossier failed",
                retryable=True,
            ) from error

        warnings = normalize_warning_codes(
            synthesis.warnings
            + [
                warning
                for item in completed_items
                for warning in ((item.result.warnings if item.result else []) or [])
            ]
        )
        sources = self._dedupe_grounding_chunks(
            [*dossier_context["existing_sources"], *synthesis.grounding_chunks]
        )

        return HushhIntelligenceDossierResponse(
            job_id=payload.job_id,
            headline=synthesis.headline,
            executive_summary=synthesis.executive_summary,
            identity_snapshot=synthesis.identity_snapshot,
            professional_presence=synthesis.professional_presence,
            digital_footprint=synthesis.digital_footprint,
            reputation_signals=synthesis.reputation_signals,
            regional_context=synthesis.regional_context,
            osint_cards=self._build_osint_cards(completed_items),
            sources=sources,
            suggestions=synthesis.suggestions,
            warnings=warnings,
            confidence=synthesis.confidence,
        )

    def process_item(self, *, job_id: str, item_id: str) -> ItemStatus:
        item = self._repository.mark_item_processing(job_id, item_id)
        if item is None:
            raise IdentityJobItemNotFoundError(item_id)

        if item.status == ItemStatus.COMPLETED.value:
            return ItemStatus.COMPLETED
        if item.status == ItemStatus.FAILED.value:
            return ItemStatus.FAILED

        try:
            result = self._run_identity_exploration(item)
        except ProcessingDependencyError as error:
            self._logger.warning(
                "item_processing_error job_id=%s item_id=%s code=%s retryable=%s",
                job_id,
                item_id,
                error.code,
                error.retryable,
            )
            if error.retryable and item.attempts < item.max_attempts:
                self._repository.mark_item_retry_pending(item_id=item_id, error=error.as_payload())
                raise RetryableWorkerError(error.message) from error

            self._repository.mark_item_failed(item_id=item_id, error=error.as_payload())
            return ItemStatus.FAILED

        self._repository.mark_item_completed(
            item_id=item_id,
            warnings=result.warnings,
            result=result.model_dump(mode="json"),
        )
        self._logger.info("item_completed job_id=%s item_id=%s", job_id, item_id)
        return ItemStatus.COMPLETED

    def cleanup_expired_jobs(self) -> CleanupExpiredJobsResponse:
        now = datetime.now(timezone.utc)
        deleted = self._repository.delete_expired_jobs(
            now=now,
            limit=self._settings.cleanup_batch_size,
        )
        return CleanupExpiredJobsResponse(
            requested_at=now,
            deleted_jobs=deleted["deleted_jobs"],
            deleted_items=deleted["deleted_items"],
        )

    def _run_identity_exploration(self, item: ItemRecord) -> IdentityExplorationResult:
        confidence = compute_confidence(
            accuracy_meters=item.accuracy_meters,
            observed_at=item.observed_at,
            low_accuracy_warning_threshold_meters=self._settings.low_accuracy_warning_threshold_meters,
            low_confidence_threshold=self._settings.low_confidence_threshold,
            stale_location_warning_days=self._settings.stale_location_warning_days,
        )

        try:
            address = self._geocoder.reverse_geocode(
                latitude=item.latitude,
                longitude=item.longitude,
            )
        except ProcessingDependencyError:
            raise
        except Exception as error:
            raise ProcessingDependencyError(
                code="reverse_geocode_failed",
                message="Reverse geocoding request failed",
                retryable=True,
            ) from error

        warnings = list(confidence.warnings)
        if address is None:
            warnings.append(WarningCode.NO_ADDRESS_MATCH.value)

        try:
            exploration = self._explorer.explore(
                name=item.name,
                email=item.email,
                latitude=item.latitude,
                longitude=item.longitude,
                confidence_score=confidence.score,
                address=address,
            )
        except ProcessingDependencyError:
            raise
        except Exception as error:
            raise ProcessingDependencyError(
                code="identity_exploration_failed",
                message="Grounded identity exploration failed",
                retryable=True,
            ) from error

        warnings.extend(exploration.warnings)
        warnings = normalize_warning_codes(warnings)

        if not self._has_profile_sources(exploration.profiles):
            if WarningCode.NO_MATCH.value not in warnings:
                warnings.append(WarningCode.NO_MATCH.value)

        osint = self._run_osint_enrichment(
            email=item.email,
            address=address,
            profiles=exploration.profiles,
            grounding_chunks=exploration.grounding_chunks,
        )

        return IdentityExplorationResult(
            address=AddressResult(
                formatted_address=address.formatted_address if address else None,
                city=address.city if address else None,
                state=address.state if address else None,
                country=address.country if address else None,
                place_id=address.place_id if address else None,
            ),
            confidence_score=confidence.score,
            summary=exploration.summary,
            profiles=exploration.profiles,
            report=exploration.report,
            grounding_chunks=exploration.grounding_chunks,
            osint=osint,
            warnings=warnings,
        )

    def _run_osint_enrichment(
        self,
        *,
        email: str,
        address: Optional[ReverseGeocodedAddress],
        profiles: ProfileCollections,
        grounding_chunks: list[GroundingChunk],
    ) -> Optional[OsintIntelligence]:
        try:
            return self._osint_enricher.enrich(
                email=email,
                address=address,
                profiles=profiles,
                grounding_chunks=grounding_chunks,
            )
        except Exception:
            self._logger.exception("osint_enrichment_failed email_domain=%s", email.split("@")[-1])
            return None

    @staticmethod
    def _has_profile_sources(profiles: ProfileCollections) -> bool:
        groups = [
            profiles.linkedin,
            profiles.github,
            profiles.websites,
            profiles.socials,
            profiles.mentions,
        ]
        return any(group for group in groups)

    @staticmethod
    def _completed_items(job: JobRecord) -> list[IdentityExplorationJobItemResponse]:
        completed: list[IdentityExplorationJobItemResponse] = []
        for item in job.items:
            if item.status != ItemStatus.COMPLETED.value or not item.result:
                continue
            completed.append(
                IdentityExplorationJobItemResponse(
                    item_id=item.item_id,
                    item_index=item.item_index,
                    name=item.name,
                    email=item.email,
                    status=item.status,
                    attempts=item.attempts,
                    max_attempts=item.max_attempts,
                    updated_at=item.updated_at,
                    result=IdentityExplorationResult.model_validate(item.result),
                    error=ItemError.model_validate(item.error) if item.error else None,
                )
            )
        return completed

    def _build_search_context(
        self,
        job: JobRecord,
        completed_items: list[IdentityExplorationJobItemResponse],
    ) -> dict[str, Any]:
        context_items: list[dict[str, Any]] = []
        existing_sources: list[GroundingChunk] = []
        completed_lookup = {item.item_id: item for item in completed_items}

        for next_job_item in job.items:
            item = completed_lookup.get(next_job_item.item_id)
            if item is None:
                continue
            result = item.result
            if result is None:
                continue
            context_items.append(
                {
                    "item_id": item.item_id,
                    "item_index": item.item_index,
                    "name": item.name,
                    "email": item.email,
                    "location": {
                        "latitude": next_job_item.latitude,
                        "longitude": next_job_item.longitude,
                        "accuracy_meters": next_job_item.accuracy_meters,
                        "observed_at": next_job_item.observed_at.isoformat(),
                    },
                    "confidence_score": result.confidence_score,
                    "summary": result.summary,
                    "address": result.address.model_dump(mode="json"),
                    "profiles": result.profiles.model_dump(mode="json"),
                    "report": result.report.model_dump(mode="json"),
                    "osint": result.osint.model_dump(mode="json") if result.osint else None,
                    "warnings": result.warnings,
                }
            )
            existing_sources.extend(result.grounding_chunks)

        return {
            "job_id": job.job_id,
            "job_status": job.status,
            "submitted_count": job.submitted_count,
            "submitted_by": job.submitted_by,
            "completed_items": context_items,
            "existing_sources": self._dedupe_grounding_chunks(existing_sources),
        }

    @staticmethod
    def _build_osint_cards(
        completed_items: list[IdentityExplorationJobItemResponse],
    ) -> list[OsintCard]:
        cards: list[OsintCard] = []

        first_result = next((item.result for item in completed_items if item.result is not None), None)
        if first_result is None or first_result.osint is None:
            return cards

        osint = first_result.osint
        if osint.email_domain_intelligence:
            email_signal = osint.email_domain_intelligence
            items = [
                f"Domain: {email_signal.domain}",
                f"Free provider: {'yes' if email_signal.free_provider else 'no'}",
                f"Role account: {'yes' if email_signal.role_account else 'no'}",
            ]
            if email_signal.mx_records:
                items.append(f"MX: {', '.join(email_signal.mx_records[:3])}")
            if email_signal.domain_age and email_signal.domain_age.age_days is not None:
                items.append(f"Age: {email_signal.domain_age.age_days} days")
            cards.append(
                OsintCard(
                    key="email-domain",
                    title="Email Domain Intelligence",
                    summary="Passive DNS and domain-age signals around the submitted email domain.",
                    items=items,
                    confidence=76,
                )
            )

        if osint.website_intelligence:
            website = osint.website_intelligence[0]
            items = [f"Domain: {website.domain}"]
            if website.cms:
                items.append(f"CMS: {website.cms}")
            if website.subdomains:
                items.append(f"Subdomains: {', '.join(website.subdomains[:3])}")
            if website.ip_addresses:
                items.append(f"IPv4: {', '.join(website.ip_addresses[:3])}")
            cards.append(
                OsintCard(
                    key="website-footprint",
                    title="Website Footprint",
                    summary="Passive website metadata and certificate-transparency hints for public domains.",
                    items=items,
                    confidence=68,
                )
            )

        if osint.geo_context:
            cards.append(
                OsintCard(
                    key="geo-context",
                    title="Geo Context",
                    summary="Location and ccTLD hints that frame regional relevance.",
                    items=[signal.label for signal in osint.geo_context[:4]],
                    confidence=62,
                )
            )

        if osint.domain_age:
            aged_domains = [
                f"{signal.domain}: {signal.age_days} days"
                for signal in osint.domain_age
                if signal.age_days is not None
            ]
            if aged_domains:
                cards.append(
                    OsintCard(
                        key="domain-age",
                        title="Domain Age",
                        summary="Registration-age signals for domains tied to the public footprint.",
                        items=aged_domains[:4],
                        confidence=64,
                    )
                )

        return cards[:4]

    @staticmethod
    def _dedupe_grounding_chunks(chunks: list[GroundingChunk]) -> list[GroundingChunk]:
        deduped: list[GroundingChunk] = []
        seen: set[tuple[str, str, str]] = set()
        for chunk in chunks:
            key = (chunk.title, chunk.uri, chunk.source_type)
            if key in seen:
                continue
            seen.add(key)
            deduped.append(chunk)
        return deduped

    def _serialize_job(self, job: JobRecord) -> IdentityExplorationJobResponse:
        items = [
            IdentityExplorationJobItemResponse(
                item_id=item.item_id,
                item_index=item.item_index,
                name=item.name,
                email=item.email,
                status=item.status,
                attempts=item.attempts,
                max_attempts=item.max_attempts,
                updated_at=item.updated_at,
                result=IdentityExplorationResult.model_validate(item.result)
                if item.result
                else None,
                error=ItemError.model_validate(item.error) if item.error else None,
            )
            for item in job.items
        ]

        return IdentityExplorationJobResponse(
            job_id=job.job_id,
            status=job.status,
            submitted_count=job.submitted_count,
            created_at=job.created_at,
            updated_at=job.updated_at,
            expires_at=job.expires_at,
            items=items,
        )
