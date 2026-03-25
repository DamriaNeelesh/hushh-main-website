import Link from "next/link";
import ContentWrapper from "../layout/ContentWrapper";
import {
  developerOverviewLinks,
  getDeveloperDocSections,
} from "../../developers/docs.config";

function SidebarSection({ title, docs, activeKey }) {
  return (
    <div className="developer-docs-sidebar-group">
      <p className="developer-docs-sidebar-label">{title}</p>
      <ul className="developer-docs-sidebar-list">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/developers/${doc.slug}`}
              className={`developer-docs-sidebar-link${
                doc.slug === activeKey ? " is-active" : ""
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

function TocList({ headings }) {
  return (
    <ul className="developer-docs-toc-list">
      {headings.map((heading) => (
        <li
          key={heading.slug}
          className={
            heading.level === 3
              ? "developer-docs-toc-item is-nested"
              : "developer-docs-toc-item"
          }
        >
          <a href={`#${heading.slug}`}>{heading.text}</a>
        </li>
      ))}
    </ul>
  );
}

function Toc({ headings }) {
  return (
    <div className="developer-docs-panel developer-docs-panel--toc">
      <p className="developer-docs-sidebar-label">On this page</p>
      {headings.length ? (
        <TocList headings={headings} />
      ) : (
        <p className="developer-docs-meta-copy">
          Use the headings in this page to navigate the guide.
        </p>
      )}
    </div>
  );
}

function Pagination({ previous, next }) {
  if (!previous && !next) {
    return null;
  }

  return (
    <div className="developer-docs-pagination">
      {previous ? (
        <Link href={`/developers/${previous.slug}`} className="developer-docs-pagination-link">
          <span className="developer-docs-pagination-eyebrow">Previous</span>
          <span>{previous.title}</span>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/developers/${next.slug}`}
          className="developer-docs-pagination-link developer-docs-pagination-link--next"
        >
          <span className="developer-docs-pagination-eyebrow">Next</span>
          <span>{next.title}</span>
        </Link>
      ) : null}
    </div>
  );
}

export default function DeveloperDocsFrame({
  title,
  description,
  activeKey,
  headings = [],
  overviewLinks = [],
  meta = null,
  pagination = null,
  children,
}) {
  const sections = getDeveloperDocSections();
  const resolvedOverviewLinks =
    overviewLinks.length > 0 ? overviewLinks : developerOverviewLinks;

  return (
    <ContentWrapper surface="muted">
      <div className="site-page-band site-page-band--wide developer-docs-band">
        <div className="developer-docs-hero">
          <div>
            <p className="site-page-eyebrow">Developers</p>
            <h1 className="site-page-title developer-docs-title">{title}</h1>
            <p className="site-page-copy developer-docs-copy">{description}</p>
          </div>
        </div>

        <div className="developer-docs-mobile-utility">
          <details className="developer-docs-mobile-panel" open>
            <summary className="developer-docs-mobile-summary">
              <span className="developer-docs-sidebar-label">Browse docs</span>
              <span className="developer-docs-mobile-summary-title">
                Jump between Agent Kai API and Agentic APIs without leaving the docs flow.
              </span>
            </summary>
            <div className="developer-docs-mobile-body">
              <div className="developer-docs-sidebar-group">
                <p className="developer-docs-sidebar-label">Overview</p>
                <ul className="developer-docs-sidebar-list">
                  {resolvedOverviewLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`developer-docs-sidebar-link${
                          link.key === activeKey ? " is-active" : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {Object.entries(sections).map(([section, docs]) => (
                <SidebarSection key={section} title={section} docs={docs} activeKey={activeKey} />
              ))}
            </div>
          </details>

          <details className="developer-docs-mobile-panel">
            <summary className="developer-docs-mobile-summary">
              <span className="developer-docs-sidebar-label">On this page</span>
              <span className="developer-docs-mobile-summary-title">
                Jump to the sections in this guide.
              </span>
            </summary>
            <div className="developer-docs-mobile-body">
              {headings.length ? (
                <TocList headings={headings} />
              ) : (
                <p className="developer-docs-meta-copy">
                  This page is short enough to read straight through without local navigation.
                </p>
              )}
            </div>
          </details>
        </div>

        <div className="developer-docs-layout">
          <aside className="developer-docs-sidebar developer-docs-panel">
            <div className="developer-docs-sidebar-group">
              <p className="developer-docs-sidebar-label">Overview</p>
              <ul className="developer-docs-sidebar-list">
                {resolvedOverviewLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`developer-docs-sidebar-link${
                        link.key === activeKey ? " is-active" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {Object.entries(sections).map(([section, docs]) => (
              <SidebarSection key={section} title={section} docs={docs} activeKey={activeKey} />
            ))}
          </aside>

          <article className="developer-docs-article developer-docs-panel">
            <div className="developer-docs-prose">{children}</div>
            <Pagination previous={pagination?.previous} next={pagination?.next} />
          </article>

          <aside className="developer-docs-meta">
            {meta ? <div className="developer-docs-panel developer-docs-panel--meta">{meta}</div> : null}
            <Toc headings={headings} />
          </aside>
        </div>
      </div>
    </ContentWrapper>
  );
}
