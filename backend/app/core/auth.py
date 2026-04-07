import hmac
from dataclasses import dataclass
from typing import Optional, Protocol

from fastapi import HTTPException, Request, status

from app.config import Settings


@dataclass(frozen=True)
class AuthenticatedCaller:
    subject: str
    email: Optional[str]
    issuer: Optional[str]


class AuthVerifier(Protocol):
    def verify(self, request: Request) -> AuthenticatedCaller:
        ...


class LocalAuthVerifier:
    def verify(self, request: Request) -> AuthenticatedCaller:
        return AuthenticatedCaller(
            subject="local-development",
            email="local@hushh.ai",
            issuer="local",
        )


class ApiKeyAuthVerifier:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        if not settings.auth_api_keys:
            raise RuntimeError("AUTH_API_KEYS is required for API key auth")

    def verify(self, request: Request) -> AuthenticatedCaller:
        header_names = [self._settings.auth_api_key_header]
        if self._settings.auth_api_key_header != "x-api-key":
            header_names.append("x-api-key")

        api_key = ""
        for header_name in header_names:
            api_key = request.headers.get(header_name, "").strip()
            if api_key:
                break

        if not api_key:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing API key",
            )

        for credential in self._settings.auth_api_keys:
            if hmac.compare_digest(api_key, credential.secret):
                return AuthenticatedCaller(
                    subject="api-key:" + credential.label,
                    email=None,
                    issuer="api-key",
                )

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key",
        )


class GoogleServiceAccountAuthVerifier:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    def verify(self, request: Request) -> AuthenticatedCaller:
        authorization = request.headers.get("authorization", "").strip()
        if not authorization.lower().startswith("bearer "):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing bearer token",
            )

        token = authorization.split(" ", 1)[1].strip()
        if not token:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Missing bearer token",
            )

        try:
            from google.auth.transport.requests import Request as GoogleAuthRequest
            from google.oauth2 import id_token
        except ImportError as error:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Google auth dependencies are not installed",
            ) from error

        try:
            claims = id_token.verify_token(
                token,
                GoogleAuthRequest(),
                audience=self._settings.auth_audience,
            )
        except Exception as error:  # pragma: no cover - depends on Google verifier
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid bearer token",
            ) from error

        email = claims.get("email")
        email_verified = claims.get("email_verified")
        if email and not email_verified:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Caller email is not verified",
            )

        allowed_emails = set(self._settings.allowed_caller_emails)
        if allowed_emails and email not in allowed_emails:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Caller is not allowed",
            )

        return AuthenticatedCaller(
            subject=str(claims.get("sub") or claims.get("azp") or "unknown"),
            email=email,
            issuer=claims.get("iss"),
        )


class CompositeAuthVerifier:
    def __init__(self, *verifiers: AuthVerifier) -> None:
        self._verifiers = verifiers

    def verify(self, request: Request) -> AuthenticatedCaller:
        last_error: Optional[HTTPException] = None
        for verifier in self._verifiers:
            try:
                return verifier.verify(request)
            except HTTPException as error:
                if error.status_code != status.HTTP_401_UNAUTHORIZED:
                    raise
                last_error = error

        if last_error is not None:
            raise last_error

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )
