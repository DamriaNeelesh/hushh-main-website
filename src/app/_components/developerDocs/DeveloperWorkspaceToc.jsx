"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function scrollToHeading(slug, onNavigate) {
  const target = document.getElementById(slug);
  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });

  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `${window.location.pathname}#${slug}`);
  }

  onNavigate?.();
}

export default function DeveloperWorkspaceToc({ headings, onNavigate }) {
  const pathname = usePathname();
  const listRef = useRef(null);
  const headingSignature = useMemo(
    () => headings.map((heading) => `${heading.level}:${heading.slug}`).join("|"),
    [headings],
  );
  const [activeSlug, setActiveSlug] = useState(headings[0]?.slug ?? null);

  useEffect(() => {
    setActiveSlug(headings[0]?.slug ?? null);

    if (!headings.length) {
      return undefined;
    }

    const scrollRoot = document.querySelector("[data-developer-scroll-root='true']");
    if (!(scrollRoot instanceof HTMLElement)) {
      return undefined;
    }

    let frameId = 0;
    const nodes = headings
      .map((heading) => ({
        slug: heading.slug,
        level: heading.level,
        node: document.getElementById(heading.slug),
      }))
      .filter((entry) => entry.node instanceof HTMLElement);

    if (!nodes.length) {
      return undefined;
    }

    const updateActiveSlug = () => {
      frameId = 0;
      const currentScroll = scrollRoot.scrollTop;
      const maxScrollTop = Math.max(0, scrollRoot.scrollHeight - scrollRoot.clientHeight);
      const activationOffset = Math.max(110, Math.round(scrollRoot.clientHeight * 0.24));

      if (maxScrollTop - currentScroll <= Math.max(48, Math.round(scrollRoot.clientHeight * 0.08))) {
        setActiveSlug((previous) => (previous === nodes[nodes.length - 1].slug ? previous : nodes[nodes.length - 1].slug));
        return;
      }

      let nextSlug = nodes[0]?.slug ?? null;

      for (const entry of nodes) {
        if (!(entry.node instanceof HTMLElement)) {
          continue;
        }

        if (entry.node.offsetTop - currentScroll <= activationOffset) {
          nextSlug = entry.slug;
        } else {
          break;
        }
      }

      setActiveSlug((previous) => (previous === nextSlug ? previous : nextSlug));
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateActiveSlug);
      }
    };

    requestUpdate();
    scrollRoot.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      scrollRoot.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [headingSignature, headings, pathname]);

  useEffect(() => {
    const list = listRef.current;
    if (!(list instanceof HTMLElement) || !activeSlug) {
      return;
    }

    const activeLink = list.querySelector(`[href="#${activeSlug}"]`);
    if (!(activeLink instanceof HTMLElement)) {
      return;
    }

    activeLink.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [activeSlug]);

  return (
    <ul ref={listRef} className="developer-workspace-toc-list">
      {headings.map((heading) => {
        const isActive = heading.slug === activeSlug;

        return (
          <li
            key={heading.slug}
            className={`developer-workspace-toc-item${heading.level === 3 ? " is-nested" : ""}${
              isActive ? " is-active" : ""
            }`}
          >
            <a
              href={`#${heading.slug}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToHeading(heading.slug, onNavigate);
              }}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
