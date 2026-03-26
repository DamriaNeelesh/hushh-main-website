import {
  getDeveloperDocNeighbors,
  getDeveloperTrack,
} from "../../developers/docs.config";
import DeveloperWorkspaceLayout from "./DeveloperWorkspaceLayout";

export default function DeveloperDocsShell({ doc, headings, children }) {
  const { previous, next } = getDeveloperDocNeighbors(doc.slug);
  const track = getDeveloperTrack(doc.track);
  const isKaiTrack = doc.track === "kai";
  const relatedTrackLink = isKaiTrack
    ? { href: "/developers/agentic-apis", label: "Open Agentic APIs" }
    : { href: "/developers/agent-kai", label: "Open Agent Kai API" };

  return (
    <DeveloperWorkspaceLayout
      title={doc.title}
      description={doc.description}
      activeKey={doc.slug}
      headings={headings}
      trackTitle={track?.title || "Developer track"}
      relatedTrackLink={relatedTrackLink}
      pagination={{ previous, next }}
    >
      <div className="developer-workspace-track-note">
        <p className="developer-docs-p">
          {isKaiTrack
            ? "This page belongs to the Kai runtime lane: PKM, consent approval inside Kai, REST, and MCP. The separate Agentic APIs lane covers A2A, MuleSoft, and browser-proxy flows."
            : "This page belongs to the older Agentic APIs lane: A2A, MuleSoft, browser-proxy, and profile-enrichment flows. The separate Kai lane covers PKM, consent, REST, and MCP."}
        </p>
      </div>
      {children}
    </DeveloperWorkspaceLayout>
  );
}
