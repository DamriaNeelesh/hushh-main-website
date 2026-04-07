from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_authenticated_caller, get_identity_job_service
from app.core.auth import AuthenticatedCaller
from app.hushh_intelligence.schemas.identity_exploration import (
    HushhIntelligenceWebSearchRequest,
    HushhIntelligenceWebSearchResponse,
)
from app.hushh_intelligence.services.identity_jobs import (
    IdentityJobService,
    ProcessingDependencyError,
)

router = APIRouter(prefix="/hushh-intelligence", tags=["hushh-intelligence"])


@router.post(
    "/web-search",
    response_model=HushhIntelligenceWebSearchResponse,
    summary="Search the open web with Hushh Web Intelligence",
)
def search_web_intelligence(
    payload: HushhIntelligenceWebSearchRequest,
    service: IdentityJobService = Depends(get_identity_job_service),
    caller: AuthenticatedCaller = Depends(get_authenticated_caller),
) -> HushhIntelligenceWebSearchResponse:
    del caller
    try:
        return service.web_search(payload)
    except ProcessingDependencyError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=error.message) from error
