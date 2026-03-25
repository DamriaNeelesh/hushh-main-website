import Callout from "../../app/_components/developerDocs/Callout";
import Steps from "../../app/_components/developerDocs/Steps";
import {
  CONSENT_FLOW_STEPS,
  buildMcpSnippets,
  buildRestSnippets,
} from "../../lib/developers/content";
import { resolveDeveloperRuntime } from "../../lib/developers/runtime";

const runtime = resolveDeveloperRuntime();
const restSnippets = buildRestSnippets(runtime);
const mcpSnippets = buildMcpSnippets(runtime);

const runtimeRows = [
  [
    "Kai app",
    runtime.appUrl,
    "User-facing consent review surface and the safe place to complete approval.",
  ],
  [
    "REST base",
    runtime.apiBaseUrl,
    "Discovery, consent creation, and consent status polling for backend integrations.",
  ],
  [
    "Remote MCP",
    runtime.mcpUrl,
    "Tool-native runtime for hosts that support HTTP MCP directly.",
  ],
  [
    "npm bridge",
    runtime.npmPackage,
    "Fallback launcher for hosts that still need a local stdio MCP process.",
  ],
];

const pkmRows = [
  [
    "pkm_index",
    "Fast discovery of available domains, freshness, summary projection, and capability flags.",
  ],
  [
    "pkm_blobs",
    "Encrypted PKM payload storage keyed by user, domain, segment, and revision metadata.",
  ],
  [
    "pkm_manifests",
    "Manifest-level versioning and packaging for the slices Kai can expose.",
  ],
  [
    "pkm_manifest_paths",
    "Path-level mapping between manifests and the attributes a scope can reveal.",
  ],
  [
    "pkm_scope_registry",
    "Canonical scope handles, labels, segment ids, and exposure state for discovery.",
  ],
  [
    "pkm_events",
    "Runtime event history for PKM changes, useful when explaining freshness and sequencing.",
  ],
  [
    "pkm_migration_state",
    "Migration checkpointing for the PKM runtime during cutovers and backfills.",
  ],
];

const sharedTableRows = [
  [
    "consent_audit, consent_exports, consent_scope_templates",
    "Record consent requests, export state, and reusable approval templates.",
  ],
  [
    "developer_applications, developer_apps, developer_tokens",
    "Define app identity, runtime enrollment, and the token state your integration depends on.",
  ],
  [
    "vault_key_wrappers, vault_keys",
    "Track wrapping state, onboarding readiness, and whether exports can be returned safely.",
  ],
  [
    "runtime_persona_state",
    "Stores the active runtime posture that explains persona-specific behavior and readiness.",
  ],
  [
    "kai_plaid_items, kai_plaid_link_sessions, kai_plaid_refresh_runs",
    "Optional Kai financial context and refresh lifecycle records that shape available financial scopes.",
  ],
  [
    "domain_registry, actor_profiles, marketplace_public_profiles",
    "Shared registry and actor metadata that explain how scopes and app identity are presented.",
  ],
];

const legacyRows = [
  ["legacy encrypted blob table", "Bounded cutover only. Do not target for new writes."],
  ["legacy metadata index table", "Compatibility surface retained during migration only."],
];

const columnSnapshotRows = [
  [
    "pkm_index",
    "available_domains, domain_freshness, summary_projection, capability_flags, total_attributes",
    "Explains what a user can approve right now and how fresh the PKM surface is.",
  ],
  [
    "pkm_scope_registry",
    "scope_handle, scope_label, segment_ids, sensitivity_tier, exposure_enabled",
    "Drives scope discovery, approval labeling, and whether a scope can be exposed at all.",
  ],
  [
    "pkm_blobs",
    "domain, segment_id, ciphertext, content_revision, manifest_revision, size_bytes",
    "Shows how approved reads map to encrypted segments and why revision tracking matters.",
  ],
  [
    "vault_keys",
    "primary_wrapper_id, vault_status, first_login_at, last_login_at, pre_onboarding_completed",
    "Tells you whether vault wrapping and onboarding state are ready for export and approval.",
  ],
];

