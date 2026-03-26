import Link from "next/link";
import DeveloperAccessWorkspace from "../../app/_components/developerApiContent/DeveloperAccessWorkspace";
import {
  DEVELOPER_ACCESS_NOTES,
  buildWorkspaceSnippets,
} from "../../lib/developers/content";
import { resolveDeveloperRuntime } from "../../lib/developers/runtime";

const runtime = resolveDeveloperRuntime();
const workspaceSnippets = buildWorkspaceSnippets(runtime);

export const contentHeadings = [
  { text: "Sign in with the shared identity", level: 2, slug: "sign-in-with-the-shared-identity" },
  { text: "Enable developer access", level: 2, slug: "enable-developer-access" },
  { text: "Keep your app identity current", level: 2, slug: "keep-your-app-identity-current" },
  { text: "Use the token safely", level: 2, slug: "use-the-token-safely" },
];

export const contentPlainText =
  "Use the Kai developer workspace to sign in with shared Firebase identity, enable access, reveal a developer token once, keep the app identity current, and prepare your runtime before requesting user consent.";

export default function DeveloperOnboardingDoc() {
  return (
    <>
      <section id="sign-in-with-the-shared-identity" className="space-y-4">
        <h2>Sign in with the shared identity</h2>
        <p>
          The developer workspace uses the same Firebase identity project as Kai. Start from{" "}
          <Link href="/developers/login">/developers/login</Link> or sign in inline below with
          Google or Apple, then keep all access and profile changes tied to that single account.
        </p>
        <ul>
          {DEVELOPER_ACCESS_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section id="enable-developer-access" className="space-y-4">
        <h2>Enable developer access</h2>
        <p>
          Use the local Kai workspace below to enable access, reveal a token once, rotate that
          token when needed, and keep your app identity aligned with what users see during
          consent review inside Kai.
        </p>
        <DeveloperAccessWorkspace runtime={runtime} />
      </section>

      <section id="keep-your-app-identity-current" className="space-y-4">
        <h2>Keep your app identity current</h2>
        <p>
          Your display name, site URL, support URL, policy URL, and brand image are part of the
          trust surface. Users see this identity when they approve or review consent, so do not
          leave it blank or stale.
        </p>
        <ul>
          <li>Use a human-readable app name that matches your product.</li>
          <li>Keep support and policy links live before you request real user consent.</li>
          <li>Rotate the token whenever team ownership or local secrets change.</li>
        </ul>
      </section>

      <section id="use-the-token-safely" className="space-y-4">
        <h2>Use the token safely</h2>
        <p>
          The raw developer token is only revealed after enable or rotate. Save it immediately,
          put it in your environment as an opaque secret, and use the runtime URLs below as the
          canonical setup shortcuts.
        </p>
        <pre>
          <code>{`${workspaceSnippets.envVar}\n${workspaceSnippets.remoteUrl}`}</code>
        </pre>
        <ul>
          <li>Use <Link href="/developers/agent-kai">Agent Kai API Reference</Link> as the canonical contract source.</li>
          <li>Keep the raw token in a secure secret store, not in client code or shared screenshots.</li>
          <li>Use <code>?token=&lt;developer-token&gt;</code> only where the Kai reference explicitly documents it.</li>
          <li>Request one narrow scope at a time before expanding into broader PKM branches.</li>
        </ul>
      </section>
    </>
  );
}
