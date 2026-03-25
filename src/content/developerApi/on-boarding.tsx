import Link from "next/link";
import GenerateApiKey from "../../app/_components/developerApiContent/generateApiKey";
import ProfileSetup from "../../app/_components/developerApiContent/profileSetup";
import SessionToken from "../../app/_components/developerApiContent/sessionToken";
import ValidateToken from "../../app/_components/developerApiContent/validateToken";
import { DEVELOPER_ACCESS_NOTES } from "../../lib/developers/content";

export const contentHeadings = [
  { text: "Sign in with the active flow", level: 2, slug: "sign-in-with-the-active-flow" },
  { text: "Complete your developer profile", level: 2, slug: "complete-your-developer-profile" },
  { text: "Generate your API key", level: 2, slug: "generate-your-api-key" },
  { text: "Generate a session token", level: 2, slug: "generate-a-session-token" },
  { text: "Validate the runtime", level: 2, slug: "validate-the-runtime" },
  { text: "Before requesting consent", level: 2, slug: "before-requesting-consent" },
];

export const contentPlainText =
  "Use the live developer console flow to sign in, complete your profile, generate an API key, mint a session token, validate it, and prepare your Kai app identity before requesting user consent.";

export default function DeveloperOnboardingDoc() {
  return (
    <>
      <section id="sign-in-with-the-active-flow" className="space-y-4">
        <h2>Sign in with the active flow</h2>
        <p>
          The developer surface uses the active Supabase OAuth flow. Start from{" "}
          <Link href="/developers/login">/developers/login</Link>, finish Google or Apple sign-in,
          then return here to prepare your developer identity and runtime credentials.
        </p>
        <ul>
          {DEVELOPER_ACCESS_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section id="complete-your-developer-profile" className="space-y-4">
        <h2>Complete your developer profile</h2>
        <p>
          Your app identity is what users see during consent review inside Kai. Fill in your
          company details first so the approval request does not look anonymous or unfinished.
        </p>
        <ProfileSetup />
      </section>

      <section id="generate-your-api-key" className="space-y-4">
        <h2>Generate your API key</h2>
        <p>
          Generate the developer key after profile setup. Keep it secure and use it for the REST
          contract plus the browser-safe tooling on this site.
        </p>
        <GenerateApiKey />
      </section>

      <section id="generate-a-session-token" className="space-y-4">
        <h2>Generate a session token</h2>
        <p>
          Use the API key to mint a session token. This is the cleanest way to move from console
          setup into the request-consent and status-polling flow.
        </p>
        <SessionToken />
      </section>

      <section id="validate-the-runtime" className="space-y-4">
        <h2>Validate the runtime</h2>
        <p>
          Before you request real user consent, validate the session token once so you know the
          developer contract is wired correctly.
        </p>
        <ValidateToken />
      </section>

      <section id="before-requesting-consent" className="space-y-4">
        <h2>Before requesting consent</h2>
        <ul>
          <li>Keep your display name, support contact, and environment URLs current.</li>
          <li>Use <Link href="/developers/agent-kai">Agent Kai API Reference</Link> as the canonical contract source.</li>
          <li>Use <Link href="/agents">/agents</Link> only for browser-safe testing of the restored runtime.</li>
          <li>Request one narrow scope at a time before you expand into broader PKM branches.</li>
        </ul>
      </section>
    </>
  );
}
