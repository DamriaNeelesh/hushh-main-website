/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    ul: "ul",
    li: "li",
    pre: "pre",
    code: "code",
    h3: "h3"
  }, props.components), {Callout, Steps} = _components;
  if (!Callout) _missingContentReference("Callout", true);
  if (!Steps) _missingContentReference("Steps", true);
  return <><_components.h1>{"Brand Engineering Onboarding (Hushh Agentic Developer APIs)"}</_components.h1>{"\n"}<_components.p>{"This guide is for enterprise brand engineering teams at LVMH, Reliance, and similar groups. It explains how to activate consented customer intelligence using Hushh Agentic Developer APIs orchestrated by MuleSoft."}</_components.p>{"\n"}<_components.h2>{"Outcomes (product)"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Faster onboarding with fewer forms and higher opt-in rates"}</_components.li>{"\n"}<_components.li>{"Rich customer profiles that power personalization and clienteling"}</_components.li>{"\n"}<_components.li>{"A consistent consent and audit model across brands and regions"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Architecture (engineering)"}</_components.h2>{"\n"}<_components.pre><_components.code>{"Brand app or data pipeline\n  -> Hushh Agentic Developer APIs (/api/a2a)\n  -> MuleSoft agent mesh (JSON-RPC 2.0)\n  -> Public + Gemini enrichment\n  -> Supabase profile create/query/update\n  -> Brand CRM normalization\n  -> CRM / CDP / personalization\n"}</_components.code></_components.pre>{"\n"}<Callout type="info"><_components.p>{"All profile access requires explicit user consent. Request consent before enrichment or activation."}</_components.p></Callout>{"\n"}<_components.h2>{"Guided onboarding"}</_components.h2>{"\n"}<Steps><_components.h3>{"1) Create your developer account"}</_components.h3><_components.p>{"Set up your org profile so consent prompts display your brand identity."}</_components.p><_components.h3>{"2) Verify your data flows"}</_components.h3><_components.p>{"Confirm your profile creation and query calls in the sandbox."}</_components.p><_components.h3>{"3) Enable enrichment"}</_components.h3><_components.p>{"Turn on Public Data and Gemini Data agents for higher-confidence profiles."}</_components.p><_components.h3>{"4) Normalize brand affinities"}</_components.h3><_components.p>{"Use the Brand User Data Query Agent to produce CRM-ready likes and dislikes."}</_components.p><_components.h3>{"5) Optional: Plaid signals"}</_components.h3><_components.p>{"If enabled, map Plaid merchant and category data into brand affinity fields before CRM activation."}</_components.p></Steps>{"\n"}<_components.h2>{"End-to-end example (Sundar Pichai)"}</_components.h2>{"\n"}<_components.h3>{"Create a profile"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-http">{"POST /api/a2a/hushh-profile\nContent-Type: application/json\n\n{\n  \"text\": \"Create a profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\"\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Enrich with OpenAI and Gemini"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-http">{"POST /api/a2a/public\nContent-Type: application/json\n\n{\n  \"text\": \"Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\"\n}\n"}</_components.code></_components.pre>{"\n"}<_components.pre><_components.code className="language-http">{"POST /api/a2a/gemini\nContent-Type: application/json\n\n{\n  \"text\": \"Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\"\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Normalize likes, dislikes, and brand affinity"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-http">{"POST /api/a2a/brand\nContent-Type: application/json\n\n{\n  \"text\": \"Summarize likes, dislikes, and brand affinity for Sundar Pichai.\"\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Merge and activate"}</_components.h3>{"\n"}<_components.p>{"Merge in this order for best accuracy:\n"}<_components.code>{"brand -> hushh -> public -> gemini"}</_components.code></_components.p>{"\n"}<_components.h2>{"Why this matters for LVMH and Reliance"}</_components.h2>{"\n"}<_components.h3>{"LVMH"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Cross-maison clienteling with verified preferences"}</_components.li>{"\n"}<_components.li>{"Premium experiences powered by consented signals"}</_components.li>{"\n"}<_components.li>{"Higher conversion in VIP outreach and private events"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"Reliance"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Unified profiles across retail, telecom, and digital ecosystems"}</_components.li>{"\n"}<_components.li>{"Faster segmentation for loyalty and omnichannel engagement"}</_components.li>{"\n"}<_components.li>{"Lower cold-start friction for new users and regions"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Next steps"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Review the agent endpoints in "}<_components.code>{"/developers/rootEndpoints"}</_components.code></_components.li>{"\n"}<_components.li>{"See detailed agent behavior in "}<_components.code>{"/developers/agent-reference"}</_components.code></_components.li>{"\n"}<_components.li>{"Explore the profile pipeline in "}<_components.code>{"/developers/data-retrieval-insertion"}</_components.code></_components.li>{"\n"}</_components.ul></>;
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
    "text": "Outcomes (product)",
    "level": 2,
    "slug": "outcomes-product"
  },
  {
    "text": "Architecture (engineering)",
    "level": 2,
    "slug": "architecture-engineering"
  },
  {
    "text": "Guided onboarding",
    "level": 2,
    "slug": "guided-onboarding"
  },
  {
    "text": "1) Create your developer account",
    "level": 3,
    "slug": "1-create-your-developer-account"
  },
  {
    "text": "2) Verify your data flows",
    "level": 3,
    "slug": "2-verify-your-data-flows"
  },
  {
    "text": "3) Enable enrichment",
    "level": 3,
    "slug": "3-enable-enrichment"
  },
  {
    "text": "4) Normalize brand affinities",
    "level": 3,
    "slug": "4-normalize-brand-affinities"
  },
  {
    "text": "5) Optional: Plaid signals",
    "level": 3,
    "slug": "5-optional-plaid-signals"
  },
  {
    "text": "End-to-end example (Sundar Pichai)",
    "level": 2,
    "slug": "end-to-end-example-sundar-pichai"
  },
  {
    "text": "Create a profile",
    "level": 3,
    "slug": "create-a-profile"
  },
  {
    "text": "Enrich with OpenAI and Gemini",
    "level": 3,
    "slug": "enrich-with-openai-and-gemini"
  },
  {
    "text": "Normalize likes, dislikes, and brand affinity",
    "level": 3,
    "slug": "normalize-likes-dislikes-and-brand-affinity"
  },
  {
    "text": "Merge and activate",
    "level": 3,
    "slug": "merge-and-activate"
  },
  {
    "text": "Why this matters for LVMH and Reliance",
    "level": 2,
    "slug": "why-this-matters-for-lvmh-and-reliance"
  },
  {
    "text": "LVMH",
    "level": 3,
    "slug": "lvmh"
  },
  {
    "text": "Reliance",
    "level": 3,
    "slug": "reliance"
  },
  {
    "text": "Next steps",
    "level": 2,
    "slug": "next-steps"
  }
];
export const contentPlainText = "Brand Engineering Onboarding (Hushh Agentic Developer APIs) This guide is for enterprise brand engineering teams at LVMH, Reliance, and similar groups. It explains how to activate consented customer intelligence using Hushh Agentic Developer APIs orchestrated by MuleSoft. Outcomes (product) Faster onboarding with fewer forms and higher opt in rates Rich customer profiles that power personalization and clienteling A consistent consent and audit model across brands and regions Architecture (engineering) All profile access requires explicit user consent. Request consent before enrichment or activation. Guided onboarding 1) Create your developer account Set up your org profile so consent prompts display your brand identity. 2) Verify your data flows Confirm your profile creation and query calls in the sandbox. 3) Enable enrichment Turn on Public Data and Gemini Data agents for higher confidence profiles. 4) Normalize brand affinities Use the Brand User Data Query Agent to produce CRM ready likes and dislikes. 5) Optional: Plaid signals If enabled, map Plaid merchant and category data into brand affinity fields before CRM activation. End to end example (Sundar Pichai) Create a profile Enrich with OpenAI and Gemini Normalize likes, dislikes, and brand affinity Merge and activate Merge in this order for best accuracy: Why this matters for LVMH and Reliance LVMH Cross maison clienteling with verified preferences Premium experiences powered by consented signals Higher conversion in VIP outreach and private events Reliance Unified profiles across retail, telecom, and digital ecosystems Faster segmentation for loyalty and omnichannel engagement Lower cold start friction for new users and regions Next steps Review the agent endpoints in See detailed agent behavior in Explore the profile pipeline in";
