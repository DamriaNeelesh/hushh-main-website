import {
  DEVELOPER_SAMPLE_PAYLOADS,
  DEVELOPER_SCOPE_NOTES,
  PUBLIC_SCOPE_PATTERNS,
  PUBLIC_TOOL_NAMES,
} from "../../lib/developers/content";

export const contentHeadings = [
  { text: "PKM domains", level: 2, slug: "pkm-domains" },
  { text: "Tool and scope grammar", level: 2, slug: "tool-and-scope-grammar" },
  { text: "Payload expectations", level: 2, slug: "payload-expectations" },
  { text: "Runtime notes", level: 2, slug: "runtime-notes" },
];

export const contentPlainText =
  "Scopes are discovered from the user PKM at runtime. Use the canonical tool names, request one scope at a time, and read only the approved branch.";

export default function DataResourcesDoc() {
  return (
    <>
      <section id="pkm-domains" className="space-y-4">
        <h2>PKM domains</h2>
        <p>
          The public developer surface is PKM-first. You do not start from a hardcoded global catalog of
          business objects. You discover what exists for a specific user, then request access to the exact
          branch you need.
        </p>
      </section>

      <section id="tool-and-scope-grammar" className="space-y-4">
        <h2>Tool and scope grammar</h2>
        <p>These tool names and scope patterns are the public contract today.</p>
        <ul>
          {PUBLIC_TOOL_NAMES.map((tool) => (
            <li key={tool}>
              <code>{tool}</code>
            </li>
          ))}
        </ul>
        <ul>
          {PUBLIC_SCOPE_PATTERNS.map((scope) => (
            <li key={scope}>
              <code>{scope}</code>
            </li>
          ))}
        </ul>
      </section>

      <section id="payload-expectations" className="space-y-4">
        <h2>Payload expectations</h2>
        {DEVELOPER_SAMPLE_PAYLOADS.map((payload) => (
          <div key={payload.title} className="space-y-3">
            <h3>{payload.title}</h3>
            <p>{payload.description}</p>
            <pre>
              <code>{payload.code}</code>
            </pre>
          </div>
        ))}
      </section>

      <section id="runtime-notes" className="space-y-4">
        <h2>Runtime notes</h2>
        <ul>
          {DEVELOPER_SCOPE_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
