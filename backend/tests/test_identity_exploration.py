from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Optional

from fastapi import HTTPException
from fastapi.testclient import TestClient

from app.core.auth import ApiKeyAuthVerifier, AuthenticatedCaller
from app.core.container import AppContainer
from app.core.database import DatabaseManager
from app.hushh_intelligence.repositories.identity_jobs import IdentityJobRepository
from app.hushh_intelligence.schemas.identity_exploration import (
    ActionCard,
    DossierIdentitySnapshot,
    DossierSection,
    DigitalFootprintReport,
    DomainAgeSignal,
    EmailDomainIntelligence,
    GeoContextSignal,
    OsintIntelligence,
    PassiveDnsRecord,
    ProofPoint,
    ProfileCollections,
    SearchImpactSnapshot,
    SearchHistoryTurn,
    SearchSuggestion,
    SourceReference,
    WebsiteIntelligence,
)
from app.hushh_intelligence.services.identity_jobs import (
    DossierSynthesisOutput,
    IdentityExplorationOutput,
    ProcessingDependencyError,
    ReverseGeocodedAddress,
    SearchSynthesisOutput,
)
from app.main import create_app
from app.services.task_queue import WorkerTaskPayload
from app.config import ApiKeyCredential, Settings


class StaticTokenAuthVerifier:
    def __init__(self, token: str = "test-token") -> None:
        self._token = token

    def verify(self, request):
        authorization = request.headers.get("authorization")
        if authorization != f"Bearer {self._token}":
            raise HTTPException(status_code=401, detail="Missing bearer token")
        return AuthenticatedCaller(
            subject="test-subject",
            email="svc-test@hushh.ai",
            issuer="tests",
        )


class FakeTaskQueue:
    def __init__(self) -> None:
        self.payloads: list[WorkerTaskPayload] = []

    def enqueue_identity_item(self, payload: WorkerTaskPayload) -> None:
        self.payloads.append(payload)

    def close(self) -> None:
        return None


class FakeGeocoder:
    def __init__(self) -> None:
        self.mode = "success"

    def reverse_geocode(self, *, latitude: float, longitude: float):
        del latitude, longitude
        if self.mode == "retryable_error":
            raise ProcessingDependencyError(
                code="reverse_geocode_failed",
                message="reverse geocode failed",
                retryable=True,
            )
        if self.mode == "no_results":
            return None
        return ReverseGeocodedAddress(
            formatted_address="1600 Amphitheatre Pkwy, Mountain View, CA, USA",
            city="Mountain View",
            state="CA",
            country="USA",
            place_id="place-123",
        )

    def close(self) -> None:
        return None


