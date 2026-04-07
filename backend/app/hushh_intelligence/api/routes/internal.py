from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import (
    get_identity_job_service,
    get_internal_authenticated_caller,
)
from app.core.auth import AuthenticatedCaller
from app.hushh_intelligence.schemas.identity_exploration import (
    CleanupExpiredJobsResponse,
    WorkerTaskRequest,
    WorkerTaskResponse,
)
from app.hushh_intelligence.services.identity_jobs import (
    IdentityJobItemNotFoundError,
    IdentityJobService,
    RetryableWorkerError,
)

router = APIRouter(prefix="/internal/identity-exploration", tags=["identity-exploration-internal"])


@router.post(
    "/worker",
    response_model=WorkerTaskResponse,
    summary="Process one queued identity exploration item",
)
def process_identity_exploration_item(
    payload: WorkerTaskRequest,
    service: IdentityJobService = Depends(get_identity_job_service),
    caller: AuthenticatedCaller = Depends(get_internal_authenticated_caller),
) -> WorkerTaskResponse:
    del caller
    try:
        status_value = service.process_item(job_id=payload.job_id, item_id=payload.item_id)
        return WorkerTaskResponse(job_id=payload.job_id, item_id=payload.item_id, status=status_value)
    except IdentityJobItemNotFoundError as error:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job item not found") from error
    except RetryableWorkerError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=error.message) from error


@router.post(
    "/cleanup",
    response_model=CleanupExpiredJobsResponse,
    summary="Delete expired identity exploration jobs",
)
def cleanup_identity_exploration_jobs(
    service: IdentityJobService = Depends(get_identity_job_service),
    caller: AuthenticatedCaller = Depends(get_internal_authenticated_caller),
) -> CleanupExpiredJobsResponse:
    del caller
    return service.cleanup_expired_jobs()
