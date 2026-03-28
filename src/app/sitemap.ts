import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { slug as slugify } from "github-slugger";
import { siteMetadata } from "./sitemetadata";
import { developerDocs } from "./developers/docs.config";
import { jobs } from "./_components/career/jobs";
import { allBlogSummaries } from "../lib/content/blog-registry";

const APP_DIRECTORY = path.join(process.cwd(), "src/app");
const PAGE_FILE_PATTERN = /^page\.(js|jsx|ts|tsx)$/;
const IGNORED_DIRECTORIES = new Set(["_components", "_styles", "api", "clientside", "context"]);
const EXCLUDED_ROUTES = new Set([
  "/developers/login",
  "/kai",
  "/login",
  "/login/callback",
  "/qrCodePage",
  "/server-sitemap.xml",
  "/settings/mfa",
  "/social-onboarding",
  "/social-onboarding/completed",
  "/social-onboarding/dashboard",
  "/social-onboarding/personal-preferences",
  "/social-onboarding/social-links",
  "/user-profile",
  "/user-registration",
  "/viva-connect/qrPage",
  "/vivaConnect",
]);

function toAbsoluteUrl(routePath: string) {
  return new URL(routePath, siteMetadata.siteUrl).toString();
}

function toRoutePath(segments: string[]) {
  if (segments.length === 0) {
    return "/";
  }

  return `/${segments.join("/")}`;
}

function collectStaticPageRoutes(directory: string, routeSegments: string[] = []): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const staticRoutes = new Set<string>();

  if (entries.some((entry) => entry.isFile() && PAGE_FILE_PATTERN.test(entry.name))) {
    const routePath = toRoutePath(routeSegments);
    if (!EXCLUDED_ROUTES.has(routePath)) {
      staticRoutes.add(routePath);
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name.startsWith("_") || entry.name.startsWith(".")) {
      continue;
    }

    if (IGNORED_DIRECTORIES.has(entry.name)) {
      continue;
    }

    const childDirectory = path.join(directory, entry.name);

    if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
      for (const childRoute of collectStaticPageRoutes(childDirectory, routeSegments)) {
        staticRoutes.add(childRoute);
      }
      continue;
    }

    if (entry.name.startsWith("@") || entry.name.startsWith("[") || entry.name.includes(".")) {
      continue;
    }

    for (const childRoute of collectStaticPageRoutes(childDirectory, [...routeSegments, entry.name])) {
      staticRoutes.add(childRoute);
    }
  }

  return [...staticRoutes];
}

function collectCategoryRoutes() {
  const categoryRoutes = new Set<string>(["/categories/all"]);

  for (const blog of allBlogSummaries) {
    if (!blog.isPublished || !Array.isArray(blog.tags)) {
      continue;
    }

    for (const tag of blog.tags) {
      if (typeof tag !== "string" || !tag.trim()) {
        continue;
      }

      categoryRoutes.add(`/categories/${slugify(tag.trim())}`);
    }
  }

  return [...categoryRoutes];
}

function buildStaticEntries() {
  return collectStaticPageRoutes(APP_DIRECTORY)
    .filter((routePath) => !routePath.startsWith("/categories/"))
    .map((routePath) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        routePath === "/" ? "daily" : "weekly";

      return {
        url: toAbsoluteUrl(routePath),
        lastModified: new Date(),
        changeFrequency,
        priority: routePath === "/" ? 1 : routePath.startsWith("/products/") ? 0.9 : 0.7,
      };
    });
}

function buildDeveloperEntries() {
  return developerDocs.map((doc) => ({
    url: toAbsoluteUrl(`/developers/${doc.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
}

function buildBlogEntries() {
  return allBlogSummaries
    .filter((blog) => blog.isPublished)
    .map((blog) => ({
      url: toAbsoluteUrl(blog.url),
      lastModified: new Date(blog.updatedAt || blog.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));
}

function buildCategoryEntries() {
  return collectCategoryRoutes().map((routePath) => ({
    url: toAbsoluteUrl(routePath),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));
}

function buildJobEntries() {
  return jobs.map((job) => ({
    url: toAbsoluteUrl(`/job/${job.id}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
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
