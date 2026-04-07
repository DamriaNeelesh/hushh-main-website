from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any, Optional
from uuid import uuid4

from sqlalchemy import select
from sqlalchemy.orm import joinedload

from app.core.database import DatabaseManager
from app.core.enums import ItemStatus, JobStatus
from app.db.models import IdentityJob, IdentityJobItem


@dataclass(frozen=True)
class ItemRecord:
    item_id: str
    job_id: str
    item_index: int
    name: str
    email: str
    latitude: float
    longitude: float
    accuracy_meters: float
    observed_at: datetime
    status: str
    attempts: int
    max_attempts: int
    warnings: list[str]
    result: Optional[dict[str, Any]]
    error: Optional[dict[str, Any]]
    queued_at: datetime
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    updated_at: datetime
    expires_at: datetime


@dataclass(frozen=True)
class JobRecord:
    job_id: str
    status: str
    submitted_count: int
    submitted_by: Optional[str]
    created_at: datetime
    updated_at: datetime
    expires_at: datetime
    items: list[ItemRecord]


class IdentityJobRepository:
    def __init__(self, database: DatabaseManager) -> None:
        self._database = database

    def create_job(
        self,
        *,
        items: list[dict],
        submitted_by: Optional[str],
        expires_at: datetime,
        max_attempts: int,
    ) -> JobRecord:
        now = datetime.now(timezone.utc)
        job = IdentityJob(
            job_id=str(uuid4()),
            status=JobStatus.QUEUED.value,
            submitted_count=len(items),
            submitted_by=submitted_by,
            created_at=now,
            updated_at=now,
            expires_at=expires_at,
        )

        for index, item in enumerate(items):
            job.items.append(
                IdentityJobItem(
                    item_id=str(uuid4()),
                    item_index=index,
                    name=item["name"],
                    email=item["email"],
                    latitude=item["latitude"],
                    longitude=item["longitude"],
                    accuracy_meters=item["accuracy_meters"],
                    observed_at=item["observed_at"],
                    status=ItemStatus.QUEUED.value,
                    attempts=0,
                    max_attempts=max_attempts,
                    warnings_json=[],
                    result_json=None,
                    error_json=None,
                    queued_at=now,
                    started_at=None,
                    completed_at=None,
                    updated_at=now,
                    expires_at=expires_at,
                    last_error_message=None,
                )
            )

        with self._database.session() as session:
            session.add(job)
            session.flush()
            session.refresh(job)
            return self._to_job_record(job)

    def get_job(self, job_id: str) -> Optional[JobRecord]:
        with self._database.session() as session:
            statement = (
                select(IdentityJob)
                .options(joinedload(IdentityJob.items))
                .where(IdentityJob.job_id == job_id)
            )
            job = session.execute(statement).unique().scalar_one_or_none()
            if job is None:
                return None
            return self._to_job_record(job)

    def get_item(self, item_id: str) -> Optional[ItemRecord]:
        with self._database.session() as session:
            item = session.get(IdentityJobItem, item_id)
            if item is None:
                return None
            return self._to_item_record(item)

    def mark_item_processing(self, job_id: str, item_id: str) -> Optional[ItemRecord]:
        now = datetime.now(timezone.utc)
        with self._database.session() as session:
            item = session.get(IdentityJobItem, item_id)
            if item is None or item.job_id != job_id:
                return None
            if item.status in {ItemStatus.COMPLETED.value, ItemStatus.FAILED.value}:
                return self._to_item_record(item)

            item.status = ItemStatus.PROCESSING.value
            item.attempts += 1
            item.started_at = now
            item.updated_at = now
            item.job.updated_at = now
            item.job.status = JobStatus.PROCESSING.value
            session.add(item)
            session.add(item.job)
            session.flush()
            return self._to_item_record(item)

    def mark_item_retry_pending(
        self,
        *,
        item_id: str,
        error: dict,
    ) -> Optional[ItemRecord]:
        now = datetime.now(timezone.utc)
        with self._database.session() as session:
            item = session.get(IdentityJobItem, item_id)
            if item is None:
                return None

            item.status = ItemStatus.QUEUED.value
            item.error_json = error
            item.last_error_message = str(error.get("message") or "")
            item.updated_at = now
            item.job.updated_at = now
            item.job.status = JobStatus.PROCESSING.value
            session.add(item)
            session.add(item.job)
            session.flush()
            return self._to_item_record(item)

    def mark_item_completed(
        self,
        *,
        item_id: str,
        warnings: list[str],
        result: dict,
    ) -> Optional[JobRecord]:
        now = datetime.now(timezone.utc)
        with self._database.session() as session:
            item = session.get(IdentityJobItem, item_id)
            if item is None:
                return None

            item.status = ItemStatus.COMPLETED.value
            item.warnings_json = warnings
            item.result_json = result
            item.error_json = None
            item.last_error_message = None
            item.completed_at = now
            item.updated_at = now
            item.job.updated_at = now
            self._refresh_job_status(item.job)
            session.add(item)
            session.add(item.job)
            session.flush()

            statement = (
                select(IdentityJob)
                .options(joinedload(IdentityJob.items))
                .where(IdentityJob.job_id == item.job_id)
            )
            job = session.execute(statement).unique().scalar_one()
            return self._to_job_record(job)

    def mark_item_failed(
        self,
        *,
        item_id: str,
        error: dict,
    ) -> Optional[JobRecord]:
        now = datetime.now(timezone.utc)
        with self._database.session() as session:
            item = session.get(IdentityJobItem, item_id)
            if item is None:
                return None

            item.status = ItemStatus.FAILED.value
            item.error_json = error
            item.last_error_message = str(error.get("message") or "")
            item.completed_at = now
            item.updated_at = now
            item.job.updated_at = now
            self._refresh_job_status(item.job)
            session.add(item)
            session.add(item.job)
            session.flush()

            statement = (
                select(IdentityJob)
                .options(joinedload(IdentityJob.items))
                .where(IdentityJob.job_id == item.job_id)
            )
            job = session.execute(statement).unique().scalar_one()
            return self._to_job_record(job)

    def mark_job_dispatch_failed(self, job_id: str, error: dict) -> Optional[JobRecord]:
        now = datetime.now(timezone.utc)
        with self._database.session() as session:
            statement = (
                select(IdentityJob)
                .options(joinedload(IdentityJob.items))
                .where(IdentityJob.job_id == job_id)
            )
            job = session.execute(statement).unique().scalar_one_or_none()
            if job is None:
                return None

            job.status = JobStatus.FAILED.value
            job.updated_at = now
            for item in job.items:
                if item.status == ItemStatus.COMPLETED.value:
                    continue
                item.status = ItemStatus.FAILED.value
                item.error_json = error
                item.last_error_message = str(error.get("message") or "")
                item.completed_at = now
                item.updated_at = now

            session.add(job)
            session.flush()
            return self._to_job_record(job)

    def delete_expired_jobs(self, *, now: datetime, limit: int) -> dict[str, int]:
        with self._database.session() as session:
            statement = (
                select(IdentityJob)
                .options(joinedload(IdentityJob.items))
                .where(IdentityJob.expires_at < now)
                .order_by(IdentityJob.expires_at.asc())
                .limit(limit)
            )
            jobs = list(session.execute(statement).unique().scalars().all())
            deleted_jobs = len(jobs)
            deleted_items = sum(len(job.items) for job in jobs)

            for job in jobs:
                session.delete(job)

            return {"deleted_jobs": deleted_jobs, "deleted_items": deleted_items}

    @staticmethod
    def _refresh_job_status(job: IdentityJob) -> None:
        statuses = [item.status for item in job.items]
        if statuses and all(status == ItemStatus.COMPLETED.value for status in statuses):
            job.status = JobStatus.COMPLETED.value
            return

        if statuses and all(status == ItemStatus.FAILED.value for status in statuses):
            job.status = JobStatus.FAILED.value
            return

        if any(status in {ItemStatus.PROCESSING.value, ItemStatus.QUEUED.value} for status in statuses):
            if any(item.attempts > 0 for item in job.items):
                job.status = JobStatus.PROCESSING.value
            else:
                job.status = JobStatus.QUEUED.value
            return

        if any(status == ItemStatus.COMPLETED.value for status in statuses) and any(
            status == ItemStatus.FAILED.value for status in statuses
        ):
            job.status = JobStatus.PARTIAL_FAILURE.value
            return

        job.status = JobStatus.PROCESSING.value

    @staticmethod
    def _to_job_record(job: IdentityJob) -> JobRecord:
        return JobRecord(
            job_id=job.job_id,
            status=job.status,
            submitted_count=job.submitted_count,
            submitted_by=job.submitted_by,
            created_at=job.created_at,
            updated_at=job.updated_at,
            expires_at=job.expires_at,
            items=[IdentityJobRepository._to_item_record(item) for item in sorted(job.items, key=lambda entry: entry.item_index)],
        )

    @staticmethod
    def _to_item_record(item: IdentityJobItem) -> ItemRecord:
        return ItemRecord(
            item_id=item.item_id,
            job_id=item.job_id,
            item_index=item.item_index,
            name=item.name,
            email=item.email,
            latitude=item.latitude,
            longitude=item.longitude,
            accuracy_meters=item.accuracy_meters,
            observed_at=item.observed_at,
            status=item.status,
            attempts=item.attempts,
            max_attempts=item.max_attempts,
            warnings=list(item.warnings_json or []),
            result=item.result_json,
            error=item.error_json,
            queued_at=item.queued_at,
            started_at=item.started_at,
            completed_at=item.completed_at,
            updated_at=item.updated_at,
            expires_at=item.expires_at,
        )
