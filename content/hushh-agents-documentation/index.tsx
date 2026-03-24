/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    a: "a",
    code: "code",
    blockquote: "blockquote"
  }, props.components);
  return <><_components.h2>{"🤫 Hushh Agents Documentation"}</_components.h2>{"\n"}<_components.p>{"Hushh, your personal data agent, introduces a suite of intelligent services that converse over MuleSoft’s A2A (Agent-to-Agent) protocol. Together, these agents form the digital backbone of the HushhOne platform, enabling secure, automated, and context-aware data exchange between user-facing experiences and backend systems. From discovering public insights to creating, updating, and querying Supabase records, each agent brings a unique superpower that keeps the ecosystem conversational, intelligent, and always in sync. Explore the highlights below, then dive into the dedicated docs linked throughout—or view them all on "}<_components.a href="/agents"><_components.code>{"/agents"}</_components.code></_components.a>{"."}</_components.p>{"\n"}<_components.h2>{"🧠 OpenAI Public Data Agent"}</_components.h2>{"\n"}<_components.p>{"The OpenAI Public Data Agent acts as a virtual researcher whenever a user signs up with minimal inputs. Powered by OpenAI’s language models, it fills in lifestyle, occupation, interests, and behavioral markers so every new user starts with a rich baseline profile—ready for recommendations, analytics, and personalized guidance. With user consent at the center, brands and subscribers can understand an individual more accurately while delivering better experiences."}</_components.p>{"\n"}<_components.blockquote>{"\n"}<_components.p>{"📄 "}<_components.a href="/agents?agent=public#public">{"OpenAI Agent"}</_components.a></_components.p>{"\n"}</_components.blockquote>{"\n"}<_components.h2>{"🧩 Profile Creation Agent"}</_components.h2>{"\n"}<_components.p>{"When someone says, “Can you create my profile?” this agent translates the conversation into structured Supabase entries. MuleSoft handles the JSON-RPC invocation, GPT parses the intent, and Supabase receives a complete, normalized record. Onboarding becomes dialog-driven instead of form-driven, making it faster for both users and operators."}</_components.p>{"\n"}<_components.blockquote>{"\n"}<_components.p>{"📄 "}<_components.a href="/agents?agent=hushh-profile#hushh-profile">{"Profile Creation Agent"}</_components.a></_components.p>{"\n"}</_components.blockquote>{"\n"}<_components.h2>{"🔄 Profile Update Agent"}</_components.h2>{"\n"}<_components.p>{"Profiles constantly evolve. The Supabase Profile Update Agent listens for instructions like “Change my city to Hyderabad” or “Update my contact number,” identifies the relevant fields, and commits the updates via MuleSoft MCP. This keeps CRM, analytics, and personalization modules aligned without manual data maintenance."}</_components.p>{"\n"}<_components.blockquote>{"\n"}<_components.p>{"📄 "}<_components.a href="/agents?agent=hushh-profile-update#hushh-profile-update">{"Profile Update Agent"}</_components.a></_components.p>{"\n"}</_components.blockquote>{"\n"}<_components.h2>{"🔍 Supabase Profile Query Agent"}</_components.h2>{"\n"}<_components.p>{"Need the full context on a user instantly? The Supabase Profile Query Agent is the detective that fetches complete JSON snapshots—demographics, preferences, lifestyle, and intents—based on a single identifier such as phone number. It supports brand assistants, customer success teams, and analytics flows by ensuring the right data is always available at the right time."}</_components.p>{"\n"}<_components.blockquote>{"\n"}<_components.p>{"📄 "}<_components.a href="/agents?agent=hushh#hushh">{"Profile Query Agent"}</_components.a></_components.p>{"\n"}</_components.blockquote>{"\n"}<_components.h2>{"Bringing It All Together"}</_components.h2>{"\n"}<_components.p>{"Each of these agents plugs into the A2A fabric to create a unified intelligence layer. Public data gets enriched, profiles are created and updated conversationally, and insights are always queryable. This is the foundation that allows HushhOne to deliver private-by-design, hyper-personalized experiences at scale. Explore more orchestration blueprints on "}<_components.a href="/agents"><_components.code>{"/agents"}</_components.code></_components.a>{" to see how these services collaborate behind the scenes."}</_components.p></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}

