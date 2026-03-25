import Link from "next/link";
import Callout from "../../app/_components/developerDocs/Callout";
import Steps from "../../app/_components/developerDocs/Steps";
import TryItOut from "../../app/_components/developerApiContent/tryItOut";

const endpointRows = [
  [
    "POST /api/a2a/public",
    "OpenAI Public Data Agent",
    "Public-signal enrichment and first-pass profile expansion.",
  ],
  [
    "POST /api/a2a/gemini",
    "Gemini Public Data Agent",
    "Higher-confidence gap filling and enrichment.",
  ],
  [
    "POST /api/a2a/hushh-profile",
    "Supabase Profile Creation Agent",
    "Create a structured profile from natural language.",
  ],
  [
    "POST /api/a2a/hushh-profile-update",
    "Supabase Profile Update Agent",
    "Update an existing profile with new fields or instructions.",
  ],
  [
    "POST /api/a2a/hushh",
    "Supabase Profile Query Agent",
    "Read a structured profile by identifiers such as phone or email.",
  ],
  [
    "POST /api/a2a/brand",
    "Brand User Data Query Agent",
    "Translate profile signals into CRM-ready likes, dislikes, and affinities.",
  ],
  [
    "POST /api/a2a/whatsapp",
    "WhatsApp delivery bridge",
    "Route approved outbound messaging through the historical agent delivery path.",
  ],
];

const tryItOutSamples = [
  {
    title: "Enrich a profile",
    description: "Generate a full profile using public signals.",
    endpoint: {
      method: "POST",
      path: "/api/a2a/public",
      requestBody: {
        text: {
          type: "string",
          example:
            "Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.",
        },
        sessionId: { type: "string" },
        id: { type: "string" },
      },
    },
  },
  {
    title: "Create a profile",
    description: "Create a new Supabase profile from natural language.",
    endpoint: {
      method: "POST",
      path: "/api/a2a/hushh-profile",
      requestBody: {
        text: {
          type: "string",
          example:
            "Create a profile for Sundar Pichai with email sundar.pichai@example.com, phone +1 6505559001, occupation CEO, city Mountain View, and country USA.",
        },
        sessionId: { type: "string" },
        id: { type: "string" },
      },
    },
  },
  {
    title: "Normalize brand signals",
    description: "Summarize likes, dislikes, and brand affinity.",
    endpoint: {
      method: "POST",
      path: "/api/a2a/brand",
      requestBody: {
        text: {
          type: "string",
          example:
            "Summarize likes, dislikes, and brand affinity for Sundar Pichai using the consented profile.",
        },
        sessionId: { type: "string" },
        id: { type: "string" },
      },
    },
  },
];

export const contentHeadings = [
  { text: "Overview", level: 2, slug: "overview" },
  { text: "Runtime model", level: 2, slug: "runtime-model" },
  { text: "Core browser-proxy endpoints", level: 2, slug: "core-browser-proxy-endpoints" },
  { text: "Enterprise activation flow", level: 2, slug: "enterprise-activation-flow" },
  { text: "Browser-safe vs backend-only boundaries", level: 2, slug: "browser-safe-vs-backend-only-boundaries" },
  { text: "Related guides", level: 2, slug: "related-guides" },
];

export const contentPlainText =
  "Agentic APIs documents the historical A2A, MuleSoft, browser-proxy, and profile-enrichment APIs that remain separate from Agent Kai.";

