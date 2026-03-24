/*@jsxRuntime automatic @jsxImportSource react*/
import StepProcess from '../../app/_components/developerApiContent/StepProcess';
import InteractiveEndpoint from '../../app/_components/developerApiContent/InteractiveEndpoint';
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    h2: "h2",
    p: "p",
    code: "code",
    pre: "pre",
    ul: "ul",
    li: "li",
    a: "a"
  }, props.components), {Callout} = _components;
  if (!Callout) _missingContentReference("Callout", true);
  return <><_components.h1>{"Getting Started"}</_components.h1>{"\n"}<_components.h2>{"Overview"}</_components.h2>{"\n"}<_components.p>{"Hushh Agentic Developer APIs let you build consent-first personalization with A2A (Agent-to-Agent) JSON-RPC 2.0 workflows. Use the testable "}<_components.code>{"/api/a2a/{agent}"}</_components.code>{" endpoints in the docs to prototype, then move server-to-server for production workloads."}</_components.p>{"\n"}<_components.h2>{"The story: from first signal to activated profile"}</_components.h2>{"\n"}<_components.p>{"Imagine a luxury retail app onboarding Ava. She shares her email, selects a few style preferences, and explicitly consents to profile enrichment. Your app then:"}</_components.p>{"\n"}<StepProcess steps={[{
    icon: "Fingerprint",
    title: "Consented Identity",
    description: "Create a clean profile record in Supabase with user consent.",
    snippet: "POST /v1/user/create"
  }, {
    icon: "Sparkles",
    title: "Agentic Enrichment",
    description: "Enrich profile with public and Gemini agents for deeper context.",
    snippet: "POST /v1/agents/enrich"
  }, {
    icon: "Database",
    title: "Normalization",
    description: "Normalize the profile into CRM-friendly likes, dislikes, and affinities.",
    snippet: "{ likes: ['Gucci', 'Prada'], dislikes: [] }"
  }, {
    icon: "Send",
    title: "Activation",
    description: "Activate that profile in your CDP or personalization engine.",
    snippet: "SYNC -> Salesforce CDP"
  }]} />{"\n"}<_components.p>{"The result is a profile that is consented, current, and actionable."}</_components.p>{"\n"}<_components.h2>{"Make your first request"}</_components.h2>{"\n"}<_components.p>{"Try it out right here. Use Ava as a reference profile to test the public agent."}</_components.p>{"\n"}<InteractiveEndpoint method="POST" path="/api/a2a/public" description="Enrich a profile using public data agents." curlCommand={`curl -X POST "https://hushh.ai/api/a2a/public" \\
  -H "Content-Type: application/json" \\
  -d "{\\"text\\":\\"Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\\",\\"sessionId\\":\\"session-123\\",\\"id\\":\\"task-abc123\\"}"`} responseExample={`{
  "jsonrpc": "2.0",
  "result": {
    "profile": {
      "name": "Sundar Pichai",
      "role": "CEO of Alphabet and Google",
      "known_for": ["Chrome", "Android", "Google Drive"],
      "affinities": ["Technology", "Leadership", "Product Management"]
    }
  },
  "id": "task-abc123"
}`} />{"\n"}<_components.h2>{"Example identity payload"}</_components.h2>{"\n"}<_components.pre><_components.code className="language-json">{"{\n  \"text\": \"Create a profile for Ava Torres with email ava.torres@example.com, phone +1 4155550199, city San Francisco, and interests luxury retail, travel, wellness.\",\n  \"sessionId\": \"session-456\",\n  \"id\": \"task-789\"\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Common pitfalls to avoid"}</_components.h2>{"\n"}<Callout type="warning"><_components.p>{"Do not use live endpoints from the browser implementation in production. Always move to server-to-server communication to protect your API keys."}</_components.p></Callout>{"\n"}<_components.ul>{"\n"}<_components.li>{"Skipping consent metadata before enrichment."}</_components.li>{"\n"}<_components.li>{"Storing raw agent outputs without normalization."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Next steps"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li><_components.a href="/developers/on-boarding">{"Developer console setup"}</_components.a></_components.li>{"\n"}<_components.li><_components.a href="/developers/rootEndpoints">{"Agentic endpoints"}</_components.a></_components.li>{"\n"}<_components.li><_components.a href="/developers/data-retrieval-insertion">{"Profile data and enrichment"}</_components.a></_components.li>{"\n"}<_components.li><_components.a href="/developers/use-cases">{"Use cases"}</_components.a></_components.li>{"\n"}</_components.ul></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}
function _missingContentReference(id: string, component: boolean) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}

export const contentMeta = {};
export const contentHeadings = [
  {
    "text": "Overview",
    "level": 2,
    "slug": "overview"
  },
  {
    "text": "The story: from first signal to activated profile",
    "level": 2,
    "slug": "the-story-from-first-signal-to-activated-profile"
  },
  {
    "text": "Make your first request",
    "level": 2,
    "slug": "make-your-first-request"
  },
  {
    "text": "Example identity payload",
    "level": 2,
    "slug": "example-identity-payload"
  },
  {
    "text": "Common pitfalls to avoid",
    "level": 2,
    "slug": "common-pitfalls-to-avoid"
  },
  {
    "text": "Next steps",
    "level": 2,
    "slug": "next-steps"
  }
];
export const contentPlainText = "Getting Started Overview Hushh Agentic Developer APIs let you build consent first personalization with A2A (Agent to Agent) JSON RPC 2.0 workflows. Use the testable endpoints in the docs to prototype, then move server to server for production workloads. The story: from first signal to activated profile Imagine a luxury retail app onboarding Ava. She shares her email, selects a few style preferences, and explicitly consents to profile enrichment. Your app then: Salesforce CDP\" } ]} / The result is a profile that is consented, current, and actionable. Make your first request Try it out right here. Use Ava as a reference profile to test the public agent. Example identity payload Common pitfalls to avoid Do not use live endpoints from the browser implementation in production. Always move to server to server communication to protect your API keys. Skipping consent metadata before enrichment. Storing raw agent outputs without normalization. Next steps Developer console setup Agentic endpoints Profile data and enrichment Use cases";
