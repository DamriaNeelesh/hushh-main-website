"use client";

import { useState, useEffect, useRef } from "react";

const INSIGHTS = [
  { emoji: "🌍", text: "You've connected 23 apps to your vault this year" },
  { emoji: "💰", text: "You have 4 subscriptions you haven't used in 90+ days" },
  { emoji: "📧", text: "347 companies have your email address on file" },
  { emoji: "🛫", text: "You've visited 6 cities in the last 12 months" },
  { emoji: "🛒", text: "Your top spending category this quarter: dining out" },
  { emoji: "📱", text: "12 apps accessed your location data this week" },
  { emoji: "🎂", text: "3 warranty expirations coming up in the next 30 days" },
  { emoji: "🔐", text: "Your data footprint spans 41 services — all under your control" },
];

const HushhHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [kaiMode, setKaiMode] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [identityStep, setIdentityStep] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoverButton, setHoverButton] = useState(null);
  const [husshInsight, setHusshInsight] = useState(null);
  const [insightAnimating, setInsightAnimating] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const triggerHusshInsight = () => {
    setInsightAnimating(false);
    const randomInsight = INSIGHTS[Math.floor(Math.random() * INSIGHTS.length)];
    setTimeout(() => {
      setHusshInsight(randomInsight);
      setInsightAnimating(true);
    }, 50);
    setTimeout(() => {
      setInsightAnimating(false);
      setTimeout(() => setHusshInsight(null), 4500);
    }, 4000);
  };

  const kaiSuggestions = [
    { icon: "✦", text: "What subscriptions am I paying for right now?", tag: "Find" },
    { icon: "✦", text: "Prepare my data for my tax advisor", tag: "Do" },
    { icon: "✦", text: "What patterns do you see in my spending?", tag: "Insight" },
    { icon: "✦", text: "Renegotiate my cable bill using my usage data", tag: "Act" },
    { icon: "✦", text: "Which apps accessed my location this week?", tag: "Privacy" },
  ];

  const searchSuggestions = [
    { icon: "↗", text: "Recent purchases across all stores", tag: "Shopping" },
    { icon: "↗", text: "Warranty emails for my electronics", tag: "Documents" },
    { icon: "↗", text: "Travel history last 12 months", tag: "Location" },
    { icon: "↗", text: "Active recurring payments", tag: "Financial" },
    { icon: "↗", text: "Health records and prescriptions", tag: "Health" },
  ];

  const activeSuggestions = kaiMode ? kaiSuggestions : searchSuggestions;

  const breatheKeyframes = `
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.04); opacity: 0.92; }
    }
  `;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FBFBFD",
      fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{breatheKeyframes}</style>

      {/* Ambient glow */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: kaiMode
          ? "radial-gradient(ellipse at 50% 32%, rgba(0,113,227,0.035) 0%, transparent 55%)"
          : "transparent",
        transition: "background 0.8s ease",
        pointerEvents: "none",
      }} />

      {/* Top Navigation */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-8px)",
        transition: "all 0.5s ease 0.15s",
        position: "relative",
        zIndex: 5,
      }}>
        <span style={{
          fontSize: "15px",
          fontWeight: 500,
          color: "#86868B",
          letterSpacing: "0.02em",
          userSelect: "none",
          opacity: 0.5,
        }}>hussh</span>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {["Platform", "Privacy", "Developers"].map((label) => (
            <a key={label} href="#" style={{
              fontSize: "13px",
              color: label === "Platform" ? "#1D1D1F" : "#6E6E73",
              textDecoration: "none",
              fontWeight: label === "Platform" ? 500 : 400,
              letterSpacing: "-0.01em",
            }}>{label}</a>
          ))}
          {!isSignedIn ? (
            <button
              onClick={() => setIdentityStep("phone")}
              style={{
                fontSize: "13px", color: "#FBFBFD",
                background: "#0071E3", border: "none",
                borderRadius: "980px", padding: "6px 16px",
                cursor: "pointer", fontWeight: 500,
                letterSpacing: "-0.01em", transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => e.target.style.background = "#0077ED"}
              onMouseLeave={(e) => e.target.style.background = "#0071E3"}
            >Sign In</button>
          ) : (
            <div style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "linear-gradient(135deg, #0071E3, #00C7BE)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "14px", fontWeight: 600, cursor: "pointer",
            }}>M</div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        paddingBottom: "11vh", paddingLeft: "20px", paddingRight: "20px",
      }}>

        {/* Brand mark */}
        <div style={{
          marginBottom: "28px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          textAlign: "center",
          userSelect: "none",
          cursor: "default",
        }}>
          <span style={{
            fontSize: "92px",
            lineHeight: 1,
            display: "block",
            animation: "breathe 4s ease-in-out infinite",
          }}>🤫</span>
        </div>

        {/* Category anchor */}
        <p style={{
          fontSize: "13px",
          color: "#86868B",
          fontWeight: 400,
          letterSpacing: "-0.005em",
          marginBottom: "24px",
          opacity: mounted ? 0.7 : 0,
          transition: "opacity 0.7s ease 0.3s",
          textAlign: "center",
        }}>your personal intelligence agent</p>

        {/* Insight Toast */}
        {husshInsight && (
          <div style={{
            position: "fixed", top: "72px", left: "50%",
            transform: `translateX(-50%) translateY(${insightAnimating ? "0" : "-20px"})`,
            opacity: insightAnimating ? 1 : 0,
            background: "#FFFFFF", border: "1px solid #E8E8ED",
            borderRadius: "16px", padding: "14px 22px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            display: "flex", alignItems: "center", gap: "12px",
            zIndex: 50, transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            maxWidth: "90vw",
          }}>
            <span style={{ fontSize: "26px" }}>{husshInsight.emoji}</span>
            <div>
              <p style={{
                fontSize: "11px", fontWeight: 600, color: "#0071E3",
                letterSpacing: "0.04em", marginBottom: "2px",
                textTransform: "uppercase",
              }}>I'm Feeling Hussh 🤫</p>
              <p style={{
                fontSize: "15px", fontWeight: 500, color: "#1D1D1F",
                letterSpacing: "-0.01em",
              }}>{husshInsight.text}</p>
            </div>
          </div>
        )}

        {/* Search / Agent Bar */}
        <div style={{
          width: "100%", maxWidth: "580px", position: "relative",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(14px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}>
          <div style={{
            display: "flex", alignItems: "center",
            background: "#FFFFFF",
            border: isFocused ? "1px solid #0071E3" : "1px solid #D2D2D7",
            borderRadius: showSuggestions && searchQuery === "" ? "24px 24px 0 0" : "24px",
            padding: "12px 18px",
            boxShadow: isFocused
              ? "0 2px 12px rgba(0,113,227,0.08), 0 0 0 4px rgba(0,113,227,0.06)"
              : "0 1px 6px rgba(0,0,0,0.04)",
            transition: "all 0.3s ease", gap: "10px",
          }}>
            {kaiMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.45 }}>
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                  fill="none" stroke="#0071E3" strokeWidth="1.8"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, opacity: 0.35 }}>
                <circle cx="11" cy="11" r="7" stroke="#1D1D1F" strokeWidth="2"/>
                <path d="M16 16L21 21" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}

            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { setIsFocused(true); setShowSuggestions(true); }}
              onBlur={() => { setIsFocused(false); setTimeout(() => setShowSuggestions(false), 200); }}
              placeholder={kaiMode ? "Ask Kai anything..." : "Search your data..."}
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: "16px", color: "#1D1D1F",
                background: "transparent", fontFamily: "inherit",
                letterSpacing: "-0.01em", fontWeight: 400,
              }}
            />

            {/* Voice */}
            <button style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "4px", display: "flex", alignItems: "center",
              opacity: 0.3, transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 0.65}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0.3}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="12" rx="3" stroke="#1D1D1F" strokeWidth="2"/>
                <path d="M5 11a7 7 0 0014 0" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 18v4" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div style={{ width: "1px", height: "22px", background: "#E8E8ED" }} />

            {/* Mode toggle */}
            <button
              onClick={() => setKaiMode(!kaiMode)}
              title={kaiMode ? "Switch to plain search" : "Switch to Kai agent"}
              style={{
                display: "flex", alignItems: "center", gap: "5px",
                background: kaiMode
                  ? "linear-gradient(135deg, #0071E3, #00A1D6)"
                  : "transparent",
                border: kaiMode ? "none" : "1.5px solid #D2D2D7",
                borderRadius: "980px",
                padding: kaiMode ? "5px 12px" : "4px 11px",
                cursor: "pointer", transition: "all 0.3s ease", flexShrink: 0,
              }}
            >
              {kaiMode ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                    fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1.5"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="6" stroke="#86868B" strokeWidth="2"/>
                  <path d="M15.5 15.5L19 19" stroke="#86868B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
              <span style={{
                fontSize: "12px", fontWeight: 500,
                color: kaiMode ? "#FFFFFF" : "#86868B",
                letterSpacing: "-0.01em",
              }}>{kaiMode ? "Kai" : "Search"}</span>
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && searchQuery === "" && (
            <div style={{
              position: "absolute", top: "100%", left: 0, right: 0,
              background: "#FFFFFF", border: "1px solid #D2D2D7",
              borderTop: "1px solid #F5F5F7", borderRadius: "0 0 24px 24px",
              padding: "6px 0 8px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", zIndex: 10,
            }}>
              <div style={{
                padding: "8px 20px 6px", fontSize: "11px", fontWeight: 600,
                color: "#86868B", textTransform: "uppercase", letterSpacing: "0.05em",
              }}>
                {kaiMode ? "Ask or tell Kai" : "Search your data"}
              </div>
              {activeSuggestions.map((s, i) => (
                <button
                  key={i}
                  onMouseDown={() => setSearchQuery(s.text)}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    width: "100%", padding: "9px 20px",
                    background: "transparent", border: "none", cursor: "pointer",
                    textAlign: "left", fontSize: "14px", color: "#1D1D1F",
                    fontFamily: "inherit", transition: "background 0.15s",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#F5F5F7"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{
                    fontSize: "12px",
                    color: kaiMode ? "#0071E3" : "#86868B",
                    fontWeight: 600,
                    width: "16px",
                    textAlign: "center",
                    flexShrink: 0,
                  }}>{s.icon}</span>
                  <span style={{ flex: 1 }}>{s.text}</span>
                  <span style={{
                    fontSize: "10px",
                    color: kaiMode ? "#0071E3" : "#86868B",
                    fontWeight: 600,
                    background: kaiMode ? "rgba(0,113,227,0.06)" : "#F5F5F7",
                    padding: "2px 7px", borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}>{s.tag}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "flex", gap: "12px", marginTop: "24px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(14px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
        }}>
          <button
            onMouseEnter={() => setHoverButton("ask")}
            onMouseLeave={() => setHoverButton(null)}
            onClick={() => inputRef.current?.focus()}
            style={{
              fontSize: "14px", fontWeight: 400, color: "#1D1D1F",
              background: hoverButton === "ask" ? "#E8E8ED" : "#F5F5F7",
              border: "1px solid transparent", borderRadius: "8px",
              padding: "9px 18px", cursor: "pointer",
              fontFamily: "inherit", letterSpacing: "-0.01em",
              transition: "all 0.2s ease",
            }}
          >Ask Kai</button>
          <button
            onClick={triggerHusshInsight}
            onMouseEnter={() => setHoverButton("hussh")}
            onMouseLeave={() => setHoverButton(null)}
            style={{
              fontSize: "14px", fontWeight: 400, color: "#1D1D1F",
              background: hoverButton === "hussh" ? "#E8E8ED" : "#F5F5F7",
              border: "1px solid transparent", borderRadius: "8px",
              padding: "9px 18px", cursor: "pointer",
              fontFamily: "inherit", letterSpacing: "-0.01em",
              transition: "all 0.2s ease",
            }}
          >I'm Feeling Hussh 🤫</button>
        </div>

        {/* Identity anchor */}
        <p style={{
          marginTop: "24px", fontSize: "13px", color: "#86868B",
          textAlign: "center", lineHeight: 1.6,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.7s ease 0.5s",
          letterSpacing: "-0.01em",
          maxWidth: "400px",
        }}>
          Anchored to <strong style={{ color: "#1D1D1F", fontWeight: 500 }}>you</strong> — your phone number, email, and legal name.
          <br />
          <span style={{ fontSize: "12px", opacity: 0.8 }}>
            Nothing leaves your device without your say-so.
          </span>
        </p>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #E8E8ED", background: "#F5F5F7" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 24px", flexWrap: "wrap", gap: "8px",
        }}>
          <span style={{ fontSize: "12px", color: "#86868B" }}>Everett, Washington</span>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {["Privacy", "Terms", "Platform", "Developers"].map((item) => (
              <a key={item} href="#" style={{
                fontSize: "12px", color: "#86868B",
                textDecoration: "none", letterSpacing: "-0.01em",
              }}>{item}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Sign-In Modal */}
      {identityStep && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 100, padding: "20px",
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setIdentityStep(null); }}
        >
          <div style={{
            background: "#FFFFFF", borderRadius: "20px",
            padding: "40px", maxWidth: "400px", width: "100%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <span style={{ fontSize: "36px" }}>🤫</span>
              <h2 style={{
                fontSize: "22px", fontWeight: 600, color: "#1D1D1F",
                marginTop: "12px", letterSpacing: "-0.02em",
              }}>
                {identityStep === "phone" && "Your Phone Number"}
                {identityStep === "email" && "Your Email Address"}
                {identityStep === "name" && "Your Legal Name"}
              </h2>
              <p style={{
                fontSize: "14px", color: "#86868B", marginTop: "6px",
                letterSpacing: "-0.01em", lineHeight: 1.5,
              }}>
                {identityStep === "phone" && "Your phone number is your identity anchor."}
                {identityStep === "email" && "We'll verify this to connect your data."}
                {identityStep === "name" && "Your legal name secures your identity."}
              </p>
            </div>

            {/* Step dots */}
            <div style={{
              display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px",
            }}>
              {["phone", "email", "name"].map((step, i) => (
                <div key={step} style={{
                  width: step === identityStep ? "24px" : "8px",
                  height: "8px", borderRadius: "4px",
                  background: step === identityStep ? "#0071E3"
                    : ["phone", "email", "name"].indexOf(identityStep) > i ? "#00C7BE" : "#D2D2D7",
                  transition: "all 0.3s ease",
                }} />
              ))}
            </div>

            <input
              type={identityStep === "phone" ? "tel" : identityStep === "email" ? "email" : "text"}
              placeholder={
                identityStep === "phone" ? "+1 (425) 555-0123"
                : identityStep === "email" ? "you@example.com"
                : "First and Last Name"
              }
              autoFocus
              style={{
                width: "100%", padding: "14px 18px", fontSize: "16px",
                border: "1.5px solid #D2D2D7", borderRadius: "12px",
                outline: "none", fontFamily: "inherit", color: "#1D1D1F",
                boxSizing: "border-box", transition: "border-color 0.2s",
                letterSpacing: "-0.01em",
              }}
              onFocus={(e) => e.target.style.borderColor = "#0071E3"}
              onBlur={(e) => e.target.style.borderColor = "#D2D2D7"}
            />

            <button
              onClick={() => {
                if (identityStep === "phone") setIdentityStep("email");
                else if (identityStep === "email") setIdentityStep("name");
                else { setIdentityStep(null); setIsSignedIn(true); }
              }}
              style={{
                width: "100%", padding: "14px", fontSize: "16px",
                fontWeight: 500, color: "#FFFFFF", background: "#0071E3",
                border: "none", borderRadius: "12px", cursor: "pointer",
                marginTop: "16px", fontFamily: "inherit",
                letterSpacing: "-0.01em", transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.background = "#0077ED"}
              onMouseLeave={(e) => e.target.style.background = "#0071E3"}
            >
              {identityStep === "name" ? "Meet Kai" : "Continue"}
            </button>

            <p style={{
              fontSize: "11px", color: "#86868B",
              textAlign: "center", marginTop: "16px", lineHeight: 1.5,
            }}>
              🔒 End-to-end encrypted. Verified locally via Secure Enclave.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HushhHomepage;