class FakeExplorer:
    def __init__(self) -> None:
        self.scenarios: dict[str, list[str]] = {}

    def set_scenario(self, email: str, *steps: str) -> None:
        self.scenarios[email] = list(steps)

    def explore(
        self,
        *,
        name: str,
        email: str,
        latitude: float,
        longitude: float,
        confidence_score: int,
        address,
    ) -> IdentityExplorationOutput:
        del latitude, longitude, confidence_score, address
        step_queue = self.scenarios.setdefault(email, ["success"])
        current_step = step_queue.pop(0) if step_queue else "success"

        if current_step == "retryable_error":
            raise ProcessingDependencyError(
                code="grounded_search_failed",
                message="grounded search failed",
                retryable=True,
            )

        if current_step == "permanent_error":
            raise ProcessingDependencyError(
                code="invalid_model_output",
                message="invalid model output",
                retryable=False,
            )

        warnings: list[str] = []
        profiles = ProfileCollections()
        if current_step == "success":
            profiles = ProfileCollections(
                linkedin=[
                    SourceReference(
                        title=f"{name} on LinkedIn",
                        uri=f"https://www.linkedin.com/in/{email.split('@')[0]}",
                        snippet="Professional profile",
                        source_type="search",
                    )
                ],
                github=[
                    SourceReference(
                        title=f"{name} on GitHub",
                        uri=f"https://github.com/{email.split('@')[0]}",
                        snippet="GitHub profile",
                        source_type="search",
                    )
                ],
            )
        elif current_step == "ambiguous":
            warnings.append("ambiguous_match")
            profiles = ProfileCollections(
                linkedin=[
                    SourceReference(
                        title=f"{name} possible LinkedIn match",
                        uri="https://www.linkedin.com/in/possible-match",
                        snippet="Potential but ambiguous profile",
                        source_type="search",
                    )
                ]
            )
        elif current_step == "no_match":
            warnings.append("no_match")

        report = DigitalFootprintReport(
            identity_match_summary=f"Most likely public match for {name}.",
            professional_background="Public footprint suggests a professional online presence.",
            digital_presence="Public profiles and mentions were reviewed.",
            location_context="Location context was incorporated.",
            notable_public_mentions=["Public mention 1"] if current_step == "success" else [],
            reasoning="Only grounded signals were used.",
            source_count=2 if current_step == "success" else 0,
        )

        return IdentityExplorationOutput(
            summary=f"Identity exploration completed for {name}.",
            profiles=profiles,
            report=report,
            warnings=warnings,
            grounding_chunks=[],
        )

    def close(self) -> None:
        return None

    def search(self, *, query: str, intent, job_context, history) -> SearchSynthesisOutput:
        completed_items = job_context.get("completed_items") or []
        primary_item = completed_items[0] if completed_items else {}
        summary = primary_item.get("summary") or "Identity context unavailable."
        domain = (
            ((primary_item.get("osint") or {}).get("email_domain_intelligence") or {}).get("domain")
            or "example.com"
        )
        return SearchSynthesisOutput(
            answer=f"{intent.value} answer for {query}",
            summary=f"Search anchored to: {summary}. Prior turns: {len(history)}.",
            proof_points=[
                ProofPoint(
                    claim="The identity context has public profiles.",
                    evidence="Grounded search located profile and mention evidence tied to the submitted identity.",
                    citations=["Profile evidence"],
                )
            ],
            action_cards=[
                ActionCard(
                    title="Refine the search",
                    description="Push deeper into professional signals tied to the same identity context.",
                    query="Show the strongest professional proof",
                )
            ],
            suggestions=[
                SearchSuggestion(label="Professional footprint", query="Summarize professional footprint"),
                SearchSuggestion(label="Reputation check", query="What is the public reputation?"),
            ],
            impact_snapshot=SearchImpactSnapshot(
                headline="Public internet footprint is available.",
                bullet_points=["Profiles and mentions exist.", "OSINT enrichment added passive domain context."],
                notable_domains=[domain],
                public_profile_count=2,
            ),
            warnings=[],
            confidence=82,
            grounding_chunks=[],
        )

    def web_search(self, *, query: str, intent, history) -> SearchSynthesisOutput:
        return SearchSynthesisOutput(
            answer=f"Web answer for {query}",
            summary=f"Open-web intelligence summary with {len(history)} prior turns.",
            proof_points=[
                ProofPoint(
                    claim="The open web has grounded evidence for this query.",
                    evidence="The search pipeline expanded the query and synthesized source-backed results.",
                    citations=["Web source 1", "Web source 2"],
                )
            ],
            action_cards=[
                ActionCard(
                    title="Compare stronger sources",
                    description="Ask for higher-credibility sources only.",
                    query="Which sources are most credible here?",
                )
            ],
            suggestions=[
                SearchSuggestion(label="Compare sources", query="Which sources agree most strongly?"),
                SearchSuggestion(label="Next actions", query="What should I do next?"),
            ],
            impact_snapshot=None,
            warnings=[],
            confidence=79,
            grounding_chunks=[],
        )

    def dossier(self, *, job_context) -> DossierSynthesisOutput:
        completed_items = job_context.get("completed_items") or []
        primary_item = completed_items[0] if completed_items else {}
        summary = primary_item.get("summary") or "Identity context unavailable."
        address = primary_item.get("address") or {}
        domain = (
            ((primary_item.get("osint") or {}).get("email_domain_intelligence") or {}).get("domain")
            or "example.com"
        )
        name = primary_item.get("name") or "Unknown Person"
        email = primary_item.get("email") or "unknown@example.com"

        return DossierSynthesisOutput(
            headline=f"Public intelligence dossier for {name}",
            executive_summary=f"{name} has a grounded public footprint with professional and domain-level signals.",
            identity_snapshot=DossierIdentitySnapshot(
                name=name,
                email=email,
                formatted_address=address.get("formatted_address"),
                location_context=address.get("city") or "Regional location context available.",
                notable_domains=[domain],
                public_profile_count=2,
            ),
            professional_presence=DossierSection(
                summary=summary,
                bullet_points=["Public professional profiles were identified.", "Evidence suggests software or technical work."],
            ),
            digital_footprint=DossierSection(
                summary="Grounded search found public mentions and web traces.",
                bullet_points=["Public web profiles exist.", "Passive domain signals add context."],
            ),
            reputation_signals=DossierSection(
                summary="No severe negative signals were found in the test fixture.",
                bullet_points=["Ambiguity should still be reviewed manually when names are common."],
            ),
            regional_context=DossierSection(
                summary="Location hints shape how local relevance is interpreted.",
                bullet_points=["Resolved address and geo context are available."],
            ),
            suggestions=[
                SearchSuggestion(label="Professional footprint", query="Summarize my professional footprint"),
                SearchSuggestion(label="Reputation check", query="What reputation signals stand out?"),
            ],
            warnings=[],
            confidence=88,
            grounding_chunks=[],
        )


