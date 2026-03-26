#!/usr/bin/env python3
"""Verify deploy-time secret and runtime env parity for the Hushh.ai website."""

from __future__ import annotations

import argparse
import json
import subprocess
from typing import Iterable

REQUIRED_SECRETS = (
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_HUSHH_API_BASE_URL",
    "NEXT_PUBLIC_HUSHH_API_ANON_KEY",
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
    "NEXT_PUBLIC_FIREBASE_VAPID_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_DEVELOPER_APP_URL",
    "NEXT_PUBLIC_DEVELOPER_API_URL",
    "NEXT_PUBLIC_DEVELOPER_MCP_URL",
    "NEXT_PUBLIC_BACKEND_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "HUSHH_API_BASE_URL",
    "FIREBASE_SERVICE_ACCOUNT_JSON",
    "FIREBASE_AUTH_SERVICE_ACCOUNT_JSON",
)

RUNTIME_REQUIRED = (
    "NEXT_PUBLIC_SITE_URL",
    "NEXT_PUBLIC_HUSHH_API_BASE_URL",
    "NEXT_PUBLIC_HUSHH_API_ANON_KEY",
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_DEVELOPER_APP_URL",
    "NEXT_PUBLIC_DEVELOPER_API_URL",
    "NEXT_PUBLIC_DEVELOPER_MCP_URL",
    "NEXT_PUBLIC_BACKEND_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "HUSHH_API_BASE_URL",
    "FIREBASE_SERVICE_ACCOUNT_JSON",
    "FIREBASE_AUTH_SERVICE_ACCOUNT_JSON",
)


def _format_names(names: Iterable[str]) -> str:
    return ", ".join(sorted(names))


def _has_secret(project: str, name: str) -> bool:
    result = subprocess.run(
        [
            "gcloud",
            "secrets",
            "describe",
            name,
            "--project",
            project,
            "--format=value(name)",
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        text=True,
    )
    return result.returncode == 0 and bool(result.stdout.strip())


def _describe_run_service(project: str, region: str, service: str) -> dict | None:
    result = subprocess.run(
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
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    if result.returncode != 0:
        return None

    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        return None


def _container_env_map(service_json: dict | None) -> dict[str, dict]:
    if not isinstance(service_json, dict):
        return {}

    containers = (
        service_json.get("spec", {})
        .get("template", {})
        .get("spec", {})
        .get("containers", [])
    )
    if not containers or not isinstance(containers[0], dict):
        return {}

    env_entries = containers[0].get("env", [])
    out: dict[str, dict] = {}
    for entry in env_entries:
        if isinstance(entry, dict) and entry.get("name"):
            out[str(entry["name"])] = entry
    return out


def _runtime_source_label(entry: dict) -> str:
    value_from = entry.get("valueFrom")
    if isinstance(value_from, dict):
        secret_ref = value_from.get("secretKeyRef")
        if isinstance(secret_ref, dict):
            name = str(secret_ref.get("name") or "").strip()
            key = str(secret_ref.get("key") or "").strip()
            if name:
                return f"secret:{name}:{key or 'latest'}"
    value = str(entry.get("value") or "").strip()
    return f"value:{value}" if value else "missing"


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify website GCP Secret Manager and Cloud Run env parity.")
    parser.add_argument("--project", required=True, help="GCP project id")
    parser.add_argument("--region", default="us-central1", help="Cloud Run region")
    parser.add_argument("--frontend-service", default="hushh-ai-website", help="Cloud Run frontend service name")
    parser.add_argument(
        "--assert-runtime-env-contract",
        action="store_true",
        help="Also verify Cloud Run runtime env injection for the hosted website.",
    )
    args = parser.parse_args()

    missing = [name for name in REQUIRED_SECRETS if not _has_secret(args.project, name)]

    print(f"Project: {args.project}")
    print(f"Required website secrets ({len(REQUIRED_SECRETS)}): {_format_names(REQUIRED_SECRETS)}")

    if missing:
        print(f"Missing secrets ({len(missing)}): {_format_names(missing)}")
        return 1

    if args.assert_runtime_env_contract:
        service_json = _describe_run_service(args.project, args.region, args.frontend_service)
        env_map = _container_env_map(service_json)
        runtime_failures: list[str] = []

        for key in RUNTIME_REQUIRED:
            if key not in env_map:
                runtime_failures.append(f"frontend runtime env missing {key}")

        for key in ("NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_DEVELOPER_API_URL", "NEXT_PUBLIC_BACKEND_URL", "HUSHH_API_BASE_URL"):
            label = _runtime_source_label(env_map.get(key, {}))
            if label.startswith("value:") and "localhost" in label:
                runtime_failures.append(f"{key} must not resolve to localhost in Cloud Run")

        print("Website runtime env contract:")
        for key in sorted(RUNTIME_REQUIRED):
            print(f"  {key}={_runtime_source_label(env_map.get(key, {}))}")

        if runtime_failures:
            print(f"Runtime env contract failures ({len(runtime_failures)}): {_format_names(runtime_failures)}")
            return 1

    print(f"All required website secrets present ({len(REQUIRED_SECRETS)}).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
