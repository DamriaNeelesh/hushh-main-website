export const contentHeadings = [
  { text: "Track selection", level: 2, slug: "track-selection" },
  { text: "What to include in a support request", level: 2, slug: "what-to-include-in-a-support-request" },
  { text: "Common issues and fixes", level: 2, slug: "common-issues-and-fixes" },
  { text: "Debugging tips", level: 2, slug: "debugging-tips" },
];

export const contentPlainText =
  "Use this page to choose the correct support lane first, then send the exact runtime, request identifiers, and endpoint path so the Hushh team can trace the issue quickly.";

export default function SupportDoc() {
  return (
    <>
      <section id="track-selection" className="space-y-4">
        <h2>Track selection</h2>
        <ul>
          <li>
            <strong>Agent Kai API:</strong> use this lane for PKM discovery, consent requests,
            consent status, REST, and MCP questions.
          </li>
          <li>
            <strong>Agentic APIs:</strong> use this lane for <code>/api/a2a</code>, MuleSoft agent
            chains, profile enrichment, browser-proxy testing, and CRM activation workflows.
          </li>
        </ul>
      </section>

      <section id="what-to-include-in-a-support-request" className="space-y-4">
        <h2>What to include in a support request</h2>
        <ul>
          <li>Organization name and environment.</li>
          <li>The exact track: Agent Kai API or Agentic APIs.</li>
          <li>The endpoint path or MCP route you called.</li>
          <li>
            For Agentic APIs, include <code>sessionId</code>, <code>id</code>, and the returned
            <code>upstreamStatus</code> when available.
          </li>
          <li>
            For Kai, include the discovered scope, consent request id, or the latest consent-status
            response.
          </li>
        </ul>
      </section>

      <section id="common-issues-and-fixes" className="space-y-4">
        <h2>Common issues and fixes</h2>
        <h3>400 Invalid JSON-RPC</h3>
        <p>Cause: malformed A2A payload or missing JSON-RPC structure. Fix: validate the request body and resend.</p>
        <h3>401 Unauthorized</h3>
        <p>Cause: invalid credentials, expired token, or missing authorization. Fix: rotate credentials and confirm the right runtime lane.</p>
        <h3>500 Internal agent error</h3>
        <p>Cause: upstream agent failed or timed out. Fix: retry with backoff and include the request identifiers in your support note.</p>
        <h3>Consent mismatch</h3>
        <p>Cause: Kai scope was never discovered or a broader grant is being assumed incorrectly. Fix: discover first, request the exact scope, then re-check consent status.</p>
      </section>

      <section id="debugging-tips" className="space-y-4">
        <h2>Debugging tips</h2>
        <ul>
          <li>Use <code>/api/a2a/{"{agent}"}</code> only for browser-safe testing in the Agentic lane.</li>
          <li>Call direct MuleSoft endpoints from your backend only.</li>
          <li>Use <code>/developers/agent-kai</code> when the problem involves PKM, consent, REST, or MCP.</li>
          <li>Use <code>/developers/agentic-apis</code> when the problem involves A2A, enrichment, or activation flows.</li>
        </ul>
      </section>
    </>
  );
}
