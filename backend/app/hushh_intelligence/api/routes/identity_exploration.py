from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_authenticated_caller, get_identity_job_service
from app.core.auth import AuthenticatedCaller
from app.hushh_intelligence.schemas.identity_exploration import (
    CreateIdentityExplorationJobRequest,
    CreateIdentityExplorationJobResponse,
    IdentityExplorationJobResponse,
)
from app.hushh_intelligence.services.identity_jobs import (
    IdentityJobNotFoundError,
    IdentityJobService,
    ProcessingDependencyError,
)

router = APIRouter(prefix="/identity-exploration", tags=["identity-exploration"])


@router.post(
    "/jobs",
    response_model=CreateIdentityExplorationJobResponse,
    status_code=status.HTTP_202_ACCEPTED,
    summary="Create an async identity exploration job",
)
def create_identity_exploration_job(
    payload: CreateIdentityExplorationJobRequest,
    service: IdentityJobService = Depends(get_identity_job_service),
    caller: AuthenticatedCaller = Depends(get_authenticated_caller),
) -> CreateIdentityExplorationJobResponse:
    try:
        return service.create_job(payload, submitted_by=caller.email)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(error)) from error
    except ProcessingDependencyError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=error.message) from error


@router.get(
    "/jobs/{job_id}",
    response_model=IdentityExplorationJobResponse,
    summary="Get async identity exploration job status",
)
def get_identity_exploration_job(
    job_id: str,
    service: IdentityJobService = Depends(get_identity_job_service),
    caller: AuthenticatedCaller = Depends(get_authenticated_caller),
) -> IdentityExplorationJobResponse:
    del caller
    try:
        return service.get_job(job_id)
    except IdentityJobNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found") from error