export const contentMeta = {
  "title": "🤫 Hushh Agents Documentation",
  "description": "A tour of the A2A-powered agents that fuel the HushhOne ecosystem—from public data enrichment to Supabase automation.",
  "image": "/blogs/new/hushh_agents.png",
  "publishedAt": "November 26, 2025",
  "updatedAt": "November 26, 2025",
  "author": "Hushh.ai Team",
  "isPublished": true,
  "tags": [
    "AI Agents",
    "MuleSoft",
    "Supabase",
    "Data Orchestration"
  ]
};
export const contentHeadings = [
  {
    "text": "🤫 Hushh Agents Documentation",
    "level": 2,
    "slug": "-hushh-agents-documentation"
  },
  {
    "text": "🧠 OpenAI Public Data Agent",
    "level": 2,
    "slug": "-openai-public-data-agent"
  },
  {
    "text": "🧩 Profile Creation Agent",
    "level": 2,
    "slug": "-profile-creation-agent"
  },
  {
    "text": "🔄 Profile Update Agent",
    "level": 2,
    "slug": "-profile-update-agent"
  },
  {
    "text": "🔍 Supabase Profile Query Agent",
    "level": 2,
    "slug": "-supabase-profile-query-agent"
  },
  {
    "text": "Bringing It All Together",
    "level": 2,
    "slug": "bringing-it-all-together"
  }
];
export const contentPlainText = "🤫 Hushh Agents Documentation Hushh, your personal data agent, introduces a suite of intelligent services that converse over MuleSoft’s A2A (Agent to Agent) protocol. Together, these agents form the digital backbone of the HushhOne platform, enabling secure, automated, and context aware data exchange between user facing experiences and backend systems. From discovering public insights to creating, updating, and querying Supabase records, each agent brings a unique superpower that keeps the ecosystem conversational, intelligent, and always in sync. Explore the highlights below, then dive into the dedicated docs linked throughout—or view them all on . 🧠 OpenAI Public Data Agent The OpenAI Public Data Agent acts as a virtual researcher whenever a user signs up with minimal inputs. Powered by OpenAI’s language models, it fills in lifestyle, occupation, interests, and behavioral markers so every new user starts with a rich baseline profile—ready for recommendations, analytics, and personalized guidance. With user consent at the center, brands and subscribers can understand an individual more accurately while delivering better experiences. 📄 OpenAI Agent 🧩 Profile Creation Agent When someone says, “Can you create my profile?” this agent translates the conversation into structured Supabase entries. MuleSoft handles the JSON RPC invocation, GPT parses the intent, and Supabase receives a complete, normalized record. Onboarding becomes dialog driven instead of form driven, making it faster for both users and operators. 📄 Profile Creation Agent 🔄 Profile Update Agent Profiles constantly evolve. The Supabase Profile Update Agent listens for instructions like “Change my city to Hyderabad” or “Update my contact number,” identifies the relevant fields, and commits the updates via MuleSoft MCP. This keeps CRM, analytics, and personalization modules aligned without manual data maintenance. 📄 Profile Update Agent 🔍 Supabase Profile Query Agent Need the full context on a user instantly? The Supabase Profile Query Agent is the detective that fetches complete JSON snapshots—demographics, preferences, lifestyle, and intents—based on a single identifier such as phone number. It supports brand assistants, customer success teams, and analytics flows by ensuring the right data is always available at the right time. 📄 Profile Query Agent Bringing It All Together Each of these agents plugs into the A2A fabric to create a unified intelligence layer. Public data gets enriched, profiles are created and updated conversationally, and insights are always queryable. This is the foundation that allows HushhOne to deliver private by design, hyper personalized experiences at scale. Explore more orchestration blueprints on to see how these services collaborate behind the scenes.";
