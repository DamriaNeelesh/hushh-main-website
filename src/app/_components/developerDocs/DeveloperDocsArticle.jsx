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

function updateCopyButtonState(button, copied) {
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  button.classList.toggle("is-copied", copied);
  button.textContent = copied ? "Copied" : "Copy";
}

function ensureToolbar(pre, language, source) {
  const legacyShell = pre.closest(".docs-code-block");
  let shell =
    legacyShell instanceof HTMLElement && legacyShell.contains(pre) ? legacyShell : pre.parentElement;

  if (shell instanceof HTMLElement && shell.classList.contains("docs-code-block")) {
    shell.classList.remove("docs-code-block");
    shell.classList.add("developer-docs-code-shell");
    const legacyHeader = shell.querySelector(".docs-code-header");
    if (legacyHeader instanceof HTMLElement) {
      legacyHeader.remove();
    }
  }

  if (!(shell instanceof HTMLElement) || !shell.classList.contains("developer-docs-code-shell")) {
    shell = document.createElement("div");
    shell.className = "developer-docs-code-shell";
    pre.replaceWith(shell);
    shell.appendChild(pre);
  }

  const existingToolbar = shell.querySelector(".developer-docs-code-toolbar");
  if (existingToolbar instanceof HTMLElement) {
    existingToolbar.remove();
  }

  const toolbar = document.createElement("div");
  toolbar.className = "developer-docs-code-toolbar";

  const meta = document.createElement("div");
  meta.className = "developer-docs-code-toolbar-meta";

  const dots = document.createElement("span");
  dots.className = "developer-docs-code-dots";
  ["is-red", "is-yellow", "is-green"].forEach((tone) => {
    const dot = document.createElement("span");
    dot.className = `developer-docs-code-dot ${tone}`;
    dots.appendChild(dot);
  });

  const languagePill = document.createElement("span");
  languagePill.className = "developer-docs-code-language";
  languagePill.textContent = (language || "text").toUpperCase();

  meta.append(dots, languagePill);

  const actions = document.createElement("div");
  actions.className = "developer-docs-code-actions";

  const wrapButton = document.createElement("button");
  wrapButton.type = "button";
  wrapButton.className = "developer-docs-code-action";

  const syncWrapButton = () => {
    wrapButton.textContent = shell.classList.contains("is-wrapped") ? "No wrap" : "Wrap";
  };

  const startWrapped =
    shell.classList.contains("is-wrapped") ||
    (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches);
  shell.classList.toggle("is-wrapped", startWrapped);
  syncWrapButton();

  wrapButton.addEventListener("click", () => {
    shell.classList.toggle("is-wrapped");
    syncWrapButton();
  });

  const copyButton = document.createElement("button");
  copyButton.type = "button";
  copyButton.className = "developer-docs-code-action";
  updateCopyButtonState(copyButton, false);
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(source);
      updateCopyButtonState(copyButton, true);
      window.setTimeout(() => updateCopyButtonState(copyButton, false), 1800);
    } catch {
      updateCopyButtonState(copyButton, false);
    }
  });

  actions.append(wrapButton, copyButton);
  toolbar.append(meta, actions);
  shell.prepend(toolbar);
}

function decorateBlock(pre, code) {
  const source = code.textContent || "";
  const language = detectLanguage(code.className, source);
  const workspaceSnippet = pre.closest(".developer-access-snippet");

  if (workspaceSnippet instanceof HTMLElement) {
    pre.classList.add("developer-access-code-pre");
    code.classList.add("developer-access-code");

    if (!language) {
      code.textContent = source;
      return;
    }

    const { value } = hljs.highlight(source, {
      language,
      ignoreIllegals: true,
    });

    code.classList.add("hljs", `language-${language}`);
    code.innerHTML = value;
    return;
  }

  pre.classList.add("developer-docs-pre", "developer-docs-pre--enhanced");
  code.classList.add("developer-docs-block-code");
  ensureToolbar(pre, language, source);

  if (!language) {
    code.textContent = source;
    return;
  }

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
