import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { slug as slugify } from "github-slugger";
import { siteMetadata } from "./sitemetadata";
import { developerDocs } from "./developers/docs.config";
import { jobs } from "./_components/career/jobs";
import { allBlogSummaries } from "../lib/content/blog-registry";

const JOB_SOURCE_FILE = "src/app/_components/career/jobs.jsx";

const STATIC_INDEXABLE_ROUTES = [
  { route: "/", source: "src/app/page.jsx", changeFrequency: "daily", priority: 1 },
  { route: "/about", source: "src/app/about/page.jsx", changeFrequency: "monthly", priority: 0.8 },
  { route: "/career", source: "src/app/career/page.jsx", changeFrequency: "weekly", priority: 0.75 },
  {
    route: "/consent-ai-protocol",
    source: "src/app/consent-ai-protocol/page.jsx",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { route: "/contact-us", source: "src/app/contact-us/page.jsx", changeFrequency: "monthly", priority: 0.65 },
  {
    route: "/demoBookingPage",
    source: "src/app/demoBookingPage/page.jsx",
    changeFrequency: "monthly",
    priority: 0.55,
  },
  { route: "/developers", source: "src/app/developers/page.jsx", changeFrequency: "weekly", priority: 0.85 },
  {
    route: "/frequently-asked-questions",
    source: "src/app/frequently-asked-questions/page.jsx",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    route: "/hushh-community",
    source: "src/app/hushh-community/page.jsx",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    route: "/hushh-core-values",
    source: "src/app/hushh-core-values/page.jsx",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  { route: "/hushh-link", source: "src/app/hushh-link/page.jsx", changeFrequency: "monthly", priority: 0.6 },
  { route: "/hushh-press", source: "src/app/hushh-press/page.jsx", changeFrequency: "monthly", priority: 0.6 },
  { route: "/hushh-vault", source: "src/app/hushh-vault/page.jsx", changeFrequency: "monthly", priority: 0.6 },
  { route: "/hushhBlogs", source: "src/app/hushhBlogs/page.jsx", changeFrequency: "weekly", priority: 0.8 },
  {
    route: "/pricingPlans",
    source: "src/app/pricingPlans/page.jsx",
    changeFrequency: "monthly",
    priority: 0.55,
  },
  { route: "/privacy", source: "src/app/privacy/page.jsx", changeFrequency: "yearly", priority: 0.45 },
  {
    route: "/products/browser-companion",
    source: "src/app/products/browser-companion/page.jsx",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    route: "/products/concierge-app",
    source: "src/app/products/concierge-app/page.tsx",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    route: "/products/hushh-button",
    source: "src/app/products/hushh-button/page.tsx",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    route: "/products/hushh-flow",
    source: "src/app/products/hushh-flow/page.tsx",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    route: "/products/hushh-for-students",
    source: "src/app/products/hushh-for-students/page.tsx",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    route: "/products/hushh-grid",
    source: "src/app/products/hushh-grid/page.jsx",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    route: "/products/hushh-valet-chat",
    source: "src/app/products/hushh-valet-chat/page.tsx",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  {
    route: "/products/hushh-vibe-search",
    source: "src/app/products/hushh-vibe-search/page.tsx",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    route: "/products/hushh-wallet-app",
    source: "src/app/products/hushh-wallet-app/page.tsx",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    route: "/products/kai",
    source: "src/app/products/kai/page.jsx",
    changeFrequency: "weekly",
    priority: 0.95,
  },
  {
    route: "/products/personal-data-agent",
    source: "src/app/products/personal-data-agent/page.jsx",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  { route: "/solutions", source: "src/app/solutions/page.jsx", changeFrequency: "monthly", priority: 0.7 },
  { route: "/terms", source: "src/app/terms/page.jsx", changeFrequency: "yearly", priority: 0.45 },
  { route: "/viva-connect", source: "src/app/viva-connect/page.jsx", changeFrequency: "monthly", priority: 0.6 },
  { route: "/why-hushh", source: "src/app/why-hushh/page.jsx", changeFrequency: "monthly", priority: 0.7 },
] as const;

function toAbsoluteUrl(routePath: string) {
  return new URL(routePath, siteMetadata.siteUrl).toString();
}

function getFileLastModified(relativePath: string) {
  try {
    return fs.statSync(path.join(/* turbopackIgnore: true */ process.cwd(), relativePath)).mtime;
  } catch {
    return undefined;
  }
}

function withLastModified<T extends MetadataRoute.Sitemap[number]>(
  entry: T,
  lastModified?: Date,
) {
  return lastModified ? { ...entry, lastModified } : entry;
}

function resolveBlogTimestamp(blog: (typeof allBlogSummaries)[number]) {
  return new Date(blog.updatedAt || blog.publishedAt || Date.now());
}

function collectCategoryDates() {
  const categoryDates = new Map<string, Date[]>();
  categoryDates.set("all", []);

  for (const blog of allBlogSummaries) {
    if (!blog.isPublished) {
      continue;
    }

    const blogDate = resolveBlogTimestamp(blog);
    categoryDates.get("all")?.push(blogDate);

    if (!Array.isArray(blog.tags)) {
      continue;
    }

    for (const tag of blog.tags) {
      if (typeof tag !== "string" || !tag.trim()) {
        continue;
      }

      const categorySlug = slugify(tag.trim());
      if (!categoryDates.has(categorySlug)) {
        categoryDates.set(categorySlug, []);
      }

      categoryDates.get(categorySlug)?.push(blogDate);
    }
  }

  return categoryDates;
}

function buildStaticEntries() {
  return STATIC_INDEXABLE_ROUTES.map(({ route, source, changeFrequency, priority }) =>
    withLastModified(
      {
        url: toAbsoluteUrl(route),
        changeFrequency,
        priority,
      },
      getFileLastModified(source),
    ),
  );
}

function buildDeveloperEntries() {
  return developerDocs.map((doc) =>
    withLastModified(
      {
        url: toAbsoluteUrl(`/developers/${doc.slug}`),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      getFileLastModified(`content/developerApi/${doc.source}`),
    ),
  );
}

function buildBlogEntries() {
  return allBlogSummaries
    .filter((blog) => blog.isPublished)
    .map((blog) => ({
      url: toAbsoluteUrl(blog.url),
      lastModified: resolveBlogTimestamp(blog),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));
}

function buildCategoryEntries() {
  const categoryDates = collectCategoryDates();

  return [...categoryDates.entries()].map(([categorySlug, dates]) =>
    withLastModified(
      {
        url: toAbsoluteUrl(`/categories/${categorySlug}`),
        changeFrequency: "weekly",
        priority: categorySlug === "all" ? 0.7 : 0.65,
      },
      dates.length > 0 ? new Date(Math.max(...dates.map((date) => date.getTime()))) : undefined,
    ),
  );
}

function buildJobEntries() {
  const jobsLastModified = getFileLastModified(JOB_SOURCE_FILE);

  return jobs.map((job) =>
    withLastModified(
      {
        url: toAbsoluteUrl(`/job/${job.id}`),
        changeFrequency: "weekly",
        priority: 0.6,
      },
      jobsLastModified,
    ),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = [
    ...buildStaticEntries(),
    ...buildDeveloperEntries(),
    ...buildBlogEntries(),
    ...buildCategoryEntries(),
    ...buildJobEntries(),
  ];

  const uniqueEntries = new Map(entries.map((entry) => [entry.url, entry]));
  return [...uniqueEntries.values()].sort((left, right) => left.url.localeCompare(right.url));
}
