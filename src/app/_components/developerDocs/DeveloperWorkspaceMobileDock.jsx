"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { List, Menu, X } from "lucide-react";

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

function MobileTocList({ headings, onNavigate }) {
  return (
    <ul className="developer-workspace-toc-list">
      {headings.map((heading) => (
        <li
          key={heading.slug}
          className={`developer-workspace-toc-item${heading.level === 3 ? " is-nested" : ""}`}
        >
          <a href={`#${heading.slug}`} onClick={onNavigate}>
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function DeveloperWorkspaceMobileDock({
  activeKey,
  overviewLinks,
  sections,
  headings,
}) {
  const [openPanel, setOpenPanel] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpenPanel(null);
  }, [activeKey]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleViewportChange = (event) => {
      if (event.matches) {
        setOpenPanel(null);
      }
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

  const panelAnimation = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 18, scale: 0.98 },
      };

  const closePanel = () => setOpenPanel(null);
  const togglePanel = (panelKey) =>
    setOpenPanel((current) => (current === panelKey ? null : panelKey));

  return (
    <div className="developer-mobile-dock-shell">
      <AnimatePresence>
        {openPanel ? (
          <motion.button
            key="backdrop"
            type="button"
            aria-label="Close developer navigation"
            className="developer-mobile-backdrop"
            onClick={closePanel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {openPanel ? (
          <motion.section
            key={openPanel}
            id="developer-mobile-sheet"
            className="developer-mobile-sheet"
            initial={panelAnimation.initial}
            animate={panelAnimation.animate}
            exit={panelAnimation.exit}
            transition={{ duration: reduceMotion ? 0.14 : 0.22, ease: "easeOut" }}
            aria-label={openPanel === "nav" ? "Browse developer docs" : "On this page"}
          >
            <div className="developer-mobile-sheet-header">
              <div>
                <p className="developer-workspace-nav-label">
                  {openPanel === "nav" ? "Browse docs" : "On this page"}
                </p>
                <p className="developer-mobile-sheet-copy">
                  {openPanel === "nav"
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
              {openPanel === "nav" ? (
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
                <MobileTocList headings={headings} onNavigate={closePanel} />
              ) : (
                <p className="developer-workspace-empty-copy">
                  This page is short enough to read straight through.
                </p>
              )}
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

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
    </div>
  );
}
