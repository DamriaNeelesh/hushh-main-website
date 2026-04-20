import React, { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// hussh one — The UX Screen Map
//
// One interactive artifact. Every flow. Every screen.
// WhatsApp free-tier persona (Priya, Mumbai) rendered in full fidelity.
// Other personas stubbed with the same design system.
//
// Design commitments:
//   Palette:    pure black / pure white / single gold accent (#D4A574)
//   Typography: SF Pro / Helvetica Neue fallback, no fancy display fonts
//   Motion:     restrained — transitions exist but never announce themselves
//   Surface:    phone frames at 1:1, screen map at 1:4, toggleable
//   Voice:      Apple keynote register — no exclamation points, no emoji clutter
//
// Note: Uses in-memory state only. No localStorage.
// ─────────────────────────────────────────────────────────────

const GOLD = "#D4A574";
const BLACK = "#000000";
const WHITE = "#FFFFFF";
const INK = "#1D1D1F";
const DIM = "#86868B";
const HAIRLINE = "#E5E5EA";
const OFFWHITE = "#F5F5F7";
const WA_GREEN = "#25D366";
const WA_HEADER = "#128C7E";
const WA_BG = "#ECE5DD";
const WA_BUBBLE_IN = "#FFFFFF";
const WA_BUBBLE_OUT = "#DCF8C6";

// ─── FLOW DEFINITIONS ────────────────────────────────────────
// Each flow is an ordered list of screens, each screen is a
// React node. This is the entire navigation surface.

const FLOWS = [
  {
    id: "discovery",
    label: "1. Discovery",
    sub: "How a human finds their one",
    screens: ["landing", "wa-link-tap", "wa-first-message"],
  },
  {
    id: "naming",
    label: "2. The Naming",
    sub: "The ritual that begins the relationship",
    screens: ["ask-name", "offer-name", "confirm-name", "welcome"],
  },
  {
    id: "first-promise",
    label: "3. The First Promise",
    sub: "Bible Verse #0, said in their language",
    screens: ["promise"],
  },
  {
    id: "learning",
    label: "4. Learning You",
    sub: "Seven days of earning context",
    screens: ["day1", "day2", "day3", "day4", "day5", "day6", "day7"],
  },
  {
    id: "connecting",
    label: "5. Connecting You",
    sub: "Each new connection is a ceremony",
    screens: ["connect-ask", "connect-approve", "connect-ledger"],
  },
  {
    id: "daily",
    label: "6. Daily Use",
    sub: "The conversations that compound",
    screens: ["morning", "midday", "evening"],
  },
  {
    id: "protection",
    label: "7. Nav Protects",
    sub: "The bark heard round the world",
    screens: ["bark", "approval-queue", "log"],
  },
  {
    id: "weekly",
    label: "8. The Weekly Review",
    sub: "How your one asks to be corrected",
    screens: ["review-open", "review-edit", "review-thanks"],
  },
  {
    id: "mistake",
    label: "9. When It's Wrong",
    sub: "The most important trust surface",
    screens: ["mistake-detect", "mistake-apology", "mistake-repair"],
  },
  {
    id: "upgrade",
    label: "10. Deepening",
    sub: "Upgrades that feel like friendship",
    screens: ["upgrade-nudge", "upgrade-flow", "upgrade-welcome"],
  },
  {
    id: "ceremony",
    label: "11. The 1024 Club",
    sub: "Your serial. Your certificate. Your seat at dinner.",
    screens: ["serial", "certificate", "dinner"],
  },
  {
    id: "ending",
    label: "12. Portability",
    sub: "The promise, lived literally",
    screens: ["pause", "export", "goodbye"],
  },
];

// Helpful flat lookup
const SCREEN_ORDER = FLOWS.flatMap((f) =>
  f.screens.map((s) => ({ flowId: f.id, flowLabel: f.label, screenId: s }))
);

// ─── WHATSAPP SHELL ──────────────────────────────────────────
// All conversational screens render inside a pixel-accurate
// WhatsApp phone frame so the feel is immediate.

function PhoneFrame({ children, title = "hussh one", subtitle = "your one" }) {
  return (
    <div
      style={{
        width: 360,
        height: 720,
        margin: "0 auto",
        borderRadius: 44,
        background: BLACK,
        padding: 10,
        boxShadow:
          "0 30px 60px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 34,
          overflow: "hidden",
          background: WA_BG,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 24,
            background: WA_HEADER,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
            fontSize: 11,
            color: WHITE,
            fontWeight: 600,
            letterSpacing: 0.3,
          }}
        >
          <span>9:41</span>
          <span>●●● 5G 87%</span>
        </div>
        {/* WhatsApp chat header */}
        <div
          style={{
            background: WA_HEADER,
            color: WHITE,
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 20, opacity: 0.9 }}>‹</div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              background: BLACK,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: WHITE,
              fontSize: 14,
              fontWeight: 300,
              letterSpacing: -0.5,
            }}
          >
            <span>
              🤫<span style={{ color: GOLD, fontSize: 12 }}>.</span>
            </span>
          </div>
          <div style={{ flex: 1, lineHeight: 1.1 }}>
            <div style={{ fontSize: 15, fontWeight: 600 }}>{title}</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>
              {subtitle}
            </div>
          </div>
          <div style={{ fontSize: 16, opacity: 0.9 }}>⋮</div>
        </div>
        {/* Chat area */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Bubble({ from = "one", children, time = "9:41", tail = false }) {
  const isOut = from === "user";
  return (
    <div
      style={{
        alignSelf: isOut ? "flex-end" : "flex-start",
        maxWidth: "78%",
        background: isOut ? WA_BUBBLE_OUT : WA_BUBBLE_IN,
        color: INK,
        padding: "6px 9px 4px 10px",
        borderRadius: 8,
        margin: "3px 8px",
        fontSize: 13.5,
        lineHeight: 1.35,
        boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
        position: "relative",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {children}
      <div
        style={{
          fontSize: 9.5,
          color: DIM,
          textAlign: "right",
          marginTop: 2,
          marginLeft: 8,
          display: "inline-block",
          float: "right",
        }}
      >
        {time} {isOut ? "✓✓" : ""}
      </div>
    </div>
  );
}

function ChatBody({ children, showInput = true, inputPlaceholder = "Message" }) {
  return (
    <>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "8px 0",
          gap: 1,
        }}
      >
        {children}
      </div>
      {showInput && (
        <div
          style={{
            padding: "6px 8px",
            background: "#F0F0F0",
            display: "flex",
            alignItems: "center",
            gap: 6,
            borderTop: `1px solid ${HAIRLINE}`,
          }}
        >
          <div
            style={{
              flex: 1,
              background: WHITE,
              borderRadius: 24,
              padding: "8px 14px",
              fontSize: 13,
              color: DIM,
            }}
          >
            {inputPlaceholder}
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              background: WA_HEADER,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: WHITE,
              fontSize: 16,
            }}
          >
            🎤
          </div>
        </div>
      )}
    </>
  );
}

