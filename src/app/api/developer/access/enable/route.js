import { proxyDeveloperUpstream } from "../../_lib/upstream";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  return proxyDeveloperUpstream(request, "/api/developer/access/enable", "POST");
}
