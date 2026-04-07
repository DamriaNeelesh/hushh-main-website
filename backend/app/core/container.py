import logging
from typing import Any, Optional

from app.config import Settings, get_settings
from app.core.auth import (
    ApiKeyAuthVerifier,
    AuthVerifier,
    CompositeAuthVerifier,
    GoogleServiceAccountAuthVerifier,
    LocalAuthVerifier,
)
from app.core.database import DatabaseManager
from app.hushh_intelligence.repositories.identity_jobs import IdentityJobRepository
from app.hushh_intelligence.schemas.identity_exploration import OsintIntelligence
from app.hushh_intelligence.services.identity_jobs import (
    IdentityJobService,
    ProcessingDependencyError,
)
from app.hushh_intelligence.services.cloud_tasks_queue import CloudTasksQueue
from app.services.task_queue import DisabledTaskQueue, TaskQueue


class UnavailableReverseGeocoder:
    def reverse_geocode(self, *, latitude: float, longitude: float):
        del latitude, longitude
        raise ProcessingDependencyError(
            code="reverse_geocoder_unavailable",
            message="Google Maps reverse geocoder is not configured",
            retryable=False,
        )

    def close(self) -> None:
        return None


class UnavailableIdentityExplorer:
    def explore(self, *, name: str, email: str, latitude: float, longitude: float, confidence_score: int, address):
        del name, email, latitude, longitude, confidence_score, address
        raise ProcessingDependencyError(
            code="identity_explorer_unavailable",
            message="Gemini identity explorer is not configured",
            retryable=False,
        )

    def search(self, *, query: str, intent, job_context, history):
        del query, intent, job_context, history
        raise ProcessingDependencyError(
            code="intelligence_search_unavailable",
            message="Gemini search explorer is not configured",
            retryable=False,
        )

    def dossier(self, *, job_context):
        del job_context
        raise ProcessingDependencyError(
            code="intelligence_dossier_unavailable",
            message="Gemini dossier explorer is not configured",
            retryable=False,
        )

    def web_search(self, *, query: str, intent, history):
        del query, intent, history
        raise ProcessingDependencyError(
            code="web_search_unavailable",
            message="Gemini web search explorer is not configured",
            retryable=False,
        )

    def close(self) -> None:
        return None


class UnavailableOsintEnricher:
    def enrich(self, *, email: str, address, profiles, grounding_chunks):
        del email, address, profiles, grounding_chunks
        return OsintIntelligence()

    def close(self) -> None:
        return None


class AppContainer:
    def __init__(
        self,
        *,
        settings: Settings,
        database: DatabaseManager,
        repository: IdentityJobRepository,
        task_queue: TaskQueue,
        geocoder: object,
        explorer: object,
        osint_enricher: object,
        public_auth_verifier: AuthVerifier,
        internal_auth_verifier: AuthVerifier,
    ) -> None:
        self.settings = settings
        self.database = database
        self.repository = repository
        self.task_queue = task_queue
        self.geocoder = geocoder
        self.explorer = explorer
        self.osint_enricher = osint_enricher
        self.public_auth_verifier = public_auth_verifier
        self.internal_auth_verifier = internal_auth_verifier
        self.auth_verifier = public_auth_verifier
        self.logger = logging.getLogger("identity-exploration")
        self.identity_jobs = IdentityJobService(
            settings=settings,
            repository=repository,
            task_queue=task_queue,
            geocoder=geocoder,
            explorer=explorer,
            osint_enricher=osint_enricher,
            logger=self.logger,
        )

    @classmethod
    def build(
        cls,
        settings: Optional[Settings] = None,
        *,
        task_queue: Optional[TaskQueue] = None,
        geocoder: Optional[Any] = None,
        explorer: Optional[Any] = None,
        osint_enricher: Optional[Any] = None,
        public_auth_verifier: Optional[AuthVerifier] = None,
        internal_auth_verifier: Optional[AuthVerifier] = None,
    ) -> "AppContainer":
        resolved_settings = settings or get_settings()
        database = DatabaseManager(resolved_settings)
        repository = IdentityJobRepository(database)

        if task_queue is None:
            if resolved_settings.task_queue_mode == "cloud_tasks":
                task_queue = CloudTasksQueue(resolved_settings)
            else:
                task_queue = DisabledTaskQueue()

        if geocoder is None:
            try:
                from app.hushh_intelligence.clients.google_geocoding import GoogleMapsReverseGeocoder

                geocoder = GoogleMapsReverseGeocoder(resolved_settings)
            except Exception:
                geocoder = UnavailableReverseGeocoder()

        if explorer is None:
            try:
                from app.hushh_intelligence.clients.gemini_identity import (
                    GeminiGroundedIdentityExplorer,
                )

                explorer = GeminiGroundedIdentityExplorer(resolved_settings)
            except Exception:
                explorer = UnavailableIdentityExplorer()

        if osint_enricher is None:
            try:
                from app.hushh_intelligence.enrichers.osint import SafeOsintEnricher

                osint_enricher = SafeOsintEnricher(resolved_settings)
            except Exception:
                osint_enricher = UnavailableOsintEnricher()

        if resolved_settings.auth_enabled:
            google_auth_verifier = GoogleServiceAccountAuthVerifier(resolved_settings)
            if public_auth_verifier is None:
                if resolved_settings.auth_mode in {"google", "google_oidc", "oidc"}:
                    public_auth_verifier = google_auth_verifier
                elif resolved_settings.auth_mode in {"api_key", "api-key"}:
                    public_auth_verifier = ApiKeyAuthVerifier(resolved_settings)
                elif resolved_settings.auth_mode in {"hybrid", "api_key_or_google_oidc"}:
                    public_auth_verifier = CompositeAuthVerifier(
                        ApiKeyAuthVerifier(resolved_settings),
                        google_auth_verifier,
                    )
                else:
                    raise RuntimeError("Unsupported AUTH_MODE")

            if internal_auth_verifier is None:
                internal_auth_verifier = google_auth_verifier
        else:
            if public_auth_verifier is None:
                public_auth_verifier = LocalAuthVerifier()
            if internal_auth_verifier is None:
                internal_auth_verifier = LocalAuthVerifier()

        return cls(
            settings=resolved_settings,
            database=database,
            repository=repository,
            task_queue=task_queue,
            geocoder=geocoder,
            explorer=explorer,
            osint_enricher=osint_enricher,
            public_auth_verifier=public_auth_verifier,
            internal_auth_verifier=internal_auth_verifier,
        )

    def startup(self) -> None:
        logging.basicConfig(level=logging.INFO)
        if self.settings.auto_create_tables:
            self.database.create_schema()

    def shutdown(self) -> None:
        close_targets = [self.explorer, self.geocoder, self.osint_enricher, self.task_queue]
        for target in close_targets:
            close = getattr(target, "close", None)
            if callable(close):
                close()
        self.database.dispose()
