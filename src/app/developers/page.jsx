import Link from "next/link";
import DeveloperHubLayout from "../_components/developerDocs/DeveloperHubLayout";
import Callout from "../_components/developerDocs/Callout";
import {
  developerTracks,
  getDeveloperDocsByTrack,
} from "./docs.config";
import { buildPageMetadata } from "../../lib/seo/pageMetadata";
import { resolveDeveloperRuntime } from "../../lib/developers/runtime";

export const revalidate = 3600;
export const metadata = buildPageMetadata({
  title: "Developers",
  description:
    "Developer hub for both Agent Kai and the older Agentic APIs. Start here to choose the right runtime, docs track, and integration model.",
  pathname: "/developers",
  keywords: [
    "Hushh developers",
    "Agent Kai API",
    "Agentic APIs",
    "A2A APIs",
    "PKM consent",
  ],
});

const trackComparison = [
  {
    topic: "Core model",
    kai: "Consent-first PKM runtime with approval inside Kai, versioned REST endpoints, and MCP tools.",
    agentic:
      "Historical A2A and MuleSoft orchestration for enrichment, CRM activation, browser proxy testing, and enterprise workflows.",
  },
  {
    topic: "Canonical surface",
    kai: "/developers/agent-kai",
    agentic: "/developers/agentic-apis",
  },
  {
    topic: "Primary runtime",
    kai: "Kai app + REST + remote MCP",
    agentic: "A2A browser proxy + MuleSoft CloudHub agents",
  },
  {
    topic: "When to start here",
    kai: "You need PKM discovery, scope approval, consent status, or scoped reads for a Kai-connected product.",
    agentic:
      "You need profile creation, enrichment, JSON-RPC agent chains, brand activation, or older enterprise onboarding flows.",
  },
];

const quickStartSteps = [
  {
    eyebrow: "Step 01",
    title: "Choose the right track",
    copy: "Start with the split. Agent Kai is the consent-first PKM runtime. Agentic APIs is the older A2A, MuleSoft, browser-proxy, and enrichment lane.",
  },
  {
    eyebrow: "Step 02",
    title: "Confirm the runtime surface",
    copy: "Use the runtime map to decide whether you need Kai REST and MCP, or the historical browser proxy and backend enterprise routes.",
  },
  {
    eyebrow: "Step 03",
    title: "Read the reference in order",
    copy: "Enter the selected track, then move through setup, runtime behavior, and endpoint reference without mixing the two product stories.",
  },
  {
    eyebrow: "Step 04",
    title: "Test only where supported",
    copy: "Use embedded try-it blocks and browser-safe proxy routes from the docs. Keep backend-only flows and secret-bearing routes off the public browser path.",
  },
];

const trackHighlights = {
  kai: [
    "Consent-first PKM discovery and approval",
    "Versioned REST contract for scoped reads",
    "Remote MCP runtime and browser-safe docs flow",
  ],
  agentic: [
    "A2A and browser-proxy testing surfaces",
    "MuleSoft and CloudHub enterprise runtime",
    "Profile enrichment and activation workflows",
  ],
};

