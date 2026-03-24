/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    ul: "ul",
    li: "li",
    pre: "pre",
    code: "code"
  }, props.components);
  return <><_components.h1>{"Additional Requirements"}</_components.h1>{"\n"}<_components.p>{"These requirements keep Hushh Agentic Developer API integrations safe, reliable, and compliant."}</_components.p>{"\n"}<_components.h2>{"Consent and governance"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Request explicit user consent before any enrichment or activation."}</_components.li>{"\n"}<_components.li>{"Respect consent scope and purpose limitations in your product UI."}</_components.li>{"\n"}<_components.li>{"Stop retrieval and activation when consent is revoked."}</_components.li>{"\n"}<_components.li>{"Store consent receipts for audit and compliance."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Security and privacy"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Use HTTPS for all calls."}</_components.li>{"\n"}<_components.li>{"Store API keys and secrets in a secure vault."}</_components.li>{"\n"}<_components.li>{"Restrict Plaid calls to server-to-server traffic only."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"JSON-RPC and A2A protocol"}</_components.h2>{"\n"}<_components.p>{"All MuleSoft agent calls use JSON-RPC 2.0 with the A2A message envelope."}</_components.p>{"\n"}<_components.pre><_components.code className="language-json">{"{\n  \"jsonrpc\": \"2.0\",\n  \"id\": \"task-124\",\n  \"method\": \"tasks/send\",\n  \"params\": {\n    \"sessionId\": \"session-456\",\n    \"message\": {\n      \"role\": \"user\",\n      \"parts\": [\n        {\n          \"type\": \"text\",\n          \"text\": \"Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\"\n        }\n      ]\n    }\n  }\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Reliability and timeouts"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Use retries with exponential backoff on "}<_components.code>{"500"}</_components.code>{" and timeout errors."}</_components.li>{"\n"}<_components.li>{"Keep prompts concise to reduce agent latency."}</_components.li>{"\n"}<_components.li>{"Track "}<_components.code>{"sessionId"}</_components.code>{" and "}<_components.code>{"id"}</_components.code>{" for auditability."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Compliance"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Follow GDPR and regional privacy laws for data access and retention."}</_components.li>{"\n"}<_components.li>{"Collect only the data required for the agreed business purpose."}</_components.li>{"\n"}<_components.li>{"Maintain an audit log for consent, access, and activation."}</_components.li>{"\n"}<_components.li>{"Define a retention policy for derived profiles and purge on request."}</_components.li>{"\n"}</_components.ul></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}

export const contentMeta = {};
export const contentHeadings = [
  {
    "text": "Consent and governance",
    "level": 2,
    "slug": "consent-and-governance"
  },
  {
    "text": "Security and privacy",
    "level": 2,
    "slug": "security-and-privacy"
  },
  {
    "text": "JSON-RPC and A2A protocol",
    "level": 2,
    "slug": "json-rpc-and-a2a-protocol"
  },
  {
    "text": "Reliability and timeouts",
    "level": 2,
    "slug": "reliability-and-timeouts"
  },
  {
    "text": "Compliance",
    "level": 2,
    "slug": "compliance"
  }
];
export const contentPlainText = "Additional Requirements These requirements keep Hushh Agentic Developer API integrations safe, reliable, and compliant. Consent and governance Request explicit user consent before any enrichment or activation. Respect consent scope and purpose limitations in your product UI. Stop retrieval and activation when consent is revoked. Store consent receipts for audit and compliance. Security and privacy Use HTTPS for all calls. Store API keys and secrets in a secure vault. Restrict Plaid calls to server to server traffic only. JSON RPC and A2A protocol All MuleSoft agent calls use JSON RPC 2.0 with the A2A message envelope. Reliability and timeouts Use retries with exponential backoff on and timeout errors. Keep prompts concise to reduce agent latency. Track and for auditability. Compliance Follow GDPR and regional privacy laws for data access and retention. Collect only the data required for the agreed business purpose. Maintain an audit log for consent, access, and activation. Define a retention policy for derived profiles and purge on request.";
