/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    pre: "pre",
    code: "code",
    ol: "ol",
    li: "li",
    ul: "ul",
    h3: "h3"
  }, props.components), {Callout} = _components;
  if (!Callout) _missingContentReference("Callout", true);
  return <><_components.h1>{"Agent Reference"}</_components.h1>{"\n"}<_components.p>{"This page documents the core MuleSoft agents behind the Hushh Agentic Developer APIs."}</_components.p>{"\n"}<_components.h2>{"A2A JSON-RPC 2.0 envelope"}</_components.h2>{"\n"}<_components.pre><_components.code className="language-json">{"{\n  \"jsonrpc\": \"2.0\",\n  \"id\": \"task-124\",\n  \"method\": \"tasks/send\",\n  \"params\": {\n    \"sessionId\": \"session-456\",\n    \"message\": {\n      \"role\": \"user\",\n      \"parts\": [\n        {\n          \"type\": \"text\",\n          \"text\": \"Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\"\n        }\n      ]\n    }\n  }\n}\n"}</_components.code></_components.pre>{"\n"}<Callout type="info"><_components.p>{"For browser-based testing, use "}<_components.code>{"/api/a2a/{agent}"}</_components.code>{". Use direct MuleSoft endpoints from your backend only."}</_components.p></Callout>{"\n"}<_components.h2>{"Integration flow in Hushh"}</_components.h2>{"\n"}<_components.ol>{"\n"}<_components.li>{"User submits name, email, and phone"}</_components.li>{"\n"}<_components.li>{"MuleSoft constructs the JSON-RPC request"}</_components.li>{"\n"}<_components.li>{"Agent responds with a "}<_components.code>{"userProfile"}</_components.code>{" JSON payload"}</_components.li>{"\n"}<_components.li>{"DataWeave transforms and stores the profile in Hushh data stores"}</_components.li>{"\n"}</_components.ol>{"\n"}<_components.h2>{"Error handling"}</_components.h2>{"\n"}<table><thead><tr><th>{"Code"}</th><th>{"Description"}</th><th>{"Resolution"}</th></tr></thead><tbody><tr><td>{"400"}</td><td>{"Invalid JSON-RPC format"}</td><td>{"Validate the request body schema"}</td></tr><tr><td>{"401"}</td><td>{"Unauthorized"}</td><td>{"Check credentials or rotate keys"}</td></tr><tr><td>{"500"}</td><td>{"Internal agent error"}</td><td>{"Retry with backoff or contact support"}</td></tr><tr><td>{"TIMEOUT"}</td><td>{"Agent took too long"}</td><td>{"Reduce payload size or split requests"}</td></tr></tbody></table>{"\n"}<_components.h2>{"OpenAI Public Data Agent"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Purpose: enrich profiles from public signals"}</_components.li>{"\n"}<_components.li>{"Model: GPT-4.0 mini"}</_components.li>{"\n"}<_components.li>{"Proxy endpoint: "}<_components.code>{"POST /api/a2a/public"}</_components.code></_components.li>{"\n"}<_components.li>{"MuleSoft endpoint: "}<_components.code>{"https://hushh-open-ai-agent-app-bubqpu.5sc6y6-3.usa-e2.cloudhub.io/public-data-agent"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"Sample prompt (Sundar Pichai)"}</_components.h3>{"\n"}<_components.pre><_components.code>{"Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Sample response (trimmed)"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-json">{"{\n  \"jsonrpc\": \"2.0\",\n  \"id\": \"task-124\",\n  \"result\": {\n    \"sessionId\": \"session-456\",\n    \"status\": {\n      \"state\": \"completed\",\n      \"message\": {\n        \"role\": \"agent\",\n        \"parts\": [\n          {\n            \"type\": \"text\",\n            \"text\": {\n              \"userProfile\": {\n                \"fullName\": \"Sundar Pichai\",\n                \"phone\": \"+1 6505559001\",\n                \"email\": \"sundar.pichai@example.com\",\n                \"city\": \"Mountain View\",\n                \"occupation\": \"CEO\",\n                \"dietPreference\": \"Vegetarian\"\n              }\n            }\n          }\n        ]\n      }\n    }\n  }\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Gemini Public Data Agent"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Purpose: high-confidence enrichment and gap filling"}</_components.li>{"\n"}<_components.li>{"Model: gemini-2.5-pro"}</_components.li>{"\n"}<_components.li>{"Proxy endpoint: "}<_components.code>{"POST /api/a2a/gemini"}</_components.code></_components.li>{"\n"}<_components.li>{"MuleSoft endpoint: "}<_components.code>{"https://hushh-gemini-ai-agent-app-bubqpu.5sc6y6-3.usa-e2.cloudhub.io/public-data-agent"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Supabase Profile Creation Agent"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Purpose: create a structured profile from natural language"}</_components.li>{"\n"}<_components.li>{"Proxy endpoint: "}<_components.code>{"POST /api/a2a/hushh-profile"}</_components.code></_components.li>{"\n"}<_components.li>{"MuleSoft endpoint: "}<_components.code>{"https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"Example prompt:"}</_components.p>{"\n"}<_components.pre><_components.code>{"Create a profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Supabase Profile Update Agent"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Purpose: update profile fields with natural language"}</_components.li>{"\n"}<_components.li>{"Proxy endpoint: "}<_components.code>{"POST /api/a2a/hushh-profile-update"}</_components.code></_components.li>{"\n"}<_components.li>{"MuleSoft endpoint: "}<_components.code>{"https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"Example prompt:"}</_components.p>{"\n"}<_components.pre><_components.code>{"Update the city for Sundar Pichai to Mountain View.\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Supabase Profile Query Agent"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Purpose: fetch full profiles from Supabase"}</_components.li>{"\n"}<_components.li>{"Proxy endpoint: "}<_components.code>{"POST /api/a2a/hushh"}</_components.code></_components.li>{"\n"}<_components.li>{"MuleSoft endpoint: "}<_components.code>{"https://hushh-supabase-query-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-query-agent"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"Example prompt:"}</_components.p>{"\n"}<_components.pre><_components.code>{"Fetch all details for Sundar Pichai with phone +1 6505559001.\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Brand User Data Query Agent"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Purpose: retrieve brand preferences and CRM-ready insights"}</_components.li>{"\n"}<_components.li>{"Model: GPT-4.0 mini"}</_components.li>{"\n"}<_components.li>{"Proxy endpoint: "}<_components.code>{"POST /api/a2a/brand"}</_components.code></_components.li>{"\n"}<_components.li>{"MuleSoft endpoint: "}<_components.code>{"https://hushh-brand-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/crm-agent"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"This agent acts as the bridge between brand assistants and CRM data, returning a conversational summary plus structured insights."}</_components.p>{"\n"}<_components.p>{"Example prompt:"}</_components.p>{"\n"}<_components.pre><_components.code>{"Summarize brand preferences and purchase intents for Sundar Pichai.\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Example queries"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Fetch all details for Sundar Pichai with phone +1 6505559001."}</_components.li>{"\n"}<_components.li>{"Fetch all intents for Sundar Pichai with phone +1 6505559001."}</_components.li>{"\n"}<_components.li>{"Fetch all wants and desires for Sundar Pichai with phone +1 6505559001."}</_components.li>{"\n"}<_components.li>{"What is the occupation and education level for Sundar Pichai?"}</_components.li>{"\n"}</_components.ul></>;
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
    "text": "A2A JSON-RPC 2.0 envelope",
    "level": 2,
    "slug": "a2a-json-rpc-20-envelope"
  },
  {
    "text": "Integration flow in Hushh",
    "level": 2,
    "slug": "integration-flow-in-hushh"
  },
  {
    "text": "Error handling",
    "level": 2,
    "slug": "error-handling"
  },
  {
    "text": "OpenAI Public Data Agent",
    "level": 2,
    "slug": "openai-public-data-agent"
  },
  {
    "text": "Sample prompt (Sundar Pichai)",
    "level": 3,
    "slug": "sample-prompt-sundar-pichai"
  },
  {
    "text": "Sample response (trimmed)",
    "level": 3,
    "slug": "sample-response-trimmed"
  },
  {
    "text": "Gemini Public Data Agent",
    "level": 2,
    "slug": "gemini-public-data-agent"
  },
  {
    "text": "Supabase Profile Creation Agent",
    "level": 2,
    "slug": "supabase-profile-creation-agent"
  },
  {
    "text": "Supabase Profile Update Agent",
    "level": 2,
    "slug": "supabase-profile-update-agent"
  },
  {
    "text": "Supabase Profile Query Agent",
    "level": 2,
    "slug": "supabase-profile-query-agent"
  },
  {
    "text": "Brand User Data Query Agent",
    "level": 2,
    "slug": "brand-user-data-query-agent"
  },
  {
    "text": "Example queries",
    "level": 3,
    "slug": "example-queries"
  }
];
export const contentPlainText = "Agent Reference This page documents the core MuleSoft agents behind the Hushh Agentic Developer APIs. A2A JSON RPC 2.0 envelope For browser based testing, use . Use direct MuleSoft endpoints from your backend only. Integration flow in Hushh 1) User submits name, email, and phone 2) MuleSoft constructs the JSON RPC request 3) Agent responds with a JSON payload 4) DataWeave transforms and stores the profile in Hushh data stores Error handling Code Description Resolution 400 Invalid JSON RPC format Validate the request body schema 401 Unauthorized Check credentials or rotate keys 500 Internal agent error Retry with backoff or contact support TIMEOUT Agent took too long Reduce payload size or split requests OpenAI Public Data Agent Purpose: enrich profiles from public signals Model: GPT 4.0 mini Proxy endpoint: MuleSoft endpoint: Sample prompt (Sundar Pichai) Sample response (trimmed) Gemini Public Data Agent Purpose: high confidence enrichment and gap filling Model: gemini 2.5 pro Proxy endpoint: MuleSoft endpoint: Supabase Profile Creation Agent Purpose: create a structured profile from natural language Proxy endpoint: MuleSoft endpoint: Example prompt: Supabase Profile Update Agent Purpose: update profile fields with natural language Proxy endpoint: MuleSoft endpoint: Example prompt: Supabase Profile Query Agent Purpose: fetch full profiles from Supabase Proxy endpoint: MuleSoft endpoint: Example prompt: Brand User Data Query Agent Purpose: retrieve brand preferences and CRM ready insights Model: GPT 4.0 mini Proxy endpoint: MuleSoft endpoint: This agent acts as the bridge between brand assistants and CRM data, returning a conversational summary plus structured insights. Example prompt: Example queries Fetch all details for Sundar Pichai with phone +1 6505559001. Fetch all intents for Sundar Pichai with phone +1 6505559001. Fetch all wants and desires for Sundar Pichai with phone +1 6505559001. What is the occupation and education level for Sundar Pichai?";
