import type { MetadataRoute } from "next";
import { siteMetadata } from "./sitemetadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/clientside/", "/api/", "/_next/", "/*?q=*"],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  };
}
