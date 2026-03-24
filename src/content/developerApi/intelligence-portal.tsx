/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    ol: "ol",
    li: "li",
    hr: "hr",
    h2: "h2",
    ul: "ul",
    code: "code",
    blockquote: "blockquote",
    pre: "pre",
    h3: "h3"
  }, props.components);
  return <><_components.h1>{"Hushh Intelligence Portal — Post-Submit Results Guide (Agentic APIs)"}</_components.h1>{"\n"}<_components.p>{"The "}<_components.strong>{"Hushh Intelligence Portal"}</_components.strong>{" is an internal workflow in this repo that:"}</_components.p>{"\n"}<_components.ol>{"\n"}<_components.li>{"Collects a lead’s "}<_components.strong>{"Email"}</_components.strong>{", "}<_components.strong>{"Full Name"}</_components.strong>{", and "}<_components.strong>{"Phone"}</_components.strong></_components.li>{"\n"}<_components.li>{"Calls multiple "}<_components.strong>{"agentic APIs"}</_components.strong>{" in sequence"}</_components.li>{"\n"}<_components.li><_components.strong>{"Merges"}</_components.strong>{" all agent responses into one “best profile” (with "}<_components.strong>{"Gemini prioritized"}</_components.strong>{")"}</_components.li>{"\n"}<_components.li>{"Renders the "}<_components.strong>{"Analysis Complete"}</_components.strong>{" results screen with a structured breakdown of user details"}</_components.li>{"\n"}</_components.ol>{"\n"}<_components.p>{"This guide documents "}<_components.strong>{"exactly what is rendered after the user enters details"}</_components.strong>{" and how to reproduce the same behavior via APIs."}</_components.p>{"\n"}<_components.p>{"Portal entry (opens in a new tab):\n"}<a style={{
    color: "#1d4ed8",
    textDecoration: "underline",
    textDecorationColor: "#1d4ed8"
  }} href="https://hushh.ai/intelligence-portal" target="_blank" rel="noopener noreferrer">{"hushh.ai/intelligence-portal"}</a></_components.p>{"\n"}<_components.hr />{"\n"}<_components.h2>{"1) What happens after the user clicks “Analyze Profile”"}</_components.h2>{"\n"}<_components.p>{"The UI collects:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li><_components.code>{"email"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"fullName"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"countryCode"}</_components.code>{" (e.g., "}<_components.code>{"+91"}</_components.code>{", "}<_components.code>{"+1"}</_components.code>{")"}</_components.li>{"\n"}<_components.li><_components.code>{"phoneNumber"}</_components.code>{" (digits only; 10–15 digits)"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"Then the portal generates a "}<_components.strong>{"single detailed prompt"}</_components.strong>{" asking an agent to return a "}<_components.strong>{"strict JSON"}</_components.strong>{" profile that includes (examples):"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"user ID, full name, email, phone"}</_components.li>{"\n"}<_components.li>{"address, age, gender"}</_components.li>{"\n"}<_components.li>{"demographics (marital status, children)"}</_components.li>{"\n"}<_components.li>{"professional (occupation, education, income)"}</_components.li>{"\n"}<_components.li>{"lifestyle (diet, cuisine, gym)"}</_components.li>{"\n"}<_components.li>{"technology + interests"}</_components.li>{"\n"}<_components.li>{"needs/wants/desires"}</_components.li>{"\n"}<_components.li>{"intents for 24h / 48h / 72h"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.hr />{"\n"}<_components.h2>{"2) Which agents are called (and in what order)"}</_components.h2>{"\n"}<_components.p>{"The portal calls these agents "}<_components.strong>{"sequentially"}</_components.strong>{" (so progress can be displayed):"}</_components.p>{"\n"}<_components.ol>{"\n"}<_components.li><_components.code>{"brand"}</_components.code>{" — Brand/CRM Agent"}</_components.li>{"\n"}<_components.li><_components.code>{"hushh"}</_components.code>{" — Hushh (Supabase Query) Agent"}</_components.li>{"\n"}<_components.li><_components.code>{"public"}</_components.code>{" — OpenAI Public Data Agent"}</_components.li>{"\n"}<_components.li><_components.code>{"gemini"}</_components.code>{" — Gemini Public Data Agent"}</_components.li>{"\n"}</_components.ol>{"\n"}<_components.blockquote>{"\n"}<_components.p>{"Note: In the results merge logic, agents are merged in order "}<_components.strong>{"brand → hushh → public → gemini"}</_components.strong>{" so "}<_components.strong>{"Gemini overwrites/fills last"}</_components.strong>{" (i.e., Gemini is prioritized)."}</_components.p>{"\n"}</_components.blockquote>{"\n"}<_components.hr />{"\n"}<_components.h2>{"3) How the portal calls agents (the exact API path)"}</_components.h2>{"\n"}<_components.p>{"From the client, the portal calls the local proxy route:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-http">{"POST /api/a2a/{agent}\nContent-Type: application/json\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"So for example:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li><_components.code>{"/api/a2a/brand"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"/api/a2a/hushh"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"/api/a2a/public"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"/api/a2a/gemini"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.blockquote>{"\n"}<_components.p>{"If you’re calling from outside the app, use the fully-qualified site URL:\n"}<_components.code>{"https://hushh.ai/api/a2a/{agent}"}</_components.code></_components.p>{"\n"}</_components.blockquote>{"\n"}<_components.h3>{"Request body"}</_components.h3>{"\n"}<_components.p>{"The proxy accepts:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-json">{"{\n  \"text\": \"<prompt>\",\n  \"sessionId\": \"session-1735...\",\n  \"id\": \"task-abc123\"\n}\n"}</_components.code></_components.pre>{"\n"}<_components.p><_components.code>{"sessionId"}</_components.code>{" and "}<_components.code>{"id"}</_components.code>{" are optional."}</_components.p>{"\n"}<_components.hr />{"\n"}<_components.h2>{"4) Reproducing the portal with cURL (agent-by-agent)"}</_components.h2>{"\n"}<_components.p>{"Use the same prompt text you’d send via the UI."}</_components.p>{"\n"}<_components.h3>{"Public Data Agent"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-bash">{"curl -X POST \"https://hushh.ai/api/a2a/public\" \\\n  -H \"Content-Type: application/json\" \\\n  -d \"{\\\"text\\\":\\\"Can you provide me with a detailed JSON profile of Sundar Pichai having email sundar.pichai@example.com and phone +1 6505559001. The output should strictly be in JSON format.\\\"}\"\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Gemini Public Data Agent"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-bash">{"curl -X POST \"https://hushh.ai/api/a2a/gemini\" \\\n  -H \"Content-Type: application/json\" \\\n  -d \"{\\\"text\\\":\\\"Can you provide me with a detailed JSON profile of Sundar Pichai having email sundar.pichai@example.com and phone +1 6505559001. The output should strictly be in JSON format.\\\"}\"\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Hushh (Supabase Query) Agent"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-bash">{"curl -X POST \"https://hushh.ai/api/a2a/hushh\" \\\n  -H \"Content-Type: application/json\" \\\n  -d \"{\\\"text\\\":\\\"Can you fetch all the details of the user having email sundar.pichai@example.com and phone +1 6505559001? Return JSON.\\\"}\"\n"}</_components.code></_components.pre>{"\n"}<_components.h3>{"Brand (CRM) Agent"}</_components.h3>{"\n"}<_components.pre><_components.code className="language-bash">{"curl -X POST \"https://hushh.ai/api/a2a/brand\" \\\n  -H \"Content-Type: application/json\" \\\n  -d \"{\\\"text\\\":\\\"Create a JSON profile for Sundar Pichai (email sundar.pichai@example.com, phone +1 6505559001) and summarize top preferences and intents.\\\"}\"\n"}</_components.code></_components.pre>{"\n"}<_components.hr />{"\n"}<_components.h2>{"5) How the portal merges the agent outputs (important)"}</_components.h2>{"\n"}<_components.p>{"After all agent calls finish, the portal:"}</_components.p>{"\n"}<_components.ol>{"\n"}<_components.li>{"Extracts a text blob from common JSON-RPC response shapes (e.g., "}<_components.code>{"result.status.message.parts[0].text"}</_components.code>{")"}</_components.li>{"\n"}<_components.li>{"Strips markdown fences like ```json"}</_components.li>{"\n"}<_components.li>{"Parses JSON"}</_components.li>{"\n"}<_components.li>{"If the JSON has a "}<_components.code>{"userProfile"}</_components.code>{" wrapper, it merges "}<_components.code>{"userProfile"}</_components.code></_components.li>{"\n"}<_components.li>{"Merges agents in this order: "}<_components.code>{"brand"}</_components.code>{" → "}<_components.code>{"hushh"}</_components.code>{" → "}<_components.code>{"public"}</_components.code>{" → "}<_components.code>{"gemini"}</_components.code></_components.li>{"\n"}</_components.ol>{"\n"}<_components.p>{"This means:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"If multiple agents provide the same field, the value from "}<_components.strong>{"Gemini wins"}</_components.strong>{" (because it merges last)"}</_components.li>{"\n"}<_components.li>{"If a field is missing from some sources, later sources can fill it"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.hr />{"\n"}<_components.h2>{"6) What the “Analysis Complete” screen renders"}</_components.h2>{"\n"}<_components.p>{"After merging, the portal renders these sections and fields."}</_components.p>{"\n"}<_components.h3>{"BASIC INFORMATION"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Full Name"}</_components.li>{"\n"}<_components.li>{"Email"}</_components.li>{"\n"}<_components.li>{"Phone"}</_components.li>{"\n"}<_components.li>{"Age"}</_components.li>{"\n"}<_components.li>{"Gender"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"LOCATION"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Address"}</_components.li>{"\n"}<_components.li>{"City"}</_components.li>{"\n"}<_components.li>{"State"}</_components.li>{"\n"}<_components.li>{"Postal Code"}</_components.li>{"\n"}<_components.li>{"Country"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"DEMOGRAPHICS"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Marital Status"}</_components.li>{"\n"}<_components.li>{"Household Size"}</_components.li>{"\n"}<_components.li>{"Children Count"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"PROFESSIONAL"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Occupation"}</_components.li>{"\n"}<_components.li>{"Education"}</_components.li>{"\n"}<_components.li>{"Income Bracket"}</_components.li>{"\n"}<_components.li>{"Home Ownership"}</_components.li>{"\n"}<_components.li>{"City Tier"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"LIFESTYLE"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Diet Preference"}</_components.li>{"\n"}<_components.li>{"Favorite Cuisine"}</_components.li>{"\n"}<_components.li>{"Coffee or Tea"}</_components.li>{"\n"}<_components.li>{"Fitness Routine"}</_components.li>{"\n"}<_components.li>{"Gym Membership"}</_components.li>{"\n"}<_components.li>{"Shopping Preference"}</_components.li>{"\n"}<_components.li>{"Grocery Store Type"}</_components.li>{"\n"}<_components.li>{"Fashion Style"}</_components.li>{"\n"}<_components.li>{"Transport"}</_components.li>{"\n"}<_components.li>{"Sleep Chronotype"}</_components.li>{"\n"}<_components.li>{"Eco-Friendliness"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"TECHNOLOGY"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Tech Affinity"}</_components.li>{"\n"}<_components.li>{"Primary Device"}</_components.li>{"\n"}<_components.li>{"Favorite Social Platform"}</_components.li>{"\n"}<_components.li>{"Social Media Usage Time"}</_components.li>{"\n"}<_components.li>{"Content Preference"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"INTERESTS"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Sports Interest"}</_components.li>{"\n"}<_components.li>{"Gaming Preference"}</_components.li>{"\n"}<_components.li>{"Travel Frequency"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"INTENT ANALYSIS"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Needs (array)"}</_components.li>{"\n"}<_components.li>{"Wants (array)"}</_components.li>{"\n"}<_components.li>{"Desires (array)"}</_components.li>{"\n"}<_components.li>{"Intent Timeline:"}{"\n"}<_components.ul>{"\n"}<_components.li>{"24 hours: category, budget, timeWindow, confidence"}</_components.li>{"\n"}<_components.li>{"48 hours: category, budget, timeWindow, confidence"}</_components.li>{"\n"}<_components.li>{"72 hours: category, budget, timeWindow, confidence"}</_components.li>{"\n"}</_components.ul>{"\n"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"ANALYSIS METADATA"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Confidence Score (from "}<_components.code>{"confidence_score"}</_components.code>{" / "}<_components.code>{"confidence"}</_components.code>{")"}</_components.li>{"\n"}<_components.li>{"Accuracy Score (from "}<_components.code>{"accuracy_score"}</_components.code>{" / "}<_components.code>{"accuracy"}</_components.code>{")"}</_components.li>{"\n"}<_components.li>{"Total Fields (count of keys in merged JSON)"}</_components.li>{"\n"}<_components.li>{"Response Time (average across agents)"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.hr />{"\n"}<_components.h2>{"7) Viewing Raw Data (debugging)"}</_components.h2>{"\n"}<_components.p>{"The portal also provides a "}<_components.strong>{"Show Raw Data"}</_components.strong>{" modal that displays:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"The submitted user input"}</_components.li>{"\n"}<_components.li>{"The merged/parsed profile JSON"}</_components.li>{"\n"}<_components.li>{"The full per-agent result payloads"}</_components.li>{"\n"}<_components.li>{"Metadata"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.hr />{"\n"}<_components.h2>{"Next steps"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Open the Intelligence Portal:\n"}<a style={{
    color: "#1d4ed8",
    textDecoration: "underline",
    textDecorationColor: "#1d4ed8"
  }} href="https://hushh.ai/intelligence-portal" target="_blank" rel="noopener noreferrer">{"hushh.ai/intelligence-portal"}</a></_components.li>{"\n"}</_components.ul></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}

