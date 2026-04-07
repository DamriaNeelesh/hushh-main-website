from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.config import Settings, get_settings
from app.core.container import AppContainer


def create_app(
    container: Optional[AppContainer] = None,
    settings: Optional[Settings] = None,
) -> FastAPI:
    resolved_settings = settings or get_settings()
    resolved_container = container or AppContainer.build(resolved_settings)

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        app.state.container = resolved_container
        resolved_container.startup()
        try:
            yield
        finally:
            resolved_container.shutdown()

    app = FastAPI(
        title=resolved_settings.app_name,
        version=resolved_settings.app_version,
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    if resolved_settings.allowed_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=list(resolved_settings.allowed_origins),
            allow_credentials="*" not in resolved_settings.allowed_origins,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    app.include_router(api_router, prefix=resolved_settings.api_v1_prefix)

    @app.get("/", tags=["meta"], summary="Service metadata")
    def read_root() -> dict:
        return {
            "service": resolved_settings.app_name,
            "environment": resolved_settings.app_env,
            "version": resolved_settings.app_version,
            "health": "/healthz",
            "api_health": f"{resolved_settings.api_v1_prefix}/health",
            "jobs": f"{resolved_settings.api_v1_prefix}/identity-exploration/jobs",
            "dossier": f"{resolved_settings.api_v1_prefix}/hushh-intelligence/dossier",
            "search": f"{resolved_settings.api_v1_prefix}/hushh-intelligence/search",
            "web_search": f"{resolved_settings.api_v1_prefix}/hushh-intelligence/web-search",
            "docs": "/docs",
        }

    @app.get("/healthz", include_in_schema=False)
    def read_healthz() -> dict:
        return {"status": "ok"}

    return app


app = create_app()
