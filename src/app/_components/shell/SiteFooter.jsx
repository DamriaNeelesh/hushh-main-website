"use client";

import Image from "next/image";
import Link from "next/link";
import HushhNewLogo from "../../../../public/svgs/hushh_new_logo.svg";

const footerSections = [
  {
    title: "Products",
    links: [
      { label: "Agent.ai", href: "/agents" },
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
      { label: "Getting Started", href: "/developers/getting-started" },
      { label: "API Reference", href: "/developers/rootEndpoints" },
      { label: "Github Protocol", href: "https://github.com/hushh-labs", external: true },
      { label: "Agentic CLI", href: "/agent-kit-cli" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
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
  const className = "transition-colors hover:text-richBlack";

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
      className="bg-offWhite border-t border-borderLight pt-20 px-6 md:px-12 pb-[calc(8.5rem+env(safe-area-inset-bottom))] mt-auto"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 items-start">
        <div>
          <div className="mb-5">
            <Image
              src={HushhNewLogo}
              alt="Hushh"
              className="h-[72px] w-auto"
              priority={false}
            />
          </div>
          <p className="text-xs text-mutedSlate leading-relaxed max-w-[240px]">
            Securing the future of digital identity and personalized experiences through
            consent-first AI technology.
          </p>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className="text-richBlack font-bold text-xs uppercase tracking-widest mb-6">
              {section.title}
            </h4>
            <ul className="space-y-3 text-xs text-mutedSlate">
              {section.links.map((link) => (
                <li key={`${section.title}-${link.label}`}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-borderLight text-left">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-mutedTaupe uppercase tracking-widest">
          <span>© 2026 Hushh Technologies. All rights reserved.</span>
          <span aria-hidden="true">•</span>
          <FooterLink href="/privacy" label="Privacy Manifesto" />
          <span aria-hidden="true">•</span>
          <FooterLink href="/terms" label="Terms of Use" />
        </div>
      </div>
    </footer>
  );
}
