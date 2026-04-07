from dataclasses import dataclass
from functools import lru_cache
import json
import os
import re
from typing import Optional, Sequence, Tuple


def _parse_origins(value: str, fallback: Sequence[str]) -> Tuple[str, ...]:
    if not value:
        return tuple(fallback)

    if value.strip() == "*":
        return ("*",)

    origins = tuple(item.strip() for item in re.split(r"[;,]", value) if item.strip())
    return origins or tuple(fallback)


def _parse_list(value: str, fallback: Sequence[str] = ()) -> Tuple[str, ...]:
    if not value:
        return tuple(fallback)
    return tuple(item.strip() for item in re.split(r"[;,]", value) if item.strip())


@dataclass(frozen=True)
class ApiKeyCredential:
    label: str
    secret: str


def _parse_api_keys(value: Optional[str]) -> Tuple[ApiKeyCredential, ...]:
    if value is None or not value.strip():
        return ()

    raw = value.strip()
    parsed_entries: list[ApiKeyCredential] = []

    if raw.startswith("{") or raw.startswith("["):
        try:
            decoded = json.loads(raw)
        except json.JSONDecodeError:
            decoded = None

        if isinstance(decoded, dict):
            for label, secret in decoded.items():
                if secret:
                    parsed_entries.append(
                        ApiKeyCredential(label=str(label).strip(), secret=str(secret).strip())
                    )
            return tuple(entry for entry in parsed_entries if entry.secret)

        if isinstance(decoded, list):
            for index, item in enumerate(decoded, start=1):
                if isinstance(item, dict):
                    label = str(item.get("label") or item.get("name") or f"key-{index}").strip()
                    secret = str(item.get("secret") or item.get("key") or "").strip()
                else:
                    label = f"key-{index}"
                    secret = str(item).strip()
                if secret:
                    parsed_entries.append(ApiKeyCredential(label=label, secret=secret))
            return tuple(parsed_entries)

    tokens = [
        item.strip()
        for item in re.split(r"[\n,;]", raw)
        if item.strip()
    ]
    for index, token in enumerate(tokens, start=1):
        if ":" in token:
            label, secret = token.split(":", 1)
            label = label.strip() or f"key-{index}"
            secret = secret.strip()
        else:
            label = f"key-{index}"
            secret = token
        if secret:
            parsed_entries.append(ApiKeyCredential(label=label, secret=secret))

    return tuple(parsed_entries)


def _parse_bool(value: Optional[str], default: bool) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _parse_int(value: Optional[str], default: int) -> int:
    if value is None or not value.strip():
        return default
    return int(value)


def _parse_float(value: Optional[str], default: float) -> float:
    if value is None or not value.strip():
        return default
    return float(value)


@dataclass(frozen=True)
class Settings:
    app_name: str
    app_env: str
    app_version: str
    api_v1_prefix: str
    allowed_origins: Tuple[str, ...]
    database_url: str
    sql_echo: bool
    auto_create_tables: bool
    auth_enabled: bool
    auth_mode: str
    auth_audience: Optional[str]
    allowed_caller_emails: Tuple[str, ...]
    auth_api_key_header: str
    auth_api_keys: Tuple[ApiKeyCredential, ...]
    google_cloud_project: Optional[str]
    google_cloud_location: str
    identity_model: str
    identity_enable_maps_grounding: bool
    maps_geocoding_base_url: str
    maps_language_code: str
    geocoding_scope: str
    http_timeout_seconds: float
    job_ttl_days: int
    max_batch_size: int
    max_item_attempts: int
    low_accuracy_warning_threshold_meters: float
    low_confidence_threshold: int
    stale_location_warning_days: int
    task_queue_mode: str
    task_queue_project: Optional[str]
    task_queue_location: str
    task_queue_name: Optional[str]
    task_queue_service_account_email: Optional[str]
    worker_target_url: Optional[str]
    worker_audience: Optional[str]
    task_dispatch_deadline_seconds: int
    cleanup_batch_size: int


