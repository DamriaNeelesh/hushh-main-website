import { notFound } from "next/navigation";
import DeveloperDocsShell from "../../_components/developerDocs/DeveloperDocsShell";
import {
  developerDocs,
  getDeveloperDoc,
} from "../docs.config";
import {
  getDeveloperDocHeadings,
  loadDeveloperDocComponent,
} from "../docs.server";
import { developerDocComponents } from "../../../lib/content/developer-doc-components";
import { buildPageMetadata } from "../../../lib/seo/pageMetadata";

export async function generateStaticParams() {
  return developerDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getDeveloperDoc(slug);

  if (!doc) {
    return {};
  }

  return buildPageMetadata({
    title: `${doc.title} | Hushh Developers`,
    description: doc.description,
    pathname: `/developers/${doc.slug}`,
    keywords: ["Hushh developers", "Developer documentation", doc.section, doc.slug],
  });
}

export default async function DeveloperDocPage({ params }) {
  const { slug } = await params;
  const doc = getDeveloperDoc(slug);
  if (!doc) {
    notFound();
  }

  const [DocComponent, headings] = await Promise.all([
    loadDeveloperDocComponent(doc.slug),
    getDeveloperDocHeadings(doc.slug),
  ]);

  if (!DocComponent) {
    notFound();
  }

  return (
    <DeveloperDocsShell doc={doc} headings={headings}>
      <DocComponent components={developerDocComponents} />
    </DeveloperDocsShell>
  );
}
