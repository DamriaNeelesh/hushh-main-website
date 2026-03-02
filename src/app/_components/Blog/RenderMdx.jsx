"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMDXComponent } from "next-contentlayer/hooks";
import { ServiceCard } from "../primitives/serviceCard";
import HushhWalletIcon from "../svg/hushhWalletIcon";
import { FALLBACK_IMAGE } from "./constants";

const Mermaid = dynamic(() => import("../hooks/useMermaid"), { ssr: false });

const CustomLink = ({ href, children }) => {
  const isExternal = href?.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} className="blog-link" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href || "#"} className="blog-link">
      {children}
    </Link>
  );
};

const CustomImage = ({ src, alt = "Blog image", width, height, className, priority, ...props }) => {
  const parsedWidth = Number(width);
  const parsedHeight = Number(height);
  const resolvedSrc = typeof src === "string" && src ? src.replace("../public", "") : FALLBACK_IMAGE;

  return (
    <span className="block blog-card my-6">
      <Image
        src={resolvedSrc}
        alt={alt}
        width={Number.isFinite(parsedWidth) && parsedWidth > 0 ? parsedWidth : 1200}
        height={Number.isFinite(parsedHeight) && parsedHeight > 0 ? parsedHeight : 675}
        className={className || "w-full h-auto object-cover"}
        priority={Boolean(priority)}
        {...props}
      />
    </span>
  );
};

const CustomPre = ({ children }) => {
  const language = children?.props?.className?.replace("language-", "") || "";

  return (
    <div className="my-6 relative">
      {language ? <span className="absolute right-3 top-3 text-xs text-[#9ca3af] uppercase">{language}</span> : null}
      <pre className="!mt-0">{children}</pre>
    </div>
  );
};

const CustomCode = (props) => <code {...props} />;

const components = {
  a: CustomLink,
  img: CustomImage,
  Image: CustomImage,
  pre: CustomPre,
  code: CustomCode,
  ServiceCard,
  HushhWalletIcon,
  Mermaid,
};

const RenderMdx = ({ blog }) => {
  const code = blog?.body?.code ?? "";
  const MDXContent = useMDXComponent(code);

  if (!blog?.body?.code) {
    return <p className="text-[#b91c1c]">This article content is not available right now.</p>;
  }

  return (
    <div className="blog-article">
      <MDXContent components={components} />
    </div>
  );
};

export default RenderMdx;
