"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useMDXComponent } from "next-contentlayer/hooks";
import { ServiceCard } from "../primitives/serviceCard";
import HushhWalletIcon from "../svg/hushhWalletIcon";

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

const CustomImage = ({ src, alt = "Blog image" }) => (
  <span className="block blog-card my-6">
    <Image src={src} alt={alt} width={1200} height={675} className="w-full h-auto object-cover" />
  </span>
);

const CustomPre = ({ children }) => {
  const language = children?.props?.className?.replace("language-", "") || "";

  return (
    <div className="my-6 relative">
      {language ? <span className="absolute right-3 top-3 text-xs text-[#9ca3af] uppercase">{language}</span> : null}
      <pre className="!mt-0">{children}</pre>
    </div>
  );
};

const CustomCode = (props) => {
  if (!props.className) {
    return <code {...props} />;
  }

  return <code {...props} />;
};

const components = {
  a: CustomLink,
  img: CustomImage,
  pre: CustomPre,
  code: CustomCode,
  ServiceCard,
  HushhWalletIcon,
  Mermaid,
};

const RenderMdx = ({ blog }) => {
  if (!blog?.body?.code) {
    return <p className="text-[#b91c1c]">This article content is not available right now.</p>;
  }

  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <div className="blog-article">
      <MDXContent components={components} />
    </div>
  );
};

export default RenderMdx;
