import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hushh",
    short_name: "Hushh",
    description: "Privacy-first personal data agents, developer APIs, and consent-driven AI experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0b0d12",
    icons: [
      {
        src: "/Logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/products/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
  };
}
