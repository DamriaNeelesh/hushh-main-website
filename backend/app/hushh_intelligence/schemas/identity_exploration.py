from datetime import datetime
from enum import Enum
import re
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.core.enums import ItemStatus, JobStatus, WarningCode

EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class LocationInput(BaseModel):
    latitude: float
    longitude: float
    accuracy_meters: float = Field(ge=0)
    timestamp: datetime

    @field_validator("latitude")
    @classmethod
    def validate_latitude(cls, value: float) -> float:
        if value < -90 or value > 90:
            raise ValueError("latitude must be between -90 and 90")
        return value

    @field_validator("longitude")
    @classmethod
    def validate_longitude(cls, value: float) -> float:
        if value < -180 or value > 180:
            raise ValueError("longitude must be between -180 and 180")
        return value


class IdentityExplorationInput(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    email: str = Field(min_length=3, max_length=320)
    location: LocationInput

    @field_validator("email")
    @classmethod
    def validate_email(cls, value: str) -> str:
        if not EMAIL_PATTERN.match(value):
            raise ValueError("email must be a valid email address")
        return value


class CreateIdentityExplorationJobRequest(BaseModel):
    items: list[IdentityExplorationInput] = Field(min_length=1, max_length=10)


class AddressResult(BaseModel):
    formatted_address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = None
    place_id: Optional[str] = None


class SourceReference(BaseModel):
    title: str
    uri: str
    snippet: Optional[str] = None
    source_type: str
    confidence: Optional[float] = Field(default=None, ge=0, le=1)


class ProfileCollections(BaseModel):
    linkedin: list[SourceReference] = Field(default_factory=list)
    github: list[SourceReference] = Field(default_factory=list)
    websites: list[SourceReference] = Field(default_factory=list)
    socials: list[SourceReference] = Field(default_factory=list)
    mentions: list[SourceReference] = Field(default_factory=list)


class DigitalFootprintReport(BaseModel):
    identity_match_summary: str
    professional_background: str
    digital_presence: str
    location_context: Optional[str] = None
    notable_public_mentions: list[str] = Field(default_factory=list)
    reasoning: str
    source_count: Optional[int] = Field(default=None, ge=0)


class StructuredIdentitySynthesis(BaseModel):
    summary: str
    profiles: ProfileCollections
    report: DigitalFootprintReport
    warnings: list[str] = Field(default_factory=list)


class GroundingChunk(BaseModel):
    title: str
    uri: str
    source_type: str


class PassiveDnsRecord(BaseModel):
    record_type: str
    values: list[str] = Field(default_factory=list)


class DomainAgeSignal(BaseModel):
    domain: str
    created_at: Optional[datetime] = None
    registrar: Optional[str] = None
    age_days: Optional[int] = Field(default=None, ge=0)


class GeoContextSignal(BaseModel):
    label: str
    source: str


class EmailDomainIntelligence(BaseModel):
    normalized_email: str
    domain: str
    syntax_valid: bool
    free_provider: bool
    role_account: bool
    mx_records: list[str] = Field(default_factory=list)
    dns_records: list[PassiveDnsRecord] = Field(default_factory=list)
    domain_age: Optional[DomainAgeSignal] = None


class WebsiteIntelligence(BaseModel):
    domain: str
    url: str
    title: Optional[str] = None
    generator: Optional[str] = None
    cms: Optional[str] = None
    subdomains: list[str] = Field(default_factory=list)
    ip_addresses: list[str] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)


class OsintIntelligence(BaseModel):
    email_domain_intelligence: Optional[EmailDomainIntelligence] = None
    website_intelligence: list[WebsiteIntelligence] = Field(default_factory=list)
    domain_age: list[DomainAgeSignal] = Field(default_factory=list)
    passive_dns: list[PassiveDnsRecord] = Field(default_factory=list)
    geo_context: list[GeoContextSignal] = Field(default_factory=list)


class IdentityExplorationResult(BaseModel):
    address: AddressResult
    confidence_score: int = Field(ge=0, le=100)
    summary: str
    profiles: ProfileCollections
    report: DigitalFootprintReport
    grounding_chunks: list[GroundingChunk] = Field(default_factory=list)
    osint: Optional[OsintIntelligence] = None
    warnings: list[str] = Field(default_factory=list)


class ItemError(BaseModel):
    code: str
    message: str
    retryable: bool


class IdentityExplorationJobItemResponse(BaseModel):
    item_id: str
    item_index: int
    name: str
    email: str
    status: ItemStatus
    attempts: int
    max_attempts: int
    updated_at: datetime
    result: Optional[IdentityExplorationResult] = None
    error: Optional[ItemError] = None


class CreateIdentityExplorationJobResponse(BaseModel):
    job_id: str
    status: JobStatus
    submitted_count: int
    created_at: datetime
    expires_at: datetime


class IdentityExplorationJobResponse(BaseModel):
    job_id: str
    status: JobStatus
    submitted_count: int
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    items: list[IdentityExplorationJobItemResponse]


class WorkerTaskRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    job_id: str
    item_id: str


class CleanupExpiredJobsResponse(BaseModel):
    deleted_jobs: int
    deleted_items: int
    requested_at: datetime


class WorkerTaskResponse(BaseModel):
    job_id: str
    item_id: str
    status: ItemStatus


class SearchIntent(str, Enum):
    GENERAL = "general"
    PROFESSIONAL = "professional"
    SOCIAL = "social"
    REPUTATION = "reputation"
    LOCAL = "local"
    DOMAIN_INVESTIGATION = "domain-investigation"


