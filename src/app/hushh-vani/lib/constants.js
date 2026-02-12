/**
 * Hushh Vani — Design Tokens & Constants
 * Generated via UI UX Pro Max design system
 */

export const DESIGN_TOKENS = {
  colors: {
    primary: "#7C3AED",      // Hushh purple
    secondary: "#A78BFA",    // Light purple
    accent: "#F59E0B",       // Saffron / India gold
    cta: "#06B6D4",          // Cyan action
    background: "#FAFAFA",   // Clean white
    surface: "#FFFFFF",
    text: {
      primary: "#1A1A2E",
      secondary: "#4A4A68",
      muted: "#9CA3AF",
      inverse: "#FFFFFF",
    },
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
  },
  typography: {
    fontFamily: "var(--font-plus-jakarta), 'Plus Jakarta Sans', sans-serif",
    sizes: {
      hero: "clamp(2.5rem, 5vw, 4.5rem)",
      h1: "clamp(2rem, 4vw, 3.5rem)",
      h2: "clamp(1.5rem, 3vw, 2.5rem)",
      h3: "clamp(1.25rem, 2vw, 1.75rem)",
      body: "1rem",
      small: "0.875rem",
      xs: "0.75rem",
    },
  },
  spacing: {
    section: "clamp(4rem, 8vw, 8rem)",
    container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  },
  transitions: {
    fast: "150ms ease",
    normal: "200ms ease",
    slow: "300ms ease",
  },
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
  },
};

export const FEATURES = [
  {
    id: "vernacular-ai",
    title: "Vernacular AI",
    hindiTitle: "अपनी भाषा, अपनी पहचान",
    tagline: "Apni Bhaasha, Apni Pehchaan",
    description:
      "Master Hinglish and 22+ Indian languages with AI that doesn't just translate — it adapts. Content that feels local, personal, and authentic.",
    capabilities: [
      "Hinglish content generation",
      "22+ regional language support",
      "Cultural context adaptation",
      "Multilingual chatbots with dialect support",
    ],
    icon: "Languages",
  },
  {
    id: "voice-visual-search",
    title: "Voice & Visual Search",
    hindiTitle: "बोलो या दिखाओ, हम समझेंगे",
    tagline: "Bolo Ya Dikhao, Hum Samjhenge",
    description:
      "Indian users skip typing. Optimize for natural voice queries in regional accents and image-based product discovery for Tier-2/3 cities.",
    capabilities: [
      "Regional accent voice recognition",
      "Visual product discovery",
      "Long-tail conversational keywords",
      "Hands-free commerce",
    ],
    icon: "Mic",
  },
  {
    id: "emotional-bridge",
    title: "Emotional Bridge",
    hindiTitle: "दिल से जुड़ाव",
    tagline: "Dil Se Judaav",
    description:
      "AI provides the framework; humans add the soul. Campaigns tailored to local festivals, regional humor, and cultural nuances that build trust.",
    capabilities: [
      "Festival-specific campaigns",
      "Human-in-the-loop storytelling",
      "Cultural empathy engine",
      "Regional customs awareness",
    ],
    icon: "Heart",
  },
  {
    id: "social-commerce",
    title: "Social Commerce",
    hindiTitle: "सोशल से सेल तक",
    tagline: "Social Se Sale Tak",
    description:
      "Leverage India's trust in influencers. AI-powered influencer matching, shoppable videos, and AR try-ons that convert discovery into purchases.",
    capabilities: [
      "AI influencer matching",
      "Shoppable video integration",
      "AR virtual try-ons",
      "WhatsApp commerce",
    ],
    icon: "ShoppingBag",
  },
  {
    id: "bharat-optimized",
    title: "Bharat Optimized",
    hindiTitle: "भारत के लिए बना",
    tagline: "Bharat Ke Liye Bana",
    description:
      "Mobile-first, low-data, lightning-fast. Every experience built for India's 800M+ smartphone users, from metros to villages.",
    capabilities: [
      "Mobile-first PWA architecture",
      "Low-bandwidth optimization",
      "Entry-level device support",
      "Offline-capable features",
    ],
    icon: "Smartphone",
  },
];

export const STATS = [
  { value: "22+", label: "Indian Languages" },
  { value: "800M+", label: "Mobile Users Reached" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 100ms", label: "Response Time" },
];

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Bharat", href: "#bharat" },
  { label: "Contact", href: "#contact" },
];
