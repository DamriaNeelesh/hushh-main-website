"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

// ═══════════════════════════════════════════════════════════════════
// THE HUSSH FOUNDATION — INTERACTIVE WEB HANDBOOK
//
// Companion to hussh-foundation.pdf.
// Same spine. 24 chapters. 6 parts. Navigable, searchable, cross-linked.
// Designed to live at hussh.ai/foundation.
// ═══════════════════════════════════════════════════════════════════

const BLACK = "#000000";
const INK = "#1D1D1F";
const WHITE = "#FFFFFF";
const OFF = "#F5F5F7";
const HAIR = "#E5E5EA";
const DIM = "#86868B";
const GOLD = "#D4A574";
const GOLD_DEEP = "#B8894D";
const CRIMSON = "#9A1B1B";

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';
const MONO = '"SF Mono", ui-monospace, Menlo, Consolas, monospace';
const MOBILE_BREAKPOINT = 960;
const ASSET_BASE_URL = "/assets";
const FOUNDATION_PDF_URL = "/assets/hussh-foundation.pdf";

// ═══════════════════════════════════════════════════════════════════
// CONTENT — the full spine, with cross-references to the library
// ═══════════════════════════════════════════════════════════════════

const LIBRARY = {
  keynote: {
    name: "The Hussh Keynote",
    file: "hushh-one-keynote.pptx",
    type: "Presentation · 27 slides",
    href: `${ASSET_BASE_URL}/hushh-one-keynote.pptx`,
  },
  primer: {
    name: "The Brand Primer",
    file: "hussh-brand-primer.pdf",
    type: "PDF · 15 pages · v1.1",
    href: `${ASSET_BASE_URL}/hussh-brand-primer.pdf`,
  },
  rfc: {
    name: "RFC-001 — The Handoff",
    file: "hussh-rfc-001-handoff.pdf",
    type: "PDF · 2 pages",
    href: `${ASSET_BASE_URL}/hussh-rfc-001-handoff.pdf`,
  },
  ux: {
    name: "The UX System",
    file: "hussh-one-ux-system.jsx",
    type: "React artifact · 32 screens · JSX source",
    href: "/foundation/library/ux-system",
    sourceHref: `${ASSET_BASE_URL}/hussh-one-ux-system.jsx`,
    openInNewTab: false,
  },
  uxPriya: {
    name: "Priya UX (v1)",
    file: "hussh-one-ux.jsx",
    type: "React artifact · 36 screens · JSX source",
    href: "/foundation/library/priya-ux",
    sourceHref: `${ASSET_BASE_URL}/hussh-one-ux.jsx`,
    openInNewTab: false,
  },
  foundation: {
    name: "The Foundation",
    file: "hussh-foundation.pdf",
    type: "PDF · 32 pages · THIS document's PDF",
    href: FOUNDATION_PDF_URL,
  },
};

function getLibraryAssetCopy(lib, compact = false) {
  const extension = lib.file.split(".").pop()?.toLowerCase();

  if (extension === "jsx") {
    return {
      badge: "Live Experience",
      description: compact
        ? "Open the rendered React artifact. The unchanged JSX source is available inside the viewer."
        : "Published on hushh.ai as a rendered compatible React experience. The unchanged JSX source remains available from the viewer for engineering handoff.",
      cta: "Open Experience →",
    };
  }

  if (extension === "pptx") {
    return {
      badge: "Live PPTX",
      description: compact
        ? "Download the published keynote deck."
        : "Published on hushh.ai. Download the keynote deck from the canonical asset library.",
      cta: "Open Deck →",
    };
  }

  return {
    badge: "Live PDF",
    description: compact
      ? "Open the published PDF in a new tab."
      : "Published on hushh.ai. Open the canonical PDF in a new tab.",
    cta: "Open PDF →",
  };
}

