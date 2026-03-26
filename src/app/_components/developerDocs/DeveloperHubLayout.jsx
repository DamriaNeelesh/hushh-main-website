import ContentWrapper from "../layout/ContentWrapper";

export default function DeveloperHubLayout({ title, description, aside = null, children }) {
  return (
    <ContentWrapper surface="muted">
      <div className="developer-hub-shell">
        <div className="site-page-band site-page-band--wide developer-hub-band">
          <header className="developer-hub-header">
            <div className="developer-hub-header-copy">
              <p className="site-page-eyebrow">Developers</p>
              <h1 className="developer-hub-title">{title}</h1>
              <p className="developer-hub-copy">{description}</p>
            </div>

            {aside ? <div className="developer-hub-header-aside">{aside}</div> : null}
          </header>

          <div className="developer-hub-content">{children}</div>
        </div>
      </div>
    </ContentWrapper>
  );
}
