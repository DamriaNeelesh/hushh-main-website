from fastapi import Depends, Request

from app.core.auth import AuthenticatedCaller
from app.core.container import AppContainer
from app.hushh_intelligence.services.identity_jobs import IdentityJobService


def get_container(request: Request) -> AppContainer:
    return request.app.state.container


def get_identity_job_service(
    container: AppContainer = Depends(get_container),
) -> IdentityJobService:
    return container.identity_jobs


def get_authenticated_caller(
    request: Request,
    container: AppContainer = Depends(get_container),
) -> AuthenticatedCaller:
    return container.public_auth_verifier.verify(request)


def get_internal_authenticated_caller(
    request: Request,
    container: AppContainer = Depends(get_container),
) -> AuthenticatedCaller:
    return container.internal_auth_verifier.verify(request)
