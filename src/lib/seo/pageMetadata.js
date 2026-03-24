import { siteMetadata } from "../../app/sitemetadata";

function normalizePathname(pathname = "/") {
  if (!pathname) {
    return "/";
  }

  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function buildCanonicalUrl(pathname = "/") {
  const normalizedPath = normalizePathname(pathname);

  if (/^https?:\/\//i.test(normalizedPath)) {
    return normalizedPath;
  }

  return new URL(normalizedPath, siteMetadata.siteUrl).toString();
}

export function buildPageMetadata({
  title,
  description,
  pathname = "/",
  keywords,
  image,
  type = "website",
  noIndex = false,
  openGraph = {},
  twitter = {},
}) {
  const canonicalUrl = buildCanonicalUrl(pathname);
  const resolvedImage = image || siteMetadata.socialBanner;
  const resolvedTitle = title || siteMetadata.title;
  const resolvedDescription = description || siteMetadata.description;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    ...(keywords ? { keywords } : {}),
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      type,
      ...(resolvedImage
        ? {
            images: [
              {
                url: resolvedImage,
                alt: resolvedTitle,
              },
            ],
          }
        : {}),
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      ...(resolvedImage ? { images: [resolvedImage] } : {}),
      ...twitter,
    },
  };
}

export function resolveCanonicalUrl(pathname = "/") {
  return buildCanonicalUrl(pathname);
}
