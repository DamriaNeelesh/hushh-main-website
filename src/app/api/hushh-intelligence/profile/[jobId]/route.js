import { proxyHushhIntelligence } from "../../_lib/upstream";

export async function GET(_request, { params }) {
  const { jobId } = await params;
  return proxyHushhIntelligence(`/api/v1/identity-exploration/jobs/${jobId}`, {
    method: "GET",
  });
}
