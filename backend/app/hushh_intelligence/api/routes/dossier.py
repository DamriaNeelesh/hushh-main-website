from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_authenticated_caller, get_identity_job_service
from app.core.auth import AuthenticatedCaller
from app.hushh_intelligence.schemas.identity_exploration import (
    HushhIntelligenceDossierRequest,
    HushhIntelligenceDossierResponse,
)
from app.hushh_intelligence.services.identity_jobs import (
    IdentityJobIncompleteError,
    IdentityJobNotFoundError,
    IdentityJobService,
    ProcessingDependencyError,
)

router = APIRouter(prefix="/hushh-intelligence", tags=["hushh-intelligence"])


@router.post(
    "/dossier",
    response_model=HushhIntelligenceDossierResponse,
    summary="Build the first Hushh Intelligence dossier for a completed identity context",
)
def build_hushh_intelligence_dossier(
    payload: HushhIntelligenceDossierRequest,
    service: IdentityJobService = Depends(get_identity_job_service),
    caller: AuthenticatedCaller = Depends(get_authenticated_caller),
) -> HushhIntelligenceDossierResponse:
    del caller
    try:
        return service.dossier(payload)
    except IdentityJobNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found") from error
    except IdentityJobIncompleteError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Identity context is not ready yet") from error
    except ProcessingDependencyError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=error.message) from error
