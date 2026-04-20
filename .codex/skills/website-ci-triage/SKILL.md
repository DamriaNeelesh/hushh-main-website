---
name: website-ci-triage
description: Diagnose hushh.ai website CI failures across typecheck, lint, tests, build, audits, dependency audit, and deploy-verification scripts. Use when Codex needs to reproduce a failing CI job, classify the breakage, identify the smallest safe fix, or summarize remaining release risk for this repository.
---

# Website CI Triage

Use this skill when the repo's curated checks fail locally or in CI.

## Sources of truth

- Read `references/ci-sources.md` before proposing new validation steps.
- Reuse the repo's existing checks rather than inventing parallel gates.

## Workflow

1. Reproduce the failing command locally.
2. Classify the failure:
   - editor-time: `typecheck`, `lint`, `test`
   - build-time: `npm run build`
   - audit-time: route, shell, SEO, security, docs, brand, OAuth, dependency audit
   - deploy-time: rollout verification, env parity, smoke checks
3. Identify whether the issue is a code defect, route contract mismatch, dependency regression, or workflow/docs drift.
4. Prefer the narrowest fix that restores the repo's curated checks.
5. When summarizing findings, report the exact command that failed and the release impact.

## Constraints

- The CI orchestrator and audit scripts are the baseline. Keep them authoritative.
- Call out production blockers first, especially build failures and high/critical dependency findings.
