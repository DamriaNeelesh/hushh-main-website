# A2A Website Integration

## Purpose
Register and call external agents from the website through the website proxy layer.

## Integration model
1. Register the target agent in the Interaction Agent UI.
2. Call the website route at `/api/a2a/[agent]`.
3. Let the website route shape the payload and forward it upstream.

## Expected payload shape
Most agent integrations use a JSON-RPC style request:

```json
{
  "jsonrpc": "2.0",
  "id": "task-id",
  "method": "tasks/send",
  "params": {
    "sessionId": "session-id",
    "message": {
      "role": "user",
      "parts": [
        { "type": "text", "text": "Your prompt here" }
      ]
    }
  }
}
```

## Best practices
- Keep agent URLs and secrets server-side.
- Use deterministic session IDs when the flow benefits from continuity.
- Return upstream diagnostics from the proxy for debugging, not from the browser.
