/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    a: "a",
    code: "code",
    ul: "ul",
    li: "li",
    strong: "strong",
    h3: "h3",
    br: "br",
    ol: "ol",
    em: "em"
  }, props.components);
  return <><_components.h2>{"Hushh Supabase Profile Update Agent Documentation"}</_components.h2>{"\n"}<_components.p>{"The Hushh Supabase Profile Update Agent is an AI-powered automation service that corrects or modifies user data inside Supabase using natural language. Acting as an intelligent intermediary between the Hushh UI and Supabase, it parses update requests—like “Update the state to AP for user +919346661428 with ID d6f5fca9-924b-492e-95f6-55e81d405174”—and executes them safely through MuleSoft and the MCP Server. As part of our agent catalog on "}<_components.a href="/agents"><_components.code>{"/agents"}</_components.code></_components.a>{", it ensures CRM, analytics, and personalization modules stay perfectly in sync."}</_components.p>{"\n"}<_components.h2>{"1. Overview"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li><_components.strong>{"Mission:"}</_components.strong>{" Keep user records accurate without manual SQL or dashboard edits."}</_components.li>{"\n"}<_components.li><_components.strong>{"LLM Backbone:"}</_components.strong>{" "}<_components.code>{"gpt-4.0-mini"}</_components.code>{"."}</_components.li>{"\n"}<_components.li><_components.strong>{"Stack:"}</_components.strong>{" MuleSoft CloudHub, MCP Server, Supabase, JSON-RPC 2.0."}</_components.li>{"\n"}<_components.li><_components.strong>{"Outcome:"}</_components.strong>{" Consistent customer intelligence across the entire Hushh ecosystem."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"2. Functional Workflow"}</_components.h2>{"\n"}<_components.h3>{"Step 1: User Input (Hushh UI / System Request)"}</_components.h3>{"\n"}<_components.p>{"A user, agent, or backend service issues a natural-language instruction, such as:"}<_components.br />{"\n"}{"“Can you update the state to AP for the user with phone +919346661428 and user ID d6f5fca9-924b-492e-95f6-55e81d405174?”"}</_components.p>{"\n"}<_components.h3>{"Step 2: Agent Invocation (MuleSoft Flow)"}</_components.h3>{"\n"}<_components.p>{"MuleSoft formats the request as a JSON-RPC 2.0 POST and calls the Supabase Update Agent endpoint, handling authentication and retries."}</_components.p>{"\n"}<_components.h3>{"Step 3: Intent Extraction & Data Parsing"}</_components.h3>{"\n"}<_components.p>{"GPT-4.0 mini identifies:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"User ID and phone number."}</_components.li>{"\n"}<_components.li>{"Fields to update (state, email, address, etc.)."}</_components.li>{"\n"}<_components.li>{"New field values."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"Step 4: Backend MCP Integration"}</_components.h3>{"\n"}<_components.p>{"The agent invokes the MCP Server, which runs the tool to commit changes directly in Supabase."}</_components.p>{"\n"}<_components.h3>{"Step 5: Response Generation"}</_components.h3>{"\n"}<_components.p>{"After MCP confirms success, the agent replies with a structured success message, timestamp, and optionally the updated record snapshot."}</_components.p>{"\n"}<_components.h2>{"3. Security & Privacy"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"All communications are HTTPS-encrypted."}</_components.li>{"\n"}<_components.li>{"Only authorized MuleSoft flows can modify user data."}</_components.li>{"\n"}<_components.li>{"Supabase credentials remain in MCP-managed vaults."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"User Stories"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li><_components.strong>{"Customer Success Specialist:"}</_components.strong>{" Neelesh receives a chat where a VIP says, “I moved to Hyderabad.” She submits the natural language request, and the agent updates Supabase plus Salesforce in under a minute, preventing mismatched campaigns."}</_components.li>{"\n"}<_components.li><_components.strong>{"Field Sales Lead:"}</_components.strong>{" Oliver captures notes from a store visit on his phone. By telling the agent “Change Priya’s preferred channel to WhatsApp,” he ensures marketing, support, and analytics immediately operate with the same data."}</_components.li>{"\n"}<_components.li><_components.strong>{"Support Operations Manager:"}</_components.strong>{" Samuel monitors Zendesk tickets for data issues. When a customer corrects their preferred language, she fires off a quick update command and watches the change cascade to messaging tools automatically."}</_components.li>{"\n"}<_components.li><_components.strong>{"Lifecycle Marketer:"}</_components.strong>{" Jack refreshes a VIP segment every Friday. Instead of exporting CSVs, he runs a script that instructs the agent to adjust dozens of small tweaks—new interests, changed budgets—keeping campaigns aligned with reality."}</_components.li>{"\n"}<_components.li><_components.strong>{"Community Coordinator:"}</_components.strong>{" Michael oversees mentorship matches. When mentees update their goals during check-ins, she uses the agent to adjust Supabase tags instantly so mentors always get accurate briefs."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Day 0 Story — Sundar Pichai KYC Refresh"}</_components.h2>{"\n"}<_components.ol>{"\n"}<_components.li><_components.strong>{"Intake complete:"}</_components.strong>{" After the Profile Creation Agent stores Sundar’s minimal record and Gemini adds public data, compliance leads trigger the Profile Update Agent with a simple prompt: “Confirm Sundar Pichai’s investor accreditation using his phone +1 650-555-9001.”"}</_components.li>{"\n"}<_components.li><_components.strong>{"Targeted field updates:"}</_components.strong>{" The agent parses the request, locks onto Sundar’s MCP alias, and patches accreditation flags, risk scores, and preferred verification channel in Supabase as soon as MuleSoft validates the supporting docs."}</_components.li>{"\n"}<_components.li><_components.strong>{"Cross-system sync:"}</_components.strong>{" The same response pushes updates to Salesforce and the regulated KYC investor schema, ensuring downstream trading or allocation flows see the amended facts."}</_components.li>{"\n"}<_components.li><_components.strong>{"Audit-ready trail:"}</_components.strong>{" Every change is tied to Sundar’s personal endpoint ("}<_components.code>{"https://hushh.ai/profile/phone/+16505559001"}</_components.code>{"), so reviewers can replay the Day 0 journey from minimal inputs through enriched KYC proof in one log view."}</_components.li>{"\n"}</_components.ol>{"\n"}<_components.h2>{"SEO Spotlight & CTA"}</_components.h2>{"\n"}<_components.p>{"Searching for "}<_components.em>{"Supabase profile update automation"}</_components.em>{", "}<_components.em>{"MuleSoft natural language data correction"}</_components.em>{", or "}<_components.em>{"AI CRM synchronization"}</_components.em>{"? This agent shows how Hushh.ai blends LLM intent parsing with governed data operations. Explore "}<_components.a href="/agents"><_components.code>{"/agents"}</_components.code></_components.a>{" to see how profile creation, update, and query capabilities work together for full-lifecycle intelligence."}</_components.p>{"\n"}<_components.h2>{"Summary"}</_components.h2>{"\n"}<_components.p>{"The Hushh Supabase Profile Update Agent keeps customer data evergreen. From correcting typos to updating entire demographic profiles, it turns natural-language instructions into audited database operations so marketing, CX, and analytics teams always trust their data. It’s the real-time editor for every Supabase-powered profile."}</_components.p></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}

