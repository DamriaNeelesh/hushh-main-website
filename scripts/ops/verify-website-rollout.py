#!/usr/bin/env python3
"""Verify that the website Cloud Run service is serving the expected image and domains."""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
from typing import Iterable


def _run_json(command: list[str]) -> dict:
    result = subprocess.run(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"Command failed ({result.returncode}): {' '.join(command)}\n{result.stderr.strip()}"
        )
    try:
        payload = json.loads(result.stdout)
    except json.JSONDecodeError as exc:  # pragma: no cover - defensive
        raise RuntimeError(
            f"Command returned non-JSON output: {' '.join(command)}\n{result.stdout.strip()}"
        ) from exc
    if not isinstance(payload, dict):
        raise RuntimeError(f"Unexpected JSON payload for {' '.join(command)}")
    return payload


def _service_json(project: str, region: str, service: str) -> dict:
    return _run_json(
        [
            "gcloud",
            "run",
            "services",
            "describe",
            service,
            "--project",
            project,
            "--region",
            region,
            "--format=json",
        ]
    )


def _domain_json(project: str, region: str, domain: str) -> dict:
    return _run_json(
        [
            "gcloud",
            "beta",
            "run",
            "domain-mappings",
            "describe",
            "--project",
            project,
            "--region",
            region,
            "--domain",
            domain,
            "--format=json",
        ]
    )


def _condition_map(conditions: Iterable[dict]) -> dict[str, str]:
    out: dict[str, str] = {}
    for entry in conditions:
        if isinstance(entry, dict):
            condition_type = str(entry.get("type") or "").strip()
            status = str(entry.get("status") or "").strip()
            if condition_type:
                out[condition_type] = status
    return out


def _assert_service_rollout(service_json: dict, expected_image_tag: str) -> tuple[str, str]:
    container_image = (
        service_json.get("spec", {})
        .get("template", {})
        .get("spec", {})
        .get("containers", [{}])[0]
        .get("image")
    )
    latest_ready_revision = (
        service_json.get("status", {}).get("latestReadyRevisionName") or ""
    ).strip()
    traffic = service_json.get("status", {}).get("traffic", [])

    if not container_image or not isinstance(container_image, str):
        raise RuntimeError("Cloud Run service has no container image recorded.")

    if not latest_ready_revision:
        raise RuntimeError("Cloud Run service has no latest ready revision.")

    if not container_image.endswith(f":{expected_image_tag}"):
        raise RuntimeError(
            f"Expected service image tag '{expected_image_tag}', got '{container_image}'."
        )

    latest_ready_receives_all = any(
        isinstance(entry, dict)
        and str(entry.get("revisionName") or "").strip() == latest_ready_revision
        and int(entry.get("percent") or 0) == 100
        for entry in traffic
    )

    if not latest_ready_receives_all:
        raise RuntimeError(
            f"Latest ready revision '{latest_ready_revision}' is not receiving 100% of traffic."
        )

    return container_image, latest_ready_revision


def _assert_domain_ready(project: str, region: str, domain: str) -> None:
    domain_json = _domain_json(project, region, domain)
    conditions = _condition_map(domain_json.get("status", {}).get("conditions", []))

    for condition in ("Ready", "CertificateProvisioned", "DomainRoutable"):
        if conditions.get(condition) != "True":
            raise RuntimeError(
                f"Domain mapping '{domain}' is not ready: {condition}={conditions.get(condition, 'missing')}"
            )


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Verify website Cloud Run rollout and custom-domain readiness."
    )
    parser.add_argument("--project", required=True, help="GCP project id")
    parser.add_argument("--region", default="us-central1", help="Cloud Run region")
    parser.add_argument("--service", default="hushh-ai-website", help="Cloud Run service name")
    parser.add_argument(
        "--expected-image-tag",
        required=True,
        help="Expected image tag suffix, usually the 12-char commit SHA tag used in deploy.",
    )
    parser.add_argument(
        "--domain",
        action="append",
        default=[],
        help="Custom domain mapping that must be ready. Repeat for multiple domains.",
    )
    args = parser.parse_args()

    try:
        service_json = _service_json(args.project, args.region, args.service)
        image, revision = _assert_service_rollout(service_json, args.expected_image_tag)

        print(f"Verified Cloud Run image: {image}")
        print(f"Verified latest ready revision: {revision}")

        for domain in args.domain:
            _assert_domain_ready(args.project, args.region, domain)
            print(f"Verified domain mapping: {domain}")
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    print("Website rollout verification passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