@lru_cache()
def get_settings() -> Settings:
    google_cloud_project = os.getenv("GOOGLE_CLOUD_PROJECT")
    google_cloud_location = os.getenv("GOOGLE_CLOUD_LOCATION", "global")

    return Settings(
        app_name=os.getenv("APP_NAME", "Hushh Identity Exploration API"),
        app_env=os.getenv("APP_ENV", "development"),
        app_version=os.getenv("APP_VERSION", "0.1.0"),
        api_v1_prefix=os.getenv("API_V1_PREFIX", "/api/v1"),
        allowed_origins=_parse_origins(
            os.getenv("BACKEND_CORS_ORIGINS"),
            ("http://localhost:3002",),
        ),
        database_url=os.getenv("DATABASE_URL", "sqlite:///./identity_exploration.db"),
        sql_echo=_parse_bool(os.getenv("SQL_ECHO"), False),
        auto_create_tables=_parse_bool(os.getenv("AUTO_CREATE_TABLES"), True),
        auth_enabled=_parse_bool(os.getenv("AUTH_ENABLED"), False),
        auth_mode=os.getenv("AUTH_MODE", "google_oidc").strip().lower(),
        auth_audience=os.getenv("AUTH_AUDIENCE") or os.getenv("WORKER_AUDIENCE"),
        allowed_caller_emails=_parse_list(os.getenv("AUTH_ALLOWED_CALLER_EMAILS")),
        auth_api_key_header=os.getenv("AUTH_API_KEY_HEADER", "x-hushh-api-key").strip().lower(),
        auth_api_keys=_parse_api_keys(os.getenv("AUTH_API_KEYS")),
        google_cloud_project=google_cloud_project,
        google_cloud_location=google_cloud_location,
        identity_model=os.getenv("IDENTITY_EXPLORATION_MODEL", "gemini-2.5-pro"),
        identity_enable_maps_grounding=_parse_bool(
            os.getenv("IDENTITY_ENABLE_MAPS_GROUNDING"),
            True,
        ),
        maps_geocoding_base_url=os.getenv(
            "MAPS_GEOCODING_BASE_URL",
            "https://geocode.googleapis.com/v4beta",
        ),
        maps_language_code=os.getenv("MAPS_LANGUAGE_CODE", "en"),
        geocoding_scope=os.getenv(
            "MAPS_GEOCODING_SCOPE",
            "https://www.googleapis.com/auth/maps-platform.geocode.location",
        ),
        http_timeout_seconds=_parse_float(os.getenv("HTTP_TIMEOUT_SECONDS"), 20.0),
        job_ttl_days=_parse_int(os.getenv("IDENTITY_JOB_TTL_DAYS"), 7),
        max_batch_size=_parse_int(os.getenv("IDENTITY_MAX_BATCH_SIZE"), 10),
        max_item_attempts=_parse_int(os.getenv("IDENTITY_MAX_ITEM_ATTEMPTS"), 3),
        low_accuracy_warning_threshold_meters=_parse_float(
            os.getenv("LOW_ACCURACY_WARNING_THRESHOLD_METERS"),
            100.0,
        ),
        low_confidence_threshold=_parse_int(
            os.getenv("LOW_CONFIDENCE_WARNING_THRESHOLD"),
            50,
        ),
        stale_location_warning_days=_parse_int(
            os.getenv("STALE_LOCATION_WARNING_DAYS"),
            30,
        ),
        task_queue_mode=os.getenv("TASK_QUEUE_MODE", "disabled").strip().lower(),
        task_queue_project=os.getenv("TASK_QUEUE_PROJECT") or google_cloud_project,
        task_queue_location=os.getenv("TASK_QUEUE_LOCATION", "us-central1"),
        task_queue_name=os.getenv("TASK_QUEUE_NAME"),
        task_queue_service_account_email=os.getenv("TASK_QUEUE_SERVICE_ACCOUNT_EMAIL"),
        worker_target_url=os.getenv("WORKER_TARGET_URL"),
        worker_audience=os.getenv("WORKER_AUDIENCE") or os.getenv("AUTH_AUDIENCE"),
        task_dispatch_deadline_seconds=_parse_int(
            os.getenv("TASK_DISPATCH_DEADLINE_SECONDS"),
            180,
        ),
        cleanup_batch_size=_parse_int(os.getenv("CLEANUP_BATCH_SIZE"), 250),
    )
