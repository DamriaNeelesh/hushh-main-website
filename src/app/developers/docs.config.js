export const developerTracks = [
  {
    key: "kai",
    title: "Agent Kai API",
    href: "/developers/agent-kai",
    summary:
      "Consent-first PKM discovery, approval inside Kai, versioned REST endpoints, and remote MCP runtime guidance.",
  },
  {
    key: "agentic",
    title: "Agentic APIs",
    href: "/developers/agentic-apis",
    summary:
      "Historical A2A, MuleSoft, browser-proxy, and profile-enrichment APIs for enterprise activation flows.",
  },
];

export const developerOverviewLinks = [
  { key: "developers-home", href: "/developers", label: "Developer Home" },
];

export const developerDocs = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Begin your first Kai integration with the consent-first PKM contract.",
    source: "getting-started.tsx",
    section: "Agent Kai API",
    track: "kai",
  },
  {
    slug: "on-boarding",
    title: "Developer Workspace",
    description: "Sign in, enable Kai developer access, rotate tokens, and keep your app identity current.",
    source: "on-boarding.tsx",
    section: "Agent Kai API",
    track: "kai",
  },
  {
    slug: "agent-kai",
    title: "Agent Kai API Reference",
    description: "Explore the live Kai REST contract, PKM data plane, consent model, and MCP runtime.",
    source: "agent-kai.tsx",
    section: "Agent Kai API",
    track: "kai",
  },
  {
    slug: "data-resources",
    title: "Data & Resources",
    description: "Understand PKM domains, scope discovery, and consent-aware payload shape.",
    source: "data-resources.tsx",
    section: "Agent Kai API",
    track: "kai",
  },
  {
    slug: "agentic-apis",
    title: "Agentic APIs",
    description:
      "Canonical overview of the older A2A, MuleSoft, browser-proxy, and profile-enrichment API family.",
    source: "agentic-apis.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
  {
    slug: "agent-reference",
    title: "Agent Reference",
    description: "Review the MuleSoft-backed agent catalog, browser proxy envelope, and examples.",
    source: "agent-reference.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
  {
    slug: "data-retrieval-insertion",
    title: "Profile Data and Enrichment",
    description: "Follow the full profile pipeline from consent through enrichment and activation.",
    source: "data-retrieval-insertion.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
  {
    slug: "use-cases",
    title: "Use Cases",
    description:
      "See how enterprise teams use the older agentic enrichment and activation flow in practice.",
    source: "top-level-use-cases.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
  {
    slug: "brand-engineering-onboarding",
    title: "Brand Engineering Onboarding",
    description: "Guide enterprise brand teams through consented profile activation and CRM readiness.",
    source: "brand-engineering-onboarding.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
  {
    slug: "intelligence-portal",
    title: "Intelligence Portal",
    description: "Document the analysis workflow, merged profile output, and agent sequence.",
    source: "intelligence-portal.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
  {
    slug: "investor-onboarding",
    title: "Investor Onboarding",
    description: "Restore the investor-facing onboarding guide that supported API-led activation.",
    source: "investor-onboarding.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
  {
    slug: "additional-requirements",
    title: "Additional Requirements",
    description: "Capture security, governance, compliance, and operational expectations.",
    source: "additional-requirements.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
  {
    slug: "support",
    title: "Support",
    description:
      "Know what to send the Hushh team when troubleshooting either the Kai runtime or Agentic APIs.",
    source: "support.tsx",
    section: "Agentic APIs",
    track: "agentic",
  },
];

export const developerLegacyRedirects = {
  "user-on-boarding": "on-boarding",
  rootEndpoints: "agentic-apis",
};

export function getDeveloperDoc(slug) {
  return developerDocs.find((doc) => doc.slug === slug);
}

export function getDeveloperTrack(trackKey) {
  return developerTracks.find((track) => track.key === trackKey);
}

export function getDeveloperDocsByTrack(trackKey) {
  return developerDocs.filter((doc) => doc.track === trackKey);
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
  const doc = getDeveloperDoc(slug);
  if (!doc) {
    return { previous: null, next: null };
  }

  const trackDocs = getDeveloperDocsByTrack(doc.track);
  const index = trackDocs.findIndex((item) => item.slug === slug);

  return {
    previous: index > 0 ? trackDocs[index - 1] : null,
    next: index >= 0 && index < trackDocs.length - 1 ? trackDocs[index + 1] : null,
  };
}
