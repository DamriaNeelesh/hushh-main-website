import json

from app.config import Settings
from app.services.task_queue import TaskQueue, WorkerTaskPayload


class CloudTasksQueue(TaskQueue):
    def __init__(self, settings: Settings) -> None:
        self._settings = settings

        if not settings.task_queue_project or not settings.task_queue_name:
            raise RuntimeError("Cloud Tasks queue settings are incomplete")
        if not settings.worker_target_url or not settings.task_queue_service_account_email:
            raise RuntimeError("Worker target URL and task service account are required")

        try:
            from google.cloud import tasks_v2
        except ImportError as error:
            raise RuntimeError("google-cloud-tasks is not installed") from error

        self._tasks_v2 = tasks_v2
        self._client = tasks_v2.CloudTasksClient()

    def enqueue_identity_item(self, payload: WorkerTaskPayload) -> None:
        from google.protobuf import duration_pb2

        parent = self._client.queue_path(
            self._settings.task_queue_project,
            self._settings.task_queue_location,
            self._settings.task_queue_name,
        )

        body = json.dumps(
            {"job_id": payload.job_id, "item_id": payload.item_id},
            separators=(",", ":"),
        ).encode("utf-8")

        oidc_token = self._tasks_v2.OidcToken(
            service_account_email=self._settings.task_queue_service_account_email,
            audience=self._settings.worker_audience or self._settings.auth_audience,
        )

        task = self._tasks_v2.Task(
            http_request=self._tasks_v2.HttpRequest(
                http_method=self._tasks_v2.HttpMethod.POST,
                url=self._settings.worker_target_url,
                headers={"Content-Type": "application/json"},
                body=body,
                oidc_token=oidc_token,
            ),
            dispatch_deadline=duration_pb2.Duration(
                seconds=self._settings.task_dispatch_deadline_seconds
            ),
        )

        self._client.create_task(parent=parent, task=task)

    def close(self) -> None:
        close = getattr(self._client, "close", None)
        if callable(close):
            close()