class SearchSuggestion(BaseModel):
    label: str
    query: str


class SearchHistoryTurn(BaseModel):
    query: str = Field(min_length=1, max_length=500)
    summary: str = Field(min_length=1, max_length=1500)


class ProofPoint(BaseModel):
    claim: str
    evidence: str
    citations: list[str] = Field(default_factory=list)


class ActionCard(BaseModel):
    title: str
    description: str
    query: Optional[str] = None


class WebSearchExpansion(BaseModel):
    search_objective: str
    answer_angle: str
    expanded_queries: list[str] = Field(default_factory=list, min_length=1, max_length=5)


class SearchImpactSnapshot(BaseModel):
    headline: str
    bullet_points: list[str] = Field(default_factory=list)
    notable_domains: list[str] = Field(default_factory=list)
    public_profile_count: int = Field(default=0, ge=0)


class OsintCard(BaseModel):
    key: str
    title: str
    summary: str
    items: list[str] = Field(default_factory=list)
    confidence: Optional[int] = Field(default=None, ge=0, le=100)


class DossierIdentitySnapshot(BaseModel):
    name: str
    email: str
    formatted_address: Optional[str] = None
    location_context: str
    notable_domains: list[str] = Field(default_factory=list)
    public_profile_count: int = Field(default=0, ge=0)


class DossierSection(BaseModel):
    summary: str
    bullet_points: list[str] = Field(default_factory=list)


class StructuredDossierSynthesis(BaseModel):
    headline: str
    executive_summary: str
    identity_snapshot: DossierIdentitySnapshot
    professional_presence: DossierSection
    digital_footprint: DossierSection
    reputation_signals: DossierSection
    regional_context: DossierSection
    suggestions: list[SearchSuggestion] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    confidence: int = Field(ge=0, le=100)


class StructuredSearchSynthesis(BaseModel):
    answer: str
    summary: str
    proof_points: list[ProofPoint] = Field(default_factory=list)
    action_cards: list[ActionCard] = Field(default_factory=list)
    suggestions: list[SearchSuggestion] = Field(default_factory=list)
    impact_snapshot: Optional[SearchImpactSnapshot] = None
    warnings: list[str] = Field(default_factory=list)
    confidence: int = Field(ge=0, le=100)


class HushhIntelligenceSearchRequest(BaseModel):
    job_id: str
    query: str = Field(min_length=1, max_length=500)
    intent: SearchIntent = SearchIntent.GENERAL
    history: list[SearchHistoryTurn] = Field(default_factory=list, max_length=8)


class HushhIntelligenceDossierRequest(BaseModel):
    job_id: str


class HushhIntelligenceWebSearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=500)
    intent: SearchIntent = SearchIntent.GENERAL
    history: list[SearchHistoryTurn] = Field(default_factory=list, max_length=8)


class HushhIntelligenceDossierResponse(BaseModel):
    job_id: str
    headline: str
    executive_summary: str
    identity_snapshot: DossierIdentitySnapshot
    professional_presence: DossierSection
    digital_footprint: DossierSection
    reputation_signals: DossierSection
    regional_context: DossierSection
    osint_cards: list[OsintCard] = Field(default_factory=list)
    sources: list[GroundingChunk] = Field(default_factory=list)
    suggestions: list[SearchSuggestion] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    confidence: int = Field(ge=0, le=100)


class HushhIntelligenceSearchResponse(BaseModel):
    job_id: str
    intent: SearchIntent
    answer: str
    summary: str
    sources: list[GroundingChunk] = Field(default_factory=list)
    proof_points: list[ProofPoint] = Field(default_factory=list)
    action_cards: list[ActionCard] = Field(default_factory=list)
    suggestions: list[SearchSuggestion] = Field(default_factory=list)
    impact_snapshot: Optional[SearchImpactSnapshot] = None
    osint_cards: list[OsintCard] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    confidence: int = Field(ge=0, le=100)


class HushhIntelligenceWebSearchResponse(BaseModel):
    intent: SearchIntent
    answer: str
    summary: str
    sources: list[GroundingChunk] = Field(default_factory=list)
    proof_points: list[ProofPoint] = Field(default_factory=list)
    action_cards: list[ActionCard] = Field(default_factory=list)
    suggestions: list[SearchSuggestion] = Field(default_factory=list)
    warnings: list[str] = Field(default_factory=list)
    confidence: int = Field(ge=0, le=100)


class SerializedJob(BaseModel):
    model_config = ConfigDict(extra="forbid")

    job_id: str
    status: str
    submitted_count: int
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    items: list[dict[str, Any]]


def normalize_warning_codes(warnings: list[str]) -> list[str]:
    normalized: list[str] = []
    seen: set[str] = set()
    aliases = {
        "no_public_match": WarningCode.NO_MATCH.value,
        "no_match_found": WarningCode.NO_MATCH.value,
        "ambiguous": WarningCode.AMBIGUOUS_MATCH.value,
    }
    allowed = {entry.value for entry in WarningCode}

    for warning in warnings:
        value = aliases.get(warning, warning)
        if value not in allowed:
            continue
        if value in seen:
            continue
        seen.add(value)
        normalized.append(value)
    return normalized


class StructuredJobState(BaseModel):
    model_config = ConfigDict(extra="ignore")

    job_id: str
    status: JobStatus
    submitted_count: int
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    items: list[IdentityExplorationJobItemResponse]

    @model_validator(mode="after")
    def sort_items(self) -> "StructuredJobState":
        self.items = sorted(self.items, key=lambda item: item.item_index)
        return self