export const contentMeta = {
  "title": "Hushh Supabase Profile Update Agent Documentation",
  "description": "How Hushh’s Supabase Profile Update Agent keeps CRM and personalization data accurate using natural-language commands over MuleSoft MCP.",
  "image": "/blogs/new/profile_update_agent.png",
  "publishedAt": "November 26, 2025",
  "updatedAt": "November 26, 2025",
  "author": "Hushh.ai Team",
  "isPublished": true,
  "tags": [
    "AI Agents",
    "Supabase",
    "Automation",
    "MuleSoft"
  ]
};
export const contentHeadings = [
  {
    "text": "Hushh Supabase Profile Update Agent Documentation",
    "level": 2,
    "slug": "hushh-supabase-profile-update-agent-documentation"
  },
  {
    "text": "1. Overview",
    "level": 2,
    "slug": "1-overview"
  },
  {
    "text": "2. Functional Workflow",
    "level": 2,
    "slug": "2-functional-workflow"
  },
  {
    "text": "Step 1: User Input (Hushh UI / System Request)",
    "level": 3,
    "slug": "step-1-user-input-hushh-ui--system-request"
  },
  {
    "text": "Step 2: Agent Invocation (MuleSoft Flow)",
    "level": 3,
    "slug": "step-2-agent-invocation-mulesoft-flow"
  },
  {
    "text": "Step 3: Intent Extraction & Data Parsing",
    "level": 3,
    "slug": "step-3-intent-extraction--data-parsing"
  },
  {
    "text": "Step 4: Backend MCP Integration",
    "level": 3,
    "slug": "step-4-backend-mcp-integration"
  },
  {
    "text": "Step 5: Response Generation",
    "level": 3,
    "slug": "step-5-response-generation"
  },
  {
    "text": "3. Security & Privacy",
    "level": 2,
    "slug": "3-security--privacy"
  },
  {
    "text": "User Stories",
    "level": 2,
    "slug": "user-stories"
  },
  {
    "text": "Day 0 Story — Sundar Pichai KYC Refresh",
    "level": 2,
    "slug": "day-0-story--sundar-pichai-kyc-refresh"
  },
  {
    "text": "SEO Spotlight & CTA",
    "level": 2,
    "slug": "seo-spotlight--cta"
  },
  {
    "text": "Summary",
    "level": 2,
    "slug": "summary"
  }
];
export const contentPlainText = "Hushh Supabase Profile Update Agent Documentation The Hushh Supabase Profile Update Agent is an AI powered automation service that corrects or modifies user data inside Supabase using natural language. Acting as an intelligent intermediary between the Hushh UI and Supabase, it parses update requests—like “Update the state to AP for user +919346661428 with ID d6f5fca9 924b 492e 95f6 55e81d405174”—and executes them safely through MuleSoft and the MCP Server. As part of our agent catalog on , it ensures CRM, analytics, and personalization modules stay perfectly in sync. 1. Overview Mission: Keep user records accurate without manual SQL or dashboard edits. LLM Backbone: . Stack: MuleSoft CloudHub, MCP Server, Supabase, JSON RPC 2.0. Outcome: Consistent customer intelligence across the entire Hushh ecosystem. 2. Functional Workflow Step 1: User Input (Hushh UI / System Request) A user, agent, or backend service issues a natural language instruction, such as: “Can you update the state to AP for the user with phone +919346661428 and user ID d6f5fca9 924b 492e 95f6 55e81d405174?” Step 2: Agent Invocation (MuleSoft Flow) MuleSoft formats the request as a JSON RPC 2.0 POST and calls the Supabase Update Agent endpoint, handling authentication and retries. Step 3: Intent Extraction & Data Parsing GPT 4.0 mini identifies: User ID and phone number. Fields to update (state, email, address, etc.). New field values. Step 4: Backend MCP Integration The agent invokes the MCP Server, which runs the tool to commit changes directly in Supabase. Step 5: Response Generation After MCP confirms success, the agent replies with a structured success message, timestamp, and optionally the updated record snapshot. 3. Security & Privacy All communications are HTTPS encrypted. Only authorized MuleSoft flows can modify user data. Supabase credentials remain in MCP managed vaults. User Stories Customer Success Specialist: Neelesh receives a chat where a VIP says, “I moved to Hyderabad.” She submits the natural language request, and the agent updates Supabase plus Salesforce in under a minute, preventing mismatched campaigns. Field Sales Lead: Oliver captures notes from a store visit on his phone. By telling the agent “Change Priya’s preferred channel to WhatsApp,” he ensures marketing, support, and analytics immediately operate with the same data. Support Operations Manager: Samuel monitors Zendesk tickets for data issues. When a customer corrects their preferred language, she fires off a quick update command and watches the change cascade to messaging tools automatically. Lifecycle Marketer: Jack refreshes a VIP segment every Friday. Instead of exporting CSVs, he runs a script that instructs the agent to adjust dozens of small tweaks—new interests, changed budgets—keeping campaigns aligned with reality. Community Coordinator: Michael oversees mentorship matches. When mentees update their goals during check ins, she uses the agent to adjust Supabase tags instantly so mentors always get accurate briefs. Day 0 Story — Sundar Pichai KYC Refresh 1. Intake complete: After the Profile Creation Agent stores Sundar’s minimal record and Gemini adds public data, compliance leads trigger the Profile Update Agent with a simple prompt: “Confirm Sundar Pichai’s investor accreditation using his phone +1 650 555 9001.” 2. Targeted field updates: The agent parses the request, locks onto Sundar’s MCP alias, and patches accreditation flags, risk scores, and preferred verification channel in Supabase as soon as MuleSoft validates the supporting docs. 3. Cross system sync: The same response pushes updates to Salesforce and the regulated KYC investor schema, ensuring downstream trading or allocation flows see the amended facts. 4. Audit ready trail: Every change is tied to Sundar’s personal endpoint ( ), so reviewers can replay the Day 0 journey from minimal inputs through enriched KYC proof in one log view. SEO Spotlight & CTA Searching for Supabase profile update automation , MuleSoft natural language data correction , or AI CRM synchronization ? This agent shows how Hushh.ai blends LLM intent parsing with governed data operations. Explore to see how profile creation, update, and query capabilities work together for full lifecycle intelligence. Summary The Hushh Supabase Profile Update Agent keeps customer data evergreen. From correcting typos to updating entire demographic profiles, it turns natural language instructions into audited database operations so marketing, CX, and analytics teams always trust their data. It’s the real time editor for every Supabase powered profile.";
