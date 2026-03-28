"use client";

import { useEffect, useRef, useState } from "react";

export default function DeferredIframe({
  src,
  title,
  minHeight,
  height,
  className,
  style,
  rootMargin = "320px 0px",
  placeholder = "The embedded form will load as you reach this section.",
}) {
  const hostRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) {
      return undefined;
    }

    const node = hostRef.current;
    if (!node) {
      return undefined;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={hostRef} style={{ minHeight, height, width: "100%" }}>
      {shouldRender ? (
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          loading="lazy"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className={className}
          style={{ border: "none", ...style }}
        >
          Loading…
        </iframe>
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center rounded-[28px] border border-[rgba(15,23,42,0.08)] bg-white/70 px-6 py-10 text-center text-sm text-[rgba(15,23,42,0.62)] shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
          style={{ minHeight: "100%" }}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}
