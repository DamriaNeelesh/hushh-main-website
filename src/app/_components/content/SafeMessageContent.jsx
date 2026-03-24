"use client";

import React, { Fragment, useMemo } from "react";

const FENCE = "```";
const ORDERED_LIST_PATTERN = /^(\d+)\.\s+/;
const UNORDERED_LIST_PATTERN = /^[-*]\s+/;
const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
const URL_PATTERN = /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;
const INLINE_CODE_PATTERN = /(`[^`]+`)/g;

function normalizeUrl(url) {
  if (!url) {
    return null;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (/^www\./i.test(url)) {
    return `https://${url}`;
  }

  return null;
}

function splitParagraphs(text) {
  return text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function parseMessageBlocks(content) {
  const lines = String(content || "").replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraphBuffer = [];
  let listBuffer = null;
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) {
      return;
    }

    const text = splitParagraphs(paragraphBuffer.join("\n"));
    if (text) {
      blocks.push({ type: "paragraph", text });
    }
    paragraphBuffer = [];
  };

  const flushList = () => {
    if (!listBuffer?.items?.length) {
      listBuffer = null;
      return;
    }

    blocks.push(listBuffer);
    listBuffer = null;
  };

  const flushCode = () => {
    blocks.push({
      type: "code",
      language: codeLanguage || "text",
      text: codeLines.join("\n"),
    });
    codeLanguage = "";
    codeLines = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith(FENCE)) {
      const fenceSuffix = line.trim().slice(FENCE.length).trim();

      if (!inCodeBlock) {
        flushParagraph();
        flushList();
        inCodeBlock = true;
        codeLanguage = fenceSuffix;
        codeLines = [];
      } else {
        flushCode();
        inCodeBlock = false;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    if (UNORDERED_LIST_PATTERN.test(line.trim())) {
      flushParagraph();
      const itemText = line.trim().replace(UNORDERED_LIST_PATTERN, "");
      if (!listBuffer || listBuffer.type !== "unordered-list") {
        flushList();
        listBuffer = { type: "unordered-list", items: [] };
      }
      listBuffer.items.push(itemText);
      continue;
    }

    if (ORDERED_LIST_PATTERN.test(line.trim())) {
      flushParagraph();
      const itemText = line.trim().replace(ORDERED_LIST_PATTERN, "");
      if (!listBuffer || listBuffer.type !== "ordered-list") {
        flushList();
        listBuffer = { type: "ordered-list", items: [] };
      }
      listBuffer.items.push(itemText);
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  if (inCodeBlock) {
    flushCode();
  }

  flushParagraph();
  flushList();

  return blocks;
}

function renderLinkedText(text, keyPrefix) {
  const normalized = text || "";
  const parts = [];
  let cursor = 0;
  let matchIndex = 0;

  const pushText = (value) => {
    if (!value) {
      return;
    }

    const inlineSegments = value.split(INLINE_CODE_PATTERN);
    inlineSegments.forEach((segment, index) => {
      if (!segment) {
        return;
      }

      if (segment.startsWith("`") && segment.endsWith("`")) {
        parts.push(
          <code
            key={`${keyPrefix}-code-${matchIndex}-${index}`}
            className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.92em] text-slate-900"
          >
            {segment.slice(1, -1)}
          </code>,
        );
        return;
      }

      parts.push(
        <Fragment key={`${keyPrefix}-text-${matchIndex}-${index}`}>{segment}</Fragment>,
      );
    });
  };

  for (const match of normalized.matchAll(MARKDOWN_LINK_PATTERN)) {
    const [fullMatch, label, href] = match;
    const start = match.index ?? 0;
    pushText(normalized.slice(cursor, start));

    parts.push(
      <a
        key={`${keyPrefix}-mdlink-${matchIndex}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline underline-offset-2 break-all"
      >
        {label}
      </a>,
    );

    cursor = start + fullMatch.length;
    matchIndex += 1;
  }

  const tail = normalized.slice(cursor);
  if (!tail) {
    return parts;
  }

  const urlSegments = [];
  let tailCursor = 0;
  let urlIndex = 0;

  for (const match of tail.matchAll(URL_PATTERN)) {
    const found = match[0];
    const start = match.index ?? 0;
    pushText(tail.slice(tailCursor, start));

    const href = normalizeUrl(found);
    if (href) {
      urlSegments.push(
        <a
          key={`${keyPrefix}-url-${urlIndex}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline underline-offset-2 break-all"
        >
          {found}
        </a>,
      );
    } else {
      urlSegments.push(
        <Fragment key={`${keyPrefix}-urltext-${urlIndex}`}>{found}</Fragment>,
      );
    }

    tailCursor = start + found.length;
    urlIndex += 1;
  }

  pushText(tail.slice(tailCursor));

  return [...parts, ...urlSegments];
}

export function SafeMessageContent({ content }) {
  const blocks = useMemo(() => parseMessageBlocks(content), [content]);

  return (
    <div className="space-y-3 text-sm leading-7 text-slate-900">
      {blocks.map((block, index) => {
        if (block.type === "code") {
          return (
            <pre
              key={`block-${index}`}
              className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-xs text-slate-100"
            >
              <code>{block.text}</code>
            </pre>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={`block-${index}`} className="list-disc space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={`block-${index}-item-${itemIndex}`}>
                  {renderLinkedText(item, `block-${index}-item-${itemIndex}`)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={`block-${index}`} className="list-decimal space-y-2 pl-5">
              {block.items.map((item, itemIndex) => (
                <li key={`block-${index}-item-${itemIndex}`}>
                  {renderLinkedText(item, `block-${index}-item-${itemIndex}`)}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <p key={`block-${index}`} className="whitespace-pre-wrap">
            {renderLinkedText(block.text, `block-${index}`)}
          </p>
        );
      })}
    </div>
  );
}

export { parseMessageBlocks, renderLinkedText };
