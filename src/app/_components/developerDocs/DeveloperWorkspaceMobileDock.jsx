"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { List, Menu, X } from "lucide-react";
import { ensureGsapPlugins, useReducedMotionPreference } from "../motion/gsapMotion";
import DeveloperWorkspaceToc from "./DeveloperWorkspaceToc";

function MobileSidebarSection({ title, docs, activeKey, onNavigate }) {
  return (
    <div className="developer-workspace-nav-group">
      <p className="developer-workspace-nav-label">{title}</p>
      <ul className="developer-workspace-nav-list">
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/developers/${doc.slug}`}
              className={`developer-workspace-nav-link${doc.slug === activeKey ? " is-active" : ""}`}
              onClick={onNavigate}
            >
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DeveloperWorkspaceMobileDock({
  activeKey,
  overviewLinks,
  sections,
  headings,
}) {
  const [openPanel, setOpenPanel] = useState(null);
  const [renderedPanel, setRenderedPanel] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showDock, setShowDock] = useState(false);
  const reduceMotion = useReducedMotionPreference();
  const backdropRef = useRef(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpenPanel(null);
  }, [activeKey]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const syncViewportState = (matchesDesktop) => {
      setShowDock(!matchesDesktop);
      if (matchesDesktop) {
        setOpenPanel(null);
      }
    };

    syncViewportState(mediaQuery.matches);

    const handleViewportChange = (event) => {
      syncViewportState(event.matches);
    };

    mediaQuery.addEventListener("change", handleViewportChange);
    return () => mediaQuery.removeEventListener("change", handleViewportChange);
  }, []);

  useEffect(() => {
    if (!openPanel) {
      document.body.style.removeProperty("overflow");
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenPanel(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [openPanel]);

  useLayoutEffect(() => {
    ensureGsapPlugins();

    if (openPanel) {
      setRenderedPanel(openPanel);
      return undefined;
    }

    if (!renderedPanel || !backdropRef.current || !sheetRef.current) {
      setRenderedPanel(null);
      return undefined;
    }

    const complete = () => setRenderedPanel(null);

    if (reduceMotion) {
      complete();
      return undefined;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: complete,
    });

    timeline
      .to(backdropRef.current, { autoAlpha: 0, duration: 0.14 }, 0)
      .to(sheetRef.current, { autoAlpha: 0, y: 18, scale: 0.98, duration: 0.18 }, 0);

    return () => timeline.kill();
  }, [openPanel, reduceMotion, renderedPanel]);

  useLayoutEffect(() => {
    ensureGsapPlugins();

    if (!renderedPanel || !backdropRef.current || !sheetRef.current) {
      return undefined;
    }

    if (reduceMotion) {
      gsap.set([backdropRef.current, sheetRef.current], { clearProps: "all" });
      return undefined;
    }

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18 }, 0)
      .fromTo(
        sheetRef.current,
        { autoAlpha: 0, y: 24, scale: 0.98 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.24 },
        0,
      );

    return () => timeline.kill();
  }, [reduceMotion, renderedPanel]);

  const closePanel = () => setOpenPanel(null);
  const togglePanel = (panelKey) =>
    setOpenPanel((current) => (current === panelKey ? null : panelKey));

  const activePanel = openPanel || renderedPanel;

  const dockUi = (
    <>
      {activePanel ? (
        <button
          ref={backdropRef}
          type="button"
          aria-label="Close developer navigation"
          className="developer-mobile-backdrop"
          onClick={closePanel}
        />
      ) : null}

      {activePanel ? (
        <section
          ref={sheetRef}
          key={activePanel}
          id="developer-mobile-sheet"
          className="developer-mobile-sheet"
          aria-label={activePanel === "nav" ? "Browse developer docs" : "On this page"}
        >
          <div className="developer-mobile-sheet-header">
            <div>
              <p className="developer-workspace-nav-label">
                {activePanel === "nav" ? "Browse docs" : "On this page"}
              </p>
              <p className="developer-mobile-sheet-copy">
                {activePanel === "nav"
                  ? "Jump between the two Hushh developer tracks."
                  : "Use the local sections below to move through this page."}
              </p>
            </div>

            <button
              type="button"
              className="developer-mobile-sheet-close"
              onClick={closePanel}
              aria-label="Close panel"
            >
              <X size={18} strokeWidth={2.1} />
            </button>
          </div>

          <div className="developer-mobile-sheet-body">
            {activePanel === "nav" ? (
              <>
                <div className="developer-workspace-nav-group">
                  <p className="developer-workspace-nav-label">Overview</p>
                  <ul className="developer-workspace-nav-list">
                    {overviewLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`developer-workspace-nav-link${
                            link.key === activeKey ? " is-active" : ""
                          }`}
                          onClick={closePanel}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {Object.entries(sections).map(([sectionTitle, docs]) => (
                  <MobileSidebarSection
                    key={sectionTitle}
                    title={sectionTitle}
                    docs={docs}
                    activeKey={activeKey}
                    onNavigate={closePanel}
                  />
                ))}
              </>
            ) : headings.length ? (
              <DeveloperWorkspaceToc headings={headings} onNavigate={closePanel} />
            ) : (
              <p className="developer-workspace-empty-copy">
                This page is short enough to read straight through.
              </p>
            )}
          </div>
        </section>
      ) : null}

      <div className="developer-mobile-dock">
        <button
          type="button"
          className={`developer-mobile-dock-button${openPanel === "nav" ? " is-active" : ""}`}
          aria-expanded={openPanel === "nav"}
          aria-controls="developer-mobile-sheet"
          onClick={() => togglePanel("nav")}
        >
          <Menu size={18} strokeWidth={2.2} />
          <span>Browse docs</span>
        </button>

        <button
          type="button"
          className={`developer-mobile-dock-button${openPanel === "toc" ? " is-active" : ""}`}
          aria-expanded={openPanel === "toc"}
          aria-controls="developer-mobile-sheet"
          onClick={() => togglePanel("toc")}
        >
          <List size={18} strokeWidth={2.2} />
          <span>On this page</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="developer-mobile-dock-shell">
      {mounted && showDock ? createPortal(dockUi, document.body) : null}
    </div>
  );
}
