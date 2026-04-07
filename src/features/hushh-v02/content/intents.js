export const HUSHH_V02_LANES = [
  {
    value: "me",
    label: "Me",
    eyebrow: "Hushh",
    description: "Search with your identity context and personal dossier.",
  },
  {
    value: "web",
    label: "Web",
    eyebrow: "Hushh",
    description: "Search the open web with proof, source quality, and next moves.",
  },
  {
    value: "kai",
    label: "Kai",
    eyebrow: "Hushh",
    description: "Jump into Kai for the dedicated product experience.",
  },
];

export const HUSHH_V02_INTENTS = [
  {
    value: "general",
    label: "General",
    description: "Balanced answer using overall public footprint.",
  },
  {
    value: "professional",
    label: "Professional",
    description: "Career, work, profiles, and public achievements.",
  },
  {
    value: "social",
    label: "Social",
    description: "Public social presence and community traces.",
  },
  {
    value: "reputation",
    label: "Reputation",
    description: "Mentions, credibility, and public trust signals.",
  },
  {
    value: "local",
    label: "Local",
    description: "Location-aware public context and nearby relevance.",
  },
  {
    value: "domain-investigation",
    label: "Domain",
    description: "Email-domain and passive web footprint investigation.",
  },
];

export const HUSHH_V02_DEFAULT_SUGGESTIONS_BY_LANE = {
  me: [
    "Summarize my professional footprint",
    "What public reputation signals exist?",
    "Show my internet impact snapshot",
  ],
  web: [
    "What is the most important update on this topic?",
    "What do the most credible sources agree on?",
    "What should I do next based on the evidence?",
  ],
};

export const HUSHH_V02_DEFAULT_SUGGESTIONS = HUSHH_V02_DEFAULT_SUGGESTIONS_BY_LANE.me;