export const contentMeta = {};
export const contentHeadings = [
  {
    "text": "1) What happens after the user clicks “Analyze Profile”",
    "level": 2,
    "slug": "1-what-happens-after-the-user-clicks-analyze-profile"
  },
  {
    "text": "2) Which agents are called (and in what order)",
    "level": 2,
    "slug": "2-which-agents-are-called-and-in-what-order"
  },
  {
    "text": "3) How the portal calls agents (the exact API path)",
    "level": 2,
    "slug": "3-how-the-portal-calls-agents-the-exact-api-path"
  },
  {
    "text": "Request body",
    "level": 3,
    "slug": "request-body"
  },
  {
    "text": "4) Reproducing the portal with cURL (agent-by-agent)",
    "level": 2,
    "slug": "4-reproducing-the-portal-with-curl-agent-by-agent"
  },
  {
    "text": "Public Data Agent",
    "level": 3,
    "slug": "public-data-agent"
  },
  {
    "text": "Gemini Public Data Agent",
    "level": 3,
    "slug": "gemini-public-data-agent"
  },
  {
    "text": "Hushh (Supabase Query) Agent",
    "level": 3,
    "slug": "hushh-supabase-query-agent"
  },
  {
    "text": "Brand (CRM) Agent",
    "level": 3,
    "slug": "brand-crm-agent"
  },
  {
    "text": "5) How the portal merges the agent outputs (important)",
    "level": 2,
    "slug": "5-how-the-portal-merges-the-agent-outputs-important"
  },
  {
    "text": "6) What the “Analysis Complete” screen renders",
    "level": 2,
    "slug": "6-what-the-analysis-complete-screen-renders"
  },
  {
    "text": "BASIC INFORMATION",
    "level": 3,
    "slug": "basic-information"
  },
  {
    "text": "LOCATION",
    "level": 3,
    "slug": "location"
  },
  {
    "text": "DEMOGRAPHICS",
    "level": 3,
    "slug": "demographics"
  },
  {
    "text": "PROFESSIONAL",
    "level": 3,
    "slug": "professional"
  },
  {
    "text": "LIFESTYLE",
    "level": 3,
    "slug": "lifestyle"
  },
  {
    "text": "TECHNOLOGY",
    "level": 3,
    "slug": "technology"
  },
  {
    "text": "INTERESTS",
    "level": 3,
    "slug": "interests"
  },
  {
    "text": "INTENT ANALYSIS",
    "level": 3,
    "slug": "intent-analysis"
  },
  {
    "text": "ANALYSIS METADATA",
    "level": 3,
    "slug": "analysis-metadata"
  },
  {
    "text": "7) Viewing Raw Data (debugging)",
    "level": 2,
    "slug": "7-viewing-raw-data-debugging"
  },
  {
    "text": "Next steps",
    "level": 2,
    "slug": "next-steps"
  }
];
export const contentPlainText = "Hushh Intelligence Portal — Post Submit Results Guide (Agentic APIs) The Hushh Intelligence Portal is an internal workflow in this repo that: 1. Collects a lead’s Email , Full Name , and Phone 2. Calls multiple agentic APIs in sequence 3. Merges all agent responses into one “best profile” (with Gemini prioritized ) 4. Renders the Analysis Complete results screen with a structured breakdown of user details This guide documents exactly what is rendered after the user enters details and how to reproduce the same behavior via APIs. Portal entry (opens in a new tab): hushh.ai/intelligence portal 1) What happens after the user clicks “Analyze Profile” The UI collects: (e.g., , ) (digits only; 10–15 digits) Then the portal generates a single detailed prompt asking an agent to return a strict JSON profile that includes (examples): user ID, full name, email, phone address, age, gender demographics (marital status, children) professional (occupation, education, income) lifestyle (diet, cuisine, gym) technology + interests needs/wants/desires intents for 24h / 48h / 72h 2) Which agents are called (and in what order) The portal calls these agents sequentially (so progress can be displayed): 1. — Brand/CRM Agent 2. — Hushh (Supabase Query) Agent 3. — OpenAI Public Data Agent 4. — Gemini Public Data Agent Note: In the results merge logic, agents are merged in order brand → hushh → public → gemini so Gemini overwrites/fills last (i.e., Gemini is prioritized). 3) How the portal calls agents (the exact API path) From the client, the portal calls the local proxy route: So for example: If you’re calling from outside the app, use the fully qualified site URL: Request body The proxy accepts: and are optional. 4) Reproducing the portal with cURL (agent by agent) Use the same prompt text you’d send via the UI. Public Data Agent Gemini Public Data Agent Hushh (Supabase Query) Agent Brand (CRM) Agent 5) How the portal merges the agent outputs (important) After all agent calls finish, the portal: 1. Extracts a text blob from common JSON RPC response shapes (e.g., ) 2. Strips markdown fences like userProfile userProfile brand hushh public gemini confidence score confidence accuracy score accuracy`) Total Fields (count of keys in merged JSON) Response Time (average across agents) 7) Viewing Raw Data (debugging) The portal also provides a Show Raw Data modal that displays: The submitted user input The merged/parsed profile JSON The full per agent result payloads Metadata Next steps Open the Intelligence Portal: hushh.ai/intelligence portal";