const PARTS = [
  {
    roman: "I",
    num: "ONE",
    name: "Philosophy",
    tagline: "Why we exist. How we think. What we believe.",
    chapters: [
      {
        num: "01",
        title: "The Founding Premise",
        oneLiner: "Why Hussh exists.",
        body: [
          { kind: "p", text: "Every company has a founding wound. The wound is the thing the company was built to answer, and it must never be forgotten." },
          { kind: "p", text: "Hussh's is this: in 2021, the founder's identity was stolen. Social Security number, bank accounts, driver's license, personal details — sold, again and again, through channels the founder did not authorize. The family lost significant funds. No one told him." },
          { kind: "p", text: "The indignity was not just the theft. It was that the theft happened inside a system where every institution he had shared data with — banks, retailers, employers, governments — had failed to notify him, protect him, or give him any meaningful control over how his personal information moved through the world." },
          { kind: "pull", text: "If anyone reads your private data, you must be notified. This is Bible Verse #0. Every decision at Hussh descends from it." },
          { kind: "p", text: "Hussh exists to answer that wound. Not just for the founder. For every person on earth who will live through the AI era with more of their data in more places, working for more other people's AI agents." },
          { kind: "h", text: "The three commitments" },
          { kind: "principles", items: [
            ["01", "Notification is a right.", "The user will always be told when data about them is accessed, by whom, and for what purpose. Never silently, never incidentally."],
            ["02", "Ownership is a default.", "A user's data stays with the user — on their device, in their control, exported at will. Hussh is infrastructure. It is not a warehouse."],
            ["03", "Refusal is a feature.", "The user can always say no. The product must work, gracefully, when they do. Consent that is not freely refusable is not consent."],
          ]},
        ],
        seeAlso: ["keynote"],
      },
      {
        num: "02",
        title: "The Agentic-First Thesis",
        oneLiner: "What changes when every human has an agent.",
        body: [
          { kind: "p", text: "For thirty years, software waited for humans. A person opened an app, typed a query, read an answer, closed the app. The human was the actor; the software was the tool." },
          { kind: "p", text: "That is now over. In the AI era, software acts on behalf of humans — continuously, across surfaces, with judgment. Every human now has the potential for an agent. What they need is one that is theirs: shaped by their life, loyal to their interests, private by default." },
          { kind: "pull", text: "Agentic-first does not mean agent-only. It means: design for the moment when a human has already been served by their agent — what do they encounter, and how do they stay in control?" },
          { kind: "h", text: "Four consequences" },
          { kind: "principles", items: [
            ["01", "The UI is secondary.", "Agents do the doing. The user interface exists to let humans express intent, correct understanding, and approve outcomes — not to click through tasks."],
            ["02", "Trust is the product.", "The agent's value is not its intelligence but its faithfulness. Every screen in Hussh is engineered to earn and hold trust, not to demonstrate capability."],
            ["03", "Agents talk to agents.", "The handoff — two Ones meeting on behalf of their humans — is a first-class interaction."],
            ["04", "The human is the principal.", "Not the user, not the customer. The human. The product answers to them, and only them."],
          ]},
        ],
        seeAlso: ["rfc", "ux"],
      },
      {
        num: "03",
        title: "The Human at the Center",
        oneLiner: "What we mean, concretely.",
        body: [
          { kind: "p", text: "\"Human-centered\" is a phrase the software industry has overused into meaninglessness. At Hussh it means something specific and testable. Five things." },
          { kind: "principles", items: [
            ["01", "The human states intent; the agent resolves logistics.", "Humans say what they want. Agents figure out how. A form field asking a human to specify duration, priority, or channel is a product failure."],
            ["02", "The human can always see what the agent knows.", "Memory is radically transparent. Every belief the One holds about the user is visible on the surface where it matters, and one tap from correction or deletion."],
            ["03", "The human approves every outcome that affects them.", "No automated action changes the human's commitments, relationships, or data footprint without their one-tap confirmation. Silent autonomy is limited to low-stakes work."],
            ["04", "The human ends the conversation when they choose.", "Goodbye is a first-class interaction. The agent does not cling, upsell, or persist. Pause, export, and end are always available."],
            ["05", "The human's data does not work for anyone else.", "No training on user data. No cross-selling. No partner targeting. The human is the principal, and the agent works only for them."],
          ]},
          { kind: "pull", text: "If any screen in Hussh fails one of these five tests, it is not human-centered. It is agent-centered, business-centered, or technology-centered — any of which is a failure of principle." },
        ],
      },
      {
        num: "04",
        title: "Eight Listening-First Rules",
        oneLiner: "How we design.",
        body: [
          { kind: "p", text: "The eight rules govern every screen, every string, every silence in Hussh. They are the operational expression of Chapter 03. When in doubt, return here." },
          { kind: "principles", items: [
            ["01", "The One listens before it speaks.", "Absorb first — calendar, messages, contacts, photos — then present what you learned and ask to be corrected. Never taught."],
            ["02", "Questions only when earned, always with a reason.", "If you ask, say why. A real friend's questions always include context."],
            ["03", "Ambient, not modal.", "Live in the menu bar, the watch face, the voice — not the screen. Never interrupt unless safety demands it."],
            ["04", "Correction over configuration.", "No settings page for 'training your One.' Every belief is visible on the surface it affects."],
            ["05", "Human endings, not robot acknowledgements.", "'Done.' 'Sent.' 'Rest well.' Never 'Your task has been completed successfully.'"],
            ["06", "Continuity is the feature.", "The same conversation appears seamlessly on every device. Memory is the substrate."],
            ["07", "Silent hands.", "Do the work before it's asked. The user sees the result, not the labor."],
            ["08", "Permission is a conversation, not a consent form.", "When anyone asks for your data, your One asks you the way a person would."],
          ]},
        ],
        seeAlso: ["ux"],
      },
    ],
  },
  {
    roman: "II",
    num: "TWO",
    name: "Control and Ownership",
    tagline: "The non-negotiables. The user's data is theirs. Always.",
    chapters: [
      {
        num: "05",
        title: "The Ownership Model",
        oneLiner: "Where data lives.",
        body: [
          { kind: "p", text: "Hussh is a protocol, not a warehouse. The user's data — their conversations with their One, the memory that One has built, the ledger of every handoff — lives with the user. On their devices. In their control. Under their keys." },
          { kind: "p", text: "This is the first architectural claim from which every other commitment flows. Data at rest is on the user's hardware. Data in motion is end-to-end encrypted. Our infrastructure routes, signs, and verifies — it does not read." },
          { kind: "h", text: "Three commitments" },
          { kind: "principles", items: [
            ["01", "Your device is the source of truth.", "Memory, preferences, and history are stored on the user's device, encrypted at rest. Cloud sync, where enabled, goes to their iCloud, their Google Drive — not ours."],
            ["02", "We do not train on user data. Ever.", "User conversations with their One are never used to train models — ours or anyone else's."],
            ["03", "Keys are held by the human.", "Encryption keys derive from the user's device and their phone number as identity anchor. Hussh cannot decrypt user memory."],
          ]},
          { kind: "pull", text: "The product is trust. The architecture is the proof. If the architecture doesn't back the promise, the promise is marketing — and Hussh does not do marketing." },
        ],
      },
      {
        num: "06",
        title: "Consent as Conversation",
        oneLiner: "How we ask.",
        body: [
          { kind: "p", text: "Most software treats consent as a speed bump: a modal dialog the user dismisses to reach the thing they want. At Hussh, consent is the conversation itself." },
          { kind: "h", text: "Four rules for asking" },
          { kind: "principles", items: [
            ["01", "One permission per conversation turn.", "Never a page of toggles. Never a 'select all.' The One asks for one thing at a time, explains why, waits."],
            ["02", "Every ask includes the reason.", "'I'd like to read your calendar — to know your days.' The reason is non-optional."],
            ["03", "Decline is a first-class option.", "'Not now' and 'Never' are always present. Declining never breaks the product; it just scopes what the One can do."],
            ["04", "Every consent is revocable, from the surface where it was given.", "The conversation that granted it is the conversation that revokes it."],
          ]},
          { kind: "pull", text: "If your consent flow has a 'Next' button instead of a sentence, you have built a form. Rewrite it as a conversation, or do not ship it." },
        ],
        seeAlso: ["ux"],
      },
      {
        num: "07",
        title: "The Ledger",
        oneLiner: "What we record.",
        body: [
          { kind: "p", text: "The ledger is the sealed, append-only record of every handoff — every request for data, every approval, every refusal, every settlement. It is immutable, exportable, and owned by the user." },
          { kind: "h", text: "What the ledger records" },
          { kind: "rows", items: [
            ["Every data request", "Who asked. What they wanted. Why."],
            ["Every user response", "Allow once · Allow always · Deny · Delegate · No response."],
            ["Every handoff", "Intent, introduction, negotiation, approval, settlement — all five stages."],
            ["Every memory change", "Addition, correction, deletion — human- or One-initiated."],
            ["Every export", "When the user took a copy of their memory, to where, under what key."],
          ]},
          { kind: "h", text: "What the ledger does not record" },
          { kind: "rows", items: [
            ["Model inputs", "The content of the user's questions to their One."],
            ["Model outputs", "The content of the One's replies."],
            ["Inferences", "The private reasoning steps by which the One learned."],
          ]},
          { kind: "pull", text: "The ledger is not a log of conversations. It is a log of consents. The distinction is the whole product." },
        ],
        seeAlso: ["rfc"],
      },
      {
        num: "08",
        title: "Portability",
        oneLiner: "The exit door is always open.",
        body: [
          { kind: "p", text: "A user may leave Hussh at any time, and take everything with them. This is not a feature request; it is an architectural commitment made on day one, proven on day one, and honored forever." },
          { kind: "h", text: "Three exit paths" },
          { kind: "principles", items: [
            ["01", "Pause.", "Stop the One. Preserve all memory. Resume any time, from where you left off."],
            ["02", "Export.", "Download a human-readable JSON archive — memory, ledger, preferences, connections. Another One can import it."],
            ["03", "End.", "Delete the One permanently. Preceded by an offered export. Cannot be undone."],
          ]},
          { kind: "pull", text: "The day we make it hard to leave Hussh is the day we become the thing we built Hussh against. Portability is not a feature. It is the proof." },
        ],
      },
    ],
  },
  {
    roman: "III",
    num: "THREE",
    name: "The Experience System",
    tagline: "How Hussh feels. The Apple question, answered honestly.",
    chapters: [
      {
        num: "09",
        title: "Apple as North Star",
        oneLiner: "What we mean. What we don't.",
        body: [
          { kind: "p", text: "Hussh designs like Apple. This is a clear statement and also a dangerous one — because 'like Apple' can mean many things, and several of them would be mistakes for us." },
          { kind: "h", text: "What we take from Apple" },
          { kind: "rows", items: [
            ["Restraint", "A palette of three colors, one typeface, one mark. The discipline of removing, not adding."],
            ["Typography", "SF Pro. Weight and size do the work of variety."],
            ["Keynote register", "Short declarative sentences. No exclamation marks. Confidence without noise."],
            ["Radical simplicity of hierarchy", "One primary action per surface. The second action is a quiet link."],
            ["End-to-end privacy as a brand pillar", "Privacy declared plainly, backed architecturally."],
          ]},
          { kind: "h", text: "What we do not take" },
          { kind: "rows", items: [
            ["Sterility", "Hussh is warm. Apple today often reads cold. Our One is a companion; Apple's tone is a corporation."],
            ["Homepage superlative voice", "No 'our biggest leap forward in.' Our product speaks for itself."],
            ["Locked ecosystem defaults", "Hussh works with Android, Windows, Linux, and the web. User control, not brand capture."],
            ["Stage-managed reveals as strategy", "Keynotes are for major moments. Ship continuously otherwise."],
          ]},
          { kind: "pull", text: "Apple is the North Star, not the destination. We navigate by them. We do not become them." },
        ],
      },
      {
        num: "10",
        title: "The Six Surfaces",
        oneLiner: "Where One lives.",
        body: [
          { kind: "p", text: "One is not an app. It is a presence that travels across six surfaces, each with its own design requirements." },
          { kind: "rows", items: [
            ["iMessage / WhatsApp · Conversational", "Primary surface for most users. Text-first, warm, no UI chrome beyond the native messenger."],
            ["Mac menubar · Ambient", "A popover the user opens when they want to. Shows what One is holding. ⌘⇧Space. Never a Dock app."],
            ["Apple Watch · Glance", "One sentence of presence. One tap of response. Never more."],
            ["CarPlay · Voice-first", "Eyes stay on road. Visual subordinate to audio. A single waveform."],
            ["Web · Dashboard", "iBrokerage, Business Portal, the Ledger. Dense information is welcome — decision stated first."],
            ["iPhone lockscreen · Notification", "Rare by design. Only Nav's bark, safety moments, or settled handoffs."],
          ]},
        ],
        seeAlso: ["ux"],
      },
      {
        num: "11",
        title: "The Three Registers",
        oneLiner: "How it speaks.",
        body: [
          { kind: "p", text: "Across all six surfaces, One speaks in three registers. Each has its moment. Mixing them is the single most common way a Hussh interaction can feel off." },
          { kind: "registerBlock", items: [
            { name: "Ambient", desc: "Presence without purpose. One sitting quietly nearby, available. Short. Often a single line. Never demands attention.", examples: "\"Good morning, Manish.\" · \"Two things before Navya's meet.\" · \"Rest well.\"" },
            { name: "Conversational", desc: "The default register for work and learning. Warm, clear, short sentences. Asks questions with reasons.", examples: "\"Want me to reach Stephanie's One?\" · \"I drafted a reply — read it, or I can adjust.\"" },
            { name: "Ceremonial", desc: "Reserved for moments of consequence. Consent granting, handoff settlement, pausing the relationship. Slow, formal, honest.", examples: "\"Priya said yes.\" · \"Your serial is #487,291.\" · \"Goodbye, Priya. Thank you.\"" },
          ]},
        ],
      },
      {
        num: "12",
        title: "The Voice",
        oneLiner: "The operational grammar.",
        body: [
          { kind: "p", text: "The voice has operational rules. Enforceable in code review. Testable. They sit alongside the Brand Primer's voice chapter (Ch. 06) and the Agent-to-Agent chapter (Ch. 09.6)." },
          { kind: "h", text: "Ten grammar rules" },
          { kind: "principles", items: [
            ["01", "First person, second person, no third.", "\"I'll do this.\" \"You have this.\" Never \"The assistant will\" or \"The user must.\""],
            ["02", "Short sentences.", "Under 15 words, almost always. The shorter, the more confident."],
            ["03", "No exclamation marks. Ever.", "If the sentence needs one, it hasn't been written yet."],
            ["04", "No emoji but 🤫.", "Any other emoji in product copy is noise."],
            ["05", "Declarative over interrogative.", "'Here's what I found.' beats 'Did you want me to find that?'"],
            ["06", "Names, not roles.", "'Stephanie' not 'your counsel.' 'Manish' not 'the user.'"],
            ["07", "Verbs from the verb list.", "Listens, holds, drafts, settles. Never assists, serves, supports."],
            ["08", "No apology theater.", "If One was wrong, 'This is on me.' Four words. Not paragraphs."],
            ["09", "No preamble.", "Begin at the first useful word. 'Stephanie replied.'"],
            ["10", "Endings are short.", "'Done.' 'Sent.' 'Rest well.' A closing flourish is a failure."],
          ]},
        ],
        seeAlso: ["primer"],
      },
    ],
  },
  {
    roman: "IV",
    num: "FOUR",
    name: "Brand and Visual Identity",
    tagline: "The mark. The type. The color. The four nouns.",
    chapters: [
      {
        num: "13",
        title: "The Mark",
        oneLiner: "One glyph. One period.",
        body: [
          { kind: "p", text: "The corporate mark is 🤫. A single emoji glyph. It identifies Hussh in every surface where identity is needed. It does not appear with a wordmark; the word Hussh is set separately, always." },
          { kind: "markSpecimen" },
          { kind: "h", text: "The gold period" },
          { kind: "p", text: "The period after the product name — One. — is set in Hussh Gold (#D4A574). It appears in marketing and product surfaces. It does not appear in legal filings, URLs, or handles." },
          { kind: "pull", text: "If you cannot render gold, render the period in black. Never in another color. Never omit it from a lockup. Never scale it larger than x-height." },
        ],
        seeAlso: ["primer"],
      },
      {
        num: "14",
        title: "Typography",
        oneLiner: "SF Pro, and nothing else.",
        body: [
          { kind: "p", text: "SF Pro Display for all marketing and product surfaces. SF Pro Text for body. Helvetica Neue is the only approved fallback when SF Pro is unavailable. We do not use serifs, script faces, monospace outside of code examples, or novelty types. Ever." },
          { kind: "typeSpecimen" },
          { kind: "pull", text: "The restraint is the identity. Weight and size do the work of variety. If you're reaching for a second font, stop." },
        ],
      },
      {
        num: "15",
        title: "Color",
        oneLiner: "Three, plus one support.",
        body: [
          { kind: "p", text: "Black, white, and one warm gold. That is the entire Hussh palette. Dim is a utility gray for secondary UI text only; it is not a brand color." },
          { kind: "swatches" },
          { kind: "h", text: "Gold discipline" },
          { kind: "p", text: "Gold appears exactly once per composition. On the period, on a single hero word, or on an accent line. Never twice. Gold in volume becomes decorative. Decorative gold is not our brand." },
        ],
      },
      {
        num: "16",
        title: "The Four Nouns",
        oneLiner: "The vocabulary we own.",
        body: [
          { kind: "p", text: "The entire Hussh product vocabulary fits in four nouns: One, Ones, handoff, ledger. Every other category term — bot, assistant, agent, chatbot, claw, copilot, AI — is off-brand." },
          { kind: "rows", items: [
            ["One · Proper noun", "A single personal agent belonging to one human. The product."],
            ["one · Common noun", "The category noun. \"Everyone should have one.\""],
            ["Ones · Plural, systemic", "Two or more distinct Ones. \"Two Ones can negotiate.\""],
            ["a handoff · Common", "The event when two Ones meet on behalf of humans."],
            ["the ledger · Common", "The tamper-proof record of every handoff."],
          ]},
        ],
        seeAlso: ["primer"],
      },
    ],
  },
  {
    roman: "V",
    num: "FIVE",
    name: "Library of Core Assets",
    tagline: "Every canonical artifact. Every design token. Every legal claim.",
    chapters: [
      {
        num: "17",
        title: "Document Assets",
        oneLiner: "The canonical six.",
        body: [
          { kind: "p", text: "As of April 2026, Hussh maintains six canonical documents. Every Hussh communication inherits from one or more of them. When in doubt, these are the source of truth — not internal Slack threads, not email chains, not live design files." },
          { kind: "libraryGrid" },
        ],
      },
      {
        num: "18",
        title: "Visual Assets",
        oneLiner: "What ships visually.",
        body: [
          { kind: "p", text: "The visual asset library is small on purpose. Every asset here is canonical; anything not here is unofficial." },
          { kind: "rows", items: [
            ["The Mark", "🤫 — rendered via Noto Color Emoji in our documents. On user devices, the OS renders its own system font. We never ship Apple's bitmap artwork."],
            ["The Gold Period", "A single character in SF Pro Display, color #D4A574. Rendered inline with the brand lockup. Never scaled independently."],
            ["Logo Lockups", "Three canonical lockups — Primary, Company, Full."],
            ["Phone and Watch Frames", "React components in the UX System artifact: IPhone, Watch, Mac, CarPlay, Web."],
            ["Photography", "None yet. Future photography must show humans, not devices. Warm light, not product-shot sterility."],
            ["Illustration", "None yet. When we commission, line-work with gold highlights — never stock, never 3D render styles."],
            ["Animation", "None yet. One gold dot moving, one waveform breathing. Never stacked micro-interactions."],
          ]},
        ],
      },
      {
        num: "19",
        title: "Code Assets",
        oneLiner: "The design tokens.",
        body: [
          { kind: "p", text: "Every Hussh interface imports from the same set of design tokens. When a surface needs a color, a font, a radius, a spacing value — it comes from here. No exceptions." },
          { kind: "code", text: `// hussh.tokens.ts — v1.0

export const BLACK       = '#000000';
export const INK         = '#1D1D1F';
export const WHITE       = '#FFFFFF';
export const OFF_WHITE   = '#F5F5F7';
export const HAIRLINE    = '#E5E5EA';
export const DIM         = '#86868B';
export const GOLD        = '#D4A574';
export const GOLD_DEEP   = '#B8894D';

export const FONT_DISPLAY = 'SF Pro Display, -apple-system,'
                          + ' Helvetica Neue, sans-serif';
export const FONT_BODY    = 'SF Pro Text, -apple-system,'
                          + ' Helvetica Neue, sans-serif';

export const RADIUS = { sm: 6, md: 10, lg: 14, pill: 999 };
export const SPACE  = { xs: 4, sm: 8, md: 14, lg: 24, xl: 36 };` },
          { kind: "p", text: "React primitives are canonical in the UX System artifact: IPhone, IPhoneBlank, Watch, Mac, MacMenuBar, CarPlay, Web. Any new mockup should be assembled from these, not redrawn." },
        ],
        seeAlso: ["ux"],
      },
      {
        num: "20",
        title: "Legal Assets",
        oneLiner: "IP posture and protection.",
        body: [
          { kind: "p", text: "What Hussh owns, what Hussh protects, what Hussh opens. Updated quarterly by counsel. For current status, refer to the Intellectual Property Register maintained by Michael Brown at McDermott Will & Schulte LLP." },
          { kind: "h", text: "Claimed (in progress)" },
          { kind: "rows", items: [
            ["Hussh", "Wordmark · Class 9, 38, 42, 45 — filing scheduled"],
            ["One", "Product name · Class 9, 42 — clearance analysis underway (Apple One dilution)"],
            ["🤫", "Corporate mark · trade dress — use-based claim, registration pending"],
            ["The Handoff", "Pattern name · not trademarked by design (open, not owned)"],
          ]},
          { kind: "h", text: "Open (not owned by design)" },
          { kind: "rows", items: [
            ["RFC-001 principles", "Published under an open license. Any AI product may implement."],
            ["The PCHP protocol", "Designed to be industry-adoptable. No patent claims filed on the core handshake."],
            ["Eight listening-first rules", "Published in this Foundation. Not trademarked."],
          ]},
          { kind: "pull", text: "The legal strategy mirrors the brand strategy: own the name, open the pattern. We want others to build to our standards. That's how categories spread." },
        ],
      },
    ],
  },
  {
    roman: "VI",
    num: "SIX",
    name: "How We Work",
    tagline: "The practice. How decisions are made. How failures are named.",
    chapters: [
      {
        num: "21",
        title: "The Design Review",
        oneLiner: "How decisions are made.",
        body: [
          { kind: "p", text: "Design reviews at Hussh are short and formal. Not because ceremony is good — because the Foundation does most of the work. A review is a check against the framework, not a debate about taste." },
          { kind: "h", text: "The three questions" },
          { kind: "principles", items: [
            ["01", "Which principle does this honor?", "Name one of the eight listening-first rules, or one of the five human-centered tests. If you can't, the design hasn't been thought through yet."],
            ["02", "Which principle does this risk breaking?", "Every design tradeoff sacrifices something. Naming the sacrifice is the review. A design that breaks no principles is also doing nothing new."],
            ["03", "Is this in the right register?", "Ambient, conversational, or ceremonial — pick one. If the screen mixes them, the register is broken."],
          ]},
          { kind: "h", text: "Escalation" },
          { kind: "p", text: "Reviews that cannot be resolved against the Foundation escalate to the founder. Reviews that cannot be resolved even then go to the RFC queue — they become proposals to amend the Foundation itself. The Foundation is the final authority; it is not immutable." },
        ],
      },
      {
        num: "22",
        title: "The Ten Failure Modes",
        oneLiner: "How Hussh design can go wrong.",
        body: [
          { kind: "p", text: "Every design organization fails in the same ten ways, eventually. Naming them in advance lets us recognize them early." },
          { kind: "principles", items: [
            ["01", "Feature stacking.", "Shipping features because the roadmap says so. The Foundation asks why, not what."],
            ["02", "Interrogation.", "Asking the user questions the agent could have inferred. See Rule 1."],
            ["03", "Modal fatigue.", "Multiple consent dialogs per session. See Rules 3 and 8."],
            ["04", "Chatbot drift.", "The One reverting to polite, hedging, customer-service language."],
            ["05", "Decorative gold.", "Gold appearing more than once per composition."],
            ["06", "Apple mimicry, badly.", "Importing Apple's sterility while missing Apple's warmth."],
            ["07", "Register collision.", "Ambient and ceremonial registers mixed in one screen."],
            ["08", "Agency erosion.", "Silent autonomy creeping into high-stakes decisions."],
            ["09", "Category drift.", "Calling One an app, assistant, bot, or AI in external copy."],
            ["10", "Loss of portability.", "Exports gated, delayed, or obfuscated. The gravest failure."],
          ]},
        ],
      },
      {
        num: "23",
        title: "The Check Before Shipping",
        oneLiner: "Nine questions.",
        body: [
          { kind: "p", text: "Every artifact, every release, every new copy — run it through these nine questions before it ships. If any answer is 'no,' do not ship. The checklist takes two minutes. It catches most mistakes." },
          { kind: "checklist", items: [
            "Does this listen before it speaks?",
            "Does it include the reason, if it asks for something?",
            "Is decline a first-class option?",
            "Does every belief remain visible and editable?",
            "Is the register consistent throughout — not mixed?",
            "Is the mark used correctly? Gold period correctly placed?",
            "Are the four nouns used, and no off-brand nouns?",
            "Does every output sentence pass the voice test — short, declarative, no exclamations?",
            "If everything about this shipped today, would a user's trust go up or down?",
          ]},
          { kind: "pull", text: "Question nine is the one that matters most. If trust does not go up, nothing else in Hussh justifies itself." },
        ],
      },
      {
        num: "24",
        title: "Glossary",
        oneLiner: "Every term, once.",
        body: [
          { kind: "p", text: "The words that carry specific meaning at Hussh. When in doubt, use the term as defined here." },
          { kind: "glossary" },
          { kind: "closingSignature" },
        ],
      },
    ],
  },
];

