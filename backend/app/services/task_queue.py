from dataclasses import dataclass
from typing import Protocol


@dataclass(frozen=True)
class WorkerTaskPayload:
    job_id: str
    item_id: str


class TaskQueue(Protocol):
    def enqueue_identity_item(self, payload: WorkerTaskPayload) -> None:
        ...

    def close(self) -> None:
        ...


class DisabledTaskQueue:
    def enqueue_identity_item(self, payload: WorkerTaskPayload) -> None:
        raise RuntimeError("Task queue is not configured")

    def close(self) -> None:
        return None
