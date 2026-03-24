# WhatsApp Graph API Integration

## Purpose
The WhatsApp integration uses the Facebook Graph API Cloud endpoint rather than an extra wrapper layer.

## Rules
- keep bearer tokens server-side
- do not expose Graph API credentials in client code
- validate the request payload against the approved message type before forwarding

## Typical payload shapes
- template messages
- parameterized template messages

## Verification
- confirm the website proxy returns `upstreamStatus`
- verify the returned Graph API message ID for accepted sends
