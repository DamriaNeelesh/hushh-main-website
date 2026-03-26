#!/usr/bin/env bash

normalize_runtime_profile() {
  case "${1:-}" in
    uat-remote|prod-remote)
      printf '%s\n' "$1"
      ;;
    *)
      return 1
      ;;
  esac
}

runtime_profile_source() {
  case "${1:-}" in
    uat-remote)
      printf '.env.uat-remote.local\n'
      ;;
    prod-remote)
      printf '.env.prod-remote.local\n'
      ;;
    *)
      return 1
      ;;
  esac
}

runtime_profile_description() {
  case "${1:-}" in
    uat-remote)
      printf 'Point local testing at the remote GCP UAT website dependencies.\n'
      ;;
    prod-remote)
      printf 'Point local testing at the remote production website dependencies.\n'
      ;;
    *)
      return 1
      ;;
  esac
}