const GLOSSARY_TERMS = [
  ["Ambient", "A register of presence without purpose. Short. Available. Does not demand attention."],
  ["Bark", "Nav's inline notification when anyone requests a user's data. See Ch. 07."],
  ["Bible Verse #0", "The founding premise: if anyone reads your private data, you must be notified."],
  ["Ceremonial", "A register reserved for moments of consequence. Slow, formal, honest."],
  ["Conversational", "The default register for work and learning. Warm, clear, short."],
  ["Handoff", "The event when two Ones meet on behalf of their humans. Five stages. See RFC-001."],
  ["Kai", "The default conversational persona of a user's One. Personal chief of staff."],
  ["Ledger", "The sealed, append-only record of every consent action. See Ch. 07."],
  ["Listening-first", "The design posture: absorb context, present understanding, ask for correction."],
  ["Nav", "The privacy-guardian persona of a user's One. Protects and audits."],
  ["One", "A personal AI agent belonging to one human. The product."],
  ["PCHP", "The underlying protocol. Engineer-facing. Never appears in marketing copy."],
  ["Silent hands", "The practice of doing work before it is asked. See Rule 7."],
  ["The four nouns", "One, Ones, handoff, ledger. The total Hussh product vocabulary."],
  ["The six surfaces", "iMessage, Mac menubar, Apple Watch, CarPlay, Web, iPhone lockscreen."],
  ["The three registers", "Ambient, conversational, ceremonial."],
];