const boundaryRows = [
  [
    "GET /api/v1/user-scopes/{user_id}",
    "Backend or server-side only",
    "Discovery depends on a developer token and should stay off the public browser path.",
  ],
  [
    "POST /api/v1/request-consent",
    "Backend only",
    "Requires connector key metadata so Hushh can wrap export keys back to your client safely.",
  ],
  [
    "GET /api/v1/consent-status",
    "Backend or trusted dashboard",
    "Polling is token-bound and part of the approval lifecycle, not a public browser flow.",
  ],
  [
    "Agentic APIs browser proxy",
    "Separate documentation track",
    "Older A2A and MuleSoft flows now live under /developers/agentic-apis and should not be documented as part of Kai.",
  ],
  [
    "Plaid-backed financial refresh flows",
    "Backend only",
    "Financial aggregation and refresh remain server-to-server even when Kai later exposes the results.",
  ],
];

const endpointReferences = [
  {
    id: "discover-scopes",
    title: "GET /api/v1/user-scopes/{user_id}",
    purpose: "Discover the exact PKM-backed scopes Kai can expose for a user right now.",
    auth: "Developer token required.",
    consent:
      "No user data is returned yet. This is the discovery step that happens before consent.",
    request:
      "Provide the user id in the path and the developer token in the query string or trusted server context.",
    success:
      "Returns discovered scope strings, available domains, and the runtime shape that the user can approve.",
    failure:
      "401 for invalid developer tokens, 404 for unknown users, and 500 when the runtime cannot resolve the scope registry.",
    example: restSnippets.discover,
  },
  {
    id: "request-consent",
    title: "POST /api/v1/request-consent",
    purpose: "Create or reuse a consent request for one previously discovered scope.",
    auth: "Developer token plus connector key metadata required.",
    consent:
      "Creates the approval request the user will review inside Kai. Always request one narrow scope at a time.",
    request:
      "Send user_id, one discovered scope, approval timing, reason, and the connector public-key bundle used for export wrapping.",
    success:
      "Returns an approval request object, token metadata, or an existing broader grant when Kai can reuse prior approval safely.",
    failure:
      "400 for malformed bodies, 401 for token issues, and grant-specific errors when a scope cannot be requested as written.",
    example: restSnippets.requestConsent,
  },
  {
    id: "consent-status",
    title: "GET /api/v1/consent-status",
    purpose: "Poll the latest approval state for a request id or a previously requested scope.",
    auth: "Developer token required.",
    consent:
      "Used only after the request is created. The user still approves or denies in Kai.",
    request:
      "Provide user_id and either scope or request id so the runtime can resolve the latest approval record.",
    success:
      "Returns the latest approval state, grant coverage, and expiration metadata.",
    failure:
      "401 for invalid tokens and 404 when the request id or scope cannot be resolved against current consent records.",
    example: restSnippets.checkStatus,
  },
];

type MatrixTableProps = {
  headers: string[];
  rows: string[][];
};

type EndpointReference = {
  id: string;
  title: string;
  purpose: string;
  auth: string;
  consent: string;
  request: string;
  success: string;
  failure: string;
  example: string;
};

export const contentHeadings = [
  { text: "Overview", level: 2, slug: "overview" },
  { text: "Runtime architecture", level: 2, slug: "runtime-architecture" },
  { text: "Consent and IAM model", level: 2, slug: "consent-and-iam-model" },
  { text: "Endpoint flow and order of operations", level: 2, slug: "endpoint-flow-and-order-of-operations" },
  { text: "Database and runtime factors that matter", level: 2, slug: "database-and-runtime-factors-that-matter" },
  { text: "Browser-safe vs backend-only boundaries", level: 2, slug: "browser-safe-vs-backend-only-boundaries" },
  { text: "Examples and common failure points", level: 2, slug: "examples-and-common-failure-points" },
];

