import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { ServiceCard } from "../../app/_components/primitives/serviceCard";
import HushhWalletIcon from "../../app/_components/svg/hushhWalletIcon";
import Mermaid from "../../app/_components/hooks/useMermaid";
import { FALLBACK_IMAGE } from "../../app/_components/Blog/constants";

type MdxComponentProps = {
  components?: Record<string, unknown>;
};

type BlogLinkProps = {
  href?: string;
  children?: ReactNode;
};

type BlogImageProps = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  priority?: boolean;
  [key: string]: any;
};

function BlogLink({ href, children }: BlogLinkProps) {
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
}

function BlogImage({ src, alt = "Blog image", width, height, className, priority, ...props }: BlogImageProps) {
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
}

function BlogPre({ children }: { children?: any }) {
  const language = children?.props?.className?.replace("language-", "") || "";

  return (
    <div className="my-6 relative">
      {language ? (
        <span className="absolute right-3 top-3 text-xs text-[#9ca3af] uppercase">{language}</span>
      ) : null}
      <pre className="!mt-0">{children}</pre>
    </div>
  );
}

export const blogContentComponents = {
  a: BlogLink,
  img: BlogImage,
  Image: BlogImage,
  pre: BlogPre,
  code: (props: any) => <code {...props} />,
  ServiceCard,
  HushhWalletIcon,
  Mermaid: Mermaid as ComponentType<MdxComponentProps & { chart?: string }>,
};