function PlaceholderBadge({ children = "Coming soon" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: `1px solid ${HAIR}`,
        borderRadius: 999,
        padding: "4px 8px",
        fontSize: 9.5,
        fontWeight: 700,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: DIM,
        background: WHITE,
      }}
    >
      {children}
    </span>
  );
}

function LibraryCard({ lib, compact = false }) {
  const isAvailable = Boolean(lib.href);
  const assetCopy = isAvailable ? getLibraryAssetCopy(lib, compact) : null;
  const cardStyle = {
    border: `1px solid ${HAIR}`,
    borderRadius: 8,
    padding: 14,
    background: WHITE,
    textDecoration: "none",
    display: "block",
    transition: "border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
    boxShadow: isAvailable ? "0 10px 26px rgba(0, 0, 0, 0.04)" : "none",
  };

  const content = (
    <>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: BLACK }}>{lib.name}</div>
        {isAvailable ? <PlaceholderBadge>{assetCopy.badge}</PlaceholderBadge> : <PlaceholderBadge />}
      </div>
      <div style={{ fontSize: 11, color: GOLD_DEEP, fontFamily: MONO, marginTop: 4 }}>{lib.file}</div>
      <div style={{ fontSize: 11, color: DIM, marginTop: 4 }}>{lib.type}</div>
      <div style={{ fontSize: 10.5, color: DIM, marginTop: 8, lineHeight: 1.5 }}>
        {isAvailable
          ? assetCopy.description
          : "Reference asset only. Publication on hushh.ai is still being staged."}
      </div>
      {isAvailable ? (
        <div style={{ marginTop: 10, fontSize: 10.5, color: GOLD_DEEP, fontWeight: 600 }}>
          {assetCopy.cta}
        </div>
      ) : null}
    </>
  );

  if (!isAvailable) {
    return <div style={cardStyle}>{content}</div>;
  }

  return (
    <a
      href={lib.href}
      target={lib.openInNewTab === false ? undefined : "_blank"}
      rel={lib.openInNewTab === false ? undefined : "noreferrer"}
      style={{
        ...cardStyle,
        color: INK,
      }}
    >
      {content}
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════
// RENDERERS
// ═══════════════════════════════════════════════════════════════════

function PullQuote({ children }) {
  return (
    <div style={{
      background: OFF, borderLeft: `3px solid ${GOLD}`,
      padding: "18px 22px", margin: "24px 0",
      fontSize: 16, fontStyle: "italic", color: INK, lineHeight: 1.5,
    }}>{children}</div>
  );
}

function PrincipleBlock({ num, title, body }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 20, padding: "16px 0", borderBottom: `1px solid ${HAIR}` }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: GOLD, minWidth: 36, lineHeight: 1 }}>{num}</div>
      <div style={{ flex: "1 1 240px" }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: BLACK, letterSpacing: -0.2 }}>{title}</div>
        <div style={{ fontSize: 13.5, color: DIM, marginTop: 4, lineHeight: 1.55 }}>{body}</div>
      </div>
    </div>
  );
}

