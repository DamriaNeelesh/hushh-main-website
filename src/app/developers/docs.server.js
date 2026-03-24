import "server-only";

import { getDeveloperDoc } from "./docs.config";
import { developerDocContentBySlug } from "../../lib/content/developer-doc-registry";

function getSourceSlug(doc) {
  return doc?.source?.replace(/\.tsx$/, "") || null;
}

export async function loadDeveloperDocComponent(slug) {
  const doc = getDeveloperDoc(slug);
  const sourceSlug = getSourceSlug(doc);
  if (!sourceSlug) {
    return null;
  }

  return developerDocContentBySlug[sourceSlug]?.Content || null;
}

export async function getDeveloperDocHeadings(slug) {
  const doc = getDeveloperDoc(slug);
  const sourceSlug = getSourceSlug(doc);
  if (!sourceSlug) {
    return [];
  }

  return developerDocContentBySlug[sourceSlug]?.headings || [];
}
