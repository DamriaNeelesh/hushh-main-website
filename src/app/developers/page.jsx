import Link from "next/link";
import ContentWrapper from "../_components/layout/ContentWrapper";
import DocsSearchTrigger from "../_components/developerDocs/DocsSearchTrigger";
import { developerDocs } from "./docs.config";
import { buildPageMetadata } from "../../lib/seo/pageMetadata";
import {
  buildIntegrationModes,
  buildMcpSnippets,
  buildRestSnippets,
  CONSENT_FLOW_STEPS,
  DEVELOPER_ACCESS_NOTES,
  DEVELOPER_SAMPLE_PAYLOADS,
  DEVELOPER_SCOPE_NOTES,
  DEVELOPER_SECTIONS,
  FAQ_ITEMS,
  PUBLIC_SCOPE_PATTERNS,
  PUBLIC_TOOL_NAMES,
  REST_ENDPOINTS,
} from "../../lib/developers/content";
import { resolveDeveloperRuntime } from "../../lib/developers/runtime";

export const revalidate = 3600;
export const metadata = buildPageMetadata({
  title: "Developers",
  description:
    "Build consent-first integrations with Hushh developer tools, PKM-aware scopes, and live endpoint guidance.",
  pathname: "/developers",
  keywords: [
    "Hushh developers",
    "Consent-first APIs",
    "Developer onboarding",
    "API reference",
    "PKM scopes",
  ],
});

const featuredDocs = developerDocs.filter((doc) =>
  ["getting-started", "on-boarding", "rootEndpoints", "data-resources", "use-cases", "support"].includes(
    doc.slug,
  ),
);

