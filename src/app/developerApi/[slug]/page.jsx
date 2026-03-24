import { redirect } from "next/navigation";

export default async function LegacyDeveloperDocPage({ params }) {
  const { slug } = await params;
  redirect(`/developers/${slug}`);
}