class FakeOsintEnricher:
    def enrich(self, *, email: str, address, profiles, grounding_chunks):
        del address, profiles, grounding_chunks
        domain = email.split("@", 1)[1]
        return OsintIntelligence(
            email_domain_intelligence=EmailDomainIntelligence(
                normalized_email=email,
                domain=domain,
                syntax_valid=True,
                free_provider=False,
                role_account=False,
                mx_records=[f"mx1.{domain}"],
                dns_records=[PassiveDnsRecord(record_type="MX", values=[f"mx1.{domain}"])],
                domain_age=DomainAgeSignal(domain=domain, age_days=1200, registrar="Registrar Test"),
            ),
            website_intelligence=[
                WebsiteIntelligence(
                    domain=domain,
                    url=f"https://{domain}",
                    title="Test Website",
                    generator="Custom",
                    cms="wordpress",
                    subdomains=[f"blog.{domain}"],
                    ip_addresses=["203.0.113.10"],
                    notes=["Passive fingerprint suggests wordpress"],
                )
            ],
            domain_age=[DomainAgeSignal(domain=domain, age_days=1200, registrar="Registrar Test")],
            passive_dns=[PassiveDnsRecord(record_type="MX", values=[f"mx1.{domain}"])],
            geo_context=[GeoContextSignal(label="ccTLD suggests India", source="domain_hint")],
        )

    def close(self) -> None:
        return None


def build_settings(tmp_path: Path, **overrides) -> Settings:
    values = {
        "app_name": "Hushh Identity Exploration API",
        "app_env": "test",
        "app_version": "test",
        "api_v1_prefix": "/api/v1",
        "allowed_origins": ("http://localhost:3002",),
        "database_url": f"sqlite:///{tmp_path / 'identity-test.db'}",
        "sql_echo": False,
        "auto_create_tables": True,
        "auth_enabled": True,
        "auth_mode": "google_oidc",
        "auth_audience": "https://identity.test",
        "allowed_caller_emails": ("svc-test@hushh.ai",),
        "auth_api_key_header": "x-hushh-api-key",
        "auth_api_keys": (),
        "google_cloud_project": "hushone-app",
        "google_cloud_location": "global",
        "identity_model": "gemini-2.5-pro",
        "identity_enable_maps_grounding": True,
        "maps_geocoding_base_url": "https://example.com",
        "maps_language_code": "en",
        "geocoding_scope": "https://www.googleapis.com/auth/maps-platform.geocode.location",
        "http_timeout_seconds": 5.0,
        "job_ttl_days": 7,
        "max_batch_size": 10,
        "max_item_attempts": 3,
        "low_accuracy_warning_threshold_meters": 100.0,
        "low_confidence_threshold": 50,
        "stale_location_warning_days": 30,
        "task_queue_mode": "disabled",
        "task_queue_project": "hushone-app",
        "task_queue_location": "us-central1",
        "task_queue_name": "identity-exploration",
        "task_queue_service_account_email": None,
        "worker_target_url": None,
        "worker_audience": None,
        "task_dispatch_deadline_seconds": 180,
        "cleanup_batch_size": 250,
    }
    values.update(overrides)
    return Settings(**values)


