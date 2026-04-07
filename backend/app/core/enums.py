from enum import Enum


class _StringEnum(str, Enum):
    pass


class JobStatus(_StringEnum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    PARTIAL_FAILURE = "partial_failure"
    FAILED = "failed"


class ItemStatus(_StringEnum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class WarningCode(_StringEnum):
    AMBIGUOUS_MATCH = "ambiguous_match"
    LOW_CONFIDENCE = "low_confidence"
    NO_MATCH = "no_match"
    STALE_LOCATION = "stale_location"
    LOW_ACCURACY = "low_accuracy"
    NO_ADDRESS_MATCH = "no_address_match"
