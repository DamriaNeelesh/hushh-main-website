import type { ReactNode } from "react";
import Link from "next/link";
import Callout from "../../app/_components/developerDocs/Callout";
import Steps from "../../app/_components/developerDocs/Steps";

function SmartLink({ href = "", children, ...props }: { href?: string; children?: ReactNode; [key: string]: any }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function Code({
  className = "",
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}) {
  const isBlockCode = className.includes("language-");

  if (isBlockCode) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }

  return (
    <code className="developer-docs-inline-code" {...props}>
      {children}
    </code>
  );
}

export const developerDocComponents = {
  h1: (props: any) => <p className="sr-only" {...props} />,
  h2: (props: any) => <h2 className="developer-docs-h2" {...props} />,
  h3: (props: any) => <h3 className="developer-docs-h3" {...props} />,
  h4: (props: any) => <h4 className="developer-docs-h4" {...props} />,
  p: (props: any) => <p className="developer-docs-p" {...props} />,
  ul: (props: any) => <ul className="developer-docs-list" {...props} />,
  ol: (props: any) => <ol className="developer-docs-list developer-docs-list--ordered" {...props} />,
  li: (props: any) => <li className="developer-docs-li" {...props} />,
  blockquote: (props: any) => <blockquote className="developer-docs-blockquote" {...props} />,
  table: (props: any) => (
    <div className="developer-docs-table-wrap">
      <table className="developer-docs-table" {...props} />
    </div>
  ),
  th: (props: any) => <th className="developer-docs-th" {...props} />,
  td: (props: any) => <td className="developer-docs-td" {...props} />,
  a: SmartLink,
  pre: (props: any) => (
    <pre className="developer-docs-pre" {...props} />
  ),
  code: Code,
  Callout,
  Steps,
};