def build_client(tmp_path: Path, **setting_overrides):
    settings = build_settings(tmp_path, **setting_overrides)
    database = DatabaseManager(settings)
    repository = IdentityJobRepository(database)
    queue = FakeTaskQueue()
    geocoder = FakeGeocoder()
    explorer = FakeExplorer()
    osint_enricher = FakeOsintEnricher()
    auth = StaticTokenAuthVerifier()
    container = AppContainer(
        settings=settings,
        database=database,
        repository=repository,
        task_queue=queue,
        geocoder=geocoder,
        explorer=explorer,
        osint_enricher=osint_enricher,
        public_auth_verifier=auth,
        internal_auth_verifier=auth,
    )
    app = create_app(container=container, settings=settings)
    return TestClient(app), queue, geocoder, explorer


def auth_headers() -> dict[str, str]:
    return {"Authorization": "Bearer test-token"}


def api_key_headers() -> dict[str, str]:
    return {"X-Hushh-API-Key": "dev-key-123"}


def build_api_key_client(tmp_path: Path):
    settings = build_settings(
        tmp_path,
        auth_mode="api_key",
        auth_api_keys=(ApiKeyCredential(label="developer", secret="dev-key-123"),),
    )
    database = DatabaseManager(settings)
    repository = IdentityJobRepository(database)
    queue = FakeTaskQueue()
    geocoder = FakeGeocoder()
    explorer = FakeExplorer()
    osint_enricher = FakeOsintEnricher()
    public_auth = ApiKeyAuthVerifier(settings)
    internal_auth = StaticTokenAuthVerifier()
    container = AppContainer(
        settings=settings,
        database=database,
        repository=repository,
        task_queue=queue,
        geocoder=geocoder,
        explorer=explorer,
        osint_enricher=osint_enricher,
        public_auth_verifier=public_auth,
        internal_auth_verifier=internal_auth,
    )
    app = create_app(container=container, settings=settings)
    return TestClient(app), queue


def make_item(index: int, *, accuracy: float = 20.0, timestamp: Optional[datetime] = None) -> dict:
    observed_at = timestamp or datetime.now(timezone.utc)
    return {
        "name": f"Person {index}",
        "email": f"person{index}@example.com",
        "location": {
            "latitude": 37.422 + (index * 0.001),
            "longitude": -122.084 + (index * 0.001),
            "accuracy_meters": accuracy,
            "timestamp": observed_at.isoformat(),
        },
    }


def test_create_job_accepts_single_item(tmp_path: Path) -> None:
    client, queue, _, _ = build_client(tmp_path)
    with client:
        response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=auth_headers(),
        )

    assert response.status_code == 202
    payload = response.json()
    assert payload["status"] == "queued"
    assert payload["submitted_count"] == 1
    assert len(queue.payloads) == 1


def test_create_job_accepts_ten_items(tmp_path: Path) -> None:
    client, queue, _, _ = build_client(tmp_path)
    items = [make_item(index) for index in range(10)]
    with client:
        response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": items},
            headers=auth_headers(),
        )

    assert response.status_code == 202
    assert response.json()["submitted_count"] == 10
    assert len(queue.payloads) == 10


def test_validation_rejects_invalid_requests(tmp_path: Path) -> None:
    client, _, _, _ = build_client(tmp_path)
    invalid_payloads = [
        {"items": []},
        {"items": [make_item(index) for index in range(11)]},
        {"items": [{**make_item(1), "email": "bad-email"}]},
        {"items": [{**make_item(1), "location": {**make_item(1)["location"], "latitude": 999}}]},
        {"items": [{**make_item(1), "location": {**make_item(1)["location"], "timestamp": "not-a-date"}}]},
    ]

    with client:
        for payload in invalid_payloads:
            response = client.post(
                "/api/v1/identity-exploration/jobs",
                json=payload,
                headers=auth_headers(),
            )
            assert response.status_code == 422


def test_auth_rejects_unauthorized_callers(tmp_path: Path) -> None:
    client, _, _, _ = build_client(tmp_path)
    with client:
        response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
        )

    assert response.status_code == 401


def test_api_key_auth_allows_public_job_requests(tmp_path: Path) -> None:
    client, queue = build_api_key_client(tmp_path)
    with client:
        response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=api_key_headers(),
        )

    assert response.status_code == 202
    assert len(queue.payloads) == 1


def test_api_key_auth_does_not_unlock_internal_routes(tmp_path: Path) -> None:
    client, _ = build_api_key_client(tmp_path)
    with client:
        response = client.post(
            "/api/v1/internal/identity-exploration/cleanup",
            headers=api_key_headers(),
        )

    assert response.status_code == 401