function Row({ label, body }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "12px 0", borderBottom: `1px solid ${HAIR}`, alignItems: "baseline" }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: BLACK, flex: "0 0 180px", maxWidth: "100%" }}>{label}</div>
      <div style={{ fontSize: 13, color: INK, lineHeight: 1.55, flex: "1 1 240px" }}>{body}</div>
    </div>
  );
}

function SectionH({ children }) {
  return <div style={{ fontSize: 17, fontWeight: 600, color: BLACK, marginTop: 28, marginBottom: 4, letterSpacing: -0.3 }}>{children}</div>;
}

function Para({ children }) {
  return <p style={{ fontSize: 15, color: INK, lineHeight: 1.65, margin: "0 0 14px" }}>{children}</p>;
}

function Checklist({ items }) {
  return (
    <div style={{ marginTop: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: `1px solid ${HAIR}`, alignItems: "baseline" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: GOLD, minWidth: 32 }}>{String(i + 1).padStart(2, "0")}</div>
          <div style={{ fontSize: 14.5, color: INK, lineHeight: 1.5 }}>{item}</div>
        </div>
      ))}
    </div>
  );
}

function RegisterBlock({ items }) {
  return (
    <div style={{ marginTop: 16 }}>
      {items.map((r, i) => (
        <div key={i} style={{ padding: "18px 0", borderBottom: i < items.length - 1 ? `1px solid ${HAIR}` : "none" }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: BLACK, letterSpacing: -0.5 }}>
            {r.name}<span style={{ color: GOLD }}>.</span>
          </div>
          <div style={{ fontSize: 14, color: INK, marginTop: 6, lineHeight: 1.5 }}>{r.desc}</div>
          <div style={{ fontSize: 13, color: GOLD_DEEP, marginTop: 6, fontStyle: "italic", lineHeight: 1.5 }}>{r.examples}</div>
        </div>
      ))}
    </div>
  );
}

