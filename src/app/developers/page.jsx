import Link from "next/link";
import DeveloperDocsFrame from "../_components/developerDocs/DeveloperDocsFrame";
import Callout from "../_components/developerDocs/Callout";
import {
  developerOverviewLinks,
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

const hubHeadings = [
  { text: "Two API tracks", level: 2, slug: "two-api-tracks" },
  { text: "Runtime map", level: 2, slug: "runtime-map" },
  { text: "Where each track belongs", level: 2, slug: "where-each-track-belongs" },
  { text: "Reference by track", level: 2, slug: "reference-by-track" },
];

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

function TrackCard({ title, href, summary, docs, eyebrow }) {
  return (
    <div className="site-page-card developer-track-card">
      <p className="site-page-eyebrow">{eyebrow}</p>
      <h3 className="developer-landing-card-title">{title}</h3>
      <p className="developer-landing-card-copy">{summary}</p>
      <ul className="developer-track-list">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/developers/${doc.slug}`} className="developer-track-link">
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={href} className="developer-landing-link">
        Open track
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
    <DeveloperDocsFrame
      title="Developers"
      description="Use this hub to choose the right Hushh API story first. Agent Kai and Agentic APIs are separate tracks with different runtime models, onboarding order, and endpoint families."
      activeKey="developers-home"
      headings={hubHeadings}
      overviewLinks={developerOverviewLinks}
      meta={
        <>
          <p className="developer-docs-sidebar-label">API Reference</p>
          <p className="developer-docs-meta-copy">
            Start here, choose the right track, and only then move into the deeper reference pages.
          </p>
          {developerTracks.map((track) => (
            <Link key={track.key} href={track.href} className="developer-docs-meta-link">
              Open {track.title}
            </Link>
          ))}
        </>
      }
    >
      <section id="two-api-tracks" className="space-y-4">
        <h2 className="developer-docs-h2">Two API tracks</h2>
        <p className="developer-docs-p">
          Hushh has two different developer stories on this site. They should not be read as one
          merged runtime. Use Agent Kai when you need PKM-backed discovery and consent approval
          inside Kai. Use Agentic APIs when you need the older A2A, MuleSoft, browser-proxy, and
          enrichment flows.
        </p>
        <Callout type="info">
          <p className="developer-docs-p">
            Kai is the newer, consent-first developer API. The older enterprise A2A and browser
            proxy surfaces remain available as a separate Agentic APIs track.
          </p>
        </Callout>
        <div className="developer-track-grid">
          <TrackCard
            eyebrow="Track one"
            title="Agent Kai API"
            href="/developers/agent-kai"
            summary={developerTracks[0].summary}
            docs={kaiDocs}
          />
          <TrackCard
            eyebrow="Track two"
            title="Agentic APIs"
            href="/developers/agentic-apis"
            summary={developerTracks[1].summary}
            docs={agenticDocs.slice(0, 5)}
          />
        </div>
      </section>

      <section id="runtime-map" className="space-y-4">
        <h2 className="developer-docs-h2">Runtime map</h2>
        <p className="developer-docs-p">
          These routes point at different operational models. Pick the runtime that matches your
          integration before you copy snippets into production code.
        </p>
        <div className="developer-runtime-grid">
          {runtimeCards.map((card) => (
            <div key={card.label} className="site-page-card developer-runtime-card">
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

      <section id="where-each-track-belongs" className="space-y-4">
        <h2 className="developer-docs-h2">Where each track belongs</h2>
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

      <section id="reference-by-track" className="space-y-4">
        <h2 className="developer-docs-h2">Reference by track</h2>
        <div className="developer-reference-grid">
          <div className="site-page-card developer-reference-card">
            <p className="site-page-eyebrow">Agent Kai API</p>
            <h3 className="developer-landing-card-title">Consent-first PKM runtime</h3>
            <p className="developer-landing-card-copy">
              Start here for discovery, request-consent, consent-status, MCP usage, and the runtime
              database factors that shape approved reads.
            </p>
            <ul className="developer-docs-list">
              {kaiDocs.map((doc) => (
                <li key={doc.slug} className="developer-docs-li">
                  <Link href={`/developers/${doc.slug}`} className="developer-track-link">
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-page-card developer-reference-card">
            <p className="site-page-eyebrow">Agentic APIs</p>
            <h3 className="developer-landing-card-title">A2A, MuleSoft, and enrichment flows</h3>
            <p className="developer-landing-card-copy">
              Use this lane for browser-proxy testing, agent catalogs, profile enrichment, brand
              activation, intelligence workflows, and the older enterprise API surface.
            </p>
            <ul className="developer-docs-list">
              {agenticDocs.map((doc) => (
                <li key={doc.slug} className="developer-docs-li">
                  <Link href={`/developers/${doc.slug}`} className="developer-track-link">
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </DeveloperDocsFrame>
  );
}
