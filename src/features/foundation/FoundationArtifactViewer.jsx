"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BLACK = "#000000";
const INK = "#1D1D1F";
const WHITE = "#FFFFFF";
const OFF = "#F5F5F7";
const HAIR = "#E5E5EA";
const DIM = "#86868B";
const GOLD = "#D4A574";
const GOLD_DEEP = "#B8894D";
const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif';

export default function FoundationArtifactViewer({
  title,
  eyebrow,
  description,
  sourceHref,
  sourceLabel = "Open Raw JSX Source",
  baseWidth = 1500,
  baseHeight = 980,
  children,
}) {
  const [viewport, setViewport] = useState({ width: baseWidth, height: baseHeight });

  useEffect(() => {
    const syncViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  const availableWidth = Math.max(viewport.width - 40, 320);
  const availableHeight = Math.max(viewport.height - 240, 420);
  const scale = Math.min(availableWidth / baseWidth, availableHeight / baseHeight, 1);
  const frameWidth = Math.max(Math.round(baseWidth * scale), 280);
  const frameHeight = Math.max(Math.round(baseHeight * scale), 260);
  const isDesktopImmersive = viewport.width >= 1180 && viewport.height >= 760;

  if (isDesktopImmersive) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: OFF,
          color: INK,
          fontFamily: FONT,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ minHeight: "100dvh" }}>{children}</div>

        <div
          style={{
            position: "fixed",
            top: 18,
            left: 18,
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              gap: 4,
              padding: "10px 12px",
              borderRadius: 18,
              border: `1px solid rgba(255, 255, 255, 0.4)`,
              background: "rgba(255, 255, 255, 0.84)",
              backdropFilter: "blur(18px)",
              boxShadow: "0 20px 40px -28px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div style={{ fontSize: 10, letterSpacing: 1.8, color: DIM, fontWeight: 700 }}>
              {eyebrow}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: -0.4, color: BLACK }}>
              {title}
              <span style={{ color: GOLD }}>.</span>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "fixed",
            top: 18,
            right: 18,
            zIndex: 40,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            gap: 10,
            maxWidth: "calc(100vw - 36px)",
          }}
        >
          <Link
            href="/foundation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 42,
              padding: "0 14px",
              borderRadius: 999,
              border: `1px solid rgba(255, 255, 255, 0.45)`,
              color: INK,
              background: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(18px)",
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 600,
              boxShadow: "0 20px 40px -28px rgba(0, 0, 0, 0.3)",
            }}
          >
            ← Back to Foundation
          </Link>
          <a
            href={sourceHref}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 42,
              padding: "0 14px",
              borderRadius: 999,
              border: `1px solid rgba(212, 165, 116, 0.7)`,
              color: GOLD_DEEP,
              background: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(18px)",
              textDecoration: "none",
              fontSize: 12,
              fontWeight: 600,
              boxShadow: "0 20px 40px -28px rgba(0, 0, 0, 0.3)",
            }}
          >
            {sourceLabel} →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: OFF,
        color: INK,
        fontFamily: FONT,
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderBottom: `1px solid ${HAIR}`,
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(18px)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "14px 16px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 10, letterSpacing: 1.8, color: DIM, fontWeight: 700 }}>
              {eyebrow}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: BLACK, marginTop: 4 }}>
              {title}
              <span style={{ color: GOLD }}>.</span>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
            <Link
              href="/foundation"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 40,
                padding: "0 14px",
                borderRadius: 999,
                border: `1px solid ${HAIR}`,
                color: INK,
                background: WHITE,
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              ← Back to Foundation
            </Link>
            <a
              href={sourceHref}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 40,
                padding: "0 14px",
                borderRadius: 999,
                border: `1px solid ${GOLD}`,
                color: GOLD_DEEP,
                background: WHITE,
                textDecoration: "none",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              {sourceLabel} →
            </a>
          </div>
        </div>
      </header>

      <main style={{ padding: "24px 16px 40px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: DIM, maxWidth: 880 }}>
            {description}
          </p>

          <div
            style={{
              marginTop: 20,
              border: `1px solid ${HAIR}`,
              borderRadius: 24,
              background: WHITE,
              padding: 16,
              overflow: "auto",
              boxShadow: "0 18px 46px -28px rgba(0, 0, 0, 0.18)",
            }}
          >
            <div
              style={{
                width: frameWidth,
                height: frameHeight,
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: baseWidth,
                  height: baseHeight,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  overflow: "hidden",
                }}
              >
                {children}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 12,
              lineHeight: 1.6,
              color: DIM,
            }}
          >
            This viewer preserves the original JSX artifact and renders it through a responsive compatibility shell. On smaller screens, the experience scales down while keeping the original layout and interactions intact.
          </div>
        </div>
      </main>
    </div>
  );
}
