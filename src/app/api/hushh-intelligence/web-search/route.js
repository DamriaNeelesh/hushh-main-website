import { proxyHushhIntelligence } from "../_lib/upstream";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  return proxyHushhIntelligence("/api/v1/hushh-intelligence/web-search", {
    method: "POST",
    body,
  });
}
