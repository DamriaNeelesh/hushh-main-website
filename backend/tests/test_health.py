from fastapi.testclient import TestClient

from app.main import create_app


def test_root_exposes_backend_metadata() -> None:
    with TestClient(create_app()) as client:
        response = client.get("/")

    assert response.status_code == 200
    payload = response.json()

    assert payload["service"] == "Hushh Identity Exploration API"
    assert payload["api_health"] == "/api/v1/health"
    assert payload["jobs"] == "/api/v1/identity-exploration/jobs"
    assert payload["web_search"] == "/api/v1/hushh-intelligence/web-search"


def test_health_endpoint_returns_ok() -> None:
    with TestClient(create_app()) as client:
        response = client.get("/api/v1/health")

    assert response.status_code == 200
    payload = response.json()

    assert payload["status"] == "ok"
    assert payload["environment"] == "development"
