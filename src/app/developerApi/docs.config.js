export const developerDocs = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Begin your first Hushh developer integration with the consent-first API flow.",
    source: "getting-started.tsx",
    section: "Start Here",
  },
  {
    slug: "on-boarding",
    title: "Developer Console Setup",
    description: "Sign in, complete your org profile, and generate API credentials.",
    source: "on-boarding.tsx",
    section: "Start Here",
  },
  {
    slug: "rootEndpoints",
    title: "Agentic Endpoints",
    description: "Explore the live test surface and production endpoint contract.",
    source: "rootEndpoints.tsx",
    section: "Reference",
  },
  {
    slug: "data-resources",
    title: "Data & Resources",
    description: "Understand how Hushh organizes consented data and access patterns.",
    source: "data-resources.tsx",
    section: "Reference",
  },
  {
    slug: "data-retrieval-insertion",
    title: "Profile Data and Enrichment",
    description: "Follow the full profile pipeline from consent through activation.",
    source: "data-retrieval-insertion.tsx",
    section: "Reference",
  },
  {
    slug: "agent-reference",
    title: "Agent Reference",
    description: "Review the core agent catalog, JSON-RPC envelope, and examples.",
    source: "agent-reference.tsx",
    section: "Reference",
  },
  {
    slug: "use-cases",
    title: "Use Cases",
    description: "See how luxury, retail, and platform teams use the Hushh developer APIs.",
    source: "top-level-use-cases.tsx",
    section: "Guides",
  },
  {
    slug: "brand-engineering-onboarding",
    title: "Brand Engineering Onboarding",
    description: "Guide enterprise brand engineering teams through the activation workflow.",
    source: "brand-engineering-onboarding.tsx",
    section: "Guides",
  },
  {
    slug: "intelligence-portal",
    title: "Intelligence Portal",
    description: "Document the post-submit analysis workflow and agent merge behavior.",
    source: "intelligence-portal.tsx",
    section: "Guides",
  },
  {
    slug: "investor-onboarding",
    title: "Investor Onboarding",
    description: "Walk through the current investor onboarding and verification flow.",
    source: "investor-onboarding.tsx",
    section: "Guides",
  },
  {
    slug: "additional-requirements",
    title: "Additional Requirements",
    description: "Capture security, governance, and compliance expectations for integrations.",
    source: "additional-requirements.tsx",
    section: "Reference",
  },
  {
    slug: "support",
    title: "Support",
    description: "Know what to send the Hushh team when troubleshooting an integration.",
    source: "support.tsx",
    section: "Reference",
  },
];

export const developerLegacyRedirects = {
  "user-on-boarding": "on-boarding",
};

export function getDeveloperDoc(slug) {
  return developerDocs.find((doc) => doc.slug === slug);
}

export function getDeveloperDocSections() {
  return developerDocs.reduce((sections, doc) => {
    if (!sections[doc.section]) {
      sections[doc.section] = [];
    }
    sections[doc.section].push(doc);
    return sections;
  }, {});
}

export function getDeveloperDocNeighbors(slug) {
  const index = developerDocs.findIndex((doc) => doc.slug === slug);

  return {
    previous: index > 0 ? developerDocs[index - 1] : null,
    next: index >= 0 && index < developerDocs.length - 1 ? developerDocs[index + 1] : null,
  };
}
