import Link from "next/link";
import ContentWrapper from "../layout/ContentWrapper";
import DeveloperDocsArticle from "./DeveloperDocsArticle";
import DeveloperWorkspaceMobileDock from "./DeveloperWorkspaceMobileDock";
import DeveloperWorkspaceToc from "./DeveloperWorkspaceToc";
import {
  developerOverviewLinks,
  getDeveloperDocSections,
} from "../../developers/docs.config";

function SidebarSection({ title, docs, activeKey }) {
  return (
    <div className="developer-workspace-nav-group">
      <p className="developer-workspace-nav-label">{title}</p>
      <ul className="developer-workspace-nav-list">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/developers/${doc.slug}`}
              className={`developer-workspace-nav-link${doc.slug === activeKey ? " is-active" : ""}`}
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
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

export default function DeveloperWorkspaceLayout({
  title,
  description,
  activeKey,
  headings = [],
  trackTitle,
  relatedTrackLink,
  showHomeLink = true,
  pagination = null,
  children,
}) {
  const sections = getDeveloperDocSections();

  return (
    <ContentWrapper surface="muted">
      <div className="developer-workspace-route">
        <DeveloperWorkspaceMobileDock
          activeKey={activeKey}
          overviewLinks={developerOverviewLinks}
          sections={sections}
          headings={headings}
        />

        <div className="developer-workspace-grid">
          <aside className="developer-workspace-rail developer-workspace-rail--left" aria-label="Developer documentation navigation">
            <div className="developer-workspace-panel developer-workspace-panel--nav">
              <div className="developer-workspace-scroll">
                <div className="developer-workspace-nav-group">
                  <p className="developer-workspace-nav-label">Overview</p>
                  <ul className="developer-workspace-nav-list">
                    {developerOverviewLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`developer-workspace-nav-link${
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
            </div>
          </aside>

          <article className="developer-workspace-main">
            <div className="developer-workspace-panel developer-workspace-panel--article">
              <div className="developer-workspace-main-scroll" data-developer-scroll-root="true">
                <div className="developer-workspace-content">
                  <header className="developer-workspace-header">
                    <p className="developer-workspace-track">{trackTitle}</p>
                    <h1 className="developer-workspace-title">{title}</h1>
                    <p className="developer-workspace-description">{description}</p>

                    {showHomeLink || relatedTrackLink ? (
                      <div className="developer-workspace-links">
                        {showHomeLink ? (
                          <Link href="/developers" className="developer-workspace-inline-link">
                            Developer Home
                          </Link>
                        ) : null}
                        {relatedTrackLink ? (
                          <Link
                            href={relatedTrackLink.href}
                            className="developer-workspace-inline-link"
                          >
                            {relatedTrackLink.label}
                          </Link>
                        ) : null}
                      </div>
                    ) : null}
                  </header>

                  <DeveloperDocsArticle>
                    <div className="developer-docs-prose">{children}</div>
                  </DeveloperDocsArticle>
                  <Pagination previous={pagination?.previous} next={pagination?.next} />
                </div>
              </div>
            </div>
          </article>

          <aside className="developer-workspace-rail developer-workspace-rail--right" aria-label="On this page">
            <div className="developer-workspace-panel developer-workspace-panel--toc">
              <div className="developer-workspace-scroll">
                <div className="developer-workspace-toc">
                  <p className="developer-workspace-nav-label">On this page</p>
                  {headings.length ? (
                    <DeveloperWorkspaceToc headings={headings} />
                  ) : (
                    <p className="developer-workspace-empty-copy">
                      This page is short enough to read straight through.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </ContentWrapper>
  );
}