function EndpointTable() {
  return (
    <div className="developer-docs-table-wrap">
      <table className="developer-docs-table">
        <thead>
          <tr>
            <th className="developer-docs-th">Endpoint</th>
            <th className="developer-docs-th">Agent</th>
            <th className="developer-docs-th">Purpose</th>
          </tr>
        </thead>
        <tbody>
          {endpointRows.map(([endpoint, agent, purpose]) => (
            <tr key={endpoint}>
              <td className="developer-docs-td">
                <code>{endpoint}</code>
              </td>
              <td className="developer-docs-td">{agent}</td>
              <td className="developer-docs-td">{purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AgenticApisDoc() {
  return (
    <>
      <section id="overview" className="space-y-4">
        <h2>Overview</h2>
        <p>
          Agentic APIs is the older Hushh API family for A2A orchestration, MuleSoft-backed
          browser-proxy testing, profile enrichment, and enterprise activation workflows. This is a
          different developer story from Agent Kai. Kai focuses on PKM, consent approval inside the
          Kai product, and the versioned <code>/api/v1</code> contract.
        </p>
        <Callout type="info">
          <p>
            Use <code>/developers/agent-kai</code> only when you need the Kai runtime. Use this
            page when you need the historical A2A, browser-proxy, and profile-enrichment stack.
          </p>
        </Callout>
      </section>

      <section id="runtime-model" className="space-y-4">
        <h2>Runtime model</h2>
        <p>
          The public browser-facing surface is the Hushh proxy route family at{" "}
          <code>/api/a2a/&lt;agent&gt;</code>. That proxy hides the upstream MuleSoft routing and
          keeps browser-safe testing on the website while direct CloudHub endpoints stay a backend
          concern.
        </p>
        <pre>
          <code>{`{
  "jsonrpc": "2.0",
  "id": "task-124",
  "method": "tasks/send",
  "params": {
    "sessionId": "session-456",
    "message": {
      "role": "user",
      "parts": [
        {
          "type": "text",
          "text": "Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001."
        }
      ]
    }
  }
}`}</code>
        </pre>
      </section>

      <section id="core-browser-proxy-endpoints" className="space-y-4">
        <h2>Core browser-proxy endpoints</h2>
        <p>
          These are the browser-safe routes teams can test from the website before moving the same
          prompts or payloads into backend-owned upstream calls.
        </p>
        <EndpointTable />
        <TryItOut
          title="Run a live agent request"
          subtitle="Pick a workflow, edit the payload, and hit the restored browser proxy."
          samples={tryItOutSamples}
        />
      </section>

      <section id="enterprise-activation-flow" className="space-y-4">
        <h2>Enterprise activation flow</h2>
        <Steps>
          <h3>1) Collect consented identifiers</h3>
          <p>Capture the minimum identity inputs needed to create or query a profile.</p>
          <h3>2) Create or query the profile</h3>
          <p>Use the Supabase profile agents to establish the working record.</p>
          <h3>3) Run enrichment agents</h3>
          <p>Use Public and Gemini agents to fill gaps and improve confidence.</p>
          <h3>4) Normalize brand signals</h3>
          <p>Use the Brand agent to produce CRM-ready likes, dislikes, and affinities.</p>
          <h3>5) Activate downstream</h3>
          <p>Move the merged profile into CRM, CDP, personalization, or communications tooling.</p>
        </Steps>
      </section>

      <section id="browser-safe-vs-backend-only-boundaries" className="space-y-4">
        <h2>Browser-safe vs backend-only boundaries</h2>
        <ul>
          <li>
            <strong>Browser-safe:</strong> <code>/api/a2a/&lt;agent&gt;</code> proxy calls,
            developer docs demos, and the site-hosted testing workspace at <code>/agents</code>.
          </li>
          <li>
            <strong>Backend-only:</strong> direct MuleSoft or CloudHub endpoints, secret-bearing
            WhatsApp delivery credentials, and any production orchestration outside the website
            proxy.
          </li>
          <li>
            <strong>Separate from Kai:</strong> do not document these endpoints as part of the Kai
            <code>/api/v1</code> consent and PKM runtime.
          </li>
        </ul>
      </section>

      <section id="related-guides" className="space-y-4">
        <h2>Related guides</h2>
        <ul>
          <li>
            <Link href="/developers/agent-reference">Agent Reference</Link>
          </li>
          <li>
            <Link href="/developers/data-retrieval-insertion">Profile Data and Enrichment</Link>
          </li>
          <li>
            <Link href="/developers/brand-engineering-onboarding">Brand Engineering Onboarding</Link>
          </li>
          <li>
            <Link href="/developers/use-cases">Use Cases</Link>
          </li>
        </ul>
      </section>
    </>
  );
}
