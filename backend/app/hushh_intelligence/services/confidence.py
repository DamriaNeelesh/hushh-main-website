from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Optional

from app.core.enums import WarningCode


@dataclass(frozen=True)
class ConfidenceResult:
    score: int
    warnings: list[str]
    age_days: float


def compute_confidence(
    *,
    accuracy_meters: float,
    observed_at: datetime,
    now: Optional[datetime] = None,
    low_accuracy_warning_threshold_meters: float,
    low_confidence_threshold: int,
    stale_location_warning_days: int,
) -> ConfidenceResult:
    current_time = now or datetime.now(timezone.utc)
    observation_time = observed_at.astimezone(timezone.utc)

    accuracy_score = max(0.0, 100.0 - (accuracy_meters / 10.0))
    diff_days = abs((current_time - observation_time).total_seconds()) / 86400.0
    recency_score = max(0.0, 100.0 - (diff_days / 3.65))
    confidence_score = round((accuracy_score * 0.6) + (recency_score * 0.4))

    warnings: list[str] = []
    if accuracy_meters > low_accuracy_warning_threshold_meters:
        warnings.append(WarningCode.LOW_ACCURACY.value)
    if diff_days > stale_location_warning_days:
        warnings.append(WarningCode.STALE_LOCATION.value)
    if confidence_score < low_confidence_threshold:
        warnings.append(WarningCode.LOW_CONFIDENCE.value)

    return ConfidenceResult(
        score=max(0, min(100, confidence_score)),
        warnings=warnings,
        age_days=diff_days,
    )
