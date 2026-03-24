import { redirect } from "next/navigation";

export default async function HushhIdAliasPage({ params }) {
  const resolvedParams = await params;
  const id = Array.isArray(resolvedParams.id) ? resolvedParams.id.join("/") : resolvedParams.id;
  redirect(`/hushh-id/${id}`);
}
