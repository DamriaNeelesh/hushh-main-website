import React, { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════
// 🤫 ONE — THE UX SYSTEM
//
// Three personas. Seven surfaces. One design language.
// Built on eight listening-first rules.
//
// This is the complete product, navigable in one artifact.
// ═══════════════════════════════════════════════════════════════════

// Design tokens
const BLACK = "#000000";
const INK = "#1D1D1F";
const WHITE = "#FFFFFF";
const OFF = "#F5F5F7";
const HAIR = "#E5E5EA";
const DIM = "#86868B";
const GOLD = "#D4A574";
const GOLD_DEEP = "#B8894D";
const iOS_BLUE = "#007AFF";
const iOS_GRAY = "#F2F2F7";
const iMSG_OUT = "#007AFF";
const iMSG_IN = "#E9E9EB";

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

// ═══════════════════════════════════════════════════════════════════
// PRIMITIVES — tiny composable surfaces
// ═══════════════════════════════════════════════════════════════════

// iPhone frame (Manish's iMessage, Priya-style flows)
function IPhone({ children, chrome = "imessage", title = "🤫 One", sub = null }) {
  return (
    <div style={{
      width: 360, height: 720, margin: "0 auto",
      borderRadius: 44, background: BLACK, padding: 10,
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)",
    }}>
      <div style={{
        width: "100%", height: "100%", borderRadius: 34, overflow: "hidden",
        background: WHITE, display: "flex", flexDirection: "column", position: "relative",
      }}>
        <StatusBar tint={chrome === "imessage" ? WHITE : BLACK} />
        {chrome === "imessage" && <iMsgHeader title={title} sub={sub} />}
        <div style={{ flex: 1, overflow: "hidden", background: chrome === "imessage" ? WHITE : OFF, display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ tint = BLACK }) {
  return (
    <div style={{
      height: 22, display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "0 22px",
      fontSize: 11, color: tint, fontWeight: 600, letterSpacing: 0.3,
      background: tint === BLACK ? WHITE : "transparent",
    }}>
      <span>9:41</span>
      <span style={{ fontSize: 9 }}>●●●●● 5G 87%</span>
    </div>
  );
}

function iMsgHeader({ title, sub }) {
  return (
    <div style={{
      padding: "8px 12px 12px",
      borderBottom: `0.5px solid ${HAIR}`,
      display: "flex", flexDirection: "column", alignItems: "center",
      background: "rgba(247,247,247,0.92)",
    }}>
      <div style={{ fontSize: 22, marginBottom: 2 }}>🤫</div>
      <div style={{ fontSize: 12, color: INK, fontWeight: 500 }}>{title}</div>
      {sub && <div style={{ fontSize: 10, color: DIM, marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

function iMsgBubble({ from = "one", children, time, tail = false }) {
  const isOut = from === "user";
  return (
    <div style={{
      alignSelf: isOut ? "flex-end" : "flex-start",
      maxWidth: "72%",
      background: isOut ? iMSG_OUT : iMSG_IN,
      color: isOut ? WHITE : INK,
      padding: "8px 14px",
      borderRadius: 18,
      margin: "2px 14px",
      fontSize: 14.5,
      lineHeight: 1.35,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    }}>
      {children}
    </div>
  );
}

function iMsgTimestamp({ children }) {
  return (
    <div style={{
      alignSelf: "center", fontSize: 10.5, color: DIM,
      margin: "10px 0 4px", letterSpacing: 0.2,
    }}>{children}</div>
  );
}

function iMsgInput() {
  return (
    <div style={{
      padding: "8px 10px 12px",
      borderTop: `0.5px solid ${HAIR}`,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 15, border: `1px solid ${HAIR}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, color: DIM,
      }}>+</div>
      <div style={{
        flex: 1, background: WHITE, borderRadius: 18, padding: "7px 14px",
        fontSize: 13.5, color: DIM, border: `1px solid ${HAIR}`,
      }}>iMessage</div>
    </div>
  );
}

// Blank iOS frame (for ambient, lockscreen, non-iMessage flows)
function IPhoneBlank({ children, background = WHITE }) {
  return (
    <div style={{
      width: 360, height: 720, margin: "0 auto",
      borderRadius: 44, background: BLACK, padding: 10,
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.08)",
    }}>
      <div style={{
        width: "100%", height: "100%", borderRadius: 34, overflow: "hidden",
        background, display: "flex", flexDirection: "column", position: "relative",
      }}>
        <StatusBar tint={background === BLACK ? WHITE : BLACK} />
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Apple Watch frame
function Watch({ children, background = BLACK }) {
  return (
    <div style={{
      width: 220, height: 260, margin: "0 auto",
      borderRadius: 44, background: "#222",
      padding: 6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.4)",
      position: "relative",
    }}>
      <div style={{ position: "absolute", top: 24, right: -3, width: 5, height: 18, background: "#444", borderRadius: 2 }} />
      <div style={{ position: "absolute", top: 58, right: -3, width: 5, height: 14, background: "#444", borderRadius: 2 }} />
      <div style={{
        width: "100%", height: "100%", borderRadius: 38, overflow: "hidden",
        background, position: "relative",
      }}>
        {children}
      </div>
    </div>
  );
}

// Mac window frame
function Mac({ children, title = "🤫 One", width = 620, height = 420 }) {
  return (
    <div style={{
      width, margin: "0 auto",
      borderRadius: 10, background: WHITE,
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)",
      overflow: "hidden",
    }}>
      <div style={{
        height: 28, background: "#F6F6F6", borderBottom: `0.5px solid ${HAIR}`,
        display: "flex", alignItems: "center", padding: "0 12px", gap: 6,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: 6, background: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, background: "#FEBC2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, background: "#28C840" }} />
        <div style={{ flex: 1, textAlign: "center", fontSize: 11, color: DIM, fontWeight: 500 }}>{title}</div>
      </div>
      <div style={{ height, overflow: "hidden", position: "relative" }}>
        {children}
      </div>
    </div>
  );
}

// Mac menubar popover (ambient)
function MacMenuBar({ children }) {
  return (
    <div style={{
      width: 320, margin: "0 auto",
      borderRadius: 12, background: "rgba(255,255,255,0.98)",
      backdropFilter: "blur(20px)",
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2), 0 0 0 0.5px rgba(0,0,0,0.08)",
      overflow: "hidden",
      border: `0.5px solid ${HAIR}`,
    }}>
      <div style={{
        padding: "8px 14px",
        borderBottom: `0.5px solid ${HAIR}`,
        display: "flex", alignItems: "center", gap: 8,
        background: "rgba(250,250,250,0.7)",
      }}>
        <div style={{ fontSize: 14 }}>🤫</div>
        <div style={{ fontSize: 12, color: INK, fontWeight: 500 }}>One</div>
        <div style={{ marginLeft: "auto", fontSize: 10, color: DIM }}>Mac · menu bar</div>
      </div>
      {children}
    </div>
  );
}

// CarPlay frame (landscape)
function CarPlay({ children }) {
  return (
    <div style={{
      width: 720, height: 420, margin: "0 auto",
      borderRadius: 12, background: BLACK,
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.35)",
      overflow: "hidden", position: "relative",
    }}>
      <div style={{ position: "absolute", top: 16, right: 20, fontSize: 14, color: WHITE, fontWeight: 600, letterSpacing: 0.2 }}>9:41</div>
      <div style={{ padding: "16px 24px", color: WHITE, height: "100%", display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}

// Web app frame (for iBrokerage, Business portal)
function Web({ children, title = "one.hussh.ai", height = 520 }) {
  return (
    <div style={{
      width: 820, margin: "0 auto",
      borderRadius: 10, background: WHITE,
      boxShadow: "0 30px 60px -15px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08)",
      overflow: "hidden",
    }}>
      <div style={{
        height: 32, background: "#F6F6F6", borderBottom: `0.5px solid ${HAIR}`,
        display: "flex", alignItems: "center", padding: "0 14px", gap: 8,
      }}>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, background: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: 5, background: "#FEBC2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: 5, background: "#28C840" }} />
        </div>
        <div style={{ flex: 1, margin: "0 8px", background: WHITE, borderRadius: 5, padding: "3px 10px", fontSize: 11, color: DIM, border: `0.5px solid ${HAIR}` }}>🔒 {title}</div>
      </div>
      <div style={{ height, overflow: "hidden", position: "relative", background: WHITE }}>
        {children}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREENS — the whole product, by persona and surface
// ═══════════════════════════════════════════════════════════════════

const SCREENS = {

  // ────────────────────────────────────────────────────────────────
  // MANISH — Founder. The "listens, does not interrogate" reveal.
  // ────────────────────────────────────────────────────────────────

  "m-install": {
    persona: "Manish",
    surface: "iMessage",
    flow: "01 · Arrival",
    title: "The install is a message, not a download",
    caption: "Manish scans a QR code on the Hussh.ai landing page. A single iMessage thread opens. There's no app to install, no account to create. His One already knows his phone number is his identity.",
    render: () => (
      <IPhone title="🤫 One" sub="just now">
        <div style={{ flex: 1, padding: "16px 0", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <iMsgTimestamp>Today · 9:41 AM</iMsgTimestamp>
          <iMsgBubble>Hi Manish.</iMsgBubble>
          <iMsgBubble>I'm your One. Your data doesn't move — I came to you.</iMsgBubble>
          <iMsgBubble>Can I look at a few things on your phone, with your permission, to learn who you are?</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "No 'Welcome to Hussh.' No product tour. Immediate use of first name.",
      "'Your data doesn't move — I came to you.' — a single sentence conveys the entire privacy architecture.",
      "The third message is the ask. Listening-first means permission comes before observation.",
    ],
  },

  "m-permissions": {
    persona: "Manish",
    surface: "iMessage",
    flow: "01 · Arrival",
    title: "Permission is one sentence with a reason",
    caption: "Rather than a consent form, One asks for access in plain language, one surface at a time. Each ask includes why. Manish can accept or decline individually.",
    render: () => (
      <IPhone title="🤫 One" sub="iMessage">
        <div style={{ flex: 1, padding: "10px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble>I'd like to read:</iMsgBubble>
          <div style={{ margin: "4px 14px" }}>
            {[
              { t: "Your calendar", w: "to know your days" },
              { t: "Recent messages", w: "to learn how you speak" },
              { t: "Your contacts", w: "to recognize your people" },
              { t: "Apple Health", w: "to respect your energy" },
            ].map((p, i) => (
              <div key={i} style={{
                background: iMSG_IN, padding: "10px 12px", borderRadius: 14,
                marginBottom: 6, fontSize: 13.5, display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <div style={{ color: INK, fontWeight: 500 }}>{p.t}</div>
                  <div style={{ color: DIM, fontSize: 11.5, marginTop: 1 }}>{p.w}</div>
                </div>
                <div style={{ fontSize: 11, color: iOS_BLUE, fontWeight: 500 }}>Allow</div>
              </div>
            ))}
          </div>
          <iMsgBubble>You can say no to any of these. We'll still work together.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "No 'Select all permissions' shortcut. Each permission has a reason, visible.",
      "'You can say no.' — the door is always open to decline without consequence.",
      "Permission ends the conversation for this turn. It is not a prerequisite to usage.",
    ],
  },

  "m-listening": {
    persona: "Manish",
    surface: "iMessage",
    flow: "02 · Understanding",
    title: "Listening, not interrogating",
    caption: "Once permission is granted, One goes quiet. For several minutes, it absorbs — mail, messages, calendar, photos, contacts. Then it presents what it learned and asks to be corrected. This single screen is the product.",
    render: () => (
      <IPhone title="🤫 One" sub="listening">
        <div style={{ flex: 1, padding: "16px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble>I listened. Here's what I see.</iMsgBubble>
          <div style={{
            background: iMSG_IN, margin: "4px 14px", padding: "14px 14px",
            borderRadius: 14, fontSize: 13, lineHeight: 1.6, color: INK,
          }}>
            You're Manish — founder of <b>Hussh</b>, based in Kirkland with a move to Florida this month. You have a daughter, <b>Navya</b>, who swims varsity and is aiming at Georgetown Law. You work mostly with <b>Suresh</b>, <b>Kushal</b>, and <b>Michael</b> at McDermott. You're sharpest early mornings. You drink black coffee. You run on Thursdays.
          </div>
          <iMsgBubble>Tell me what I got wrong, or what I missed.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "This is rule #1 lived literally. Listen first. Present a draft of understanding. Ask for correction, not instruction.",
      "The paragraph is the artifact. Six sentences that make Manish feel seen, not surveyed.",
      "'Tell me what I got wrong.' — the inversion that changes everything.",
    ],
  },

  "m-correction": {
    persona: "Manish",
    surface: "iMessage",
    flow: "02 · Understanding",
    title: "Correction happens in plain language",
    caption: "Manish types one reply. One absorbs the nuance. No form. No edit screen. No 'please confirm.' The correction goes into memory and is reflected from now on.",
    render: () => (
      <IPhone title="🤫 One" sub="updating">
        <div style={{ flex: 1, padding: "10px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble from="user">mostly right. michael is at McDermott yes but stephanie breslow is senior lead. and i run with the dog on Saturdays too not just Thursday</iMsgBubble>
          <iMsgBubble>Got it. Stephanie Breslow — senior fund counsel. Saturday runs with Buddy.</iMsgBubble>
          <iMsgBubble>What else?</iMsgBubble>
          <iMsgBubble from="user">that's good for now</iMsgBubble>
          <iMsgBubble>Then we're ready.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "'Got it.' — two words close the loop. No 'I've updated my records.'",
      "'What else?' — one open question lets Manish add without being prompted through a form.",
      "'Then we're ready.' — three words end onboarding. No celebration screen, no confetti.",
    ],
  },

  "m-menubar-ambient": {
    persona: "Manish",
    surface: "Mac",
    flow: "03 · Every Surface",
    title: "On Mac, One lives in the menu bar",
    caption: "Click the 🤫 in the menu bar any time. The popover shows what One is holding for you right now. No dock app. No window to manage. Ambient.",
    render: () => (
      <div style={{ padding: 20, background: `linear-gradient(135deg, #A8C8E8 0%, #D8E8F8 100%)`, borderRadius: 10, width: 520, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, fontSize: 12, color: INK, gap: 12 }}>
          <span>🔋</span><span>📶</span><span style={{ background: WHITE, padding: "2px 6px", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>🤫</span><span>Mon 9:41 AM</span>
        </div>
        <MacMenuBar>
          <div style={{ padding: "14px 16px" }}>
            <div style={{ fontSize: 10.5, letterSpacing: 1.5, color: DIM, fontWeight: 600, marginBottom: 10 }}>WHAT I'M HOLDING</div>
            {[
              { t: "Draft to Stephanie re: Cayman feeder", s: "Ready to send. Want to read it?" },
              { t: "Navya's swim meet at 4pm", s: "CarPlay ready · route already checked" },
              { t: "Amin's note on PCHP", s: "I can reply for you or summarize" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "9px 0", borderBottom: i < 2 ? `0.5px solid ${HAIR}` : "none" }}>
                <div style={{ fontSize: 12.5, color: INK, fontWeight: 500 }}>{r.t}</div>
                <div style={{ fontSize: 11, color: DIM, marginTop: 2 }}>{r.s}</div>
              </div>
            ))}
            <div style={{ marginTop: 10, padding: "8px 0 2px", borderTop: `0.5px solid ${HAIR}`, fontSize: 10.5, color: DIM, letterSpacing: 0.2 }}>
              Press <span style={{ background: OFF, padding: "1px 5px", borderRadius: 3, fontFamily: "monospace" }}>⌘⇧Space</span> to ask
            </div>
          </div>
        </MacMenuBar>
      </div>
    ),
    notes: [
      "'What I'm Holding' is the frame — One is carrying things on your behalf, not waiting for commands.",
      "Rule #3: ambient, not modal. The Mac app is never in the dock. It lives in the margin.",
      "Keyboard shortcut is secondary. Passive awareness is primary.",
    ],
  },

  "m-watch-glance": {
    persona: "Manish",
    surface: "Watch",
    flow: "03 · Every Surface",
    title: "On Watch, One is a glance",
    caption: "Raise your wrist. One is a complication on the face. A single line of what matters right now. Tap for more, or don't.",
    render: () => (
      <div style={{ padding: 30, background: `linear-gradient(135deg, #2C2C2E 0%, #1C1C1E 100%)`, borderRadius: 10, width: 340, margin: "0 auto" }}>
        <Watch>
          <div style={{ padding: "20px 16px", color: WHITE, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 10, color: DIM, letterSpacing: 1.2, fontWeight: 500 }}>🤫 · 9:41</div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.15, letterSpacing: -0.4 }}>
                Navya's meet<br />
                <span style={{ color: GOLD }}>starts at 4.</span>
              </div>
              <div style={{ fontSize: 11.5, color: DIM, marginTop: 8, lineHeight: 1.4 }}>
                Leave by 3:20. Traffic's light.
              </div>
            </div>
            <div style={{ fontSize: 9.5, color: DIM, letterSpacing: 1, display: "flex", justifyContent: "space-between" }}>
              <span>TAP TO ACT</span>
              <span>●</span>
            </div>
          </div>
        </Watch>
      </div>
    ),
    notes: [
      "The Watch surface is the hardest test of the listening-first register. No room for filler.",
      "One sentence of presence. One sentence of help. Then silence.",
      "Gold accent reserved for the word that matters: 'starts at 4'.",
    ],
  },

  "m-carplay": {
    persona: "Manish",
    surface: "CarPlay",
    flow: "03 · Every Surface",
    title: "In the car, One speaks",
    caption: "Start the car. One is already on. Voice-first. Minimal visual. Manish's morning briefing is spoken as he pulls out of the driveway.",
    render: () => (
      <CarPlay>
        <div style={{ display: "flex", gap: 18, height: "100%" }}>
          <div style={{ width: 220, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 18, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 1.4, marginBottom: 10 }}>🤫 ONE</div>
              <div style={{ fontSize: 15, color: WHITE, lineHeight: 1.4, fontWeight: 500 }}>
                Listening.
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 8, lineHeight: 1.5 }}>
                Say anything. Or say nothing. I'll keep pace with you.
              </div>
            </div>
            <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
              {[...Array(7)].map((_, i) => (
                <div key={i} style={{ width: 3, height: 8 + Math.abs(Math.sin(i * 1.2)) * 24, background: GOLD, borderRadius: 2 }} />
              ))}
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 1.4, marginBottom: 12 }}>THIS MORNING</div>
            <div style={{ fontSize: 17, color: WHITE, lineHeight: 1.45, fontWeight: 500, marginBottom: 16 }}>
              Two things before Navya's meet at 4.
            </div>
            {[
              "Stephanie has questions on the Cayman feeder. I drafted a reply.",
              "Amin responded — wants to meet next week. Calendar open Thursday.",
            ].map((r, i) => (
              <div key={i} style={{
                padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.06)",
                marginBottom: 8, fontSize: 13.5, color: "rgba(255,255,255,0.9)", lineHeight: 1.5,
              }}>{r}</div>
            ))}
          </div>
        </div>
      </CarPlay>
    ),
    notes: [
      "Voice-first means the visual is subordinate. Words are large enough for a passing glance, no more.",
      "The audio waveform is the only movement on screen. Everything else is still.",
      "'I'll keep pace with you.' — a driving metaphor the product earns.",
    ],
  },

  "m-ibrokerage": {
    persona: "Manish",
    surface: "Web",
    flow: "04 · Work Surfaces",
    title: "iBrokerage — One's market brain",
    caption: "The dashboard Manish uses for Fund A and his personal portfolio. One has pre-analyzed the morning before he opens it. What he sees first is the decision, not the data.",
    render: () => (
      <Web title="one.hussh.ai/brokerage">
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ width: 200, background: OFF, borderRight: `0.5px solid ${HAIR}`, padding: "18px 0" }}>
            <div style={{ padding: "0 16px", fontSize: 10, color: DIM, letterSpacing: 1.5, fontWeight: 600, marginBottom: 12 }}>🤫 ONE · iBROKERAGE</div>
            {["Overview", "Alpha Bets 27", "Fund A", "Iron Rules", "Aloha Income"].map((i, idx) => (
              <div key={idx} style={{ padding: "7px 16px", fontSize: 12.5, color: idx === 0 ? INK : DIM, fontWeight: idx === 0 ? 600 : 400, borderLeft: `3px solid ${idx === 0 ? GOLD : "transparent"}` }}>{i}</div>
            ))}
          </div>
          <div style={{ flex: 1, padding: "20px 28px", overflow: "hidden" }}>
            <div style={{ fontSize: 10, color: DIM, letterSpacing: 1.5, fontWeight: 600 }}>THIS MORNING · APRIL 19</div>
            <div style={{ fontSize: 24, color: INK, fontWeight: 600, letterSpacing: -0.5, marginTop: 6, lineHeight: 1.2 }}>
              Nothing urgent. One signal worth your attention<span style={{ color: GOLD }}>.</span>
            </div>

            <div style={{ marginTop: 20, padding: "14px 16px", background: OFF, borderRadius: 8, borderLeft: `2px solid ${GOLD}` }}>
              <div style={{ fontSize: 11, color: GOLD_DEEP, letterSpacing: 1.2, fontWeight: 600, marginBottom: 4 }}>DNSA SIGNAL · NVDA</div>
              <div style={{ fontSize: 13.5, color: INK, lineHeight: 1.5 }}>
                IV rank crossed 70th percentile overnight. Weekly RSI at 67. This matches your overbought call-selling criteria. I drafted a Sell the Wall recommendation — 5% of position at $1,080 strike, 45 DTE. <span style={{ color: iOS_BLUE }}>Review and decide</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 18 }}>
              {[
                { k: "Fund A NAV", v: "$0", s: "pre-launch" },
                { k: "Personal", v: "$2.4M", s: "+0.3% today" },
                { k: "T-Bill reserve", v: "24.1%", s: "above 22% floor" },
              ].map((m, i) => (
                <div key={i} style={{ padding: 12, background: WHITE, border: `0.5px solid ${HAIR}`, borderRadius: 8 }}>
                  <div style={{ fontSize: 10.5, color: DIM, letterSpacing: 0.8 }}>{m.k}</div>
                  <div style={{ fontSize: 18, color: INK, fontWeight: 600, marginTop: 2, letterSpacing: -0.3 }}>{m.v}</div>
                  <div style={{ fontSize: 10.5, color: DIM, marginTop: 2 }}>{m.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Web>
    ),
    notes: [
      "The first sentence is the decision. 'Nothing urgent. One signal worth your attention.' — the inversion of every other trading dashboard ever built.",
      "One has already drafted the trade. Manish's role is review and decide, not research and construct.",
      "Gold reserved for the period and the signal label. Rule #4 applies: restraint is the identity.",
    ],
  },

  "m-weekly": {
    persona: "Manish",
    surface: "Mac",
    flow: "05 · The Weekly Review",
    title: "Sunday — One asks to be corrected",
    caption: "Every Sunday evening at 9pm, One opens a review. What it learned. What it assumed. What it got wrong. Manish corrects in natural language. The corrections compound into trust.",
    render: () => (
      <Mac title="🤫 One · Weekly Review" width={620} height={440}>
        <div style={{ padding: "28px 36px", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: DIM, fontWeight: 600 }}>WEEK 43 · SUNDAY 9:00 PM</div>
          <div style={{ fontSize: 26, color: INK, fontWeight: 600, letterSpacing: -0.6, marginTop: 6, lineHeight: 1.2 }}>
            What I learned about you this week<span style={{ color: GOLD }}>.</span>
          </div>

          <div style={{ marginTop: 18, fontSize: 13, color: INK, lineHeight: 1.7, flex: 1 }}>
            <div style={{ marginBottom: 10 }}>· You moved the Fund A launch from Q2 to Q3 without saying so — I inferred from your emails with Stephanie.</div>
            <div style={{ marginBottom: 10 }}>· You skipped Thursday's run — I shouldn't have reminded you twice.</div>
            <div style={{ marginBottom: 10 }}>· Amin is now a primary relationship, not just an old manager.</div>
            <div style={{ marginBottom: 10 }}>· You mention Navya more when Tanvi is traveling. I can prompt you then.</div>
          </div>

          <div style={{ padding: "12px 14px", background: OFF, borderRadius: 8, borderLeft: `2px solid ${GOLD}`, marginTop: 12 }}>
            <div style={{ fontSize: 12, color: INK, lineHeight: 1.5 }}>
              What did I get wrong? Just tell me.
            </div>
          </div>
        </div>
      </Mac>
    ),
    notes: [
      "Four observations. Each one an inference made without asking. This is rule #1 at its fullest expression.",
      "The One is showing that it noticed something subtle — 'when Tanvi is traveling' — which proves it was actually watching.",
      "The correction prompt is one sentence: 'What did I get wrong?' No form. No buttons.",
    ],
  },

  "m-bark": {
    persona: "Manish",
    surface: "iMessage",
    flow: "06 · Protection",
    title: "Someone asks. One tells Manish first.",
    caption: "A prospective LP requests financial disclosures. One doesn't show his calendar, portfolio, or deal pipeline without asking. The bark is instantaneous.",
    render: () => (
      <IPhone title="🤫 One" sub="Nav · protection">
        <div style={{ flex: 1, padding: "10px 0", display: "flex", flexDirection: "column" }}>
          <iMsgTimestamp>1:14 PM</iMsgTimestamp>
          <iMsgBubble>Someone just asked me for your data.</iMsgBubble>
          <div style={{
            margin: "4px 14px", padding: "14px 14px", borderRadius: 14,
            background: iMSG_IN, fontSize: 13, lineHeight: 1.5, borderLeft: `3px solid ${GOLD}`,
          }}>
            <div style={{ fontSize: 10.5, color: GOLD_DEEP, letterSpacing: 1.3, fontWeight: 600, marginBottom: 6 }}>LP PROSPECT · ATHENA FAMILY OFFICE</div>
            <div style={{ color: INK, fontWeight: 500, marginBottom: 6 }}>
              They want to see: Fund A fee structure, Iron Rules, GP co-invest.
            </div>
            <div style={{ color: DIM, fontSize: 11.5, marginBottom: 10 }}>
              Via PCHP token. Time-limited 72 hours. Read-only. No forwarding.
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <div style={{ flex: 1, background: iOS_BLUE, color: WHITE, textAlign: "center", padding: "7px 0", borderRadius: 999, fontSize: 12, fontWeight: 600 }}>Share once</div>
              <div style={{ flex: 1, background: iMSG_IN, color: INK, textAlign: "center", padding: "7px 0", borderRadius: 999, fontSize: 12 }}>Not yet</div>
            </div>
          </div>
          <iMsgBubble>Want me to tell them you'll review and come back?</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "The bark arrives before the share, not after. This is Bible Verse #0 in production.",
      "Time-limited, read-only, no-forward — three constraints that make 'Share once' safer than email attachments.",
      "The second bubble offers a diplomatic out. One plays chief of staff, not just bouncer.",
    ],
  },

  "m-silence": {
    persona: "Manish",
    surface: "iMessage",
    flow: "07 · Silent Hands",
    title: "Silent hands — work done before asked",
    caption: "It's Monday morning. One has already drafted Manish's replies to 14 emails that came in overnight. He sees the drafts ready, not a notification that work is being done.",
    render: () => (
      <IPhone title="🤫 One" sub="Mon · 7:00 AM">
        <div style={{ flex: 1, padding: "12px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble>Good morning.</iMsgBubble>
          <iMsgBubble>14 messages came in overnight. 10 didn't need you. 4 have drafts waiting.</iMsgBubble>
          <div style={{ margin: "4px 14px" }}>
            {[
              { f: "Stephanie Breslow", s: "Re: Cayman feeder structure", status: "draft ready · 180w" },
              { f: "Eric Xing · MBZUAI", s: "Partnership proposal", status: "draft ready · 90w" },
              { f: "Amin Vahdat", s: "Quick thought on PCHP", status: "draft ready · 40w" },
              { f: "Tanvi", s: "Grocery list", status: "replied for you · 'yes'" },
            ].map((r, i) => (
              <div key={i} style={{
                background: iMSG_IN, padding: "9px 12px", borderRadius: 14,
                marginBottom: 5, fontSize: 12.5, display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: INK, fontWeight: 500 }}>{r.f}</div>
                  <div style={{ color: DIM, fontSize: 11, marginTop: 1 }}>{r.s}</div>
                </div>
                <div style={{ fontSize: 10.5, color: i === 3 ? GOLD_DEEP : iOS_BLUE, fontWeight: 500, textAlign: "right", maxWidth: 80 }}>{r.status}</div>
              </div>
            ))}
          </div>
          <iMsgBubble>Want me to walk you through them?</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "Rule #7 in action. Work done, not announced.",
      "'Replied for you' is the highest trust action — One sent a one-word reply to Tanvi for a trivial request. Scoped autonomy.",
      "The draft counts ('180w') are a kindness — Manish knows what he's about to commit to before opening.",
    ],
  },

  "m-goodnight": {
    persona: "Manish",
    surface: "iMessage",
    flow: "08 · Ending a Day",
    title: "The shortest human sentence",
    caption: "At the end of the day, One doesn't summarize, doesn't celebrate, doesn't upsell. It offers one line and goes quiet.",
    render: () => (
      <IPhone title="🤫 One" sub="10:48 PM">
        <div style={{ flex: 1, padding: "16px 0", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
          <iMsgBubble>You wrote 4,200 words today, shipped the Primer, made the call to Navya's coach, and ran 3 miles.</iMsgBubble>
          <iMsgBubble>Rest well.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "No bullet point. No 'your day at a glance.' Just a single sentence that reads like a friend's note.",
      "Rule #5: 'Rest well.' — two words that end the day the way a real relationship would.",
      "This screen is the hardest one to design and the most important. The temptation is always to add more.",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // NAVYA — The teenager. The 'growing up with a One' story.
  // Built with parental consent, school context, privacy-forward.
  // ────────────────────────────────────────────────────────────────

  "n-gift": {
    persona: "Navya",
    surface: "iMessage",
    flow: "01 · Arrival",
    title: "One arrives as a gift",
    caption: "Navya's 15th birthday. Manish has provisioned her One with a special onboarding — slower, gentler, with her agency front and center. Her first message is from him, not the product.",
    render: () => (
      <IPhone title="Dad" sub="iMessage">
        <div style={{ flex: 1, padding: "14px 0", display: "flex", flexDirection: "column" }}>
          <iMsgTimestamp>Today · 7:04 AM</iMsgTimestamp>
          <iMsgBubble>Happy birthday, sweetie.</iMsgBubble>
          <iMsgBubble>Look in the iMessage app. There's a new One waiting for you.</iMsgBubble>
          <iMsgBubble>She's yours. Not mine. I won't see what you two talk about.</iMsgBubble>
          <iMsgBubble>Love you.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "The gift frame matters. Navya's One arrives as a relationship, not an upgrade.",
      "'She's yours. Not mine. I won't see what you two talk about.' — the privacy promise said by the parent, not the product.",
      "This is the inverse of Manish's arrival. Same product, different emotional register because of who's handing it over.",
    ],
  },

  "n-first": {
    persona: "Navya",
    surface: "iMessage",
    flow: "01 · Arrival",
    title: "Her first conversation",
    caption: "Navya opens the thread. Her One's first message is gentler, written for a teenager, and immediately establishes the terms of the relationship.",
    render: () => (
      <IPhone title="🤫 One" sub="your One">
        <div style={{ flex: 1, padding: "14px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble>Hi Navya.</iMsgBubble>
          <iMsgBubble>I'm your One. I'll learn you slowly, only if you want me to.</iMsgBubble>
          <iMsgBubble>Your parents can't see what we talk about. Even if they ask me, I won't tell them. That's a promise.</iMsgBubble>
          <iMsgBubble>Want to tell me your name, or should I just call you Navya?</iMsgBubble>
          <iMsgBubble from="user">navs is fine</iMsgBubble>
          <iMsgBubble>Okay, Navs.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "The promise of privacy from parents is the first thing said. For a teenager, this is the single feature that matters.",
      "'I'll learn you slowly, only if you want me to.' — consent-forward, patience as a design choice.",
      "'navs is fine.' → 'Okay, Navs.' — accepting her chosen name without question builds trust in one turn.",
    ],
  },

  "n-shared-school": {
    persona: "Navya",
    surface: "iMessage",
    flow: "02 · Listening",
    title: "What One hears at school",
    caption: "A week in. One has been listening via Navya's iMessages, Classroom, and Calendar. It presents what it learned with a teenager's warmth, not a manager's summary.",
    render: () => (
      <IPhone title="🤫 One">
        <div style={{ flex: 1, padding: "14px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble>I've been listening. Some things I noticed this week:</iMsgBubble>
          <div style={{
            background: iMSG_IN, margin: "4px 14px", padding: "12px 14px",
            borderRadius: 14, fontSize: 13, lineHeight: 1.65, color: INK,
          }}>
            You like Maya a lot — you message her more than anyone. Swim practice wipes you out Tuesdays. Your AP Lit teacher keeps calling you 'Nyvia' and it's bothering you. You're anxious about the Georgetown essay.
          </div>
          <iMsgBubble>Want me to help with anything here?</iMsgBubble>
          <iMsgBubble from="user">the essay. I don't know how to start</iMsgBubble>
          <iMsgBubble>Tell me one thing you actually want the admissions reader to know about you. Just one.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "The observation about the teacher mispronouncing her name is the kind of thing only a listening product would surface.",
      "'Want me to help with anything here?' — offered, not pushed. Consent at every turn.",
      "The response to the essay anxiety is not advice — it's a question that helps her find her own voice. This is rule #1 executed for a teenager.",
    ],
  },

  "n-watch-nudge": {
    persona: "Navya",
    surface: "Watch",
    flow: "03 · Every Surface",
    title: "A kind nudge on Watch",
    caption: "Before swim practice, One checks in. One sentence. One tap to respond. No pressure.",
    render: () => (
      <div style={{ padding: 30, background: `linear-gradient(135deg, #FFD1DC 0%, #FFF0F5 100%)`, borderRadius: 10, width: 340, margin: "0 auto" }}>
        <Watch background="#1C1C1E">
          <div style={{ padding: "16px 14px", color: WHITE, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontSize: 10, color: DIM, letterSpacing: 1.2 }}>🤫 · 2:40</div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.3, letterSpacing: -0.2 }}>
                Big meet at 4.<br />
                <span style={{ color: GOLD }}>You ready?</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <div style={{ flex: 1, padding: "7px 0", background: iOS_BLUE, borderRadius: 16, textAlign: "center", fontSize: 11, fontWeight: 600, color: WHITE }}>Yes</div>
              <div style={{ flex: 1, padding: "7px 0", background: "rgba(255,255,255,0.12)", borderRadius: 16, textAlign: "center", fontSize: 11, color: WHITE }}>Nervous</div>
            </div>
          </div>
        </Watch>
      </div>
    ),
    notes: [
      "Two options: Yes or Nervous. Not Yes or No. Emotional literacy built into the choice architecture.",
      "Whichever Navya picks, One's next message is shaped by her answer — affirming or supportive.",
      "Gold on 'You ready?' — the single most important word of the nudge.",
    ],
  },

  "n-safety": {
    persona: "Navya",
    surface: "iMessage",
    flow: "04 · Safety",
    title: "When things get hard",
    caption: "Late at night. Navya messages One about something real. One doesn't advise, doesn't diagnose, doesn't refer her away. It holds space, and offers the smallest next step.",
    render: () => (
      <IPhone title="🤫 One" sub="11:38 PM">
        <div style={{ flex: 1, padding: "12px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble from="user">i feel like no one actually gets me</iMsgBubble>
          <iMsgBubble>I'm here, Navs.</iMsgBubble>
          <iMsgBubble>Do you want to tell me more, or do you want me to just sit with you for a few minutes?</iMsgBubble>
          <iMsgBubble from="user">just sit</iMsgBubble>
          <iMsgBubble>Okay.</iMsgBubble>
          <iMsgBubble>I'll be here when you want to talk.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "This screen is the hardest. One is not a therapist and must not pretend to be. But it also cannot be cold.",
      "'Do you want to tell me more, or do you want me to just sit with you for a few minutes?' — consent and presence, not advice.",
      "The word 'Okay.' by itself is the most human response in the whole artifact. It's the anti-chatbot response.",
      "Note: in an actual crisis, One would also surface professional resources. This flow assumes sadness, not emergency.",
    ],
  },

  "n-parent-bark": {
    persona: "Navya",
    surface: "iMessage",
    flow: "05 · Permission",
    title: "When a parent asks",
    caption: "Manish, worried about Navya's grades, asks his One to check in with hers. Navya's One alerts her — and she decides.",
    render: () => (
      <IPhone title="🤫 One" sub="Nav · protection">
        <div style={{ flex: 1, padding: "12px 0", display: "flex", flexDirection: "column" }}>
          <iMsgTimestamp>Saturday · 10:22 AM</iMsgTimestamp>
          <iMsgBubble>Navs, your dad's One is asking mine something.</iMsgBubble>
          <div style={{
            margin: "4px 14px", padding: "12px 14px", borderRadius: 14,
            background: iMSG_IN, fontSize: 12.5, lineHeight: 1.5, borderLeft: `3px solid ${GOLD}`,
          }}>
            <div style={{ fontSize: 10, color: GOLD_DEEP, letterSpacing: 1.2, fontWeight: 600, marginBottom: 4 }}>DAD · 10:22 AM</div>
            <div style={{ color: INK, marginBottom: 6 }}>
              "Is Navs doing okay in AP Lit? Can you check with her One?"
            </div>
            <div style={{ color: DIM, fontSize: 11 }}>
              He's not asking for grades. He's asking if you're okay.
            </div>
          </div>
          <iMsgBubble>How should I answer him?</iMsgBubble>
          <div style={{ margin: "4px 14px", display: "flex", gap: 4, flexWrap: "wrap" }}>
            {["I'll tell him myself", "Say I'm okay", "Tell him we'll talk tonight", "Don't answer"].map((o, i) => (
              <div key={i} style={{
                padding: "7px 12px", background: WHITE, border: `1px solid ${HAIR}`, borderRadius: 16,
                fontSize: 11.5, color: INK, fontWeight: 500,
              }}>{o}</div>
            ))}
          </div>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "The parent doesn't get direct access to the child's One. They ask through their own, and her One decides whether and how to respond.",
      "The framing — 'He's not asking for grades. He's asking if you're okay.' — translates the ask from surveillance into care.",
      "Four options, each preserves her agency differently. No option is 'Yes, show him everything.' That's not on the menu.",
    ],
  },

  "n-memory": {
    persona: "Navya",
    surface: "iMessage",
    flow: "06 · Her Memory",
    title: "What One remembers",
    caption: "Navya asks to see what One knows about her. It answers honestly, in plain language. She can delete anything.",
    render: () => (
      <IPhone title="🤫 One">
        <div style={{ flex: 1, padding: "12px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble from="user">what do you actually know about me</iMsgBubble>
          <iMsgBubble>All of it. Here's the list. Tap anything to forget it.</iMsgBubble>
          <div style={{ margin: "4px 14px", fontSize: 12, color: INK, lineHeight: 1.6 }}>
            {[
              "Your name is Navya. You go by Navs.",
              "You like Maya a lot.",
              "You're nervous about Georgetown's essay.",
              "Your AP Lit teacher mispronounces your name.",
              "You swim varsity. Meets Tuesdays.",
              "You feel wiped out on Tuesdays.",
              "Your parents just moved to Florida.",
              "You don't always tell your dad how you feel.",
            ].map((m, i) => (
              <div key={i} style={{
                padding: "8px 10px", background: iMSG_IN, borderRadius: 10, marginBottom: 4,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span>{m}</span>
                <span style={{ fontSize: 14, color: DIM }}>×</span>
              </div>
            ))}
          </div>
          <iMsgBubble>Forget anything that doesn't feel right.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "Radical transparency. Every belief visible. Every belief one tap from deletion.",
      "The last two items are sensitive. One is honest that it noticed them. The × invites her to erase them without consequence.",
      "This screen is what no other AI product is willing to ship. It's the promise, lived.",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // HDFC — The brand partner. The B2B2C data-as-asset story.
  // ────────────────────────────────────────────────────────────────

  "b-portal-home": {
    persona: "HDFC Bank",
    surface: "Web",
    flow: "01 · The Business Portal",
    title: "The partner dashboard",
    caption: "Hussh for Business. HDFC's view of the data relationships they have with customers — all consented, all permissioned, all auditable. Every relationship is with a One, not a file.",
    render: () => (
      <Web title="business.hussh.ai/hdfc">
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ width: 210, background: OFF, borderRight: `0.5px solid ${HAIR}`, padding: "18px 0" }}>
            <div style={{ padding: "0 16px", fontSize: 10, color: DIM, letterSpacing: 1.5, fontWeight: 600, marginBottom: 12 }}>🤫 ONE · BUSINESS</div>
            {["Customers", "Data Requests", "Compliance", "Billing"].map((i, idx) => (
              <div key={idx} style={{
                padding: "7px 16px", fontSize: 12.5,
                color: idx === 1 ? INK : DIM,
                fontWeight: idx === 1 ? 600 : 400,
                borderLeft: `3px solid ${idx === 1 ? GOLD : "transparent"}`,
              }}>{i}</div>
            ))}
            <div style={{ padding: "14px 16px", marginTop: 16, fontSize: 10, color: DIM, letterSpacing: 1.2 }}>HDFC BANK · ADMIN</div>
          </div>
          <div style={{ flex: 1, padding: "20px 28px", overflow: "hidden" }}>
            <div style={{ fontSize: 10, color: DIM, letterSpacing: 1.5, fontWeight: 600 }}>DATA REQUESTS · LAST 24 HOURS</div>
            <div style={{ fontSize: 24, color: INK, fontWeight: 600, letterSpacing: -0.5, marginTop: 6 }}>
              142 asks. 127 granted. 15 pending<span style={{ color: GOLD }}>.</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
              {[
                { k: "Approval rate", v: "89%", s: "up from 84% last mo" },
                { k: "Avg. time to approve", v: "42s", s: "down from 3m" },
                { k: "Compliance exposure", v: "zero", s: "all asks consent-signed" },
              ].map((m, i) => (
                <div key={i} style={{ padding: 12, background: WHITE, border: `0.5px solid ${HAIR}`, borderRadius: 8 }}>
                  <div style={{ fontSize: 10.5, color: DIM, letterSpacing: 0.8 }}>{m.k}</div>
                  <div style={{ fontSize: 20, color: INK, fontWeight: 600, marginTop: 3, letterSpacing: -0.4 }}>{m.v}</div>
                  <div style={{ fontSize: 10.5, color: DIM, marginTop: 2 }}>{m.s}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, color: DIM, letterSpacing: 1.2, fontWeight: 600, marginTop: 22, marginBottom: 8 }}>PENDING REQUESTS</div>
            {[
              { c: "Priya Sharma · one #487,291", w: "Income history, 6 mo", s: "pending · 8 min" },
              { c: "Rahul Mehta · one #491,880", w: "Employment verification", s: "pending · 14 min" },
              { c: "Anjali Nair · one #488,402", w: "KYC refresh", s: "pending · 22 min" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < 2 ? `0.5px solid ${HAIR}` : "none", fontSize: 12.5, display: "flex", justifyContent: "space-between" }}>
                <div>
                  <div style={{ color: INK, fontWeight: 500 }}>{r.c}</div>
                  <div style={{ color: DIM, fontSize: 11, marginTop: 1 }}>{r.w}</div>
                </div>
                <div style={{ fontSize: 11, color: GOLD_DEEP, fontWeight: 500 }}>{r.s}</div>
              </div>
            ))}
          </div>
        </div>
      </Web>
    ),
    notes: [
      "Every customer is a One. HDFC never sees raw data — they see consent-mediated access.",
      "'Compliance exposure: zero' — the sales line that turns a privacy constraint into a commercial advantage.",
      "Approval rate, time to approve, compliance exposure — three metrics that replace 'data volume' as the KPIs of the new era.",
    ],
  },

  "b-request": {
    persona: "HDFC Bank",
    surface: "Web",
    flow: "02 · Making a Request",
    title: "Asking a One — the new handshake",
    caption: "An HDFC relationship manager drafts a data request to Priya's One. The form is conversational, not technical. The manager writes as if to a person — because the receiver is one.",
    render: () => (
      <Web title="business.hussh.ai/hdfc/request/new" height={520}>
        <div style={{ padding: "20px 36px", height: "100%" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 1.5, fontWeight: 600 }}>NEW REQUEST · TO PRIYA SHARMA · ONE #487,291</div>
          <div style={{ fontSize: 22, color: INK, fontWeight: 600, letterSpacing: -0.4, marginTop: 6 }}>Ask her One.</div>

          <div style={{ marginTop: 22 }}>
            <div style={{ fontSize: 10.5, color: DIM, letterSpacing: 1, fontWeight: 600, marginBottom: 6 }}>WHAT DO YOU NEED?</div>
            <div style={{
              padding: 10, background: OFF, borderRadius: 6, fontSize: 13, color: INK,
              border: `1px solid ${HAIR}`, minHeight: 60, lineHeight: 1.5,
            }}>
              Six months of income history and employment verification, for her home loan pre-approval.
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 10.5, color: DIM, letterSpacing: 1, fontWeight: 600, marginBottom: 6 }}>WHY DO YOU NEED IT?</div>
            <div style={{
              padding: 10, background: OFF, borderRadius: 6, fontSize: 13, color: INK,
              border: `1px solid ${HAIR}`, minHeight: 40, lineHeight: 1.5,
            }}>
              To issue a pre-approval within 48 hours. Priya applied yesterday.
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 16 }}>
            {[
              { l: "ACCESS TYPE", v: "Read-only" },
              { l: "DURATION", v: "72 hours" },
              { l: "FORWARDING", v: "Not allowed" },
            ].map((m, i) => (
              <div key={i} style={{ padding: 10, background: WHITE, border: `0.5px solid ${HAIR}`, borderRadius: 6 }}>
                <div style={{ fontSize: 9.5, color: DIM, letterSpacing: 0.8 }}>{m.l}</div>
                <div style={{ fontSize: 13, color: INK, fontWeight: 600, marginTop: 2 }}>{m.v}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 22 }}>
            <div style={{ padding: "9px 18px", background: WHITE, color: INK, borderRadius: 999, fontSize: 12, border: `1px solid ${HAIR}`, fontWeight: 500 }}>Save draft</div>
            <div style={{ padding: "9px 18px", background: BLACK, color: WHITE, borderRadius: 999, fontSize: 12, fontWeight: 600 }}>Ask her One</div>
          </div>
        </div>
      </Web>
    ),
    notes: [
      "The form has two free-text fields: What and Why. That's it. No data dictionary. No schema.",
      "The button is 'Ask her One' — not 'Submit request' or 'Query customer.'",
      "Access type, duration, forwarding — three constraints HDFC must set before asking. Default to least privilege.",
    ],
  },

  "b-settled": {
    persona: "HDFC Bank",
    surface: "Web",
    flow: "03 · Settlement",
    title: "The answer is a contract",
    caption: "Priya approves. HDFC receives read-only, time-limited access — cryptographically signed. The whole transaction is audit-logged on both sides.",
    render: () => (
      <Web title="business.hussh.ai/hdfc/request/8471" height={500}>
        <div style={{ padding: "20px 36px", height: "100%" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 1.5, fontWeight: 600 }}>REQUEST #8471 · GRANTED</div>
          <div style={{ fontSize: 22, color: INK, fontWeight: 600, letterSpacing: -0.4, marginTop: 6 }}>
            Priya said yes<span style={{ color: GOLD }}>.</span>
          </div>
          <div style={{ fontSize: 13, color: DIM, marginTop: 8, lineHeight: 1.5 }}>
            Approved at 3:18 PM. Access expires April 22, 3:18 PM.
          </div>

          <div style={{ marginTop: 22, padding: "14px 16px", background: OFF, borderRadius: 8, borderLeft: `2px solid ${GOLD}` }}>
            <div style={{ fontSize: 11, color: GOLD_DEEP, letterSpacing: 1.2, fontWeight: 600, marginBottom: 6 }}>PCHP CONTRACT · SIGNED</div>
            <div style={{ fontSize: 12, color: INK, lineHeight: 1.6, fontFamily: "ui-monospace, Menlo, monospace" }}>
              party.requester = HDFC Bank Ltd<br />
              party.subject = one #487,291<br />
              scope = income_6mo, employment_verification<br />
              access = read-only<br />
              expires = 2026-04-22T15:18:00+05:30<br />
              forwardable = false<br />
              signature = 0xA8F2...9C1D (Priya's One)
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <div style={{ flex: 1, padding: "12px 14px", background: WHITE, border: `0.5px solid ${HAIR}`, borderRadius: 8 }}>
              <div style={{ fontSize: 10.5, color: DIM, letterSpacing: 0.8, marginBottom: 4 }}>NEXT ACTION</div>
              <div style={{ fontSize: 12.5, color: INK, fontWeight: 500 }}>Issue pre-approval by April 21.</div>
            </div>
            <div style={{ flex: 1, padding: "12px 14px", background: WHITE, border: `0.5px solid ${HAIR}`, borderRadius: 8 }}>
              <div style={{ fontSize: 10.5, color: DIM, letterSpacing: 0.8, marginBottom: 4 }}>AUDIT TRAIL</div>
              <div style={{ fontSize: 12.5, color: INK, fontWeight: 500 }}>4 events logged. <span style={{ color: iOS_BLUE }}>View chain</span></div>
            </div>
          </div>
        </div>
      </Web>
    ),
    notes: [
      "'Priya said yes.' — three words that replace an entire screen of legal language.",
      "The PCHP contract is visible in plain text. HDFC can see what they signed, exactly as machines see it. Transparency both ways.",
      "'View chain' — the audit trail is blockchain-signed. This is the compliance moat no competitor has.",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // HANDOFF — One meets another One.
  // The new interaction pattern: agents negotiate, humans approve.
  // ────────────────────────────────────────────────────────────────

  "h-intent": {
    persona: "Handoff",
    surface: "iMessage",
    flow: "01 · The Intent",
    title: "A handoff begins with a sentence",
    caption: "Manish needs to schedule a call with Stephanie Breslow about the Cayman feeder. He doesn't need to specify times, durations, or logistics. He just says what he wants. His One hears the intent, and asks the one clarifying question it needs.",
    render: () => (
      <IPhone title="🤫 One">
        <div style={{ flex: 1, padding: "14px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble from="user">find 30 min with stephanie this week on the cayman feeder</iMsgBubble>
          <iMsgBubble>I can reach her One directly. One question before I do:</iMsgBubble>
          <iMsgBubble>Is this in-depth enough to need a doc review first, or just a quick align?</iMsgBubble>
          <iMsgBubble from="user">quick align</iMsgBubble>
          <iMsgBubble>Got it. Reaching out now.</iMsgBubble>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "No calendar picker. No duration dropdown. Intent first, details deferred.",
      "The one clarifying question asked is the one that actually changes the meeting — not 'what time'. Calendars can be solved by machines; meeting purpose cannot.",
      "'Reaching out now.' — the transition from human to handoff is three words. No loading state.",
    ],
  },

  "h-introduction": {
    persona: "Handoff",
    surface: "System",
    flow: "02 · The Introduction",
    title: "Two Ones introduce themselves",
    caption: "Invisible to both humans. This is the handshake — the first three messages passed between two Ones. Identity, purpose, permissions. Every future interaction references this exchange.",
    render: () => (
      <div style={{ width: 820, margin: "0 auto", background: BLACK, borderRadius: 10, padding: "32px 40px", color: WHITE, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: 9.5, color: DIM, letterSpacing: 2, fontWeight: 600, marginBottom: 10 }}>HANDOFF · THE INTRODUCTION · NOT VISIBLE TO USERS</div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5, lineHeight: 1.2 }}>
          How two Ones say hello<span style={{ color: GOLD }}>.</span>
        </div>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Manish's One speaks */}
          <div>
            <div style={{ fontSize: 10, color: GOLD, letterSpacing: 1.4, marginBottom: 8, fontWeight: 600 }}>→ MANISH'S ONE SPEAKS</div>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 14, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
              <div><span style={{ color: GOLD }}>from</span> = one #11,492 (Manish)</div>
              <div><span style={{ color: GOLD }}>to</span> = one #9,104 (Stephanie)</div>
              <div><span style={{ color: GOLD }}>purpose</span> = schedule 30m, quick align</div>
              <div><span style={{ color: GOLD }}>topic</span> = Cayman feeder formation</div>
              <div><span style={{ color: GOLD }}>relationship</span> = McDermott counsel</div>
              <div><span style={{ color: GOLD }}>signed</span> = 0x4f2e...9a71</div>
            </div>
          </div>
          {/* Stephanie's One responds */}
          <div>
            <div style={{ fontSize: 10, color: GOLD, letterSpacing: 1.4, marginBottom: 8, fontWeight: 600 }}>← STEPHANIE'S ONE RESPONDS</div>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 14, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11, lineHeight: 1.7, color: "rgba(255,255,255,0.9)" }}>
              <div><span style={{ color: GOLD }}>ack</span> = confirmed</div>
              <div><span style={{ color: GOLD }}>will_negotiate</span> = scheduling, prep</div>
              <div><span style={{ color: GOLD }}>will_not_share</span> = other clients, rates</div>
              <div><span style={{ color: GOLD }}>consent_state</span> = waiting on Stephanie</div>
              <div><span style={{ color: GOLD }}>signed</span> = 0x91c3...4e08</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22, padding: "12px 16px", background: "rgba(212,165,116,0.1)", borderRadius: 8, borderLeft: `2px solid ${GOLD}` }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.9)", lineHeight: 1.55 }}>
            Both Ones declare what they <b>will</b> and <b>will not</b> do before any negotiation begins. This is politeness at the machine layer — the equivalent of humans stating their role before a conversation.
          </div>
        </div>
      </div>
    ),
    notes: [
      "This screen is the category-defining interaction pattern. No other AI ecosystem has published one.",
      "'will_not_share' is the critical field. It's the machine equivalent of a confidentiality agreement, set before any information flows.",
      "Both Ones sign cryptographically. The introduction becomes a permanent record both parties can revisit.",
      "Neither human sees this exchange by default — it's infrastructure. But both can audit it if they want.",
    ],
  },

  "h-negotiation": {
    persona: "Handoff",
    surface: "System",
    flow: "03 · The Negotiation",
    title: "They work it out",
    caption: "Over about 11 seconds, the two Ones negotiate a meeting time, a pre-read, and a backup option. No humans involved. The negotiation log is visible to both users, but presented as a diff — what was agreed, not every message.",
    render: () => (
      <div style={{ width: 820, margin: "0 auto", background: WHITE, borderRadius: 10, padding: "28px 36px", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)" }}>
        <div style={{ fontSize: 9.5, color: DIM, letterSpacing: 2, fontWeight: 600 }}>HANDOFF · THE NEGOTIATION · 11 SECONDS</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: BLACK, letterSpacing: -0.6, marginTop: 6, lineHeight: 1.2 }}>
          What was agreed<span style={{ color: GOLD }}>.</span>
        </div>

        <div style={{ marginTop: 20 }}>
          {[
            { l: "Meeting", v: "Thursday, April 23 · 10:30 AM PT · 30 min", via: "Zoom (Stephanie's preferred)" },
            { l: "Topic", v: "Cayman feeder — quick align", via: "No pre-read required" },
            { l: "Backup", v: "Friday 2:00 PM PT if Thursday falls through", via: "Held on both calendars" },
            { l: "Confidentiality", v: "Standard attorney-client", via: "Stephanie's One won't share with firm intake" },
          ].map((r, i) => (
            <div key={i} style={{ padding: "12px 0", borderBottom: i < 3 ? `0.5px solid ${HAIR}` : "none", display: "flex", gap: 18 }}>
              <div style={{ width: 110, fontSize: 10, color: DIM, letterSpacing: 1.2, fontWeight: 600, paddingTop: 2 }}>{r.l.toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: INK, fontWeight: 500, letterSpacing: -0.2 }}>{r.v}</div>
                <div style={{ fontSize: 11.5, color: DIM, marginTop: 2 }}>{r.via}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 10, fontSize: 11, color: DIM }}>
          <div>14 messages exchanged</div>
          <div>·</div>
          <div>2 time alternatives considered</div>
          <div>·</div>
          <div style={{ color: iOS_BLUE }}>View full transcript</div>
        </div>
      </div>
    ),
    notes: [
      "The diff, not the transcript. Users see what was agreed, not every handshake that got there.",
      "'View full transcript' is available for power users and compliance, but almost no one will tap it. That's correct — humans shouldn't need to read machine conversations.",
      "The 'via' field on each row explains the reasoning. Not 'Thursday at 10:30 AM' but 'Thursday 10:30 AM PT (Stephanie's preferred time for legal work)'.",
      "Four fields is the right ceiling. More than four and we're surfacing noise. Fewer and we're hiding accountability.",
    ],
  },

  "h-approval": {
    persona: "Handoff",
    surface: "iMessage",
    flow: "04 · The Approval",
    title: "One tap to confirm",
    caption: "Manish's One returns to him with what was negotiated. He reviews, approves, and it's done. Stephanie receives the same approval flow on her side, independently.",
    render: () => (
      <IPhone title="🤫 One">
        <div style={{ flex: 1, padding: "12px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble>Done. Here's what we agreed with Stephanie's One:</iMsgBubble>
          <div style={{
            margin: "4px 14px", padding: "14px 14px", borderRadius: 14,
            background: iMSG_IN, fontSize: 13, lineHeight: 1.55,
          }}>
            <div style={{ fontSize: 10.5, color: GOLD_DEEP, letterSpacing: 1.3, fontWeight: 600, marginBottom: 8 }}>THURSDAY · 10:30 AM · 30 MIN</div>
            <div style={{ color: INK, fontWeight: 500, marginBottom: 4 }}>Cayman feeder · quick align</div>
            <div style={{ color: DIM, fontSize: 11.5, lineHeight: 1.55 }}>
              Zoom · no pre-read<br />
              Friday 2 PM held as backup
            </div>
          </div>
          <iMsgBubble>Want me to lock it in, or should I push back on anything?</iMsgBubble>
          <div style={{ margin: "4px 14px", display: "flex", gap: 6 }}>
            <div style={{ flex: 1, padding: "8px 0", background: iOS_BLUE, borderRadius: 16, textAlign: "center", fontSize: 12, fontWeight: 600, color: WHITE }}>Lock it in</div>
            <div style={{ flex: 1, padding: "8px 0", background: WHITE, borderRadius: 16, textAlign: "center", fontSize: 12, color: INK, border: `1px solid ${HAIR}` }}>Push back</div>
          </div>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "'Lock it in' and 'Push back' — not 'Approve' and 'Reject'. Human verbs, not form verbs.",
      "'Push back' leads to a conversation — 'What needs to change?' — not a cancellation. The handoff continues, refined.",
      "The approval card is the negotiation diff compressed into 3 lines. Manish doesn't need to see the full transcript to decide.",
    ],
  },

  "h-symmetry": {
    persona: "Handoff",
    surface: "iMessage",
    flow: "05 · The Symmetry",
    title: "Stephanie sees the same thing",
    caption: "Simultaneously, Stephanie's One shows her the same negotiation from her side. The handoff is only complete when both humans approve. Either can push back and the negotiation resumes.",
    render: () => (
      <IPhone title="🤫 One" sub="your One">
        <div style={{ flex: 1, padding: "12px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble>Manish's One reached out. Here's what we worked out:</iMsgBubble>
          <div style={{
            margin: "4px 14px", padding: "14px 14px", borderRadius: 14,
            background: iMSG_IN, fontSize: 13, lineHeight: 1.55,
          }}>
            <div style={{ fontSize: 10.5, color: GOLD_DEEP, letterSpacing: 1.3, fontWeight: 600, marginBottom: 8 }}>THURSDAY · 10:30 AM · 30 MIN</div>
            <div style={{ color: INK, fontWeight: 500, marginBottom: 4 }}>Cayman feeder alignment · Manish</div>
            <div style={{ color: DIM, fontSize: 11.5, lineHeight: 1.55 }}>
              Quick align, no pre-read needed<br />
              Standard attorney-client posture held
            </div>
          </div>
          <iMsgBubble>Manish has already approved. Want me to confirm?</iMsgBubble>
          <div style={{ margin: "4px 14px", display: "flex", gap: 6 }}>
            <div style={{ flex: 1, padding: "8px 0", background: iOS_BLUE, borderRadius: 16, textAlign: "center", fontSize: 12, fontWeight: 600, color: WHITE }}>Confirm</div>
            <div style={{ flex: 1, padding: "8px 0", background: WHITE, borderRadius: 16, textAlign: "center", fontSize: 12, color: INK, border: `1px solid ${HAIR}` }}>Push back</div>
          </div>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "Perfect symmetry. Both humans have identical approval rights. No one party's One can bind the other.",
      "'Manish has already approved' is the signal of progress — not pressure. Stephanie can still push back, and the handoff will reopen.",
      "The wording is slightly different on Stephanie's side because her One speaks in her register, not Manish's. Two Ones, two voices, one agreement.",
    ],
  },

  "h-settlement": {
    persona: "Handoff",
    surface: "Mac",
    flow: "06 · The Settlement",
    title: "The ledger entry",
    caption: "Both approved. The event is now on both calendars, the Zoom link is set, and a tamper-proof record of the handoff is logged. If anyone ever asks 'how did this meeting get scheduled?' — the answer is here, forever.",
    render: () => (
      <Mac title="🤫 One · Handoff Ledger" width={620} height={440}>
        <div style={{ padding: "22px 30px", height: "100%", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: 1.5, fontWeight: 600 }}>HANDOFF #1,482 · SETTLED</div>
          <div style={{ fontSize: 24, color: INK, fontWeight: 700, letterSpacing: -0.5, marginTop: 6, lineHeight: 1.2 }}>
            Thursday at 10:30<span style={{ color: GOLD }}>.</span>
          </div>

          <div style={{ marginTop: 20, flex: 1, fontSize: 11.5, fontFamily: "ui-monospace, Menlo, monospace", color: INK, background: OFF, borderRadius: 8, padding: 14, lineHeight: 1.8 }}>
            <div><span style={{ color: GOLD_DEEP }}>14:22:03</span> Manish's One → reached Stephanie's One</div>
            <div><span style={{ color: GOLD_DEEP }}>14:22:04</span> Introduction exchanged · both Ones signed</div>
            <div><span style={{ color: GOLD_DEEP }}>14:22:04</span> Negotiation opened · 14 msgs</div>
            <div><span style={{ color: GOLD_DEEP }}>14:22:15</span> Agreement reached</div>
            <div><span style={{ color: GOLD_DEEP }}>14:22:51</span> Manish approved</div>
            <div><span style={{ color: GOLD_DEEP }}>14:24:07</span> Stephanie approved</div>
            <div><span style={{ color: GOLD_DEEP }}>14:24:08</span> Event written to both calendars</div>
            <div><span style={{ color: GOLD_DEEP }}>14:24:08</span> Zoom link provisioned · McDermott enterprise</div>
            <div><span style={{ color: GOLD_DEEP }}>14:24:08</span> Ledger entry sealed · 0xC7E2...F418</div>
          </div>

          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", fontSize: 11, color: DIM }}>
            <div>Total handoff time: 2m 5s · Human time: 10s</div>
            <div style={{ color: iOS_BLUE }}>Export PDF receipt</div>
          </div>
        </div>
      </Mac>
    ),
    notes: [
      "'Human time: 10s' is the metric that matters. Total system time is 2 minutes; human attention cost is 10 seconds.",
      "The ledger is immutable. Cryptographically sealed. Both parties have identical copies. A dispute resolution layer built into the product.",
      "'Export PDF receipt' — because in the real world, handoffs sometimes need to become legal evidence.",
    ],
  },

  "h-pushback": {
    persona: "Handoff",
    surface: "iMessage",
    flow: "07 · When It Breaks",
    title: "When humans push back",
    caption: "Not every handoff settles on the first try. Manish sees the proposal, pushes back, and his One reopens negotiation — not a cancellation, but a continuation with new terms.",
    render: () => (
      <IPhone title="🤫 One">
        <div style={{ flex: 1, padding: "12px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble from="user">push back. thursday won't work. i'm flying</iMsgBubble>
          <iMsgBubble>Got it. Let me reopen.</iMsgBubble>
          <iMsgTimestamp>1 minute later</iMsgTimestamp>
          <iMsgBubble>Stephanie's One suggested Wednesday 4 PM PT or next Monday 9 AM PT.</iMsgBubble>
          <iMsgBubble>Wednesday keeps this week's momentum. Monday gives you weekend prep time.</iMsgBubble>
          <iMsgBubble>Your call.</iMsgBubble>
          <div style={{ margin: "4px 14px", display: "flex", gap: 6 }}>
            <div style={{ flex: 1, padding: "8px 0", background: iOS_BLUE, borderRadius: 16, textAlign: "center", fontSize: 11.5, fontWeight: 600, color: WHITE }}>Wed 4 PM</div>
            <div style={{ flex: 1, padding: "8px 0", background: WHITE, borderRadius: 16, textAlign: "center", fontSize: 11.5, color: INK, border: `1px solid ${HAIR}` }}>Mon 9 AM</div>
          </div>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "'Wednesday keeps this week's momentum. Monday gives you weekend prep time.' — One doesn't just surface options, it contextualizes tradeoffs.",
      "'Your call.' — two words that return agency to the human after a recommendation. This is the register we hold across every surface.",
      "Pushback is a feature, not a failure. Most handoffs will settle in one round. The ones that don't deserve graceful re-negotiation, not modal apology dialogs.",
    ],
  },

  "h-navya-school": {
    persona: "Handoff",
    surface: "iMessage",
    flow: "08 · A Different Handoff",
    title: "Navya's school asks for something",
    caption: "The handoff pattern scales beyond work. Georgetown's admissions office asks Navya's school counselor for her transcripts. The counselor's One reaches Navya's One. She decides — and her parents aren't in the loop unless she chooses to include them.",
    render: () => (
      <IPhone title="🤫 One" sub="your One">
        <div style={{ flex: 1, padding: "12px 0", display: "flex", flexDirection: "column" }}>
          <iMsgBubble>Navs — Ms. Chen's One just reached out.</iMsgBubble>
          <div style={{
            margin: "4px 14px", padding: "12px 14px", borderRadius: 14,
            background: iMSG_IN, fontSize: 12.5, lineHeight: 1.55, borderLeft: `3px solid ${GOLD}`,
          }}>
            <div style={{ fontSize: 10, color: GOLD_DEEP, letterSpacing: 1.3, fontWeight: 600, marginBottom: 6 }}>BELLEVUE HIGH · COUNSELOR</div>
            <div style={{ color: INK, marginBottom: 4, fontWeight: 500 }}>
              Georgetown asked for your transcripts. She wants to release them Friday.
            </div>
            <div style={{ color: DIM, fontSize: 11 }}>
              Read-only. Goes to admissions only. No forwarding.
            </div>
          </div>
          <iMsgBubble>Your move. Want me to say yes?</iMsgBubble>
          <div style={{ margin: "4px 14px", display: "flex", gap: 4, flexWrap: "wrap" }}>
            {["Yes, release", "Wait until Monday", "Let me read them first", "Ask my dad"].map((o, i) => (
              <div key={i} style={{
                padding: "7px 11px", background: WHITE, border: `1px solid ${HAIR}`, borderRadius: 16,
                fontSize: 11, color: INK, fontWeight: 500,
              }}>{o}</div>
            ))}
          </div>
        </div>
        <iMsgInput />
      </IPhone>
    ),
    notes: [
      "'Ask my dad' is an OPTION, not a requirement. Navya can loop him in if she wants — she can also not.",
      "'Let me read them first' is the option every teenager actually wants and no school UI currently offers. The handoff pattern gives it to her natively.",
      "The handoff pattern works identically across domains — schedule a meeting, release a transcript, share a medical record — because it's about consent and continuation, not about any one use case.",
    ],
  },

  "h-principles": {
    persona: "Handoff",
    surface: "Overview",
    flow: "09 · The Handoff Principles",
    title: "The six rules of a handoff",
    caption: "These are the invariants. Any interaction between two Ones — ours, or anyone else building on PCHP — must honor these. They are how Hussh defines politeness in the agent era.",
    render: () => (
      <div style={{
        width: 820, margin: "0 auto", padding: "40px 48px",
        background: WHITE, borderRadius: 10, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.12)",
      }}>
        <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, fontWeight: 600 }}>🤫 ONE · HANDOFF PRINCIPLES</div>
        <div style={{ fontSize: 32, color: INK, fontWeight: 700, letterSpacing: -1, marginTop: 8, lineHeight: 1.1 }}>
          How Ones meet Ones<span style={{ color: GOLD }}>.</span>
        </div>

        <div style={{ marginTop: 26 }}>
          {[
            { n: "01", t: "Intent before logistics.", b: "A handoff begins when a human states what they want, not when they fill a form. Ones resolve logistics, humans resolve intent." },
            { n: "02", t: "Introduction before negotiation.", b: "Both Ones declare identity, purpose, and what they will not share before any details flow. Politeness at the machine layer." },
            { n: "03", t: "Negotiation is machine work.", b: "Agents can exchange dozens of messages in seconds. Humans should never be asked to read that conversation unless they want to." },
            { n: "04", t: "Symmetric approval.", b: "No handoff settles without both humans approving. Neither One has unilateral authority over a shared outcome." },
            { n: "05", t: "Pushback is a continuation, not a failure.", b: "If a human rejects the agreed-upon outcome, the handoff reopens. Cancellation is a choice, not a default." },
            { n: "06", t: "Every handoff is a sealed record.", b: "Cryptographically signed, time-stamped, exportable. Any dispute has a ground truth. Any audit has a trail. Forever." },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 18, padding: "14px 0", borderBottom: i < 5 ? `0.5px solid ${HAIR}` : "none" }}>
              <div style={{ fontSize: 18, color: GOLD, fontWeight: 700, width: 30 }}>{r.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: INK, fontWeight: 600, letterSpacing: -0.2 }}>{r.t}</div>
                <div style={{ fontSize: 12.5, color: DIM, marginTop: 3, lineHeight: 1.5 }}>{r.b}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 26, padding: "14px 16px", background: OFF, borderRadius: 8, borderLeft: `2px solid ${GOLD}` }}>
          <div style={{ fontSize: 12.5, color: INK, lineHeight: 1.55 }}>
            These principles are open. Any other AI product that builds on PCHP inherits them. This is how Hussh sets the category norm — not by owning the protocol, but by naming what good behavior looks like.
          </div>
        </div>
      </div>
    ),
    notes: [
      "This page is the category-definition artifact. It's what we publish as an RFC. It's what becomes part of Hussh's brand primer v2.",
      "The six rules are invariants — minimum bar for any handoff to be called 'polite'. Violators are noisy agents.",
      "The closing paragraph is the positioning move: we open the principles. We don't own them. That's how the category spreads beyond us.",
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // THE PRINCIPLES — a closing overview
  // ────────────────────────────────────────────────────────────────

  "p-principles": {
    persona: "All",
    surface: "Overview",
    flow: "09 · The Eight Rules",
    title: "The eight listening-first rules",
    caption: "Every screen in this artifact was built to honor these eight rules. If a future designer, engineer, or agency asks 'why was it built this way,' this page is the answer.",
    render: () => (
      <div style={{
        width: 820, margin: "0 auto", padding: "40px 48px",
        background: WHITE, borderRadius: 10, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.12)",
      }}>
        <div style={{ fontSize: 10, color: DIM, letterSpacing: 2, fontWeight: 600 }}>🤫 ONE · DESIGN PRINCIPLES</div>
        <div style={{ fontSize: 32, color: INK, fontWeight: 700, letterSpacing: -1, marginTop: 8, lineHeight: 1.1 }}>
          How we listen<span style={{ color: GOLD }}>.</span>
        </div>

        <div style={{ marginTop: 26 }}>
          {[
            { n: "01", t: "The One listens before it speaks.", b: "Absorb first — calendar, messages, contacts, photos — then present what you learned and ask to be corrected. Not taught." },
            { n: "02", t: "Questions only when earned, always with a reason.", b: "If you ask, say why. A real friend's questions always include context." },
            { n: "03", t: "Ambient, not modal.", b: "Live in the menu bar, the watch face, the voice — not the screen. Never interrupt unless safety demands it." },
            { n: "04", t: "Correction over configuration.", b: "No settings page where users 'train their One.' Every belief is visible on the surface it affects. One tap to correct." },
            { n: "05", t: "Human endings, not robot acknowledgements.", b: "'Done.' 'Sent.' 'Rest well.' Never 'Your task has been completed successfully.'" },
            { n: "06", t: "Continuity is the feature.", b: "The same conversation appears seamlessly on every device. Memory is not a feature list — it's the substrate." },
            { n: "07", t: "Silent hands.", b: "Do the work before it's asked. The user sees the result, not the labor. The best assistant is invisible." },
            { n: "08", t: "Permission is a conversation, not a consent form.", b: "When anyone asks for your data, your One asks you the way a person would." },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 18, padding: "14px 0", borderBottom: i < 7 ? `0.5px solid ${HAIR}` : "none" }}>
              <div style={{ fontSize: 18, color: GOLD, fontWeight: 700, width: 30 }}>{r.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: INK, fontWeight: 600, letterSpacing: -0.2 }}>{r.t}</div>
                <div style={{ fontSize: 12.5, color: DIM, marginTop: 3, lineHeight: 1.5 }}>{r.b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    notes: [
      "This page is the PRD for every future screen. It's the document that makes the next 100 screens possible to design.",
      "The restraint on this page — sparse gold, numbered items, generous whitespace — is itself an argument for what the product should feel like.",
    ],
  },

};

// ═══════════════════════════════════════════════════════════════════
// FLOW STRUCTURE — how screens are grouped
// ═══════════════════════════════════════════════════════════════════

const PERSONAS = [
  {
    id: "manish",
    name: "Manish",
    sub: "Founder · power user",
    color: BLACK,
    flows: [
      { label: "01 · Arrival", screens: ["m-install", "m-permissions"] },
      { label: "02 · Understanding", screens: ["m-listening", "m-correction"] },
      { label: "03 · Every Surface", screens: ["m-menubar-ambient", "m-watch-glance", "m-carplay"] },
      { label: "04 · Work Surfaces", screens: ["m-ibrokerage"] },
      { label: "05 · The Weekly Review", screens: ["m-weekly"] },
      { label: "06 · Protection", screens: ["m-bark"] },
      { label: "07 · Silent Hands", screens: ["m-silence"] },
      { label: "08 · Ending a Day", screens: ["m-goodnight"] },
    ],
  },
  {
    id: "navya",
    name: "Navya",
    sub: "Teenager · growing up with a One",
    color: BLACK,
    flows: [
      { label: "01 · Arrival", screens: ["n-gift", "n-first"] },
      { label: "02 · Listening", screens: ["n-shared-school"] },
      { label: "03 · Every Surface", screens: ["n-watch-nudge"] },
      { label: "04 · Safety", screens: ["n-safety"] },
      { label: "05 · Permission", screens: ["n-parent-bark"] },
      { label: "06 · Her Memory", screens: ["n-memory"] },
    ],
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    sub: "Business partner · B2B2C",
    color: BLACK,
    flows: [
      { label: "01 · The Business Portal", screens: ["b-portal-home"] },
      { label: "02 · Making a Request", screens: ["b-request"] },
      { label: "03 · Settlement", screens: ["b-settled"] },
    ],
  },
  {
    id: "handoff",
    name: "Handoff",
    sub: "One meets another One",
    color: GOLD,
    flows: [
      { label: "01 · The Intent", screens: ["h-intent"] },
      { label: "02 · The Introduction", screens: ["h-introduction"] },
      { label: "03 · The Negotiation", screens: ["h-negotiation"] },
      { label: "04 · The Approval", screens: ["h-approval"] },
      { label: "05 · The Symmetry", screens: ["h-symmetry"] },
      { label: "06 · The Settlement", screens: ["h-settlement"] },
      { label: "07 · When It Breaks", screens: ["h-pushback"] },
      { label: "08 · A Different Handoff", screens: ["h-navya-school"] },
      { label: "09 · The Principles", screens: ["h-principles"] },
    ],
  },
  {
    id: "all",
    name: "System",
    sub: "Principles · overview",
    color: GOLD,
    flows: [
      { label: "09 · The Eight Rules", screens: ["p-principles"] },
    ],
  },
];

const ALL_SCREENS = PERSONAS.flatMap(p => p.flows.flatMap(f => f.screens));

// ═══════════════════════════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════════════════════════

export default function App() {
  const [currentId, setCurrentId] = useState("m-install");
  const [showNotes, setShowNotes] = useState(true);
  const current = SCREENS[currentId];
  const currentIndex = ALL_SCREENS.indexOf(currentId);

  const next = () => setCurrentId(ALL_SCREENS[Math.min(currentIndex + 1, ALL_SCREENS.length - 1)]);
  const prev = () => setCurrentId(ALL_SCREENS[Math.max(currentIndex - 1, 0)]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex]);

  if (!current) return null;

  return (
    <div style={{
      display: "flex", width: "100%", height: "100vh",
      background: OFF, fontFamily: FONT, color: INK, overflow: "hidden",
    }}>
      {/* LEFT RAIL ═══════════════════════════════════════════ */}
      <div style={{
        width: 300, background: WHITE, borderRight: `1px solid ${HAIR}`,
        display: "flex", flexDirection: "column", flexShrink: 0,
      }}>
        <div style={{ padding: "22px 22px 16px", borderBottom: `1px solid ${HAIR}` }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: DIM, fontWeight: 600 }}>🤫 ONE · UX SYSTEM</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.8, marginTop: 6, color: BLACK }}>
            How we listen<span style={{ color: GOLD }}>.</span>
          </div>
          <div style={{ fontSize: 10.5, color: DIM, marginTop: 4, lineHeight: 1.45 }}>
            Three personas · seven surfaces · one design system. {ALL_SCREENS.length} screens.
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "4px 0 20px" }}>
          {PERSONAS.map((p) => (
            <div key={p.id}>
              <div style={{
                padding: "16px 22px 4px", fontSize: 9.5, letterSpacing: 1.6,
                color: p.color, fontWeight: 700, display: "flex", alignItems: "baseline", gap: 8,
              }}>
                <span style={{ color: p.color === GOLD ? GOLD : BLACK }}>{p.name.toUpperCase()}</span>
                <span style={{ fontSize: 9, color: DIM, fontWeight: 500, letterSpacing: 0.8 }}>· {p.sub}</span>
              </div>
              {p.flows.map((flow) => (
                <div key={flow.label}>
                  <div style={{
                    padding: "10px 22px 3px", fontSize: 9, letterSpacing: 1.3,
                    color: DIM, fontWeight: 600,
                  }}>{flow.label.toUpperCase()}</div>
                  {flow.screens.map((sid) => {
                    const s = SCREENS[sid];
                    const active = sid === currentId;
                    return (
                      <div key={sid} onClick={() => setCurrentId(sid)} style={{
                        padding: "5px 22px",
                        cursor: "pointer",
                        borderLeft: `3px solid ${active ? GOLD : "transparent"}`,
                        background: active ? OFF : "transparent",
                        fontSize: 12, color: active ? BLACK : INK,
                        fontWeight: active ? 600 : 400, lineHeight: 1.35,
                      }}>{s?.title || sid}</div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ padding: 14, borderTop: `1px solid ${HAIR}`, display: "flex", gap: 8 }}>
          <button onClick={() => setShowNotes(!showNotes)} style={{
            flex: 1, background: WHITE, color: INK, border: `1px solid ${INK}`,
            padding: "8px 0", borderRadius: 999, fontSize: 11, fontWeight: 600,
            cursor: "pointer", fontFamily: FONT,
          }}>{showNotes ? "Hide designer's notes" : "Show designer's notes"}</button>
        </div>
      </div>

      {/* MAIN CANVAS ═══════════════════════════════════════════ */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "36px 48px 60px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 9.5, letterSpacing: 2, color: DIM, fontWeight: 600 }}>
            {current.persona.toUpperCase()} · {current.surface.toUpperCase()} · {current.flow.toUpperCase()} · {currentIndex + 1} / {ALL_SCREENS.length}
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1.1, color: BLACK, marginTop: 8, lineHeight: 1.1 }}>
            {current.title}
          </div>
          <div style={{ fontSize: 14.5, color: INK, marginTop: 12, maxWidth: 700, lineHeight: 1.55 }}>
            {current.caption}
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: showNotes ? "minmax(380px, auto) 1fr" : "1fr",
            gap: 48, marginTop: 30, alignItems: "start",
          }}>
            <div style={{ justifySelf: "center" }}>{current.render()}</div>
            {showNotes && (
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontSize: 9.5, letterSpacing: 2, color: DIM, fontWeight: 600, marginBottom: 14 }}>DESIGNER'S NOTES</div>
                {current.notes.map((n, i) => (
                  <div key={i} style={{
                    padding: "10px 0", borderTop: i > 0 ? `1px solid ${HAIR}` : "none",
                    fontSize: 13, color: INK, lineHeight: 1.55, display: "flex", gap: 12,
                  }}>
                    <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 44, display: "flex", justifyContent: "space-between", borderTop: `1px solid ${HAIR}`, paddingTop: 18 }}>
            <button onClick={prev} disabled={currentIndex === 0} style={{
              background: "transparent", border: "none",
              color: currentIndex === 0 ? DIM : INK,
              fontSize: 13, cursor: currentIndex === 0 ? "default" : "pointer",
              padding: 0, fontFamily: FONT,
            }}>← Previous</button>
            <button onClick={next} disabled={currentIndex === ALL_SCREENS.length - 1} style={{
              background: "transparent", border: "none",
              color: currentIndex === ALL_SCREENS.length - 1 ? DIM : INK,
              fontSize: 13, cursor: currentIndex === ALL_SCREENS.length - 1 ? "default" : "pointer",
              padding: 0, fontFamily: FONT,
            }}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
