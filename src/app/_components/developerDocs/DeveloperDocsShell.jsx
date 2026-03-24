import Link from "next/link";
import ContentWrapper from "../layout/ContentWrapper";
import DocsSearchTrigger from "./DocsSearchTrigger";
import {
  getDeveloperDocNeighbors,
  getDeveloperDocSections,
} from "../../developers/docs.config";

function SidebarSection({ title, docs, activeSlug }) {
  return (
    <div className="developer-docs-sidebar-group">
      <p className="developer-docs-sidebar-label">{title}</p>
      <ul className="developer-docs-sidebar-list">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/developers/${doc.slug}`}
              className={`developer-docs-sidebar-link${
                doc.slug === activeSlug ? " is-active" : ""
              }`}
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toc({ headings }) {
  if (!headings.length) {
    return (
      <div className="developer-docs-panel developer-docs-panel--toc">
        <p className="developer-docs-sidebar-label">On this page</p>
        <p className="developer-docs-meta-copy">Use the headings in this page to navigate the guide.</p>
      </div>
    );
  }

  return (
    <div className="developer-docs-panel developer-docs-panel--toc">
      <p className="developer-docs-sidebar-label">On this page</p>
      <ul className="developer-docs-toc-list">
        {headings.map((heading) => (
          <li
            key={heading.slug}
            className={heading.level === 3 ? "developer-docs-toc-item is-nested" : "developer-docs-toc-item"}
          >
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DeveloperDocsShell({ doc, headings, children }) {
  const sections = getDeveloperDocSections();
  const { previous, next } = getDeveloperDocNeighbors(doc.slug);

  return (
    <ContentWrapper surface="muted">
      <div className="site-page-band site-page-band--wide developer-docs-band">
        <div className="developer-docs-hero">
          <div>
            <p className="site-page-eyebrow">Developers</p>
            <h1 className="site-page-title developer-docs-title">{doc.title}</h1>
            <p className="site-page-copy developer-docs-copy">{doc.description}</p>
          </div>

          <div className="developer-docs-hero-actions">
            <DocsSearchTrigger className="btn-outline developer-docs-search-trigger" />
            <Link href="/developers/login" className="btn-midnight">
              Developer Console
            </Link>
          </div>
        </div>

        <div className="developer-docs-layout">
          <aside className="developer-docs-sidebar developer-docs-panel">
            <div className="developer-docs-sidebar-group">
              <p className="developer-docs-sidebar-label">Overview</p>
              <ul className="developer-docs-sidebar-list">
                <li>
                  <Link href="/developers" className="developer-docs-sidebar-link">
                    Developer APIs Home
                  </Link>
                </li>
              </ul>
            </div>

            {Object.entries(sections).map(([section, docs]) => (
              <SidebarSection key={section} title={section} docs={docs} activeSlug={doc.slug} />
            ))}
          </aside>

          <article className="developer-docs-article developer-docs-panel">
            <div className="developer-docs-prose">{children}</div>

            <div className="developer-docs-pagination">
              {previous ? (
                <Link href={`/developers/${previous.slug}`} className="developer-docs-pagination-link">
                  <span className="developer-docs-pagination-eyebrow">Previous</span>
                  <span>{previous.title}</span>
                </Link>
              ) : <span />}

              {next ? (
                <Link href={`/developers/${next.slug}`} className="developer-docs-pagination-link developer-docs-pagination-link--next">
                  <span className="developer-docs-pagination-eyebrow">Next</span>
                  <span>{next.title}</span>
                </Link>
              ) : null}
            </div>
          </article>

          <aside className="developer-docs-meta">
            <div className="developer-docs-panel developer-docs-panel--meta">
              <p className="developer-docs-sidebar-label">Need something else?</p>
              <p className="developer-docs-meta-copy">
                Start from the live endpoint reference, then use the docs search trigger above for the rest.
              </p>
              <Link href="/developers/rootEndpoints" className="developer-docs-meta-link">
                Open API reference
              </Link>
            </div>
            <Toc headings={headings} />
          </aside>
        </div>
      </div>
    </ContentWrapper>
  );
}