export default function DeveloperApiPage() {
  const runtime = resolveDeveloperRuntime();
  const integrationModes = buildIntegrationModes(runtime);
  const restSnippets = buildRestSnippets(runtime);
  const mcpSnippets = buildMcpSnippets(runtime);

  return (
    <ContentWrapper surface="muted">
      <section className="site-page-band site-page-band--wide">
        <div className="developer-landing-hero site-page-card">
          <div className="developer-landing-copy">
            <p className="site-page-eyebrow">Developers</p>
            <h1 className="site-page-title developer-landing-title">One consent-first developer surface</h1>
            <p className="site-page-copy">
              Build against Hushh with one canonical workflow: discover dynamic PKM scopes,
              request consent inside Kai, then read the approved slice through the same
              developer contract across REST and MCP.
            </p>
          </div>

          <div className="developer-landing-actions">
            <Link href="/developers/getting-started" className="btn-midnight">
              Start Building
            </Link>
            <Link href="/developers/rootEndpoints" className="btn-outline">
              API Reference
            </Link>
            <DocsSearchTrigger className="btn-outline developer-landing-search" />
          </div>
        </div>
      </section>

      <section className="site-page-band site-page-band--wide developer-landing-section">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="site-page-card space-y-6">
            <div>
              <p className="site-page-eyebrow">Start here</p>
              <h2 className="developer-landing-section-title">Use the typed runtime and the live docs together</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {DEVELOPER_SECTIONS.slice(0, 6).map((section) => (
                <div key={section.id} className="rounded-[24px] border border-[rgba(17,24,39,0.08)] bg-white/80 p-5">
                  <p className="site-page-eyebrow">{section.label}</p>
                  <p className="mt-3 text-[15px] leading-7 text-[rgba(15,23,42,0.74)]">
                    {section.summary}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="site-page-card space-y-5">
            <div>
              <p className="site-page-eyebrow">Environment</p>
              <h2 className="developer-landing-section-title">Current runtime targets</h2>
            </div>
            {[
              ["Environment", runtime.environmentLabel],
              ["App URL", runtime.appUrl],
              ["API Base", runtime.apiBaseUrl],
              ["MCP URL", runtime.mcpUrl],
              ["npm Package", runtime.npmPackage],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[22px] border border-[rgba(17,24,39,0.08)] bg-white/80 p-4">
                <p className="site-page-eyebrow">{label}</p>
                <p className="mt-2 break-all font-mono text-[13px] leading-6 text-[rgba(15,23,42,0.76)]">
                  {value}
                </p>
              </div>
            ))}
          </article>
        </div>
      </section>

      <section className="site-page-band site-page-band--wide developer-landing-section">
        <div className="developer-landing-grid">
          {integrationModes.map((mode) => (
            <article key={mode.id} className="site-page-card developer-landing-card">
              <p className="site-page-eyebrow">Integration mode</p>
              <h2 className="developer-landing-card-title">{mode.title}</h2>
              <p className="developer-landing-card-copy">{mode.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-page-band site-page-band--wide developer-landing-section">
        <div className="developer-landing-section-head">
          <div>
            <p className="site-page-eyebrow">Documentation</p>
            <h2 className="developer-landing-section-title">Canonical guides and reference</h2>
          </div>
          <Link href="/developers/login" className="developer-landing-console-link">
            Open developer console
          </Link>
        </div>

        <div className="developer-landing-grid">
          {featuredDocs.map((doc) => (
            <article key={doc.slug} className="site-page-card developer-landing-doc-card">
              <p className="site-page-eyebrow">{doc.section}</p>
              <h3 className="developer-landing-card-title">{doc.title}</h3>
              <p className="developer-landing-card-copy">{doc.description}</p>
              <Link href={`/developers/${doc.slug}`} className="developer-landing-link">
                Open guide
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="site-page-band site-page-band--wide developer-landing-section">
        <div className="grid gap-6 xl:grid-cols-2">
          <article className="site-page-card space-y-6">
            <div>
              <p className="site-page-eyebrow">Consent flow</p>
              <h2 className="developer-landing-section-title">Discover, request, approve, read</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {CONSENT_FLOW_STEPS.map((step, index) => (
                <div key={step.title} className="rounded-[24px] border border-[rgba(17,24,39,0.08)] bg-white/80 p-5">
                  <p className="site-page-eyebrow">Step {index + 1}</p>
                  <h3 className="developer-landing-card-title">{step.title}</h3>
                  <p className="developer-landing-card-copy">{step.detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="site-page-card space-y-6">
            <div>
              <p className="site-page-eyebrow">Public contract</p>
              <h2 className="developer-landing-section-title">Tools and scope grammar</h2>
            </div>

            <div className="rounded-[24px] border border-[rgba(17,24,39,0.08)] bg-white/80 p-5">
              <p className="site-page-eyebrow">Tools</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {PUBLIC_TOOL_NAMES.map((toolName) => (
                  <code key={toolName} className="rounded-full bg-[rgba(15,23,42,0.06)] px-3 py-2 text-[13px]">
                    {toolName}
                  </code>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[rgba(17,24,39,0.08)] bg-white/80 p-5">
              <p className="site-page-eyebrow">Scopes</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {PUBLIC_SCOPE_PATTERNS.map((scope) => (
                  <code key={scope} className="rounded-full bg-[rgba(15,23,42,0.06)] px-3 py-2 text-[13px]">
                    {scope}
                  </code>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[rgba(17,24,39,0.08)] bg-white/80 p-5">
              <p className="site-page-eyebrow">Scope notes</p>
              <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[rgba(15,23,42,0.74)]">
                {DEVELOPER_SCOPE_NOTES.map((note) => (
                  <li key={note} className="flex gap-3">
                    <span className="mt-[10px] h-2 w-2 rounded-full bg-[var(--brand-gold,#C8A96A)]" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="site-page-band site-page-band--wide developer-landing-section">
        <div className="grid gap-6 xl:grid-cols-2">
          <article className="site-page-card space-y-5">
            <div>
              <p className="site-page-eyebrow">REST quickstart</p>
              <h2 className="developer-landing-section-title">Versioned API entry points</h2>
            </div>
            <div className="overflow-hidden rounded-[24px] border border-[rgba(17,24,39,0.08)]">
              <div className="grid grid-cols-[90px_1fr_1fr] bg-[rgba(15,23,42,0.04)] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-[rgba(15,23,42,0.55)]">
                <span>Method</span>
                <span>Path</span>
                <span>Purpose</span>
              </div>
              {REST_ENDPOINTS.map((endpoint) => (
                <div key={`${endpoint.method}:${endpoint.path}`} className="grid grid-cols-[90px_1fr_1fr] gap-4 border-t border-[rgba(17,24,39,0.08)] px-4 py-4 text-[14px] leading-6 text-[rgba(15,23,42,0.76)]">
                  <code className="font-semibold">{endpoint.method}</code>
                  <code className="break-all">{endpoint.path}</code>
                  <span>{endpoint.purpose}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="site-page-card space-y-5">
            <div>
              <p className="site-page-eyebrow">Quick snippets</p>
              <h2 className="developer-landing-section-title">REST and MCP starter commands</h2>
            </div>
            {[
              ["Discover scopes", restSnippets.discover],
              ["Request consent", restSnippets.requestConsent],
              ["Remote MCP", mcpSnippets.remote],
              ["npm bridge", mcpSnippets.npm],
            ].map(([title, code]) => (
              <div key={title} className="rounded-[24px] border border-[rgba(17,24,39,0.08)] bg-[rgba(15,23,42,0.95)] p-5 text-white">
                <p className="site-page-eyebrow text-[rgba(255,255,255,0.7)]">{title}</p>
                <pre className="mt-3 overflow-x-auto text-[12px] leading-6 text-[rgba(255,255,255,0.9)]">
                  <code>{code}</code>
                </pre>
              </div>
            ))}
          </article>
        </div>
      </section>

      <section className="site-page-band site-page-band--wide developer-landing-section">
        <div className="grid gap-6 xl:grid-cols-2">
          <article className="site-page-card space-y-5">
            <div>
              <p className="site-page-eyebrow">Developer access</p>
              <h2 className="developer-landing-section-title">Workspace guardrails</h2>
            </div>
            <ul className="space-y-3 text-[15px] leading-7 text-[rgba(15,23,42,0.74)]">
              {DEVELOPER_ACCESS_NOTES.map((note) => (
                <li key={note} className="flex gap-3">
                  <span className="mt-[10px] h-2 w-2 rounded-full bg-[var(--brand-gold,#C8A96A)]" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="site-page-card space-y-5">
            <div>
              <p className="site-page-eyebrow">FAQ</p>
              <h2 className="developer-landing-section-title">Common integration questions</h2>
            </div>
            <div className="space-y-3">
              {FAQ_ITEMS.map((item) => (
                <details key={item.question} className="rounded-[20px] border border-[rgba(17,24,39,0.08)] bg-white/80 p-5">
                  <summary className="cursor-pointer list-none text-[16px] font-semibold text-[rgba(15,23,42,0.9)]">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-[15px] leading-7 text-[rgba(15,23,42,0.74)]">{item.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="site-page-band site-page-band--wide developer-landing-section">
        <div className="developer-landing-grid">
          {DEVELOPER_SAMPLE_PAYLOADS.map((sample) => (
            <article key={sample.title} className="site-page-card developer-landing-doc-card">
              <p className="site-page-eyebrow">Sample payload</p>
              <h3 className="developer-landing-card-title">{sample.title}</h3>
              <p className="developer-landing-card-copy">{sample.description}</p>
              <pre className="mt-4 overflow-x-auto rounded-[20px] bg-[rgba(15,23,42,0.95)] p-5 text-[12px] leading-6 text-white">
                <code>{sample.code}</code>
              </pre>
            </article>
          ))}
        </div>
      </section>
    </ContentWrapper>
  );
}