def test_worker_processes_success_and_job_can_be_polled(tmp_path: Path) -> None:
    client, queue, _, _ = build_client(tmp_path)
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=auth_headers(),
        )
        payload = queue.payloads[0]
        worker_response = client.post(
            "/api/v1/internal/identity-exploration/worker",
            json={"job_id": payload.job_id, "item_id": payload.item_id},
            headers=auth_headers(),
        )
        poll_response = client.get(
            f"/api/v1/identity-exploration/jobs/{payload.job_id}",
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert worker_response.status_code == 200
    assert worker_response.json()["status"] == "completed"
    job_payload = poll_response.json()
    assert job_payload["status"] == "completed"
    assert job_payload["items"][0]["status"] == "completed"
    assert job_payload["items"][0]["result"]["address"]["city"] == "Mountain View"
    assert job_payload["items"][0]["result"]["confidence_score"] >= 90
    assert job_payload["items"][0]["result"]["osint"]["email_domain_intelligence"]["domain"] == "example.com"


def test_worker_retries_transient_failures(tmp_path: Path) -> None:
    client, queue, _, explorer = build_client(tmp_path)
    explorer.set_scenario("person1@example.com", "retryable_error", "success")
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=auth_headers(),
        )
        payload = queue.payloads[0]
        first_worker = client.post(
            "/api/v1/internal/identity-exploration/worker",
            json={"job_id": payload.job_id, "item_id": payload.item_id},
            headers=auth_headers(),
        )
        second_worker = client.post(
            "/api/v1/internal/identity-exploration/worker",
            json={"job_id": payload.job_id, "item_id": payload.item_id},
            headers=auth_headers(),
        )
        poll_response = client.get(
            f"/api/v1/identity-exploration/jobs/{payload.job_id}",
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert first_worker.status_code == 503
    assert second_worker.status_code == 200
    item = poll_response.json()["items"][0]
    assert item["attempts"] == 2
    assert item["status"] == "completed"


def test_partial_failure_is_reported(tmp_path: Path) -> None:
    client, queue, _, explorer = build_client(tmp_path)
    explorer.set_scenario("person2@example.com", "permanent_error")
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1), make_item(2)]},
            headers=auth_headers(),
        )
        first_payload, second_payload = queue.payloads
        first_worker = client.post(
            "/api/v1/internal/identity-exploration/worker",
            json={"job_id": first_payload.job_id, "item_id": first_payload.item_id},
            headers=auth_headers(),
        )
        second_worker = client.post(
            "/api/v1/internal/identity-exploration/worker",
            json={"job_id": second_payload.job_id, "item_id": second_payload.item_id},
            headers=auth_headers(),
        )
        poll_response = client.get(
            f"/api/v1/identity-exploration/jobs/{first_payload.job_id}",
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert first_worker.status_code == 200
    assert second_worker.status_code == 200
    assert poll_response.json()["status"] == "partial_failure"
    statuses = [item["status"] for item in poll_response.json()["items"]]
    assert statuses == ["completed", "failed"]


def test_geocode_zero_results_and_low_confidence_warnings_are_returned(tmp_path: Path) -> None:
    old_timestamp = datetime.now(timezone.utc) - timedelta(days=90)
    client, queue, geocoder, explorer = build_client(tmp_path)
    geocoder.mode = "no_results"
    explorer.set_scenario("person1@example.com", "no_match")
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1, accuracy=900.0, timestamp=old_timestamp)]},
            headers=auth_headers(),
        )
        payload = queue.payloads[0]
        worker_response = client.post(
            "/api/v1/internal/identity-exploration/worker",
            json={"job_id": payload.job_id, "item_id": payload.item_id},
            headers=auth_headers(),
        )
        poll_response = client.get(
            f"/api/v1/identity-exploration/jobs/{payload.job_id}",
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert worker_response.status_code == 200
    result = poll_response.json()["items"][0]["result"]
    assert result["address"]["formatted_address"] is None
    assert set(result["warnings"]) >= {"no_address_match", "low_accuracy", "stale_location", "low_confidence", "no_match"}


def test_cleanup_deletes_expired_jobs(tmp_path: Path) -> None:
    client, queue, _, _ = build_client(tmp_path, job_ttl_days=0)
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=auth_headers(),
        )
        job_id = create_response.json()["job_id"]
        cleanup_response = client.post(
            "/api/v1/internal/identity-exploration/cleanup",
            headers=auth_headers(),
        )
        poll_response = client.get(
            f"/api/v1/identity-exploration/jobs/{job_id}",
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert len(queue.payloads) == 1
    assert cleanup_response.status_code == 200
    assert cleanup_response.json()["deleted_jobs"] == 1
    assert poll_response.status_code == 404


def test_search_requires_completed_identity_context(tmp_path: Path) -> None:
    client, queue, _, _ = build_client(tmp_path)
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=auth_headers(),
        )
        payload = queue.payloads[0]
        search_response = client.post(
            "/api/v1/hushh-intelligence/search",
            json={"job_id": payload.job_id, "query": "What is the public footprint?", "intent": "general"},
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert search_response.status_code == 409


def test_dossier_requires_completed_identity_context(tmp_path: Path) -> None:
    client, queue, _, _ = build_client(tmp_path)
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=auth_headers(),
        )
        payload = queue.payloads[0]
        dossier_response = client.post(
            "/api/v1/hushh-intelligence/dossier",
            json={"job_id": payload.job_id},
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert dossier_response.status_code == 409


def test_search_returns_inline_ready_payload(tmp_path: Path) -> None:
    client, queue, _, _ = build_client(tmp_path)
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=auth_headers(),
        )
        payload = queue.payloads[0]
        worker_response = client.post(
            "/api/v1/internal/identity-exploration/worker",
            json={"job_id": payload.job_id, "item_id": payload.item_id},
            headers=auth_headers(),
        )
        search_response = client.post(
            "/api/v1/hushh-intelligence/search",
            json={
                "job_id": payload.job_id,
                "query": "What is the public footprint?",
                "intent": "professional",
                "history": [SearchHistoryTurn(query="Earlier query", summary="Earlier summary").model_dump(mode="json")],
            },
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert worker_response.status_code == 200
    assert search_response.status_code == 200
    payload = search_response.json()
    assert payload["intent"] == "professional"
    assert payload["confidence"] == 82
    assert payload["impact_snapshot"]["public_profile_count"] == 2
    assert payload["proof_points"][0]["claim"] == "The identity context has public profiles."
    assert payload["action_cards"][0]["title"] == "Refine the search"
    assert payload["osint_cards"][0]["key"] == "email-domain"


def test_web_search_returns_workspace_payload_without_identity_context(tmp_path: Path) -> None:
    client, _, _, _ = build_client(tmp_path)
    with client:
        web_search_response = client.post(
            "/api/v1/hushh-intelligence/web-search",
            json={
              "query": "What changed in AI regulation this week?",
              "intent": "general",
              "history": [SearchHistoryTurn(query="Prior query", summary="Prior summary").model_dump(mode="json")],
            },
            headers=auth_headers(),
        )

    assert web_search_response.status_code == 200
    payload = web_search_response.json()
    assert payload["answer"] == "Web answer for What changed in AI regulation this week?"
    assert payload["confidence"] == 79
    assert payload["proof_points"][0]["claim"] == "The open web has grounded evidence for this query."
    assert payload["action_cards"][0]["title"] == "Compare stronger sources"


def test_dossier_returns_structured_payload(tmp_path: Path) -> None:
    client, queue, _, _ = build_client(tmp_path)
    with client:
        create_response = client.post(
            "/api/v1/identity-exploration/jobs",
            json={"items": [make_item(1)]},
            headers=auth_headers(),
        )
        payload = queue.payloads[0]
        worker_response = client.post(
            "/api/v1/internal/identity-exploration/worker",
            json={"job_id": payload.job_id, "item_id": payload.item_id},
            headers=auth_headers(),
        )
        dossier_response = client.post(
            "/api/v1/hushh-intelligence/dossier",
            json={"job_id": payload.job_id},
            headers=auth_headers(),
        )

    assert create_response.status_code == 202
    assert worker_response.status_code == 200
    assert dossier_response.status_code == 200
    payload = dossier_response.json()
    assert payload["headline"].startswith("Public intelligence dossier")
    assert payload["identity_snapshot"]["email"] == "person1@example.com"
    assert payload["confidence"] == 88
    assert payload["osint_cards"][0]["key"] == "email-domain"
