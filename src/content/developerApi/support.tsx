/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    h2: "h2",
    ul: "ul",
    li: "li",
    code: "code",
    h3: "h3"
  }, props.components);
  return <><_components.h1>{"Support"}</_components.h1>{"\n"}<_components.p>{"This section helps engineering and product teams troubleshoot integrations with Hushh Agentic Developer APIs."}</_components.p>{"\n"}<_components.h2>{"Contact"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Sales and partnerships: sales@hushh.ai"}</_components.li>{"\n"}<_components.li>{"Technical support: support@hushh.ai (Enterprise SLAs available by contract.)"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"What to include in a support request"}</_components.h2>{"\n"}<_components.p>{"Provide these fields so we can trace your agent calls quickly:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"Organization name and environment (sandbox or production)"}</_components.li>{"\n"}<_components.li>{"Endpoint path (for example "}<_components.code>{"/api/a2a/public"}</_components.code>{")"}</_components.li>{"\n"}<_components.li><_components.code>{"sessionId"}</_components.code>{" and "}<_components.code>{"id"}</_components.code>{" from your JSON-RPC payload"}</_components.li>{"\n"}<_components.li>{"Timestamp and timezone"}</_components.li>{"\n"}<_components.li>{"Response snippet with "}<_components.code>{"upstreamStatus"}</_components.code>{" (if using "}<_components.code>{"/api/a2a"}</_components.code>{")"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Common issues and fixes"}</_components.h2>{"\n"}<_components.h3>{"400 Invalid JSON-RPC"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Cause: malformed payload or missing "}<_components.code>{"jsonrpc"}</_components.code>{", "}<_components.code>{"method"}</_components.code>{", or "}<_components.code>{"params"}</_components.code>{"."}</_components.li>{"\n"}<_components.li>{"Fix: validate the JSON-RPC structure and resend."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"401 Unauthorized"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Cause: invalid credentials or missing authorization in the MuleSoft flow."}</_components.li>{"\n"}<_components.li>{"Fix: rotate your API key in the console and retry."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"500 Internal Agent Error"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Cause: upstream agent failed or timed out."}</_components.li>{"\n"}<_components.li>{"Fix: retry with exponential backoff and send the request ID to support if it persists."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h3>{"Timeout"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li>{"Cause: payload too large or upstream agent latency."}</_components.li>{"\n"}<_components.li>{"Fix: reduce the prompt length or split the request into smaller tasks."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Debugging tips"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Use "}<_components.code>{"/api/a2a/{agent}"}</_components.code>{" for browser-based testing in these docs."}</_components.li>{"\n"}<_components.li>{"Call direct MuleSoft endpoints from your backend only (no browser secrets)."}</_components.li>{"\n"}<_components.li>{"Always include "}<_components.code>{"sessionId"}</_components.code>{" and "}<_components.code>{"id"}</_components.code>{" for end-to-end tracing."}</_components.li>{"\n"}</_components.ul></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}

export const contentMeta = {};
export const contentHeadings = [
  {
    "text": "Contact",
    "level": 2,
    "slug": "contact"
  },
  {
    "text": "What to include in a support request",
    "level": 2,
    "slug": "what-to-include-in-a-support-request"
  },
  {
    "text": "Common issues and fixes",
    "level": 2,
    "slug": "common-issues-and-fixes"
  },
  {
    "text": "400 Invalid JSON-RPC",
    "level": 3,
    "slug": "400-invalid-json-rpc"
  },
  {
    "text": "401 Unauthorized",
    "level": 3,
    "slug": "401-unauthorized"
  },
  {
    "text": "500 Internal Agent Error",
    "level": 3,
    "slug": "500-internal-agent-error"
  },
  {
    "text": "Timeout",
    "level": 3,
    "slug": "timeout"
  },
  {
    "text": "Debugging tips",
    "level": 2,
    "slug": "debugging-tips"
  }
];
export const contentPlainText = "Support This section helps engineering and product teams troubleshoot integrations with Hushh Agentic Developer APIs. Contact Sales and partnerships: sales@hushh.ai Technical support: support@hushh.ai (Enterprise SLAs available by contract.) What to include in a support request Provide these fields so we can trace your agent calls quickly: Organization name and environment (sandbox or production) Endpoint path (for example ) and from your JSON RPC payload Timestamp and timezone Response snippet with (if using ) Common issues and fixes 400 Invalid JSON RPC Cause: malformed payload or missing , , or . Fix: validate the JSON RPC structure and resend. 401 Unauthorized Cause: invalid credentials or missing authorization in the MuleSoft flow. Fix: rotate your API key in the console and retry. 500 Internal Agent Error Cause: upstream agent failed or timed out. Fix: retry with exponential backoff and send the request ID to support if it persists. Timeout Cause: payload too large or upstream agent latency. Fix: reduce the prompt length or split the request into smaller tasks. Debugging tips Use for browser based testing in these docs. Call direct MuleSoft endpoints from your backend only (no browser secrets). Always include and for end to end tracing.";