function TrackCard({ title, href, summary, docs, eyebrow, ctaLabel, highlights }) {
  return (
    <div className="site-page-card developer-hub-track-card">
      <p className="site-page-eyebrow">{eyebrow}</p>
      <h2 className="developer-hub-card-title">{title}</h2>
      <p className="developer-hub-card-copy">{summary}</p>
      <ul className="developer-hub-feature-list">
        {highlights.map((highlight) => (
          <li key={highlight} className="developer-hub-feature-item">
            {highlight}
          </li>
        ))}
      </ul>
      <ul className="developer-hub-link-list">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/developers/${doc.slug}`} className="developer-hub-link">
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={href} className="site-cta-solid developer-hub-primary-cta">
        {ctaLabel}
      </Link>
    </div>
  );
}

export default function DevelopersHomePage() {
  const runtime = resolveDeveloperRuntime();
  const kaiDocs = getDeveloperDocsByTrack("kai");
  const agenticDocs = getDeveloperDocsByTrack("agentic");

  const runtimeCards = [
    {
      label: "Agent Kai runtime",
      items: [
        ["Kai app", runtime.appUrl],
        ["REST base", runtime.apiBaseUrl],
        ["Remote MCP", runtime.mcpUrl],
      ],
    },
    {
      label: "Agentic APIs runtime",
      items: [
        ["Browser proxy", "/api/a2a/{agent}"],
        ["Testing workspace", "/agents"],
        ["Backend-only upstream", "Direct MuleSoft/CloudHub endpoints from trusted backend hosts"],
      ],
    },
  ];

  return (
    <DeveloperHubLayout
      title="Developer APIs"
      description="Choose the correct Hushh API track first. Agent Kai and the older Agentic APIs are separate products with different runtime models, onboarding order, and endpoint families."
    >
      <section className="developer-hub-section">
        <div className="developer-hub-section-head">
          <div>
            <p className="site-page-eyebrow">Choose your track</p>
            <h2 className="developer-hub-section-title">Two API products, two different lanes</h2>
          </div>
          <p className="developer-hub-section-copy">
            Start here to keep the runtime stories separate. Kai is the consent-first PKM lane.
            Agentic APIs is the older A2A, MuleSoft, browser-proxy, and enrichment lane.
          </p>
        </div>
        <div className="developer-hub-track-grid">
          <TrackCard
            eyebrow="Track one"
            title="Agent Kai API"
            href="/developers/agent-kai"
            summary={developerTracks[0].summary}
            docs={kaiDocs}
            ctaLabel="Open Agent Kai API"
            highlights={trackHighlights.kai}
          />
          <TrackCard
            eyebrow="Track two"
            title="Agentic APIs"
            href="/developers/agentic-apis"
            summary={developerTracks[1].summary}
            docs={agenticDocs.slice(0, 5)}
            ctaLabel="Open Agentic APIs"
            highlights={trackHighlights.agentic}
          />
        </div>
        <Callout type="info">
          <p className="developer-docs-p">
            Kai is the current consent-first developer API. The older enterprise A2A and browser
            proxy surfaces remain available as a separate Agentic APIs track.
          </p>
        </Callout>
      </section>

      <div className="developer-hub-support-grid">
        <section className="developer-hub-section">
          <div className="developer-hub-section-head">
            <div>
              <p className="site-page-eyebrow">Quick-start map</p>
              <h2 className="developer-hub-section-title">Move through the docs in the right order</h2>
            </div>
          </div>
          <div className="developer-hub-steps-grid">
            {quickStartSteps.map((step) => (
              <div key={step.title} className="site-page-card developer-hub-step-card">
                <p className="site-page-eyebrow">{step.eyebrow}</p>
                <h3 className="developer-hub-step-title">{step.title}</h3>
                <p className="developer-hub-step-copy">{step.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="developer-hub-section">
          <div className="developer-hub-section-head">
            <div>
              <p className="site-page-eyebrow">Runtime map</p>
              <h2 className="developer-hub-section-title">Confirm the operational surface first</h2>
            </div>
            <p className="developer-hub-section-copy">
              Match your implementation to the correct runtime before you copy snippets into
              production code.
            </p>
          </div>
          <div className="developer-hub-runtime-grid">
            {runtimeCards.map((card) => (
              <div key={card.label} className="site-page-card developer-hub-runtime-card">
                <p className="site-page-eyebrow">{card.label}</p>
                <div className="developer-runtime-list">
                  {card.items.map(([label, value]) => (
                    <div key={label} className="developer-runtime-item">
                      <span className="developer-runtime-label">{label}</span>
                      <span className="developer-runtime-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="developer-hub-section">
        <div className="developer-hub-section-head">
          <div>
            <p className="site-page-eyebrow">Track boundaries</p>
            <h2 className="developer-hub-section-title">Keep the runtime stories separate</h2>
          </div>
        </div>
        <p className="developer-docs-p">
          The split below is the rule for the docs and the public page copy. Kai should explain
          PKM, consent, and scoped reads. Agentic APIs should explain A2A, MuleSoft,
          browser-proxy, enrichment, and activation.
        </p>
        <div className="developer-docs-table-wrap">
          <table className="developer-docs-table">
            <thead>
              <tr>
                <th className="developer-docs-th">Topic</th>
                <th className="developer-docs-th">Agent Kai API</th>
                <th className="developer-docs-th">Agentic APIs</th>
              </tr>
            </thead>
            <tbody>
              {trackComparison.map((row) => (
                <tr key={row.topic}>
                  <td className="developer-docs-td">{row.topic}</td>
                  <td className="developer-docs-td">{row.kai}</td>
                  <td className="developer-docs-td">{row.agentic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </DeveloperHubLayout>
  );
}