export const contentPlainText =
  "Agent Kai API Reference explains the Kai runtime, PKM data plane, consent and IAM model, core REST flow, backend-only boundaries, and the database factors developers need to understand before wiring consented reads.";

function MatrixTable({ headers, rows }: MatrixTableProps) {
  return (
    <div className="developer-docs-table-wrap">
      <table className="developer-docs-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="developer-docs-th">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((value) => (
                <td key={`${row[0]}-${value}`} className="developer-docs-td">
                  {value.includes("/") || value.includes("_") || value.includes("@") ? (
                    <code>{value}</code>
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EndpointCard({ endpoint }: { endpoint: EndpointReference }) {
  return (
    <section id={endpoint.id} className="space-y-4">
      <h3>{endpoint.title}</h3>
      <ul className="developer-docs-list">
        <li>
          <strong>Purpose.</strong> {endpoint.purpose}
        </li>
        <li>
          <strong>Auth.</strong> {endpoint.auth}
        </li>
        <li>
          <strong>Consent state.</strong> {endpoint.consent}
        </li>
        <li>
          <strong>Request shape.</strong> {endpoint.request}
        </li>
        <li>
          <strong>Success.</strong> {endpoint.success}
        </li>
        <li>
          <strong>Failure modes.</strong> {endpoint.failure}
        </li>
      </ul>
      <div className="docs-code-block">
        <div className="docs-code-header">
          <span className="docs-code-lang">Example curl</span>
        </div>
        <pre>
          <code>{endpoint.example}</code>
        </pre>
      </div>
    </section>
  );
}

export default function AgentKaiDoc() {
  return (
    <>
      <section id="overview" className="space-y-4">
        <h2>Overview</h2>
        <p>
          Agent Kai is the canonical developer reference for consent-first reads from the Personal
          Knowledge Model. The important pattern is stable: discover scopes from the live PKM
          runtime, request one scope at a time, wait for approval inside Kai, then read only the
          slice the user approved.
        </p>
        <p>
          This page translates the runtime fact sheet into developer language. It is intentionally
          documentation-only: enough schema and flow detail to explain endpoint behavior, without
          exposing secrets, row data, or operational internals that do not belong on a public site.
        </p>
        <Callout type="info">
          <p>
            Treat <code>/developers/agent-kai</code> as the primary public reference route. Use
            the supporting Kai guides for setup, scope grammar, and runtime details after this
            contract is clear. The older A2A and MuleSoft APIs live in the separate{" "}
            <code>/developers/agentic-apis</code> track.
          </p>
        </Callout>
      </section>

      <section id="runtime-architecture" className="space-y-4">
        <h2>Runtime architecture</h2>
        <p>
          Kai sits between the user-facing approval experience and the PKM runtime. The public API
          surface is small on purpose: the app, REST base, and MCP endpoint all describe the same
          consent-first system from different integration angles.
        </p>
        <MatrixTable headers={["Surface", "Current target", "Why it matters"]} rows={runtimeRows} />

        <h3>Core PKM data plane</h3>
        <p>
          These tables explain discovery, manifests, scope exposure, and encrypted segment storage.
          They are the canonical data plane behind Kai scope discovery.
        </p>
        <MatrixTable headers={["Table", "Developer meaning"]} rows={pkmRows} />

        <h3>Shared app records that matter to developers</h3>
        <p>
          Developers do not interact with these tables directly, but they explain why approval,
          export wrapping, and runtime identity behave the way they do.
        </p>
        <MatrixTable headers={["Tables", "Why they matter"]} rows={sharedTableRows} />

        <h3>Legacy transition tables</h3>
        <Callout type="warning">
          <p>
            Legacy encrypted-user tables remain only as bounded migration context. They are not the
            target for new writes, new integrations, or new approval logic.
          </p>
        </Callout>
        <MatrixTable headers={["Legacy surface", "Status"]} rows={legacyRows} />
      </section>

      <section id="consent-and-iam-model" className="space-y-4">
        <h2>Consent and IAM model</h2>
        <p>
          Kai uses separate layers for developer identity, user approval, and export readiness. A
          developer token proves who is asking. Consent records prove what the user approved.
          Vault-related records determine whether the approved payload can be wrapped back to the
          requesting connector safely.
        </p>
        <Steps>
          {CONSENT_FLOW_STEPS.map((step) => (
            <div key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </div>
          ))}
        </Steps>
        <ul className="developer-docs-list">
          <li>
            <strong>Developer app state.</strong> <code>developer_applications</code>,{" "}
            <code>developer_apps</code>, and <code>developer_tokens</code> describe app identity
            and token posture.
          </li>
          <li>
            <strong>Consent state.</strong> <code>consent_audit</code>,{" "}
            <code>consent_exports</code>, and template records explain whether a scope was granted,
            reused, or expired.
          </li>
          <li>
            <strong>Vault readiness.</strong> <code>vault_key_wrappers</code> and{" "}
            <code>vault_keys</code> explain whether export wrapping and onboarding state are ready.
          </li>
          <li>
            <strong>Runtime posture.</strong> <code>runtime_persona_state</code> explains persona
            and readiness context when Kai behavior depends on the active runtime state.
          </li>
        </ul>
      </section>

      <section id="endpoint-flow-and-order-of-operations" className="space-y-4">
        <h2>Endpoint flow and order of operations</h2>
        <p>
          The Kai path should be treated as ordered operations, not a collection of unrelated
          endpoints. Start with discovery, move into a narrow consent request, poll for approval,
          then decide whether the rest of your integration should stay in REST or move into MCP.
        </p>

        <div className="docs-code-block">
          <div className="docs-code-header">
            <span className="docs-code-lang">Remote MCP</span>
          </div>
          <pre>
            <code>{mcpSnippets.remote}</code>
          </pre>
        </div>

        {endpointReferences.map((endpoint) => (
          <EndpointCard key={endpoint.id} endpoint={endpoint} />
        ))}
      </section>

      <section id="database-and-runtime-factors-that-matter" className="space-y-4">
        <h2>Database and runtime factors that matter</h2>
        <p>
          Developers do not need raw table access, but they do need to understand why scope
          discovery, approval, export wrapping, and onboarding readiness behave differently across
          users and environments.
        </p>
        <MatrixTable
          headers={["Table", "Important fields", "Why developers care"]}
          rows={columnSnapshotRows}
        />
      </section>

      <section id="browser-safe-vs-backend-only-boundaries" className="space-y-4">
        <h2>Browser-safe vs backend-only boundaries</h2>
        <p>
          Browser-safe testing ends where developer tokens, connector wrapping metadata, or direct
          financial aggregation begin. Keep the developer-facing proxy for guided testing, but keep
          consent creation and financial reads on your backend.
        </p>
        <MatrixTable
          headers={["Surface", "Recommended execution", "Boundary"]}
          rows={boundaryRows}
        />
      </section>

      <section id="examples-and-common-failure-points" className="space-y-4">
        <h2>Examples and common failure points</h2>
        <p>
          The most common integration issues come from skipping discovery, over-requesting scopes,
          or treating migration-era surfaces as if they were canonical. Use the runtime sequence
          below as the baseline for reviews and troubleshooting.
        </p>
        <ul className="developer-docs-list">
          <li>
            Discover first. Do not hardcode universal scopes when the runtime exposes them per user.
          </li>
          <li>
            Request one scope at a time so approval language and audit state stay understandable.
          </li>
          <li>
            Do not treat legacy transition tables as destinations for new data flows or exports.
          </li>
          <li>
            Keep connector wrapping fields present on <code>request-consent</code> or your export
            handoff will fail later even if the approval is granted.
          </li>
          <li>Keep A2A and MuleSoft guidance in the separate Agentic APIs track.</li>
        </ul>
      </section>
    </>
  );
}
