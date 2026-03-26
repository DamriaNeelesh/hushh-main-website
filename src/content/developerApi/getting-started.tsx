import {
  CONSENT_FLOW_STEPS,
  DEVELOPER_ACCESS_NOTES,
  buildMcpSnippets,
  buildRestSnippets,
} from "../../lib/developers/content";
import { resolveDeveloperRuntime } from "../../lib/developers/runtime";

const runtime = resolveDeveloperRuntime();
const restSnippets = buildRestSnippets(runtime);
const mcpSnippets = buildMcpSnippets(runtime);

export const contentHeadings = [
  { text: "What you need", level: 2, slug: "what-you-need" },
  { text: "Pick your runtime path", level: 2, slug: "pick-your-runtime-path" },
  { text: "Follow the consent flow", level: 2, slug: "follow-the-consent-flow" },
  { text: "Move into the developer workspace", level: 2, slug: "move-into-the-developer-workspace" },
];

export const contentPlainText =
  "Start with the Kai developer runtime, pick REST or MCP, discover scopes, request consent in Kai, and then complete the Kai developer workspace setup.";

export default function GettingStartedDoc() {
  return (
    <>
      <section id="what-you-need" className="space-y-4">
        <h2>What you need</h2>
        <p>
          The live developer story is intentionally narrow: your app discovers user-specific PKM scopes,
          requests consent inside Kai, and reads only the slice the user approved. Start with the current
          runtime URLs, confirm your app identity in the developer console, and keep your integration
          scoped to one use case at a time.
        </p>
        <ul>
          <li>Kai app URL: <code>{runtime.appUrl}</code></li>
          <li>REST base URL: <code>{runtime.apiBaseUrl}</code></li>
          <li>MCP URL: <code>{runtime.mcpUrl}</code></li>
          <li>npm bridge: <code>{runtime.npmPackage}</code></li>
        </ul>
      </section>

      <section id="pick-your-runtime-path" className="space-y-4">
        <h2>Pick your runtime path</h2>
        <p>
          Use REST when you want an explicit HTTP workflow. Use remote MCP when your host supports it
          directly. Use the npm bridge when the host still expects a local stdio process.
        </p>
        <h3>REST quickstart</h3>
        <pre>
          <code>{restSnippets.discover}</code>
        </pre>
        <h3>Remote MCP quickstart</h3>
        <pre>
          <code>{mcpSnippets.remote}</code>
        </pre>
      </section>

      <section id="follow-the-consent-flow" className="space-y-4">
        <h2>Follow the consent flow</h2>
        <ol>
          {CONSENT_FLOW_STEPS.map((step) => (
            <li key={step.title}>
              <strong>{step.title}.</strong> {step.detail}
            </li>
          ))}
        </ol>
        <pre>
          <code>{restSnippets.requestConsent}</code>
        </pre>
      </section>

      <section id="move-into-the-developer-workspace" className="space-y-4">
        <h2>Move into the developer workspace</h2>
        <p>
          After the runtime is wired, use the developer workspace to enable access, rotate tokens,
          and keep your app identity current before asking real users for consent.
        </p>
        <ul>
          {DEVELOPER_ACCESS_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
