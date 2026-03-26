"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import hljs from "highlight.js/lib/common";

function detectLanguage(className = "", source = "") {
  const explicit = className.match(/language-([\w-]+)/)?.[1];
  if (explicit && hljs.getLanguage(explicit)) {
    return explicit;
  }

  const trimmed = source.trim();

  if (!trimmed) {
    return null;
  }

  if ((trimmed.startsWith("{") || trimmed.startsWith("[")) && hljs.getLanguage("json")) {
    return "json";
  }

  if (/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\/?/m.test(trimmed) && hljs.getLanguage("http")) {
    return "http";
  }

  if (/^\$?\s*(npm|npx|pnpm|yarn|curl)\b/m.test(trimmed) && hljs.getLanguage("bash")) {
    return "bash";
  }

  return null;
}

function decorateBlock(pre, code) {
  const source = code.textContent || "";
  const language = detectLanguage(code.className, source);

  pre.classList.add("developer-docs-pre", "developer-docs-pre--enhanced");
  code.classList.add("developer-docs-block-code");

  if (!language) {
    pre.dataset.language = "TEXT";
    code.textContent = source;
    return;
  }

  pre.dataset.language = language.toUpperCase();
  const { value } = hljs.highlight(source, {
    language,
    ignoreIllegals: true,
  });

  code.classList.add("hljs", `language-${language}`);
  code.innerHTML = value;
}

export default function DeveloperDocsArticle({ children }) {
  const containerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const codeBlocks = container.querySelectorAll("pre > code");
    codeBlocks.forEach((code) => {
      const pre = code.parentElement;
      if (!pre) {
        return;
      }
      decorateBlock(pre, code);
    });
  }, [pathname]);

  return (
    <div ref={containerRef} className="developer-docs-article">
      {children}
    </div>
  );
}
