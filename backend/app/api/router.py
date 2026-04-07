from fastapi import APIRouter

from app.api.routes import health
from app.hushh_intelligence.api.routes import dossier, identity_exploration, internal, search, web_search

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(identity_exploration.router)
api_router.include_router(dossier.router)
api_router.include_router(search.router)
api_router.include_router(web_search.router)
api_router.include_router(internal.router)
