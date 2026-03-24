/*@jsxRuntime automatic @jsxImportSource react*/
import ApiSection from '../../app/_components/developerApiContent/apiTester';
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    h3: "h3",
    ul: "ul",
    li: "li",
    code: "code",
    pre: "pre"
  }, props.components), {Steps, Callout} = _components;
  if (!Callout) _missingContentReference("Callout", true);
  if (!Steps) _missingContentReference("Steps", true);
  return <><_components.h1>{"Profile Data and Enrichment"}</_components.h1>{"\n"}<_components.p>{"This page explains how brand teams build a consent-first profile pipeline using MuleSoft agentic APIs and optional Plaid signals."}</_components.p>{"\n"}<_components.h2>{"The data pipeline"}</_components.h2>{"\n"}<Steps><_components.h3>{"1) Consent and identity"}</_components.h3><_components.p>{"Collect the minimum identifiers required for enrichment and request user consent."}</_components.p><_components.h3>{"2) Profile creation or query"}</_components.h3><_components.p>{"Create a new profile or retrieve an existing one from Supabase."}</_components.p><_components.h3>{"3) Public and Gemini enrichment"}</_components.h3><_components.p>{"Generate a complete profile with public data and high-confidence gap filling."}</_components.p><_components.h3>{"4) Brand preference normalization"}</_components.h3><_components.p>{"Translate signals into likes, dislikes, and brand affinities for CRM activation."}</_components.p><_components.h3>{"5) Activation"}</_components.h3><_components.p>{"Store the merged profile in your CRM, CDP, or personalization system."}</_components.p></Steps>{"\n"}<_components.h2>{"MuleSoft flow"}</_components.h2>{"\n"}<_components.p>{"MuleSoft orchestrates the agent chain, applies retry logic, and normalizes responses through DataWeave before data is stored or activated."}</_components.p>{"\n"}<_components.h2>{"Plaid signals (optional)"}</_components.h2>{"\n"}<_components.p>{"Plaid is used to enrich merchant and category signals that strengthen brand affinity modeling."}</_components.p>{"\n"}<Callout type="warning"><_components.p>{"Plaid calls must be server to server. Do not run Plaid endpoints from the browser."}</_components.p></Callout>{"\n"}<_components.p>{"Common Plaid endpoints in this flow:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li><_components.code>{"POST /link/token/create"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"POST /item/public_token/exchange"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"POST /accounts/get"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"POST /transactions/sync"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"POST /identity/get"}</_components.code>{" (if identity is consented)"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"Map Plaid outputs into brand affinity fields before calling the Brand agent."}</_components.p>{"\n"}<_components.h2>{"Testable endpoints"}</_components.h2>{"\n"}<_components.h3>{"Supabase Profile Creation Agent"}</_components.h3>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/hushh-profile",
    description: "Create a Supabase profile",
    requestBody: {
      text: {
        type: "string",
        example: "Create a profile for Sundar Pichai with email sundar.pichai@example.com, phone +1 6505559001, occupation CEO, city Mountain View, and country USA."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Supabase Profile Update Agent"}</_components.h3>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/hushh-profile-update",
    description: "Update an existing Supabase profile",
    requestBody: {
      text: {
        type: "string",
        example: "Update the city for Sundar Pichai to Mountain View and set the occupation to CEO."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Supabase Profile Query Agent"}</_components.h3>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/hushh",
    description: "Query a Supabase profile by phone or email",
    requestBody: {
      text: {
        type: "string",
        example: "Fetch all details for Sundar Pichai with phone +1 6505559001."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"OpenAI Public Data Agent"}</_components.h3>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/public",
    description: "Public data enrichment",
    requestBody: {
      text: {
        type: "string",
        example: "Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Gemini Public Data Agent"}</_components.h3>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/gemini",
    description: "Second-pass enrichment",
    requestBody: {
      text: {
        type: "string",
        example: "Using the Gemini Public Data Agent, provide a detailed JSON profile for Sundar Pichai with email sundar.pichai@example.com and phone +1 6505559001, including demographics, lifestyle, and intent fields."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Brand User Data Query Agent"}</_components.h3>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/brand",
    description: "Normalize likes, dislikes, and brand affinities",
    requestBody: {
      text: {
        type: "string",
        example: "Summarize likes, dislikes, and brand affinity for Sundar Pichai using the consented profile."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h2>{"Quickstart prompts (paste into the Api Tester)"}</_components.h2>{"\n"}<_components.p>{"Use these prompts in the "}<_components.code>{"text"}</_components.code>{" field for the endpoints above."}</_components.p>{"\n"}<_components.h3>{"Create a profile (Supabase Profile Creation Agent)"}</_components.h3>{"\n"}<_components.pre><_components.code>{"Create a profile for Sundar Pichai with email sundar.pichai@example.com, phone +1 6505559001, occupation CEO, city Mountain View, and country USA.\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Update a profile (Supabase Profile Update Agent)"}</_components.h3>{"\n"}<_components.pre><_components.code>{"Update the city for Sundar Pichai to Mountain View and set the occupation to CEO.\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Query an existing profile (Supabase Profile Query Agent)"}</_components.h3>{"\n"}<_components.pre><_components.code>{"Fetch all details for Sundar Pichai with phone +1 6505559001.\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Enrich with OpenAI Public Data Agent"}</_components.h3>{"\n"}<_components.pre><_components.code>{"Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Enrich with Gemini Public Data Agent"}</_components.h3>{"\n"}<_components.pre><_components.code>{"Using the Gemini Public Data Agent, provide a detailed JSON profile for Sundar Pichai with email sundar.pichai@example.com and phone +1 6505559001, including demographics, lifestyle, and intent fields.\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Normalize brand affinities (Brand User Data Query Agent)"}</_components.h3>{"\n"}<_components.pre><_components.code>{"Summarize likes, dislikes, and brand affinity for Sundar Pichai using the consented profile.\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Example merged profile output"}</_components.h2>{"\n"}<_components.pre><_components.code className="language-json">{"{\n  \"fullName\": \"Sundar Pichai\",\n  \"email\": \"sundar.pichai@example.com\",\n  \"phone\": \"+1 6505559001\",\n  \"likes\": [\"fine leather goods\", \"limited drops\", \"Paris fashion week\"],\n  \"dislikes\": [\"fast fashion\", \"discount-only messaging\"],\n  \"brand_affinities\": [\"Dior\", \"Louis Vuitton\", \"Sephora\"],\n  \"shopping_preferences\": {\n    \"category_focus\": [\"handbags\", \"beauty\", \"fragrance\"],\n    \"price_sensitivity\": \"low\",\n    \"channel\": \"in-store and VIP events\"\n  },\n  \"confidence\": 0.86\n}\n"}</_components.code></_components.pre></>;
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
    "text": "The data pipeline",
    "level": 2,
    "slug": "the-data-pipeline"
  },
  {
    "text": "1) Consent and identity",
    "level": 3,
    "slug": "1-consent-and-identity"
  },
  {
    "text": "2) Profile creation or query",
    "level": 3,
    "slug": "2-profile-creation-or-query"
  },
  {
    "text": "3) Public and Gemini enrichment",
    "level": 3,
    "slug": "3-public-and-gemini-enrichment"
  },
  {
    "text": "4) Brand preference normalization",
    "level": 3,
    "slug": "4-brand-preference-normalization"
  },
  {
    "text": "5) Activation",
    "level": 3,
    "slug": "5-activation"
  },
  {
    "text": "MuleSoft flow",
    "level": 2,
    "slug": "mulesoft-flow"
  },
  {
    "text": "Plaid signals (optional)",
    "level": 2,
    "slug": "plaid-signals-optional"
  },
  {
    "text": "Testable endpoints",
    "level": 2,
    "slug": "testable-endpoints"
  },
  {
    "text": "Supabase Profile Creation Agent",
    "level": 3,
    "slug": "supabase-profile-creation-agent"
  },
  {
    "text": "Supabase Profile Update Agent",
    "level": 3,
    "slug": "supabase-profile-update-agent"
  },
  {
    "text": "Supabase Profile Query Agent",
    "level": 3,
    "slug": "supabase-profile-query-agent"
  },
  {
    "text": "OpenAI Public Data Agent",
    "level": 3,
    "slug": "openai-public-data-agent"
  },
  {
    "text": "Gemini Public Data Agent",
    "level": 3,
    "slug": "gemini-public-data-agent"
  },
  {
    "text": "Brand User Data Query Agent",
    "level": 3,
    "slug": "brand-user-data-query-agent"
  },
  {
    "text": "Quickstart prompts (paste into the Api Tester)",
    "level": 2,
    "slug": "quickstart-prompts-paste-into-the-api-tester"
  },
  {
    "text": "Create a profile (Supabase Profile Creation Agent)",
    "level": 3,
    "slug": "create-a-profile-supabase-profile-creation-agent"
  },
  {
    "text": "Update a profile (Supabase Profile Update Agent)",
    "level": 3,
    "slug": "update-a-profile-supabase-profile-update-agent"
  },
  {
    "text": "Query an existing profile (Supabase Profile Query Agent)",
    "level": 3,
    "slug": "query-an-existing-profile-supabase-profile-query-agent"
  },
  {
    "text": "Enrich with OpenAI Public Data Agent",
    "level": 3,
    "slug": "enrich-with-openai-public-data-agent"
  },
  {
    "text": "Enrich with Gemini Public Data Agent",
    "level": 3,
    "slug": "enrich-with-gemini-public-data-agent"
  },
  {
    "text": "Normalize brand affinities (Brand User Data Query Agent)",
    "level": 3,
    "slug": "normalize-brand-affinities-brand-user-data-query-agent"
  },
  {
    "text": "Example merged profile output",
    "level": 2,
    "slug": "example-merged-profile-output"
  }
];
export const contentPlainText = "Profile Data and Enrichment This page explains how brand teams build a consent first profile pipeline using MuleSoft agentic APIs and optional Plaid signals. The data pipeline 1) Consent and identity Collect the minimum identifiers required for enrichment and request user consent. 2) Profile creation or query Create a new profile or retrieve an existing one from Supabase. 3) Public and Gemini enrichment Generate a complete profile with public data and high confidence gap filling. 4) Brand preference normalization Translate signals into likes, dislikes, and brand affinities for CRM activation. 5) Activation Store the merged profile in your CRM, CDP, or personalization system. MuleSoft flow MuleSoft orchestrates the agent chain, applies retry logic, and normalizes responses through DataWeave before data is stored or activated. Plaid signals (optional) Plaid is used to enrich merchant and category signals that strengthen brand affinity modeling. Plaid calls must be server to server. Do not run Plaid endpoints from the browser. Common Plaid endpoints in this flow: (if identity is consented) Map Plaid outputs into brand affinity fields before calling the Brand agent. Testable endpoints Supabase Profile Creation Agent Supabase Profile Update Agent Supabase Profile Query Agent OpenAI Public Data Agent Gemini Public Data Agent Brand User Data Query Agent Quickstart prompts (paste into the Api Tester) Use these prompts in the field for the endpoints above. Create a profile (Supabase Profile Creation Agent) Update a profile (Supabase Profile Update Agent) Query an existing profile (Supabase Profile Query Agent) Enrich with OpenAI Public Data Agent Enrich with Gemini Public Data Agent Normalize brand affinities (Brand User Data Query Agent) Example merged profile output";
