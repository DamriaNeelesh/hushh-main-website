from typing import Any, Optional

import httpx

from app.config import Settings
from app.hushh_intelligence.services.identity_jobs import (
    ProcessingDependencyError,
    ReverseGeocodedAddress,
)


class GoogleMapsReverseGeocoder:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        self._http = httpx.Client(timeout=settings.http_timeout_seconds)
        try:
            import google.auth

            credentials, _ = google.auth.default(scopes=[settings.geocoding_scope])
        except Exception as error:  # pragma: no cover - depends on local ADC
            raise RuntimeError("Application default credentials are required for Geocoding") from error
        self._credentials = credentials

    def reverse_geocode(self, *, latitude: float, longitude: float) -> Optional[ReverseGeocodedAddress]:
        headers = self._build_headers()
        response = self._http.get(
            f"{self._settings.maps_geocoding_base_url}/geocode/location",
            params={
                "location.latitude": latitude,
                "location.longitude": longitude,
                "languageCode": self._settings.maps_language_code,
            },
            headers=headers,
        )

        if response.status_code == 404:
            return None
        if response.status_code in {429, 500, 502, 503, 504}:
            raise ProcessingDependencyError(
                code="reverse_geocode_unavailable",
                message="Reverse geocoding service is temporarily unavailable",
                retryable=True,
            )
        if response.status_code >= 400:
            raise ProcessingDependencyError(
                code="reverse_geocode_rejected",
                message="Reverse geocoding request was rejected",
                retryable=False,
            )

        payload = response.json()
        results = payload.get("results") or []
        if not results:
            return None

        top_result = results[0]
        return ReverseGeocodedAddress(
            formatted_address=top_result.get("formattedAddress"),
            city=self._find_address_component(
                top_result,
                ["locality", "postal_town", "administrative_area_level_3"],
            ),
            state=self._find_address_component(top_result, ["administrative_area_level_1"]),
            country=self._find_address_component(top_result, ["country"]),
            place_id=top_result.get("placeId"),
        )

    def _build_headers(self) -> dict[str, str]:
        try:
            from google.auth.transport.requests import Request as GoogleAuthRequest
        except ImportError as error:  # pragma: no cover - dependency based
            raise RuntimeError("google-auth transport dependencies are required") from error

        self._credentials.refresh(GoogleAuthRequest())
        return {
            "Authorization": f"Bearer {self._credentials.token}",
            "X-Goog-FieldMask": ",".join(
                [
                    "results.formattedAddress",
                    "results.placeId",
                    "results.addressComponents.longText",
                    "results.addressComponents.types",
                ]
            ),
        }

    @staticmethod
    def _find_address_component(result: dict[str, Any], preferred_types: list[str]) -> Optional[str]:
        components = result.get("addressComponents") or []
        for preferred_type in preferred_types:
            for component in components:
                types = component.get("types") or []
                if preferred_type in types:
                    return component.get("longText") or component.get("shortText")
        return None

    def close(self) -> None:
        self._http.close()
