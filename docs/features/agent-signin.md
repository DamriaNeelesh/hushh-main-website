# Agent Sign-In

## Scope
The agent sign-in flow collects user details, queries the supported profile agents, and presents merged results in a guided flow.

## Current shape
- route: `/agent-sign-in`
- main orchestrator: `AgentSignInClient.jsx`
- stages:
  - user details form
  - analysis loader
  - result display
  - source comparison

## Current supported agents
- Brand agent
- Hushh agent
- Public data agent

The older WhatsApp and Email calls were removed from the sign-in analysis path to keep the flow focused on profile retrieval and to reduce latency.

## Key implementation notes
- Validate email, full name, and phone input before dispatch.
- Use the website proxy routes for all agent calls.
- Keep progress indicators aligned to the active set of agents.
- Parse agent responses from JSON-RPC structures and nested artifact/message payloads.

## Maintenance notes
- Treat this as a feature doc, not a temporary fix log.
- Keep any future agent additions reflected here and in the UI comparison layer.
