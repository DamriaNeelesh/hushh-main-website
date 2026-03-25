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
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

export const developerDocComponents = {
  h1: (props: any) => <h1 className="developer-docs-h1" {...props} />,
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
    <pre
      className="overflow-x-auto rounded-[20px] bg-[rgba(15,23,42,0.95)] px-5 py-4 text-[13px] leading-6 text-white"
      {...props}
    />
  ),
  code: (props: any) => <code className="developer-docs-inline-code" {...props} />,
  Callout,
  Steps,
};