function MarkSpecimen() {
  return (
    <div style={{ background: OFF, border: `1px solid ${HAIR}`, borderRadius: 8, padding: "30px 20px", margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-around", alignItems: "flex-end", gap: 24 }}>
      {[72, 44, 22].map((size, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: size, lineHeight: 1 }}>🤫</div>
          <div style={{ fontSize: 9, color: DIM, letterSpacing: 1.5, marginTop: 10, fontWeight: 600 }}>
            {size}PT · {["HERO", "NORMAL", "INLINE"][i]}
          </div>
        </div>
      ))}
    </div>
  );
}

function TypeSpecimen() {
  const samples = [
    { label: "DISPLAY · 32PT · 700 · −2% TRACKING", size: 32, weight: 700, tracking: -0.5, text: "Everyone should have one", dot: true },
    { label: "HEADING · 20PT · 600 · −1% TRACKING", size: 20, weight: 600, tracking: -0.3, text: "The personal one", dot: true },
    { label: "BODY · 15PT · 400 · 1.55 LEADING", size: 15, weight: 400, tracking: 0, text: "A private, personal AI that remembers you, protects you, and works for you." },
    { label: "MICRO · 10PT · 600 · +150 TRACKING · ALL CAPS", size: 10, weight: 600, tracking: 1.5, text: "FREE · NO APP TO INSTALL · NO CREDIT CARD", color: DIM },
  ];
  return (
    <div>
      {samples.map((s, i) => (
        <div key={i} style={{ borderTop: `1px solid ${HAIR}`, padding: "14px 0" }}>
          <div style={{ fontSize: 9, color: DIM, letterSpacing: 1.5, fontWeight: 600, marginBottom: 8 }}>{s.label}</div>
          <div style={{ fontSize: s.size, fontWeight: s.weight, letterSpacing: s.tracking, color: s.color || BLACK, lineHeight: 1.1 }}>
            {s.text}{s.dot && <span style={{ color: GOLD }}>.</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function Swatches() {
  const sw = [
    { name: "Hussh Black", hex: "#000000", rgb: "RGB 0 0 0", pms: "PMS Black 6 C", bg: BLACK },
    { name: "Hussh White", hex: "#FFFFFF", rgb: "RGB 255 255 255", pms: "PMS Bright White", bg: WHITE, border: true },
    { name: "Hussh Gold", hex: "#D4A574", rgb: "RGB 212 165 116", pms: "PMS 7508 C", bg: GOLD },
    { name: "System Dim", hex: "#86868B", rgb: "RGB 134 134 139", pms: "SUPPORT", bg: DIM },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, margin: "20px 0" }}>
      {sw.map((s, i) => (
        <div key={i} style={{ border: `1px solid ${HAIR}`, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ height: 90, background: s.bg, borderBottom: s.border ? `1px solid ${HAIR}` : "none" }} />
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: BLACK }}>{s.name}</div>
            <div style={{ fontSize: 10, color: DIM, fontFamily: MONO, marginTop: 4 }}>{s.hex}</div>
            <div style={{ fontSize: 10, color: DIM, fontFamily: MONO, marginTop: 2 }}>{s.rgb}</div>
            <div style={{ fontSize: 10, color: DIM, fontFamily: MONO, marginTop: 2 }}>{s.pms}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CodeBlock({ text }) {
  return (
    <pre style={{
      background: OFF, border: `1px solid ${HAIR}`, borderRadius: 8,
      padding: 16, fontSize: 12, fontFamily: MONO, color: INK,
      lineHeight: 1.55, overflow: "auto", margin: "14px 0", whiteSpace: "pre",
    }}>{text}</pre>
  );
}

function LibraryGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, margin: "16px 0" }}>
      {Object.entries(LIBRARY).map(([key, lib]) => (
        <LibraryCard key={key} lib={lib} />
      ))}
    </div>
  );
}

function GlossaryList() {
  return (
    <div style={{ marginTop: 16 }}>
      {GLOSSARY_TERMS.map(([term, def], i) => (
        <div key={i} style={{ display: "flex", flexWrap: "wrap", gap: 12, padding: "10px 0", borderBottom: `1px solid ${HAIR}` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: BLACK, flex: "0 0 160px", maxWidth: "100%" }}>{term}</div>
          <div style={{ fontSize: 13, color: INK, lineHeight: 1.5, flex: "1 1 240px" }}>{def}</div>
        </div>
      ))}
    </div>
  );
}

function ClosingSignature() {
  return (
    <div style={{ margin: "40px 0 20px", textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 700, color: BLACK, letterSpacing: -0.8 }}>
        Everyone should have one<span style={{ color: GOLD }}>.</span>
      </div>
      <div style={{ fontSize: 9, color: DIM, letterSpacing: 2, marginTop: 12, fontWeight: 600 }}>
        HUSSH FOUNDATION · v1.0 · APRIL 2026
      </div>
    </div>
  );
}

function renderBlock(block, idx) {
  switch (block.kind) {
    case "p": return <Para key={idx}>{block.text}</Para>;
    case "h": return <SectionH key={idx}>{block.text}</SectionH>;
    case "pull": return <PullQuote key={idx}>{block.text}</PullQuote>;
    case "principles":
      return <div key={idx}>{block.items.map(([n, t, b], i) => <PrincipleBlock key={i} num={n} title={t} body={b} />)}</div>;
    case "rows":
      return <div key={idx} style={{ marginTop: 10 }}>{block.items.map(([l, b], i) => <Row key={i} label={l} body={b} />)}</div>;
    case "checklist": return <Checklist key={idx} items={block.items} />;
    case "registerBlock": return <RegisterBlock key={idx} items={block.items} />;
    case "markSpecimen": return <MarkSpecimen key={idx} />;
    case "typeSpecimen": return <TypeSpecimen key={idx} />;
    case "swatches": return <Swatches key={idx} />;
    case "code": return <CodeBlock key={idx} text={block.text} />;
    case "libraryGrid": return <LibraryGrid key={idx} />;
    case "glossary": return <GlossaryList key={idx} />;
    case "closingSignature": return <ClosingSignature key={idx} />;
    default: return null;
  }
}

// Flatten chapters for search / next-prev
const ALL_CHAPTERS = PARTS.flatMap((part) =>
  part.chapters.map((ch) => ({ ...ch, partName: part.name, partRoman: part.roman }))
);

// ═══════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════

export default function FoundationPage() {
  const [currentNum, setCurrentNum] = useState("01");
  const [search, setSearch] = useState("");
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  const current = useMemo(
    () => ALL_CHAPTERS.find((c) => c.num === currentNum) || ALL_CHAPTERS[0],
    [currentNum]
  );
  const currentIndex = ALL_CHAPTERS.findIndex((c) => c.num === currentNum);

  const filteredParts = useMemo(() => {
    if (!search.trim()) return PARTS;
    const q = search.toLowerCase();
    return PARTS.map((part) => ({
      ...part,
      chapters: part.chapters.filter((ch) =>
        ch.title.toLowerCase().includes(q) ||
        ch.oneLiner.toLowerCase().includes(q) ||
        JSON.stringify(ch.body).toLowerCase().includes(q)
      ),
    })).filter((p) => p.chapters.length > 0);
  }, [search]);

  useEffect(() => {
    if (!search.trim()) {
      return;
    }

    const visibleChapters = filteredParts.flatMap((part) => part.chapters);
    if (!visibleChapters.length) {
      return;
    }

    if (!visibleChapters.some((chapter) => chapter.num === currentNum)) {
      setCurrentNum(visibleChapters[0].num);
    }
  }, [currentNum, filteredParts, search]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const syncLayout = (event) => {
      const matches = event?.matches ?? mediaQuery.matches;
      setIsCompactLayout(matches);
      if (!matches) {
        setIsTocOpen(false);
      }
    };

    syncLayout();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncLayout);
      return () => mediaQuery.removeEventListener("change", syncLayout);
    }

    mediaQuery.addListener(syncLayout);
    return () => mediaQuery.removeListener(syncLayout);
  }, []);

  const next = () => {
    const i = Math.min(currentIndex + 1, ALL_CHAPTERS.length - 1);
    setCurrentNum(ALL_CHAPTERS[i].num);
  };
  const prev = () => {
    const i = Math.max(currentIndex - 1, 0);
    setCurrentNum(ALL_CHAPTERS[i].num);
  };

  useEffect(() => {
    const onKey = (e) => {
      const tagName = e.target?.tagName;
      if (tagName === "INPUT" || tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex]);

  useEffect(() => {
    const el = document.getElementById("chapter-scroll");
    if (el && !isCompactLayout) {
      el.scrollTop = 0;
      return;
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [currentNum, isCompactLayout]);

  useEffect(() => {
    if (isCompactLayout) {
      setIsTocOpen(false);
    }
  }, [currentNum, isCompactLayout]);

  const shellRootStyle = isCompactLayout
    ? {
        minHeight: "100dvh",
        background: WHITE,
        fontFamily: FONT,
        color: INK,
        overflowX: "hidden",
      }
    : {
        display: "flex",
        width: "100%",
        height: "100vh",
        background: WHITE,
        fontFamily: FONT,
        color: INK,
        overflow: "hidden",
      };

  const renderRail = ({ overlay = false } = {}) => (
    <div
      id={overlay ? "foundation-mobile-toc" : undefined}
      role={overlay ? "dialog" : "navigation"}
      aria-modal={overlay ? "true" : undefined}
      aria-label={overlay ? "Foundation chapters" : "Foundation navigation"}
      style={{
        width: overlay ? "min(22rem, calc(100vw - 24px))" : 320,
        height: overlay ? "calc(100dvh - 24px)" : "100vh",
        maxWidth: "100%",
        background: OFF,
        borderRight: overlay ? "none" : `1px solid ${HAIR}`,
        borderRadius: overlay ? 18 : 0,
        boxShadow: overlay ? "0 24px 60px rgba(0, 0, 0, 0.18)" : "none",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "22px 24px 18px", borderBottom: `1px solid ${HAIR}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: DIM,
              textDecoration: "none",
            }}
          >
            ← Back to hushh.ai
          </Link>
          {overlay ? (
            <button
              type="button"
              onClick={() => setIsTocOpen(false)}
              style={{
                border: `1px solid ${HAIR}`,
                background: WHITE,
                color: INK,
                borderRadius: 999,
                padding: "8px 12px",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          ) : null}
        </div>

        <Link
          href="/"
          style={{
            display: "inline-block",
            marginTop: 14,
            fontSize: 9.5,
            letterSpacing: 2,
            color: DIM,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          🤫 HUSSH
        </Link>

        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginTop: 6, color: BLACK, lineHeight: 1 }}>
          The Foundation<span style={{ color: GOLD }}>.</span>
        </div>
        <div style={{ fontSize: 11, color: DIM, marginTop: 6, lineHeight: 1.4 }}>
          v1.0 · Six parts · Twenty-four chapters · One spine.
        </div>
      </div>

      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${HAIR}` }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the Foundation"
          aria-label="Search the Foundation chapters"
          style={{
            width: "100%",
            padding: "8px 12px",
            border: `1px solid ${HAIR}`,
            borderRadius: 8,
            fontSize: 12.5,
            fontFamily: FONT,
            background: WHITE,
            color: INK,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "4px 0 16px" }}>
        {filteredParts.map((part) => (
          <div key={part.roman}>
            <div style={{ padding: "16px 24px 2px", display: "flex", alignItems: "baseline", gap: 8 }}>
              <div style={{ fontSize: 9.5, color: GOLD_DEEP, fontWeight: 700, letterSpacing: 1.5 }}>PART {part.num}</div>
            </div>
            <div style={{ padding: "0 24px 6px" }}>
              <div style={{ fontSize: 11.5, color: BLACK, fontWeight: 700, letterSpacing: -0.2 }}>{part.name}</div>
            </div>
            {part.chapters.map((ch) => {
              const active = ch.num === currentNum;
              return (
                <button
                  key={ch.num}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  onClick={() => setCurrentNum(ch.num)}
                  style={{
                    width: "100%",
                    padding: "6px 24px",
                    cursor: "pointer",
                    border: "none",
                    borderLeft: `3px solid ${active ? GOLD : "transparent"}`,
                    background: active ? WHITE : "transparent",
                    display: "flex",
                    gap: 10,
                    alignItems: "baseline",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: 9.5, color: DIM, fontFamily: MONO, minWidth: 18 }}>{ch.num}</div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: active ? BLACK : INK,
                      fontWeight: active ? 600 : 400,
                      lineHeight: 1.3,
                    }}
                  >
                    {ch.title}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
        {filteredParts.length === 0 && (
          <div style={{ padding: "20px 24px", fontSize: 12, color: DIM, fontStyle: "italic" }}>
            No chapters match "{search}".
          </div>
        )}
      </div>

      <div style={{ padding: "14px 20px", borderTop: `1px solid ${HAIR}`, fontSize: 10.5, color: DIM, lineHeight: 1.5 }}>
        <div style={{ fontWeight: 600, color: INK, marginBottom: 4 }}>This is the live handbook.</div>
        The web edition is canonical. The Foundation PDF, companion PDFs, keynote deck, and JSX reference artifacts are now published on hushh.ai. The mobile layout keeps the same reading order through the responsive contents drawer.
        <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
          <a
            href={FOUNDATION_PDF_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: GOLD_DEEP,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Open Foundation PDF →
          </a>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: GOLD_DEEP,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Visit hushh.ai →
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div style={shellRootStyle}>
      {!isCompactLayout ? renderRail() : null}

      {isCompactLayout && isTocOpen ? (
        <div
          onClick={() => setIsTocOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 40,
            background: "rgba(0, 0, 0, 0.24)",
            padding: 12,
          }}
        >
          <div onClick={(event) => event.stopPropagation()}>{renderRail({ overlay: true })}</div>
        </div>
      ) : null}

      <div id="chapter-scroll" style={isCompactLayout ? { minHeight: "100dvh" } : { flex: 1, overflowY: "auto" }}>
        {isCompactLayout ? (
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "14px 16px",
              borderBottom: `1px solid ${HAIR}`,
              background: "rgba(255, 255, 255, 0.94)",
              backdropFilter: "blur(18px)",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                color: INK,
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              ← hushh.ai
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 10, color: DIM, letterSpacing: 1.6, fontWeight: 700 }}>
                CHAPTER {current.num}
              </div>
              <button
                type="button"
                aria-expanded={isTocOpen}
                aria-controls="foundation-mobile-toc"
                onClick={() => setIsTocOpen(true)}
                style={{
                  border: `1px solid ${HAIR}`,
                  background: WHITE,
                  color: INK,
                  borderRadius: 999,
                  padding: "8px 12px",
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Contents
              </button>
            </div>
          </div>
        ) : null}

        <div style={{ maxWidth: 760, margin: "0 auto", padding: isCompactLayout ? "32px 20px 80px" : "60px 56px 100px" }}>

          {/* Chapter breadcrumb */}
          <div style={{ fontSize: isCompactLayout ? 9.5 : 10, letterSpacing: 2, color: DIM, fontWeight: 600 }}>
            PART {current.partRoman} · {current.partName.toUpperCase()} · CHAPTER {current.num}
          </div>

          {/* Chapter title */}
          <div style={{ fontSize: isCompactLayout ? 34 : 42, fontWeight: 700, letterSpacing: -1.4, color: BLACK, marginTop: 10, lineHeight: 1.05 }}>
            {current.title}<span style={{ color: GOLD }}>.</span>
          </div>

          {/* One-liner */}
          <div style={{ fontSize: isCompactLayout ? 17 : 18, color: DIM, marginTop: 12, lineHeight: 1.4 }}>
            {current.oneLiner}
          </div>

          {/* Gold accent rule */}
          <div style={{ width: 40, height: 3, background: GOLD, margin: "32px 0 28px" }} />

          {/* Body */}
          <div>{current.body.map((b, i) => renderBlock(b, i))}</div>

          {/* See also */}
          {current.seeAlso && current.seeAlso.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 28, borderTop: `1px solid ${HAIR}` }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: DIM, fontWeight: 600, marginBottom: 12 }}>SEE ALSO</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {current.seeAlso.map((key) => {
                  const lib = LIBRARY[key];
                  if (!lib) return null;
                  return (
                    <LibraryCard key={key} lib={lib} compact />
                  );
                })}
              </div>
            </div>
          )}

          {/* Prev / next */}
          <div
            style={{
              marginTop: 60,
              paddingTop: 28,
              borderTop: `1px solid ${HAIR}`,
              display: "flex",
              flexDirection: isCompactLayout ? "column" : "row",
              gap: isCompactLayout ? 24 : 12,
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              style={{
                background: "transparent", border: "none",
                color: currentIndex === 0 ? DIM : INK,
                fontSize: 13, cursor: currentIndex === 0 ? "default" : "pointer",
                padding: 0, fontFamily: FONT, textAlign: "left", width: isCompactLayout ? "100%" : "auto",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: DIM, marginBottom: 4 }}>← PREVIOUS</div>
              {currentIndex > 0 && <div style={{ fontSize: 14, fontWeight: 500 }}>{ALL_CHAPTERS[currentIndex - 1].title}</div>}
            </button>
            <button
              onClick={next}
              disabled={currentIndex === ALL_CHAPTERS.length - 1}
              style={{
                background: "transparent", border: "none",
                color: currentIndex === ALL_CHAPTERS.length - 1 ? DIM : INK,
                fontSize: 13, cursor: currentIndex === ALL_CHAPTERS.length - 1 ? "default" : "pointer",
                padding: 0, fontFamily: FONT, textAlign: isCompactLayout ? "left" : "right", width: isCompactLayout ? "100%" : "auto",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: DIM, marginBottom: 4 }}>NEXT →</div>
              {currentIndex < ALL_CHAPTERS.length - 1 && <div style={{ fontSize: 14, fontWeight: 500 }}>{ALL_CHAPTERS[currentIndex + 1].title}</div>}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
