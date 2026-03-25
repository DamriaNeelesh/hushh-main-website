import Link from "next/link";
import ContentWrapper from "../layout/ContentWrapper";

const continueExploringLinks = [
  { label: "Home", href: "/" },
  { label: "Agent Kai", href: "/products/kai" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Contact", href: "/contact-us" },
];

export default function LegalPageShell({ title, subtitle, updatedLabel, children }) {
  return (
    <ContentWrapper surface="muted">
      <div className="site-page-band">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 md:gap-10">
          <div className="site-page-card text-center">
            <p className="site-page-eyebrow">Legal</p>
            <h1 className="site-page-title mt-3">{title}</h1>
            {subtitle ? (
              <p className="site-page-copy mx-auto mt-5 max-w-3xl">{subtitle}</p>
            ) : null}
            {updatedLabel ? (
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#8f8570]">
                {updatedLabel}
              </p>
            ) : null}
          </div>

          <div className="site-page-card legal-shell-content">{children}</div>

          <div className="site-page-card">
            <p className="site-page-eyebrow">Continue Exploring</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {continueExploringLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="btn-outline rounded-full px-4 py-2.5 text-[13px] tracking-[0.12em]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}
