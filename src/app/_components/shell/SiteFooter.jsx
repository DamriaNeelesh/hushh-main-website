"use client";

import Image from "next/image";
import Link from "next/link";
import HushhNewLogo from "../../../../public/svgs/hushh_new_logo.svg";

const footerSections = [
  {
    title: "Products",
    links: [
      { label: "Agent Kai", href: "/products/kai" },
      { label: "Hushh Vault", href: "/hushh-vault" },
      { label: "Hushh Link", href: "/hushh-link" },
      { label: "Hushh Flow", href: "/products/hushh-flow" },
      { label: "Hushh Grid", href: "/products/hushh-grid" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Hushh Wallet App", href: "/products/hushh-wallet-app" },
      { label: "Hushh Button", href: "/products/hushh-button" },
      { label: "Browser Companion", href: "/products/browser-companion" },
      { label: "Vibe Search App", href: "/products/hushh-vibe-search" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Developer Home", href: "/developers" },
      { label: "Agent Kai API", href: "/developers/agent-kai" },
      { label: "Developer Workspace", href: "/developers/on-boarding" },
      { label: "Agentic APIs", href: "/developers/agentic-apis" },
      { label: "Support", href: "/developers/support" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Foundation", href: "/foundation" },
      { label: "Contact", href: "/contact-us" },
      { label: "Careers", href: "/career" },
      { label: "Blog", href: "/hushhBlogs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Manifesto", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Consent Protocol", href: "/consent-ai-protocol" },
    ],
  },
];

function FooterLink({ href, label, external = false }) {
  const className = "text-[13px] font-semibold text-neutral-500 transition-colors hover:text-black";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function SiteFooter() {
  return (
    <footer
      data-site-footer
      className="mt-auto border-t border-neutral-100 bg-white px-8 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-24 font-body"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-3 xl:grid-cols-[minmax(0,1.35fr)_repeat(5,minmax(0,1fr))]">
          <div className="space-y-6 xl:pr-10">
            <div className="flex items-center gap-3">
              <Image
                src={HushhNewLogo}
                alt="Hushh"
                className="h-auto w-[132px] object-contain object-left"
                priority={false}
              />
            </div>
            <p className="max-w-xs text-[14px] font-medium leading-relaxed text-neutral-500">
              Sophisticated intelligence for consent-first digital identity, secure personalization,
              and agentic workflows that keep people in control.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                {section.title}
              </p>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <FooterLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-start gap-4 border-t border-neutral-100 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="font-mono text-[11px] tracking-wide text-neutral-400">
            Hushh <span className="mx-3 text-neutral-200">|</span>
            <span className="tracking-[0.03em]">Built by Hushh Technologies</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] tracking-wide text-neutral-400">
            <span>© 2026 Hushh Technologies. All rights reserved.</span>
            <span aria-hidden="true" className="text-neutral-200">
              |
            </span>
            <FooterLink href="/privacy" label="Privacy Manifesto" />
            <span aria-hidden="true" className="text-neutral-200">
              |
            </span>
            <FooterLink href="/terms" label="Terms of Use" />
          </div>
        </div>
      </div>
    </footer>
  );
}
