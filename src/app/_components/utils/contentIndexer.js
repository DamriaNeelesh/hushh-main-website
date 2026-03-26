import { allBlogSummaries } from "../../../lib/content/blog-registry";
import { developerDocContentBySlug } from "../../../lib/content/developer-doc-registry";
import { developerDocs } from "../../developers/docs.config";

const REMOVED_ROUTE_BLOG_SLUGS = new Set([
  "gemini-ai-public-data-agent-documentation",
  "hushh-agents-documentation",
  "hushh-brand-user-data-query-agent",
  "hushh-supabase-profile-creation-agent",
  "hushh-supabase-profile-update-agent",
  "hushh-user-data-query-agent",
  "openai-public-data-agent-documentation",
]);

const STATIC_PAGE_ENTRIES = [
  {
    id: "home",
    title: "Hushh",
    description: "Consent-first personal AI and PKM-aware product experiences.",
    url: "/",
    type: "page",
    category: "Main Pages",
    tags: ["home", "kai", "privacy", "personal AI", "consent"],
    content:
      "Consent-first personal AI platform with Kai, PKM-aware integrations, secure data storage, and developer tooling.",
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "Canonical privacy policy for Hushh.",
    url: "/privacy",
    type: "page",
    category: "Legal",
    tags: ["privacy", "legal", "policy"],
    content: "Canonical privacy policy, privacy commitments, data handling, and user rights.",
  },
  {
    id: "terms",
    title: "Terms of Use",
    description: "Canonical terms of use for Hushh.",
    url: "/terms",
    type: "page",
    category: "Legal",
    tags: ["terms", "legal", "policy"],
    content: "Canonical terms of use, service conditions, acceptable use, and legal obligations.",
  },
  {
    id: "developers",
    title: "Developers",
    description: "Developer hub for both Agent Kai and the older Agentic APIs.",
    url: "/developers",
    type: "page",
    category: "Developers",
    tags: ["developers", "kai", "agentic", "a2a", "mcp", "api"],
    content:
      "Developer hub for the separate Agent Kai API and Agentic APIs tracks, including PKM consent, REST, MCP, A2A, MuleSoft, and browser-proxy guidance.",
  },
  {
    id: "agents",
    title: "Agents Workspace",
    description: "Browser-safe A2A runtime for brand, public, Gemini, email, and WhatsApp testing.",
    url: "/agents",
    type: "page",
    category: "Developers",
    tags: ["agents", "a2a", "browser proxy", "whatsapp", "mulesoft"],
    content:
      "Interactive workspace for the Agentic APIs browser proxy, agent testing, email delivery, and WhatsApp activation flows.",
  },
  {
    id: "developers-login",
    title: "Developer Workspace Login",
    description: "Sign in to enable Kai developer access and manage your app identity.",
    url: "/developers/login",
    type: "page",
    category: "Developers",
    tags: ["developers", "login", "workspace", "firebase auth"],
    content:
      "Developer workspace sign-in for Kai integrations, developer access, app identity management, and token rotation.",
  },
  {
    id: "login",
    title: "Login",
    description: "Sign in with the shared Firebase identity flow.",
    url: "/login",
    type: "page",
    category: "Auth",
    tags: ["login", "authentication", "firebase auth"],
    content: "User login powered by the shared Firebase identity layer and Hushh profile flows.",
  },
  {
    id: "user-registration",
    title: "User Registration",
    description: "Create your Hushh profile and complete onboarding.",
    url: "/user-registration",
    type: "page",
    category: "Auth",
    tags: ["registration", "profile", "onboarding"],
    content: "User registration, profile completion, and consent-aware onboarding.",
  },
  {
    id: "user-profile",
    title: "User Profile",
    description: "Manage your Hushh profile and connected identity.",
    url: "/user-profile",
    type: "page",
    category: "Account",
    tags: ["profile", "account", "identity"],
    content: "User profile management, account settings, and personal identity preferences.",
  },
  {
    id: "product-kai",
    title: "Agent Kai",
    description: "Explainable investing in a consent-first Kai experience.",
    url: "/products/kai",
    type: "product",
    category: "Products",
    tags: ["kai", "investing", "pkm", "portfolio"],
    content:
      "Kai brings explainable investing, portfolio context, and PKM-aware decision support to the user experience.",
  },
  {
    id: "product-vault",
    title: "Hushh Vault",
    description: "Secure personal data storage and consent-aware access controls.",
    url: "/hushh-vault",
    type: "product",
    category: "Products",
    tags: ["vault", "storage", "privacy", "security"],
    content: "Secure personal data storage, encrypted vault access, and privacy-first control.",
  },
  {
    id: "product-link",
    title: "Hushh Link",
    description: "Identity and permissions infrastructure for consent-first data exchange.",
    url: "/hushh-link",
    type: "product",
    category: "Products",
    tags: ["link", "identity", "permissions", "consent"],
    content: "Identity, permissions, consent validation, and trusted sharing across product surfaces.",
  },
  {
    id: "product-flow",
    title: "Hushh Flow",
    description: "Workflow orchestration and monetization primitives for Hushh products.",
    url: "/products/hushh-flow",
    type: "product",
    category: "Products",
    tags: ["flow", "workflow", "monetization"],
    content: "Workflow automation, orchestration, and monetization for consent-first experiences.",
  },
  {
    id: "product-grid",
    title: "Hushh Grid",
    description: "Runtime and orchestration infrastructure for Hushh systems.",
    url: "/products/hushh-grid",
    type: "product",
    category: "Products",
    tags: ["grid", "runtime", "orchestration"],
    content: "Runtime infrastructure, orchestration, and scalable execution for Hushh systems.",
  },
  {
    id: "product-wallet",
    title: "Hushh Wallet App",
    description: "Personal data wallet with user-controlled sharing and organization.",
    url: "/products/hushh-wallet-app",
    type: "product",
    category: "Products",
    tags: ["wallet", "data wallet", "mobile"],
    content: "Personal data wallet, organized preferences, and user-controlled sharing.",
  },
  {
    id: "product-button",
    title: "Hushh Button",
    description: "Preference sharing for personalized experiences with user control.",
    url: "/products/hushh-button",
    type: "product",
    category: "Products",
    tags: ["button", "preferences", "personalization"],
    content: "Preference sharing, personalization, and user-controlled brand experiences.",
  },
  {
    id: "product-browser",
    title: "Hushh Browser Companion",
    description: "Browser companion for managing digital footprint and preferences.",
    url: "/products/browser-companion",
    type: "product",
    category: "Products",
    tags: ["browser", "companion", "privacy"],
    content: "Browser companion for privacy-aware browsing, organization, and personal data visibility.",
  },
  {
    id: "product-vibe-search",
    title: "Vibe Search",
    description: "Visual product discovery and style-aware search experiences.",
    url: "/products/hushh-vibe-search",
    type: "product",
    category: "Products",
    tags: ["vibe search", "shopping", "discovery"],
    content: "Visual product discovery, style-aware search, and shopping personalization.",
  },
  {
    id: "product-students",
    title: "Hushh For Students",
    description: "Student-focused privacy and data empowerment products.",
    url: "/products/hushh-for-students",
    type: "product",
    category: "Products",
    tags: ["students", "education", "privacy"],
    content: "Student-focused privacy, empowerment, and data-aware experiences.",
  },
  {
    id: "about",
    title: "About Hushh",
    description: "Mission, vision, and company story behind Hushh.",
    url: "/about",
    type: "page",
    category: "Company",
    tags: ["about", "company", "mission"],
    content: "Company story, mission, vision, and privacy-first direction for Hushh.",
  },
  {
    id: "contact",
    title: "Contact Hushh",
    description: "Support, partnership, and general contact options.",
    url: "/contact-us",
    type: "page",
    category: "Support",
    tags: ["contact", "support", "partnerships"],
    content: "Contact the Hushh team for support, partnerships, and general inquiries.",
  },
  {
    id: "careers",
    title: "Careers at Hushh",
    description: "Join the Hushh team building privacy-first products.",
    url: "/career",
    type: "page",
    category: "Company",
    tags: ["careers", "jobs", "team"],
    content: "Career opportunities at Hushh across engineering, design, and operations.",
  },
  {
    id: "community",
    title: "Hushh Community",
    description: "Community updates, contact, and collaboration surfaces.",
    url: "/hushh-community",
    type: "page",
    category: "Community",
    tags: ["community", "discord", "linkedin"],
    content: "Community touchpoints, collaboration channels, and outreach for Hushh.",
  },
];