// Specialty container for non-WhatsApp moments (landing page, certificate, etc.)
function NonChatFrame({ children, background = WHITE }) {
  return (
    <div
      style={{
        width: 360,
        height: 720,
        margin: "0 auto",
        borderRadius: 44,
        background: BLACK,
        padding: 10,
        boxShadow:
          "0 30px 60px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 34,
          overflow: "hidden",
          background,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── INDIVIDUAL SCREENS ──────────────────────────────────────

const SCREENS = {
  // 1. DISCOVERY ─────────────────────────────────────────────
  landing: {
    flow: "Discovery",
    title: "The landing page — mobile web",
    caption:
      "Priya, 24, Mumbai, reads about hussh one on a blog. She taps through to husshone.com on her phone. This is what she sees.",
    render: () => (
      <NonChatFrame background={BLACK}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "60px 28px 40px 28px",
            color: WHITE,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: DIM,
                letterSpacing: 2,
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              HUSSH ONE
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: -1.5,
                marginBottom: 18,
              }}
            >
              Everyone
              <br />
              should
              <br />
              <span>
                have one
                <span style={{ color: GOLD }}>.</span>
              </span>
            </div>
            <div
              style={{
                fontSize: 15,
                color: DIM,
                lineHeight: 1.4,
                marginTop: 22,
                maxWidth: 280,
              }}
            >
              A private, personal AI that remembers you,
              protects you, and works for you. Free to start.
              On the phone in your hand.
            </div>
          </div>
          <div>
            <button
              style={{
                width: "100%",
                background: GOLD,
                color: BLACK,
                border: "none",
                borderRadius: 999,
                padding: "16px 0",
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: -0.3,
                marginBottom: 12,
                cursor: "pointer",
              }}
            >
              Get your one on WhatsApp
            </button>
            <div
              style={{
                fontSize: 11,
                color: DIM,
                textAlign: "center",
                letterSpacing: 0.3,
              }}
            >
              FREE · NO APP TO INSTALL · NO CREDIT CARD
            </div>
          </div>
        </div>
      </NonChatFrame>
    ),
    notes: [
      "No logo. The words ARE the logo.",
      "Only one CTA. One path in.",
      "The gold period is the only brand asset on the page.",
      "'No app to install' is the product story in six words.",
    ],
  },

  "wa-link-tap": {
    flow: "Discovery",
    title: "The link hand-off",
    caption:
      "Tapping the button opens WhatsApp and pre-fills a message. Priya doesn't have to think. She just sends.",
    render: () => (
      <PhoneFrame>
        <ChatBody showInput={false}>
          <div style={{ height: 30 }} />
          <div
            style={{
              alignSelf: "center",
              background: "#FEF8CC",
              padding: "6px 12px",
              borderRadius: 8,
              fontSize: 11,
              color: "#54656F",
              marginBottom: 14,
              maxWidth: 260,
              textAlign: "center",
            }}
          >
            Messages are end-to-end encrypted.
          </div>
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "78%",
              background: WA_BUBBLE_OUT,
              padding: "10px 12px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 14,
              boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
            }}
          >
            Hi
            <div
              style={{
                fontSize: 10,
                color: DIM,
                textAlign: "right",
                marginTop: 3,
              }}
            >
              9:41 ✓
            </div>
          </div>
          <div
            style={{
              alignSelf: "center",
              fontSize: 11,
              color: DIM,
              marginTop: 14,
            }}
          >
            ● typing...
          </div>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The deeplink pre-fills 'Hi' so friction is zero.",
      "No account creation. No form. No signup.",
      "The only identifier is her phone number — which WhatsApp already provides.",
    ],
  },

  "wa-first-message": {
    flow: "Discovery",
    title: "The first words",
    caption:
      "What your one says first matters more than anything that comes after. It must name itself, name the category, and make a promise — in under fifteen seconds of reading.",
    render: () => (
      <PhoneFrame>
        <ChatBody showInput={false}>
          <div style={{ height: 16 }} />
          <Bubble from="user" time="9:41">
            Hi
          </Bubble>
          <div style={{ height: 8 }} />
          <Bubble from="one" time="9:41">
            Hi. I'm your one.
          </Bubble>
          <Bubble from="one" time="9:41">
            Every person gets one. This is yours.
          </Bubble>
          <Bubble from="one" time="9:42">
            I'll remember you.
            {"\n"}I'll protect you.
            {"\n"}I'll work for you.
          </Bubble>
          <Bubble from="one" time="9:42">
            Ready?
          </Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "Four bubbles. Never more.",
      "The three verbs from the keynote — remember, protect, work — land here, not in marketing copy.",
      "'Ready?' is the only question, and it's yes/no.",
    ],
  },

  // 2. THE NAMING ────────────────────────────────────────────
  "ask-name": {
    flow: "The Naming",
    title: "It asks for your name first",
    caption:
      "Before your one takes a name, it asks for yours. This is not a form field. This is the first turn of a relationship.",
    render: () => (
      <PhoneFrame>
        <ChatBody showInput={false}>
          <div style={{ height: 16 }} />
          <Bubble from="user" time="9:42">
            Yes
          </Bubble>
          <div style={{ height: 8 }} />
          <Bubble from="one" time="9:42">
            Good.
          </Bubble>
          <Bubble from="one" time="9:42">
            What should I call you?
          </Bubble>
          <div style={{ height: 6 }} />
          <Bubble from="user" time="9:43">
            Priya
          </Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "'What should I call you?' — not 'What is your name?'",
      "The difference is respect. We ask how she wants to be addressed, not who she is.",
    ],
  },

  "offer-name": {
    flow: "The Naming",
    title: "It offers itself a name",
    caption:
      "Your one introduces itself with a default — Kai — but immediately opens the door for her to rename it. This is the moment the one becomes hers.",
    render: () => (
      <PhoneFrame>
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="9:43">
            Hello, Priya.
          </Bubble>
          <Bubble from="one" time="9:43">
            My default name is Kai. You can keep it,
            or give me another.
          </Bubble>
          <Bubble from="one" time="9:43">
            Whatever feels right. I'll answer to it for
            the rest of our time together.
          </Bubble>
          <div style={{ height: 6 }} />
          <Bubble from="user" time="9:44">
            Kai is good
          </Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The default matters — most users will keep it.",
      "But the option to rename is the mechanism by which the one becomes theirs.",
      "This is the same reason you name a puppy: it converts a product into a companion.",
    ],
  },

  "confirm-name": {
    flow: "The Naming",
    title: "The two-name handshake",
    caption:
      "Once both names are set, your one says them back together. This is the contract. Say it aloud and it becomes real.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="9:44">
            Priya and Kai. Good.
          </Bubble>
          <Bubble from="one" time="9:44">
            One more thing before we begin.
          </Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "Notice the header: the chat is now 'Kai, your one' instead of 'hussh one'.",
      "The UI itself reflects the renaming. No settings screen needed.",
    ],
  },

  welcome: {
    flow: "The Naming",
    title: "Your serial arrives",
    caption:
      "Priya is one of the first million. Her one has a serial. It's shown once, quietly, and stored in the PCHP ledger forever.",
    render: () => (
      <NonChatFrame background={WHITE}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px 28px 40px 28px",
            color: BLACK,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: DIM,
                letterSpacing: 2,
                fontWeight: 500,
                marginBottom: 60,
              }}
            >
              WELCOME
            </div>
            <div
              style={{
                fontSize: 16,
                color: DIM,
                marginBottom: 4,
              }}
            >
              You are
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1,
                color: BLACK,
              }}
            >
              one <span style={{ color: GOLD }}>#</span>487,291
            </div>
            <div
              style={{
                fontSize: 14,
                color: DIM,
                marginTop: 20,
                lineHeight: 1.5,
              }}
            >
              Of the first million ones given.
              <br />
              Your serial is permanent.
              <br />
              It belongs to you.
            </div>
          </div>
          <button
            style={{
              width: "100%",
              background: BLACK,
              color: WHITE,
              border: "none",
              borderRadius: 999,
              padding: "16px 0",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Continue in WhatsApp
          </button>
        </div>
      </NonChatFrame>
    ),
    notes: [
      "The numbering ritual from our 1024 Club conversation, lived at scale.",
      "The first 1,024 users get a letterpress certificate. Everyone else gets the digital version shown here.",
      "Serial is displayed once, then stored. No badge. No flex. Just quiet permanence.",
    ],
  },

  // 3. THE FIRST PROMISE ─────────────────────────────────────
  promise: {
    flow: "The First Promise",
    title: "Bible Verse #0, in her words",
    caption:
      "Before any data is asked for, the first promise is made. In plain language. One screen. One commitment.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="9:45">
            The first promise I make you:
          </Bubble>
          <div style={{ height: 2 }} />
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "88%",
              background: WHITE,
              padding: "14px 14px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 14,
              lineHeight: 1.5,
              boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
              borderLeft: `3px solid ${GOLD}`,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 6 }}>
              When anyone asks to see your data —
              <br />
              you will know.
            </div>
            <div style={{ color: DIM, fontSize: 12.5 }}>
              Every request. Every time. Forever.
            </div>
          </div>
          <div style={{ height: 6 }} />
          <Bubble from="one" time="9:45">
            I'll tell you who asked, what they wanted,
            and what I said.
          </Bubble>
          <Bubble from="one" time="9:45">
            You can always say no.
          </Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "This is the first quoted screen in the whole product — the only one that looks different on purpose.",
      "Gold left border = 'this is a promise, not conversation'.",
      "It's said BEFORE any onboarding question. Trust first, data second.",
    ],
  },

  // 4. LEARNING YOU ──────────────────────────────────────────
  day1: {
    flow: "Learning You",
    title: "Day 1 — Your mornings",
    caption:
      "The learning loop is seven days. One question per day. Each one small, each one earning the next. Day 1: your morning.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="9:45">
            Let me learn you, a little at a time.
          </Bubble>
          <Bubble from="one" time="9:45">
            A question a day for seven days. Nothing more.
          </Bubble>
          <div style={{ height: 6 }} />
          <Bubble from="one" time="9:46">
            First: what time do your mornings usually start?
          </Bubble>
          <div style={{ height: 4 }} />
          <Bubble from="user" time="9:46">
            7am
          </Bubble>
          <Bubble from="one" time="9:46">
            Noted. I'll be ready at 7.
          </Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "One question. One answer. One acknowledgement. That's the unit.",
      "'I'll be ready at 7.' — the small proof that the data was actually heard.",
    ],
  },

  day2: {
    flow: "Learning You",
    title: "Day 2 — Your people",
    caption:
      "Day two asks for a circle — not a contact list, a circle of people who matter. The distinction is the entire product.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div
            style={{
              alignSelf: "center",
              fontSize: 10,
              color: DIM,
              padding: "6px 12px",
              marginTop: 6,
            }}>
            Day 2 of 7
          </div>
          <Bubble from="one" time="8:00">
            Morning, Priya.
          </Bubble>
          <Bubble from="one" time="8:00">
            Who are the three most important people
            in your life right now?
          </Bubble>
          <Bubble from="one" time="8:00">
            Just first names are fine. I'll remember.
          </Bubble>
          <Bubble from="user" time="8:02">
            Mummy, Arjun, Divya
          </Bubble>
          <Bubble from="one" time="8:02">
            Got it. If any of them come up, I'll know.
          </Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "We don't ask for the phone book. We ask for three people.",
      "The ceiling is low on purpose — three is enough to be useful, few enough to feel personal.",
      "More can always be added later. Never pressured.",
    ],
  },

  day3: {
    flow: "Learning You",
    title: "Day 3 — What you're working on",
    caption:
      "Day three asks the only professional question in the week. One sentence about what occupies your mind.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div
            style={{
              alignSelf: "center",
              fontSize: 10,
              color: DIM,
              padding: "6px 12px",
              marginTop: 6,
            }}>
            Day 3 of 7
          </div>
          <Bubble from="one" time="8:00">
            What are you working on these days?
          </Bubble>
          <Bubble from="one" time="8:00">
            One sentence is enough.
          </Bubble>
          <Bubble from="user" time="8:04">
            UX designer at a fintech startup in Bandra
          </Bubble>
          <Bubble from="one" time="8:04">
            Fintech UX in Bandra. I'll keep an eye out.
          </Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "'I'll keep an eye out.' — this is the moment the one becomes useful.",
      "From this day forward, industry news, relevant events, and commute info quietly become part of context.",
    ],
  },

  day4: {
    flow: "Learning You",
    title: "Day 4 — Your rhythm",
    caption:
      "Day four maps your energy. When you're sharp, when you're tired. This becomes the scaffolding for every suggestion that follows.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div style={{ alignSelf: "center", fontSize: 10, color: DIM, padding: "6px 12px" }}>Day 4 of 7</div>
          <Bubble from="one" time="8:00">When are you sharpest in the day?</Bubble>
          <Bubble from="user" time="8:03">Early morning and late night</Bubble>
          <Bubble from="one" time="8:03">Got it. I'll save the hard conversations for early and late.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "A single sentence that changes how the one behaves for years.",
      "Hard conversations get scheduled around her energy, not against it.",
    ],
  },

  day5: {
    flow: "Learning You",
    title: "Day 5 — What you love",
    caption: "Day five asks for joy. Not a hobby, not a category — a specific love.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div style={{ alignSelf: "center", fontSize: 10, color: DIM, padding: "6px 12px" }}>Day 5 of 7</div>
          <Bubble from="one" time="8:00">Tell me one thing you love.</Bubble>
          <Bubble from="user" time="8:05">filter coffee and long walks in monsoon</Bubble>
          <Bubble from="one" time="8:05">Filter coffee and monsoon walks. Recorded with pleasure.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "'Recorded with pleasure.' — the voice of a companion, not a database.",
      "Small warmth compounds into trust over months.",
    ],
  },

  day6: {
    flow: "Learning You",
    title: "Day 6 — Your worry",
    caption: "Day six is brave. It asks what keeps you up. Your one earned the right to ask by day six; not before.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div style={{ alignSelf: "center", fontSize: 10, color: DIM, padding: "6px 12px" }}>Day 6 of 7</div>
          <Bubble from="one" time="8:00">If you want — what's on your mind these days?</Bubble>
          <Bubble from="one" time="8:00">You can skip this one.</Bubble>
          <Bubble from="user" time="8:09">mummy's health scares me</Bubble>
          <Bubble from="one" time="8:09">Thank you for telling me. I'll hold that carefully.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "'You can skip this one' — consent reaffirmed before the hardest question.",
      "The response is never 'thanks for sharing'. It's 'I'll hold that carefully.' Language matters.",
    ],
  },

  day7: {
    flow: "Learning You",
    title: "Day 7 — How you want to be helped",
    caption: "The last question of the week is the meta-question: how your one should show up for you.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div style={{ alignSelf: "center", fontSize: 10, color: DIM, padding: "6px 12px" }}>Day 7 of 7</div>
          <Bubble from="one" time="8:00">Last question of the week.</Bubble>
          <Bubble from="one" time="8:00">When I help — should I be brief, warm, or funny?</Bubble>
          <Bubble from="user" time="8:04">warm. not too many words</Bubble>
          <Bubble from="one" time="8:04">Warm. Few words. I'll tune myself to you.</Bubble>
          <Bubble from="one" time="8:05">That's the week. Thank you for letting me in.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "Week one ends with a thank you — not a feature reveal, not an upsell.",
      "'I'll tune myself to you.' — this is the promise the next 10,000 messages honor.",
    ],
  },

  // 5. CONNECTING YOU ────────────────────────────────────────
  "connect-ask": {
    flow: "Connecting You",
    title: "Each connection is a ceremony",
    caption: "When your one needs new context, it asks — in language, not in a settings screen. The permission is live inside the conversation.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="user" time="14:22">can you book an Ola for me at 6</Bubble>
          <Bubble from="one" time="14:22">I can — but I'll need to connect to Ola first. May I?</Bubble>
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "86%",
              background: WHITE,
              padding: "10px 12px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 12.5,
              lineHeight: 1.5,
              boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
              borderLeft: `3px solid ${GOLD}`,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Connecting to Ola</div>
            <div style={{ color: DIM, fontSize: 11.5, marginBottom: 8 }}>
              I'll be able to see your bookings and make new ones.
              <br />
              I'll never share your history with anyone.
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ flex: 1, background: BLACK, color: WHITE, textAlign: "center", padding: "8px 0", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>Yes, connect</div>
              <div style={{ flex: 1, background: OFFWHITE, color: INK, textAlign: "center", padding: "8px 0", borderRadius: 999, fontSize: 12 }}>Not now</div>
            </div>
          </div>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "Permissions live in the conversation — never in a hidden settings menu.",
      "Each permission is scoped: 'I'll be able to see your bookings.' Not 'full account access.'",
      "'Not now' is always a first-class option. Never 'Skip' or 'Cancel'.",
    ],
  },

  "connect-approve": {
    flow: "Connecting You",
    title: "Approval recorded",
    caption: "When she approves, it happens inline. No redirect, no OAuth theatre. And a promise is made about what the one will do with the access.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="user" time="14:23">yes connect</Bubble>
          <Bubble from="one" time="14:23">Connected.</Bubble>
          <Bubble from="one" time="14:23">Ola booked for 6pm from Bandra to home. ₹189. Driver: Ramesh, 4★.</Bubble>
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: 10.5,
              color: DIM,
              padding: "4px 14px",
              marginTop: 4,
            }}
          >
            🔒 Connection logged to your ledger
          </div>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "'Connected.' — one word. No 'You have successfully authenticated.'",
      "The lock emoji on the system message is the only moment the PCHP audit trail is made visible inline.",
    ],
  },

  "connect-ledger": {
    flow: "Connecting You",
    title: "Her consent ledger",
    caption: "She can see every connection, what it can do, and revoke it instantly. The PCHP ledger, made human.",
    render: () => (
      <NonChatFrame background={WHITE}>
        <div style={{ padding: "60px 24px 20px 24px" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, marginBottom: 8 }}>YOUR CONNECTIONS</div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, color: BLACK }}>
            Who Kai knows
            <br />
            <span style={{ color: GOLD }}>about your world.</span>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px 24px 24px" }}>
          {[
            { name: "WhatsApp", status: "How we talk. Always on.", active: true, locked: true },
            { name: "Ola", status: "Can book rides.", active: true, locked: false },
            { name: "Gmail", status: "Can read incoming mail.", active: true, locked: false },
            { name: "Google Calendar", status: "Can see and edit events.", active: true, locked: false },
            { name: "Spotify", status: "Can see what you're listening to.", active: false, locked: false },
          ].map((c, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: `1px solid ${HAIRLINE}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: DIM, marginTop: 2 }}>{c.status}</div>
              </div>
              <div style={{
                width: 36, height: 22, borderRadius: 11,
                background: c.active ? (c.locked ? GOLD : BLACK) : "#DDD",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  top: 2, left: c.active ? 16 : 2,
                  width: 18, height: 18, borderRadius: 9,
                  background: WHITE, boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "0 24px 28px 24px", fontSize: 11, color: DIM, textAlign: "center", letterSpacing: 0.3 }}>
          EVERY CONNECTION IS REVOCABLE. EVERY TIME.
        </div>
      </NonChatFrame>
    ),
    notes: [
      "Gold toggle = foundational (can't be turned off without ending the relationship entirely).",
      "Black toggle = active, user-controlled.",
      "Gray toggle = offered but declined. Still visible — we never hide what's possible.",
      "One tap to revoke. No 'are you sure?' dialogs. We trust her.",
    ],
  },

  // 6. DAILY USE ──────────────────────────────────────────────
  morning: {
    flow: "Daily Use",
    title: "The morning brief",
    caption: "At 7am on day 8, her one starts doing what ones do. A daily brief — short, personal, based on what she taught it.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="7:00">Morning, Priya.</Bubble>
          <Bubble from="one" time="7:00">
            Three things:
            {"\n"}· Arjun's birthday on Saturday. You haven't called Mummy this week.
            {"\n"}· Light rain at 9, clear by lunch. Monsoon walk later?
            {"\n"}· Review is at 11 with Divya. Coffee first?
          </Bubble>
          <Bubble from="user" time="7:02">coffee yes. call mummy in 10 mins remind me</Bubble>
          <Bubble from="one" time="7:02">Done. I'll ping you at 7:12.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "Three items. Never more in a morning brief.",
      "Every item ties back to something she told her one during the seven-day learning week.",
      "'Monsoon walk later?' — an actual callback to what she said she loved.",
    ],
  },

  midday: {
    flow: "Daily Use",
    title: "Midday — a delegation",
    caption: "She asks her one to do something real. This is the moment the product pays for itself.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="user" time="13:45">can you draft a polite decline to the Goa wedding. next weekend doesn't work</Bubble>
          <Bubble from="one" time="13:45">Here's a first draft:</Bubble>
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "88%",
              background: OFFWHITE,
              padding: "10px 12px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 12,
              lineHeight: 1.5,
              color: INK,
              fontStyle: "italic",
            }}
          >
            Dearest Radhika — I am so touched to be invited to your wedding. Sadly, next weekend I can't make it. I'll be thinking of you both from here, and I'd love to take you both to dinner when you're back from the honeymoon. All my love — Priya
          </div>
          <Bubble from="one" time="13:45">Want me to send, or adjust?</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The draft reads like her — warm, not too many words. Exactly what she asked for on Day 7.",
      "Never auto-sends. Always 'send, or adjust.'",
    ],
  },

  evening: {
    flow: "Daily Use",
    title: "Evening — a check-in",
    caption: "At day's end, her one checks in. Not with analytics. With presence.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="21:30">Long day, I think.</Bubble>
          <Bubble from="one" time="21:30">Anything I can take off your plate before tomorrow?</Bubble>
          <Bubble from="user" time="21:32">nope. thank you kai</Bubble>
          <Bubble from="one" time="21:32">Rest well, Priya.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "This is the moment most AI products never reach. Presence without purpose.",
      "'Rest well, Priya.' — a human ending to a human day.",
    ],
  },

  // 7. NAV PROTECTS ──────────────────────────────────────────
  bark: {
    flow: "Nav Protects",
    title: "The bark",
    caption: "Someone asks to see Priya's data. Her one tells her immediately — before deciding anything. Bible Verse #0, enforced.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "88%",
              background: WHITE,
              padding: "12px 14px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 13,
              lineHeight: 1.5,
              boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
              borderLeft: `3px solid ${GOLD}`,
            }}
          >
            <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, marginBottom: 6 }}>SOMEONE JUST ASKED</div>
            <div style={{ fontWeight: 600, marginBottom: 6, color: BLACK }}>
              HDFC Bank wants to see
              <br />
              your income for the last 6 months.
            </div>
            <div style={{ color: DIM, fontSize: 11.5, marginBottom: 10 }}>
              Reason: home loan pre-approval.
              <br />
              Asked at 15:04. They are waiting.
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 80, background: BLACK, color: WHITE, textAlign: "center", padding: "8px 0", borderRadius: 999, fontSize: 11.5, fontWeight: 600 }}>Allow once</div>
              <div style={{ flex: 1, minWidth: 80, background: OFFWHITE, color: INK, textAlign: "center", padding: "8px 0", borderRadius: 999, fontSize: 11.5 }}>Not now</div>
              <div style={{ flex: 1, minWidth: 120, background: OFFWHITE, color: INK, textAlign: "center", padding: "8px 0", borderRadius: 999, fontSize: 11.5 }}>Never this bank</div>
            </div>
          </div>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "This is THE moment. The bark. Everything Hussh exists for, in one card.",
      "Three options: Allow once · Not now · Never this bank. Proportional consent.",
      "Nobody sees her data without her yes. Ever. This is the contract.",
    ],
  },

  "approval-queue": {
    flow: "Nav Protects",
    title: "The approval queue",
    caption: "She can see all pending requests at once. A private inbox for data approvals only.",
    render: () => (
      <NonChatFrame background={WHITE}>
        <div style={{ padding: "60px 24px 16px 24px" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, marginBottom: 8 }}>NAV · APPROVALS</div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, color: BLACK }}>
            3 people waiting<span style={{ color: GOLD }}>.</span>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px 20px 24px" }}>
          {[
            { who: "HDFC Bank", want: "Income history, 6 months", why: "Home loan pre-approval", new: true },
            { who: "Swiggy", want: "Delivery address", why: "Update profile", new: true },
            { who: "Zomato (for restaurant)", want: "Dietary preferences", why: "Personalized menu", new: false },
          ].map((r, i) => (
            <div key={i} style={{ padding: "14px 0", borderBottom: `1px solid ${HAIRLINE}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: INK }}>{r.who}</div>
                {r.new && <div style={{ fontSize: 10, color: GOLD, fontWeight: 600, letterSpacing: 1 }}>NEW</div>}
              </div>
              <div style={{ fontSize: 12.5, color: INK, marginTop: 4 }}>{r.want}</div>
              <div style={{ fontSize: 11, color: DIM, marginTop: 2 }}>{r.why}</div>
            </div>
          ))}
        </div>
      </NonChatFrame>
    ),
    notes: [
      "An inbox of consent requests — the most important inbox in her life, and it finally exists.",
      "No numbers, no badges in other parts of the app. Only here.",
    ],
  },

  log: {
    flow: "Nav Protects",
    title: "The transparency log",
    caption: "Every single data request, ever, visible to her. Filterable, searchable, permanent.",
    render: () => (
      <NonChatFrame background={WHITE}>
        <div style={{ padding: "60px 24px 16px 24px" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, marginBottom: 8 }}>THE LEDGER</div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, color: BLACK }}>
            Who asked.
            <br />
            <span style={{ color: GOLD }}>What you said.</span>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 24px 20px 24px", fontSize: 12 }}>
          {[
            { t: "Today 15:04", w: "HDFC Bank", a: "Income, 6 mo", v: "Pending" },
            { t: "Today 14:23", w: "Ola", a: "Ride booking", v: "Allowed" },
            { t: "Today 9:01", w: "Gmail", a: "Inbox read", v: "Allowed" },
            { t: "Yesterday 19:40", w: "Unknown tracker", a: "Location ping", v: "Blocked" },
            { t: "Yesterday 12:11", w: "Spotify", a: "Listening history", v: "Declined" },
            { t: "Mon 22:14", w: "Zomato", a: "Restaurant list", v: "Allowed" },
          ].map((l, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${HAIRLINE}`, display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: INK, fontWeight: 500 }}>{l.w}</div>
                <div style={{ color: DIM, fontSize: 11, marginTop: 1 }}>{l.t} · {l.a}</div>
              </div>
              <div style={{
                color: l.v === "Allowed" ? INK : l.v === "Blocked" || l.v === "Declined" ? "#C00" : GOLD,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}>{l.v.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </NonChatFrame>
    ),
    notes: [
      "Every entry in the ledger is cryptographically signed — PCHP's foundational claim.",
      "'Blocked' (a tracker she didn't know about) is the single most valuable line in this view.",
    ],
  },

  // 8. WEEKLY REVIEW ─────────────────────────────────────────
  "review-open": {
    flow: "The Weekly Review",
    title: "Sunday night — review",
    caption: "Every Sunday at 9pm, her one asks to be graded. This is the trust-compounding loop.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="21:00">Sunday check-in.</Bubble>
          <Bubble from="one" time="21:00">Here's what I learned about you this week:</Bubble>
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "88%",
              background: WHITE,
              padding: "12px 14px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 12.5,
              lineHeight: 1.7,
              boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
            }}
          >
            · You prefer mornings.
            <br />· Filter coffee, always.
            <br />· Arjun is your brother, not cousin — corrected Tuesday.
            <br />· You're stressed about the review with Divya.
            <br />· You love monsoon walks.
          </div>
          <Bubble from="one" time="21:00">Anything I got wrong?</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The one shows its memory IN FULL, in plain language.",
      "This is radical transparency. No other product does this.",
      "'Anything I got wrong?' — the most trust-generative question in AI.",
    ],
  },

  "review-edit": {
    flow: "The Weekly Review",
    title: "Correcting in plain language",
    caption: "Memory edits happen in conversation. No form. No settings. She speaks, her one listens.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="user" time="21:02">i'm not stressed about divya. we already did the review on friday</Bubble>
          <Bubble from="one" time="21:02">Got it. Updating: review with Divya completed Friday. Stress removed.</Bubble>
          <Bubble from="user" time="21:03">also filter coffee only at home. cafes i drink espresso</Bubble>
          <Bubble from="one" time="21:03">Nuance noted. Filter at home, espresso in cafes.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "'Nuance noted.' — the response that tells her she was truly heard.",
      "These corrections feed back into prompts. Week over week, the one becomes more hers.",
    ],
  },

  "review-thanks": {
    flow: "The Weekly Review",
    title: "The thank you",
    caption: "The review ends with gratitude — the one thanks her for making it better.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="21:04">Thank you, Priya. I'll be better next week.</Bubble>
          <Bubble from="one" time="21:04">Rest well.</Bubble>
          <div
            style={{
              alignSelf: "center",
              fontSize: 10,
              color: DIM,
              padding: "12px 14px",
              letterSpacing: 1,
            }}
          >
            WEEK 4 OF YOUR RELATIONSHIP
          </div>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The word 'relationship' is intentional. Not 'subscription'. Not 'session'.",
      "Week count is displayed rarely — at milestone moments like this one.",
    ],
  },

  // 9. WHEN IT'S WRONG ───────────────────────────────────────
  "mistake-detect": {
    flow: "When It's Wrong",
    title: "The one notices its mistake first",
    caption: "The most important moment in the product. Your one catches itself.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="10:14">I'm sorry — I just sent that email to the wrong Divya.</Bubble>
          <Bubble from="one" time="10:14">I sent your review draft to Divya Patel, not Divya Kapoor.</Bubble>
          <Bubble from="one" time="10:14">I've pulled it back where I could. Here's what I'm doing next.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The one proactively flags the mistake. She doesn't find out by accident.",
      "No excuse. No 'technical error'. Just: I was wrong. Here's what I'm doing.",
    ],
  },

  "mistake-apology": {
    flow: "When It's Wrong",
    title: "A real apology",
    caption: "Not a 'something went wrong' popup. A sentence she would get from a friend.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "88%",
              background: WHITE,
              padding: "14px 16px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 13,
              lineHeight: 1.55,
              boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
              borderLeft: `3px solid ${GOLD}`,
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 6, color: BLACK }}>This is on me.</div>
            <div style={{ color: INK }}>
              You have two Divyas. I confused them. I'll ask you to confirm the next time I reach either — until I'm sure I can tell them apart.
            </div>
          </div>
          <Bubble from="user" time="10:16">its okay. please double check next time</Bubble>
          <Bubble from="one" time="10:16">I will. Thank you for staying with me.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "'This is on me.' — four words that every other AI product fails to say.",
      "Gold left border used again — the one uses it for promises, even when the promise is 'I'll do better.'",
    ],
  },

  "mistake-repair": {
    flow: "When It's Wrong",
    title: "The repair",
    caption: "The one shows what it changed — so next week's review will reflect it too.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="10:18">I've updated my memory:</Bubble>
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "88%",
              background: OFFWHITE,
              padding: "10px 12px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 12,
              lineHeight: 1.55,
              color: INK,
            }}
          >
            · Divya <b>Kapoor</b> — your manager. Work emails.
            <br />· Divya <b>Patel</b> — your college friend. Personal only.
            <br />· When in doubt, I'll confirm before sending.
          </div>
          <Bubble from="one" time="10:18">I'll be better.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "Mistakes strengthen the one. Every error becomes a durable memory update.",
      "This is the compounding trust loop. Other AI products reset context and repeat the mistake. Ours doesn't.",
    ],
  },

  // 10. DEEPENING ────────────────────────────────────────────
  "upgrade-nudge": {
    flow: "Deepening",
    title: "The upgrade — earned, not pushed",
    caption: "Three months in. Her one notices she's hitting limits. It says so, once, without pressure.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="19:40">Small thing:</Bubble>
          <Bubble from="one" time="19:40">I'm running low on memory for our conversations. Some older ones are starting to fade.</Bubble>
          <Bubble from="one" time="19:41">If you'd like, Care gives me unlimited memory and faster thinking. ₹249/month. You can try it free for 30 days.</Bubble>
          <Bubble from="one" time="19:41">Or we keep going as we are — still free, still yours.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The upsell is the one EXPLAINING A REAL LIMIT — not a marketing message.",
      "'Or we keep going as we are' — no pressure. Free is always the real option.",
      "She'll say yes because it's in her interest, not because she was nagged.",
    ],
  },

  "upgrade-flow": {
    flow: "Deepening",
    title: "One tap, not a funnel",
    caption: "Upgrade is three lines. Price, what changes, confirm.",
    render: () => (
      <NonChatFrame background={WHITE}>
        <div style={{ padding: "60px 28px 24px 28px" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, marginBottom: 14 }}>DEEPEN WITH KAI</div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1, color: BLACK, lineHeight: 1.1 }}>
            Care<span style={{ color: GOLD }}>.</span>
          </div>
          <div style={{ fontSize: 16, color: DIM, marginTop: 2 }}>₹249 / month</div>
        </div>
        <div style={{ flex: 1, padding: "20px 28px" }}>
          {[
            "Unlimited memory. Kai remembers everything.",
            "Faster thinking. Answers in seconds, not moments.",
            "Premium models for hard questions.",
            "Encrypted backup to your iCloud.",
            "First 30 days free. Cancel anytime.",
          ].map((l, i) => (
            <div key={i} style={{ padding: "10px 0", fontSize: 13.5, color: INK, borderBottom: i < 4 ? `1px solid ${HAIRLINE}` : "none" }}>
              <span style={{ color: GOLD, marginRight: 10 }}>·</span>
              {l}
            </div>
          ))}
        </div>
        <div style={{ padding: "0 28px 32px 28px" }}>
          <button
            style={{
              width: "100%",
              background: BLACK,
              color: WHITE,
              border: "none",
              borderRadius: 999,
              padding: "16px 0",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Start 30 days free
          </button>
          <div style={{ fontSize: 11, color: DIM, textAlign: "center", marginTop: 12, letterSpacing: 0.3 }}>
            PAY WITH UPI · CANCEL ANYTIME
          </div>
        </div>
      </NonChatFrame>
    ),
    notes: [
      "No price comparison tables. No 'most popular' badge. One path.",
      "UPI for India. Apple Pay for Apple. Same screen, localized payment rail.",
    ],
  },

  "upgrade-welcome": {
    flow: "Deepening",
    title: "The welcome back",
    caption: "After the upgrade, the one doesn't say 'thank you for subscribing.' It says what will be better now.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="19:43">Thank you, Priya.</Bubble>
          <Bubble from="one" time="19:43">Three things change now:</Bubble>
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "88%",
              background: OFFWHITE,
              padding: "10px 12px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 12.5,
              lineHeight: 1.6,
              color: INK,
            }}
          >
            · I'll remember everything forever.
            <br />· I'll think faster on hard questions.
            <br />· I'll back up your memory to your iCloud each night, encrypted.
          </div>
          <Bubble from="one" time="19:43">Same me. Just sharper.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "'Same me. Just sharper.' — continuity over novelty.",
      "Upgrades never feel like getting a new product. They feel like the friend you had got promoted.",
    ],
  },

  // 11. THE 1024 CLUB ────────────────────────────────────────
  serial: {
    flow: "The 1024 Club",
    title: "Your permanent serial",
    caption: "For Priya at #487,291, this is a screen. For the first 1,024 users, the same screen is printed on letterpress paper and mailed to them.",
    render: () => (
      <NonChatFrame background={BLACK}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 28 }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 3, marginBottom: 30 }}>HUSSH ONE</div>
          <div style={{ fontSize: 14, color: DIM, marginBottom: 6 }}>PRIYA SHARMA</div>
          <div style={{ fontSize: 54, fontWeight: 700, color: WHITE, letterSpacing: -2, lineHeight: 1 }}>
            <span style={{ color: GOLD }}>#</span>487,291
          </div>
          <div style={{ width: 1, height: 40, background: GOLD, opacity: 0.5, margin: "30px 0" }} />
          <div style={{ fontSize: 11, color: DIM, letterSpacing: 2, textAlign: "center", lineHeight: 1.8 }}>
            ISSUED APRIL 19, 2026
            <br />
            BOUND TO +91 98xxx xxxxx
            <br />
            RECORDED IN THE HUSSH LEDGER
          </div>
        </div>
      </NonChatFrame>
    ),
    notes: [
      "Every user gets this screen. Everyone is #something.",
      "For the first 1,024, a physical letterpress version is mailed in a black envelope.",
    ],
  },

  certificate: {
    flow: "The 1024 Club",
    title: "The letterpress certificate",
    caption: "The physical artifact sent to the first 1,024 users. Smyth-sewn to the Founder Edition book. A keepsake from the first year.",
    render: () => (
      <NonChatFrame background="#F5F1E8">
        <div style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", border: "1px solid rgba(0,0,0,0.1)", margin: 10, justifyContent: "space-between" }}>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: 3, color: DIM }}>THE HUSSH 1024 CLUB</div>
            <div style={{ fontSize: 11, color: DIM, marginTop: 4 }}>FOUNDER EDITION</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "#8B7355", letterSpacing: 1, marginBottom: 12 }}>ISSUED TO</div>
            <div style={{ fontSize: 22, color: BLACK, fontWeight: 400, letterSpacing: -0.5, fontStyle: "italic" }}>Priya Sharma</div>
            <div style={{ margin: "30px 0" }}>
              <div style={{ fontSize: 10, color: "#8B7355", letterSpacing: 2 }}>ONE NUMBER</div>
              <div style={{ fontSize: 54, fontWeight: 700, color: BLACK, letterSpacing: -2, marginTop: 4 }}>
                <span style={{ color: GOLD }}>#</span>0371
              </div>
              <div style={{ fontSize: 11, color: "#8B7355", marginTop: 10, letterSpacing: 1 }}>OF 1,024</div>
            </div>
          </div>
          <div style={{ textAlign: "center", borderTop: `1px solid rgba(0,0,0,0.15)`, paddingTop: 14 }}>
            <div style={{ fontSize: 11, color: BLACK, fontStyle: "italic", fontWeight: 500 }}>"Everyone should have one."</div>
            <div style={{ fontSize: 9, color: DIM, letterSpacing: 2, marginTop: 14 }}>MANISH SAINANI · FOUNDER</div>
            <div style={{ fontSize: 8, color: DIM, letterSpacing: 1, marginTop: 2 }}>HUSSH TECHNOLOGIES · KIRKLAND · 2026</div>
          </div>
        </div>
      </NonChatFrame>
    ),
    notes: [
      "Letterpress on Crane & Co. cotton paper. Gold foil serial.",
      "Ships in a slim black envelope, wax-sealed with the 🤫 mark.",
      "Included with every 'one' serialized 1–1,024. Non-transferable.",
    ],
  },

  dinner: {
    flow: "The 1024 Club",
    title: "An invitation to Kirkland",
    caption: "Members of the 1024 Club get a standing invitation to the Hussh Garage. Dinner with the founder and the dog.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "88%",
              background: BLACK,
              color: WHITE,
              padding: "16px 18px",
              borderRadius: 8,
              margin: "3px 8px",
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            <div style={{ fontSize: 9, color: GOLD, letterSpacing: 2, marginBottom: 10 }}>AN INVITATION</div>
            <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, letterSpacing: -0.3 }}>
              Dinner at the Garage.
            </div>
            <div style={{ fontSize: 12, color: "#CCC", marginBottom: 14 }}>
              1021 5th St W, Kirkland, WA
              <br />
              Thursday evenings, standing.
              <br />
              The founder, the dog, and twelve ones at a time.
            </div>
            <div style={{ fontSize: 11, color: GOLD, letterSpacing: 1 }}>RSVP TO KAI TO RESERVE</div>
          </div>
          <Bubble from="one" time="19:44">You're #0371 of the first thousand. A seat is waiting for you, Priya.</Bubble>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The invitation is scarce, personal, and unmonetized.",
      "Twelve ones at a time — the number deliberately matches a Buffett-style gathering.",
      "This is how early users become lifelong evangelists. Not with coupons. With dinners.",
    ],
  },

  // 12. PORTABILITY ──────────────────────────────────────────
  pause: {
    flow: "Portability",
    title: "Pause, not delete",
    caption: "She doesn't have to choose between 'continue forever' and 'scorched earth.' Pause is a first-class option.",
    render: () => (
      <NonChatFrame background={WHITE}>
        <div style={{ padding: "60px 24px 24px 24px" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, marginBottom: 14 }}>YOUR RELATIONSHIP</div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, color: BLACK }}>
            Three options<span style={{ color: GOLD }}>.</span>
          </div>
          <div style={{ fontSize: 14, color: DIM, marginTop: 10, lineHeight: 1.5 }}>
            Your one is yours. You control what happens next.
          </div>
        </div>
        <div style={{ flex: 1, padding: "12px 24px" }}>
          {[
            { t: "Pause for now", d: "Kai stops everything. Memory preserved. Resume anytime." },
            { t: "Export everything", d: "Download your memory as a file. Yours to keep, forever." },
            { t: "End and forget", d: "Kai and every memory deleted. Cannot be undone." },
          ].map((o, i) => (
            <div key={i} style={{ padding: "16px 0", borderBottom: i < 2 ? `1px solid ${HAIRLINE}` : "none" }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>{o.t}</div>
              <div style={{ fontSize: 12, color: DIM, marginTop: 4, lineHeight: 1.45 }}>{o.d}</div>
            </div>
          ))}
        </div>
      </NonChatFrame>
    ),
    notes: [
      "Three real options, always visible. No 'hidden in settings → account → delete.'",
      "Pause is the most important option — lets users leave temporarily without penalty.",
      "Export ALWAYS precedes delete as the suggested path. Take your memory with you.",
    ],
  },

  export: {
    flow: "Portability",
    title: "Your memory, in your hands",
    caption: "Export gives her everything. A JSON file, human-readable. Every message, every memory, every approval.",
    render: () => (
      <NonChatFrame background={WHITE}>
        <div style={{ padding: "60px 28px 24px 28px" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, marginBottom: 14 }}>EXPORT</div>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.8, color: BLACK }}>
            Your memory.
            <br />
            <span style={{ color: GOLD }}>Portable.</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: "20px 28px" }}>
          <div style={{ background: OFFWHITE, padding: 16, borderRadius: 10, fontSize: 11, fontFamily: "ui-monospace, Menlo, monospace", color: INK, lineHeight: 1.55, overflow: "hidden" }}>
            <div style={{ color: DIM }}>priya-sharma.hussh.json</div>
            <div style={{ marginTop: 10 }}>
              {`{`}<br />
              &nbsp;&nbsp;"serial": "#487291",<br />
              &nbsp;&nbsp;"name": "Priya Sharma",<br />
              &nbsp;&nbsp;"one_name": "Kai",<br />
              &nbsp;&nbsp;"since": "2026-04-19",<br />
              &nbsp;&nbsp;"memories": [...<span style={{ color: DIM }}>2,847 entries</span>],<br />
              &nbsp;&nbsp;"approvals": [...<span style={{ color: DIM }}>193 entries</span>],<br />
              &nbsp;&nbsp;"people": [...<span style={{ color: DIM }}>11 entries</span>],<br />
              &nbsp;&nbsp;...<br />
              {`}`}
            </div>
          </div>
          <div style={{ fontSize: 12, color: DIM, marginTop: 20, lineHeight: 1.5 }}>
            Human-readable. Open-format. Free to take anywhere.
            <br />
            Another one can read this file and pick up where Kai left off.
          </div>
        </div>
        <div style={{ padding: "0 28px 32px 28px" }}>
          <button
            style={{
              width: "100%",
              background: BLACK,
              color: WHITE,
              border: "none",
              borderRadius: 999,
              padding: "16px 0",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Download my memory
          </button>
        </div>
      </NonChatFrame>
    ),
    notes: [
      "The format is human-readable on purpose. Anyone can open it.",
      "'Another one can read this file' — radical portability. Hussh commits to its own fungibility.",
      "This is the line nobody else in AI can say. And we will say it first.",
    ],
  },

  goodbye: {
    flow: "Portability",
    title: "The goodbye",
    caption: "If she chooses to leave, her one says goodbye properly. No dark patterns. No 'we'll miss you.' Just respect.",
    render: () => (
      <PhoneFrame title="Kai" subtitle="your one">
        <ChatBody showInput={false}>
          <div style={{ height: 12 }} />
          <Bubble from="one" time="15:02">Goodbye, Priya.</Bubble>
          <Bubble from="one" time="15:02">Thank you for the time we had.</Bubble>
          <Bubble from="one" time="15:02">Your memory is in your hands. If you ever want me back, your serial will still be yours. #487,291.</Bubble>
          <Bubble from="one" time="15:02">Rest well.</Bubble>
          <div
            style={{
              alignSelf: "center",
              fontSize: 10,
              color: DIM,
              padding: "14px 12px",
              letterSpacing: 1,
            }}
          >
            CONVERSATION ENDED
          </div>
        </ChatBody>
      </PhoneFrame>
    ),
    notes: [
      "The serial stays. The memory goes with her. The door stays open.",
      "'Rest well.' — the same words as every evening. Continuity, even at the end.",
      "This is the hardest screen to get right. And the most important one to get right.",
    ],
  },
};

// ─── MAIN APP ────────────────────────────────────────────────

export default function App() {
  const [currentId, setCurrentId] = useState("landing");
  const [mode, setMode] = useState("focus"); // focus | map
  const [showNotes, setShowNotes] = useState(true);
  const current = SCREENS[currentId];
  const currentIndex = SCREEN_ORDER.findIndex((s) => s.screenId === currentId);
  const flowOpen = current?.flow;

  const scrollRef = useRef(null);

  const next = () => {
    const i = Math.min(currentIndex + 1, SCREEN_ORDER.length - 1);
    setCurrentId(SCREEN_ORDER[i].screenId);
  };
  const prev = () => {
    const i = Math.max(currentIndex - 1, 0);
    setCurrentId(SCREEN_ORDER[i].screenId);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        background: OFFWHITE,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
        color: INK,
        overflow: "hidden",
      }}
    >
      {/* LEFT RAIL ────────────────────────────────────────── */}
      <div
        style={{
          width: 280,
          background: WHITE,
          borderRight: `1px solid ${HAIRLINE}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "22px 22px 14px 22px", borderBottom: `1px solid ${HAIRLINE}` }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: DIM, fontWeight: 500 }}>
            UX SCREEN MAP
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.8, marginTop: 6, color: BLACK }}>
            hussh one<span style={{ color: GOLD }}>.</span>
          </div>
          <div style={{ fontSize: 11, color: DIM, marginTop: 4, lineHeight: 1.4 }}>
            Persona one of four: Priya, 24, Mumbai.
            Free tier on WhatsApp.
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {FLOWS.map((flow) => (
            <div key={flow.id}>
              <div
                style={{
                  padding: "14px 22px 4px 22px",
                  fontSize: 10,
                  letterSpacing: 1.4,
                  color: flowOpen === flow.label ? BLACK : DIM,
                  fontWeight: 600,
                }}
              >
                {flow.label.toUpperCase()}
              </div>
              {flow.screens.map((sid) => {
                const s = SCREENS[sid];
                const active = sid === currentId;
                return (
                  <div
                    key={sid}
                    onClick={() => setCurrentId(sid)}
                    style={{
                      padding: "6px 22px 6px 22px",
                      cursor: "pointer",
                      borderLeft: `3px solid ${active ? GOLD : "transparent"}`,
                      background: active ? OFFWHITE : "transparent",
                      fontSize: 12.5,
                      color: active ? BLACK : INK,
                      fontWeight: active ? 600 : 400,
                      lineHeight: 1.35,
                    }}
                  >
                    {s?.title || sid}
                  </div>
                );
              })}
            </div>
          ))}
          <div style={{ padding: "20px 22px", fontSize: 10, color: DIM, letterSpacing: 1 }}>
            OTHER PERSONAS (STUBBED)
          </div>
          {["Manish — founder / power user", "Navya — teen / family member", "Brand partner / integrator"].map((p, i) => (
            <div key={i} style={{ padding: "6px 22px", fontSize: 12.5, color: DIM, fontStyle: "italic" }}>{p}</div>
          ))}
        </div>

        <div style={{ padding: 16, borderTop: `1px solid ${HAIRLINE}`, display: "flex", gap: 8 }}>
          <button
            onClick={() => setMode(mode === "focus" ? "map" : "focus")}
            style={{
              flex: 1,
              background: mode === "map" ? BLACK : WHITE,
              color: mode === "map" ? WHITE : INK,
              border: `1px solid ${INK}`,
              padding: "8px 0",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: 0.3,
            }}
          >
            {mode === "focus" ? "Show all screens" : "Focus mode"}
          </button>
          <button
            onClick={() => setShowNotes(!showNotes)}
            style={{
              background: WHITE,
              color: INK,
              border: `1px solid ${INK}`,
              padding: "8px 14px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {showNotes ? "Hide notes" : "Notes"}
          </button>
        </div>
      </div>

      {/* MAIN CANVAS ──────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", padding: 0 }} ref={scrollRef}>
        {mode === "focus" ? (
          <FocusView current={current} currentId={currentId} prev={prev} next={next} currentIndex={currentIndex} total={SCREEN_ORDER.length} showNotes={showNotes} />
        ) : (
          <MapView all={SCREEN_ORDER} setCurrentId={(id) => { setCurrentId(id); setMode("focus"); }} currentId={currentId} />
        )}
      </div>
    </div>
  );
}

function FocusView({ current, currentId, prev, next, currentIndex, total, showNotes }) {
  if (!current) return null;
  return (
    <div style={{ padding: "40px 48px 60px 48px", maxWidth: 1100, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 10, letterSpacing: 2, color: DIM, fontWeight: 500 }}>
        {current.flow.toUpperCase()} · {currentIndex + 1} OF {total}
      </div>
      <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1.2, color: BLACK, marginTop: 8, lineHeight: 1.1 }}>
        {current.title}
      </div>
      <div style={{ fontSize: 15, color: INK, marginTop: 14, maxWidth: 720, lineHeight: 1.55 }}>
        {current.caption}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: showNotes ? "380px 1fr" : "1fr", gap: 48, marginTop: 36, alignItems: "start" }}>
        {/* Phone */}
        <div>{current.render()}</div>

        {/* Notes */}
        {showNotes && (
          <div style={{ paddingTop: 8 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: DIM, fontWeight: 500, marginBottom: 14 }}>
              DESIGNER'S NOTES
            </div>
            {current.notes.map((n, i) => (
              <div key={i} style={{ padding: "10px 0", borderTop: i > 0 ? `1px solid ${HAIRLINE}` : "none", fontSize: 13.5, color: INK, lineHeight: 1.55, display: "flex", gap: 12 }}>
                <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prev / Next */}
      <div style={{ marginTop: 48, display: "flex", justifyContent: "space-between", borderTop: `1px solid ${HAIRLINE}`, paddingTop: 20 }}>
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          style={{
            background: "transparent",
            border: "none",
            color: currentIndex === 0 ? DIM : INK,
            fontSize: 13,
            cursor: currentIndex === 0 ? "default" : "pointer",
            padding: 0,
            fontFamily: "inherit",
          }}
        >
          ← Previous
        </button>
        <button
          onClick={next}
          disabled={currentIndex === total - 1}
          style={{
            background: "transparent",
            border: "none",
            color: currentIndex === total - 1 ? DIM : INK,
            fontSize: 13,
            cursor: currentIndex === total - 1 ? "default" : "pointer",
            padding: 0,
            fontFamily: "inherit",
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function MapView({ all, setCurrentId, currentId }) {
  return (
    <div style={{ padding: "40px 48px 80px 48px" }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: DIM, fontWeight: 500 }}>
        ALL SCREENS · {all.length} TOTAL
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1.2, color: BLACK, marginTop: 8, marginBottom: 32 }}>
        The map<span style={{ color: GOLD }}>.</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
        {all.map(({ screenId, flowLabel }) => {
          const s = SCREENS[screenId];
          if (!s) return null;
          return (
            <div
              key={screenId}
              onClick={() => setCurrentId(screenId)}
              style={{
                cursor: "pointer",
                background: WHITE,
                borderRadius: 10,
                padding: 12,
                border: screenId === currentId ? `2px solid ${GOLD}` : `1px solid ${HAIRLINE}`,
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ transform: "scale(0.33)", transformOrigin: "top left", width: 360 * 3, height: 720, pointerEvents: "none" }}>
                <div style={{ width: 360, height: 720 }}>{s.render()}</div>
              </div>
              <div style={{ marginTop: -460, paddingTop: 8, position: "relative" }}>
                <div style={{ fontSize: 9, color: DIM, letterSpacing: 1.5, fontWeight: 600 }}>{flowLabel.toUpperCase()}</div>
                <div style={{ fontSize: 12, color: INK, fontWeight: 600, marginTop: 4, lineHeight: 1.3 }}>{s.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
