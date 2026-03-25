import Link from "next/link";
import {
  developerOverviewLinks,
  getDeveloperDocNeighbors,
  getDeveloperTrack,
} from "../../developers/docs.config";
import DeveloperDocsFrame from "./DeveloperDocsFrame";

export default function DeveloperDocsShell({ doc, headings, children }) {
  const { previous, next } = getDeveloperDocNeighbors(doc.slug);
  const track = getDeveloperTrack(doc.track);
  const isKaiTrack = doc.track === "kai";
  const relatedTrackLink = isKaiTrack
    ? { href: "/developers/agentic-apis", label: "Open Agentic APIs" }
    : { href: "/developers/agent-kai", label: "Open Agent Kai API" };

  return (
    <DeveloperDocsFrame
      title={doc.title}
      description={doc.description}
      activeKey={doc.slug}
      headings={headings}
      overviewLinks={developerOverviewLinks}
      pagination={{ previous, next }}
      meta={
        <>
          <p className="developer-docs-sidebar-label">{track?.title || "Developer track"}</p>
          <p className="developer-docs-meta-copy">
            {isKaiTrack
              ? "This page belongs to the Kai runtime lane: PKM, consent approval inside Kai, REST, and MCP. The separate Agentic APIs lane covers A2A, MuleSoft, and browser-proxy flows."
              : "This page belongs to the older Agentic APIs lane: A2A, MuleSoft, browser-proxy, and profile-enrichment flows. The separate Kai lane covers PKM, consent, REST, and MCP."}
          </p>
          <Link href={track?.href || "/developers"} className="developer-docs-meta-link">
            Open {track?.title || "API Reference Home"}
          </Link>
          <Link href={relatedTrackLink.href} className="developer-docs-meta-link">
            {relatedTrackLink.label}
          </Link>
        </>
      }
    >
      {children}
    </DeveloperDocsFrame>
  );
}