function normalizeEntry(entry) {
  const searchableText = [
    entry.title,
    entry.description,
    entry.content,
    ...(entry.tags || []),
    entry.url,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return {
    author: entry.author || "Hushh Team",
    isPublished: entry.isPublished !== false,
    publishedAt: entry.publishedAt || "",
    readingTime: entry.readingTime || Math.max(1, Math.ceil(searchableText.split(/\s+/).length / 220)),
    wordCount: entry.wordCount || Math.max(1, searchableText.split(/\s+/).filter(Boolean).length),
    ...entry,
    searchableText,
  };
}

export class ContentIndexer {
  constructor() {
    this.contentIndex = [];
    this.isClient = typeof window !== "undefined";
  }

  async indexBlogContent() {
    if (this.isClient) {
      return [];
    }

    return allBlogSummaries
      .filter((blog) => blog.isPublished !== false)
      .filter((blog) => !REMOVED_ROUTE_BLOG_SLUGS.has(blog.slug))
      .map((blog) =>
        normalizeEntry({
          id: `blog-${blog.slug}`,
          title: blog.title,
          description: blog.description || `Blog post about ${blog.title}`,
          content: blog.plainText || "",
          url: blog.url,
          type: "blog",
          category: "Blog",
          tags: blog.tags || [],
          author: blog.author || "Hushh Team",
          publishedAt: blog.publishedAt || "",
        }),
      );
  }

  async indexPagesContent() {
    if (this.isClient) {
      return [];
    }

    return developerDocs.map((doc) => {
      const sourceSlug = doc.source.replace(/\.tsx$/, "");
      const content = developerDocContentBySlug[sourceSlug]?.plainText || "";

      return normalizeEntry({
        id: `page-developer-${doc.slug}`,
        title: doc.title,
        description: doc.description,
        content,
        url: `/developers/${doc.slug}`,
        type: "documentation",
        category: "Developers",
        tags: ["developers", doc.section, doc.slug.replace(/[-_]/g, " ")],
      });
    });
  }

  async indexStaticPages() {
    return STATIC_PAGE_ENTRIES.map((entry) => normalizeEntry(entry));
  }

  async buildSearchIndex() {
    const [blogContent, docsContent, staticContent] = await Promise.all([
      this.indexBlogContent(),
      this.indexPagesContent(),
      this.indexStaticPages(),
    ]);

    this.contentIndex = [...blogContent, ...docsContent, ...staticContent];
    return this.contentIndex;
  }

  searchContent(query, options = {}) {
    if (!query || query.trim().length < 1) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const { limit = 25, type = null } = options;

    return this.contentIndex
      .filter((item) => {
        if (type && item.type !== type) {
          return false;
        }

        return (
          item.searchableText.includes(searchTerm) ||
          item.title.toLowerCase().includes(searchTerm) ||
          item.description.toLowerCase().includes(searchTerm) ||
          item.url.toLowerCase().includes(searchTerm)
        );
      })
      .map((item) => {
        let relevanceScore = 0;

        if (item.title.toLowerCase() === searchTerm) {
          relevanceScore += 1000;
        } else if (item.title.toLowerCase().includes(searchTerm)) {
          relevanceScore += 250;
          if (item.title.toLowerCase().startsWith(searchTerm)) {
            relevanceScore += 100;
          }
        }

        if (item.description.toLowerCase().includes(searchTerm)) {
          relevanceScore += 120;
        }

        if ((item.tags || []).some((tag) => tag.toLowerCase() === searchTerm)) {
          relevanceScore += 140;
        } else if ((item.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm))) {
          relevanceScore += 70;
        }

        if (item.url.toLowerCase().includes(searchTerm)) {
          relevanceScore += 50;
        }

        const occurrences = (item.searchableText.match(new RegExp(searchTerm, "g")) || []).length;
        relevanceScore += occurrences * 8;

        if (item.type === "documentation") relevanceScore += 25;
        if (item.type === "product") relevanceScore += 20;
        if (item.type === "blog") relevanceScore += 15;

        return { ...item, relevanceScore };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
  }

  getSuggestions(query, limit = 10) {
    if (!query || query.trim().length < 1) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const suggestions = new Set();

    for (const item of this.contentIndex) {
      if (item.title.toLowerCase().includes(searchTerm)) {
        suggestions.add(item.title);
      }

      for (const tag of item.tags || []) {
        if (tag.toLowerCase().includes(searchTerm)) {
          suggestions.add(tag);
        }
      }
    }

    return Array.from(suggestions).slice(0, limit);
  }
}

let contentIndexerInstance = null;

export const getContentIndexer = () => {
  if (!contentIndexerInstance) {
    contentIndexerInstance = new ContentIndexer();
  }

  return contentIndexerInstance;
};

export default ContentIndexer;
