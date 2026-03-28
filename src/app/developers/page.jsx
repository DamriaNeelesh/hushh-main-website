import Link from "next/link";
import DeveloperWorkspaceLayout from "../_components/developerDocs/DeveloperWorkspaceLayout";
import {
  developerTracks,
  getDeveloperDocsByTrack,
} from "./docs.config";
import { buildPageMetadata } from "../../lib/seo/pageMetadata";
import { resolveDeveloperRuntime } from "../../lib/developers/runtime";

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

const trustPoints = [
  "Agent Kai is the current consent-first runtime.",
  "Agentic APIs remains available as the older enterprise and browser-proxy lane.",
  "Choose one track first and follow its docs in order.",
  "Use browser testing only where the reference explicitly allows it.",
];

const quickStartSteps = [
  {
    eyebrow: "Step 01",
    title: "Pick the product first",
    copy: "Use Agent Kai for new consent-first PKM integrations. Use Agentic APIs only when you are working against the older A2A, MuleSoft, or browser-proxy contract.",
  },
  {
    eyebrow: "Step 02",
    title: "Confirm runtime and auth",
    copy: "Before copying any endpoint, make sure you know whether you need Kai REST and MCP, or the older backend/browser-proxy surfaces.",
  },
  {
    eyebrow: "Step 03",
    title: "Start with the reference",
    copy: "Open the track reference first, then move into setup and supporting guides. That keeps the mental model clean and avoids mixing two different API stories.",
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

const integrationNotes = [
  {
    eyebrow: "What is current",
    title: "Start new work on Agent Kai",
    copy: "If you are beginning a new integration, Agent Kai is the default lane. It documents the current consent model, PKM data plane, and versioned runtime contract.",
  },
  {
    eyebrow: "What is legacy",
    title: "Use Agentic APIs only when the backend requires it",
    copy: "The older A2A, MuleSoft, and browser-proxy surfaces still exist for enterprise and migration scenarios, but they are not the same product as Kai.",
  },
  {
    eyebrow: "What builds trust",
    title: "Clarity beats volume",
    copy: "Developers adopt faster when the docs show stable URLs, clear boundaries, and an obvious first page. This hub is meant to help you decide quickly and move with confidence.",
  },
];

const homeHeadings = [
  { text: "Choose your track", level: 2, slug: "choose-your-track" },
  { text: "A simple path into the docs", level: 2, slug: "start-here" },
  { text: "The trust cues developers care about", level: 2, slug: "trust-cues" },
];

function TrackCard({
  title,
  href,
  summary,
  docs,
  eyebrow,
  ctaLabel,
  highlights,
  runtimeItems,
  status,
}) {
  return (
    <div className="site-page-card developer-hub-track-card">
      <div className="developer-hub-card-topline">
        <p className="site-page-eyebrow">{eyebrow}</p>
        <span className="developer-hub-status-badge">{status}</span>
      </div>
      <h2 className="developer-hub-card-title">{title}</h2>
      <p className="developer-hub-card-copy">{summary}</p>
      <ul className="developer-hub-feature-list">
        {highlights.map((highlight) => (
          <li key={highlight} className="developer-hub-feature-item">
            {highlight}
          </li>
        ))}
      </ul>
      <div className="developer-runtime-list developer-runtime-list--compact">
        {runtimeItems.map(([label, value]) => (
          <div key={label} className="developer-runtime-item">
            <span className="developer-runtime-label">{label}</span>
            <span className="developer-runtime-value developer-runtime-value--mono">{value}</span>
          </div>
        ))}
      </div>
      <div className="developer-hub-card-divider" />
      <div className="developer-hub-docs-block">
        <p className="developer-hub-docs-label">Start with</p>
        <ul className="developer-hub-link-list">
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link href={`/developers/${doc.slug}`} className="developer-hub-link">
                {doc.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
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

  return (
    <DeveloperWorkspaceLayout
      title="Developer APIs"
      description="Start with the right Hushh API product. Agent Kai is the current consent-first runtime. Agentic APIs covers the older A2A, MuleSoft, browser-proxy, and enterprise activation surfaces."
      activeKey="developers-home"
      headings={homeHeadings}
      trackTitle="Developer hub"
      showHomeLink={false}
      pagination={null}
    >
      <section id="choose-your-track" className="developer-hub-section">
        <div className="developer-hub-trust-row">
          {trustPoints.map((point) => (
            <div key={point} className="trust-pill developer-hub-trust-pill">
              <span>{point}</span>
            </div>
          ))}
        </div>
        <div className="developer-hub-section-head">
          <div>
            <p className="site-page-eyebrow">Choose your track</p>
            <h2 className="developer-hub-section-title">Two API products, kept intentionally separate</h2>
          </div>
          <p className="developer-hub-section-copy">
            The first job of this page is simple: help you enter the correct docs lane. Kai is
            the current consent-first PKM product. Agentic APIs is the older A2A, MuleSoft,
            browser-proxy, and enrichment product family.
          </p>
        </div>
        <div className="developer-hub-track-grid">
          <TrackCard
            eyebrow="Current lane"
            title="Agent Kai API"
            href="/developers/agent-kai"
            summary={developerTracks[0].summary}
            docs={kaiDocs.slice(0, 3)}
            ctaLabel="Open Agent Kai API"
            highlights={trackHighlights.kai}
            runtimeItems={[
              ["Kai app", runtime.appUrl],
              ["REST base", runtime.apiBaseUrl],
              ["Remote MCP", runtime.mcpUrl],
            ]}
            status="Recommended for new integrations"
          />
          <TrackCard
            eyebrow="Legacy + enterprise lane"
            title="Agentic APIs"
            href="/developers/agentic-apis"
            summary={developerTracks[1].summary}
            docs={agenticDocs.slice(0, 3)}
            ctaLabel="Open Agentic APIs"
            highlights={trackHighlights.agentic}
            runtimeItems={[
              ["Browser proxy", "/api/a2a/{agent}"],
              ["Testing workspace", "/agents"],
              ["Backend upstream", "Trusted backend hosts only"],
            ]}
            status="Use when your backend already depends on it"
          />
        </div>
      </section>

      <section id="start-here" className="developer-hub-section">
        <div className="developer-hub-section-head">
          <div>
            <p className="site-page-eyebrow">Start here</p>
            <h2 className="developer-hub-section-title">A simple path into the docs</h2>
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

      <section id="trust-cues" className="developer-hub-section">
        <div className="developer-hub-section-head">
          <div>
            <p className="site-page-eyebrow">Read this before integrating</p>
            <h2 className="developer-hub-section-title">The trust cues developers care about</h2>
          </div>
          <p className="developer-hub-section-copy">
            Good API adoption usually comes down to three things: a clear current path, an honest
            explanation of legacy surfaces, and stable runtime information you can trust.
          </p>
        </div>
        <div className="developer-hub-note-grid">
          {integrationNotes.map((note) => (
            <div key={note.title} className="site-page-card developer-hub-note-card">
              <p className="site-page-eyebrow">{note.eyebrow}</p>
              <h3 className="developer-hub-step-title">{note.title}</h3>
              <p className="developer-hub-step-copy">{note.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </DeveloperWorkspaceLayout>
  );
}
