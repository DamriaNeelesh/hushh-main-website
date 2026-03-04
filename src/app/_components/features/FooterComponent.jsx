"use client";

import React from "react";
import Link from "next/link";
import { MdCall, MdMail } from "react-icons/md";

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
      { label: "Hushh Browser Companion", href: "/products/browser-companion" },
      { label: "VIBE Search App", href: "/products/hushh-vibe-search" },
      { label: "Hushh For Students", href: "/products/hushh-for-students" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Getting Started", href: "/getting-started" },
      { label: "API Reference", href: "/developerApi" },
      { label: "GitHub Protocol", href: "/agent-kit-cli#github-protocol" },
      { label: "Agentkit CLI", href: "/agent-kit-cli#agentkit-cli" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact-us" },
      { label: "Careers", href: "/career" },
      { label: "Blogs", href: "/hushhBlogs" },
      {
        label: "FAQ",
        href: "https://github.com/hushh-labs/consent-protocol/blob/main/docs/faq.md",
        external: true,
      },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Agent Builders Club", href: "/hushh-community" },
      { label: "Hushh Labs", href: "/labs" },
      { label: "Solutions", href: "/solutions" },
      { label: "Hackathons", href: "/pda/iithackathon" },
      { label: "Our Philosophy", href: "/why-hushh" },
      { label: "Consent Protocol", href: "/consent-ai-protocol" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Live Demo", href: "/demoBookingPage" },
      { label: "Linkedin", href: "https://www.linkedin.com/company/hushh-ai/", external: true },
      { label: "X (Twitter)", href: "https://x.com/hushh_ai", external: true },
      { label: "Github", href: "https://github.com/hushh-labs", external: true },
    ],
  },
];

const FooterComponent = () => {
  const handleDownloadClick = () => {
    window.open("https://apps.apple.com/in/app/hushh-app/id6498471189", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full overflow-x-hidden bg-white text-[#111827] transition-colors duration-300 dark:bg-[#0f172a] dark:text-[#f3f4f6]">
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-underline {
          height: 2px;
          width: 40px;
          margin-top: 4px;
          border-radius: 2px;
          background: linear-gradient(90deg, #3b82f6 0%, #ec4899 100%);
        }

        .black-underline {
          height: 2px;
          width: 40px;
          margin-top: 4px;
          background: #000;
        }

        :global(.dark) .black-underline {
          background: #fff;
        }
      `}</style>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[390px] sm:max-w-3xl lg:max-w-6xl">
          <header className="mb-10 flex items-center justify-start">
            <h2 className="text-4xl font-bold tracking-tight">
              <span className="text-[#A855F7]">hu</span>
              <span className="gradient-text">shh</span>
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-3 auto-rows-fr md:grid-cols-2 xl:grid-cols-3">
            {footerSections.map((section) => (
              <section key={section.title} className="group h-full text-left">
                <div className="flex h-full min-h-[20rem] flex-col rounded-xl border border-[rgba(0,0,0,0.05)] bg-[rgba(255,255,255,0.7)] p-5 text-left shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all duration-300 hover:shadow-lg dark:border-[rgba(255,255,255,0.1)] dark:bg-[rgba(30,41,59,0.7)]">
                  <h3 className="mb-4 text-left text-sm font-bold uppercase tracking-widest text-[#111827] dark:text-[#f3f4f6]">
                    {section.title}
                    <div className="gradient-underline ml-0 mr-auto" />
                  </h3>

                  <ul className="mt-1 flex-1 space-y-3 text-left">
                    {section.links.map((item) => (
                      <li key={`${section.title}-${item.label}`}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-left text-[15px] text-[#4b5563] transition-colors hover:text-[#3b82f6] dark:text-[#9ca3af] dark:hover:text-white"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="block text-left text-[15px] text-[#4b5563] transition-colors hover:text-[#3b82f6] dark:text-[#9ca3af] dark:hover:text-white"
                          >
                            {item.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <div className="mb-8 mt-8 flex w-full justify-start">
            <button
              onClick={handleDownloadClick}
              className="group flex w-[180px] items-center justify-center gap-2 rounded-full bg-black px-6 py-3 shadow-sm transition-all hover:bg-gray-900 active:scale-95"
            >
              <span className="text-[15px] font-medium text-white">Download App</span>
            </button>
          </div>

          <hr className="my-8 w-full border-t border-gray-100 dark:border-gray-800" />

          <footer className="mb-4 mt-8 w-full text-left">
            <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:justify-between">
              <div className="flex w-full flex-col items-start text-left lg:max-w-[420px]">
                <h3 className="relative mb-6 text-left text-sm font-bold uppercase tracking-widest text-black dark:text-white">
                  Contact
                  <div className="black-underline absolute -bottom-2 left-0" />
                </h3>

                <p className="mb-3 max-w-[320px] text-left text-lg font-bold leading-snug text-black dark:text-white">
                  Future of Digital Identity &amp; Personalised Experiences
                </p>
                <p className="text-left text-sm font-normal text-[#86868B]">Manish Sainani, 2025</p>
              </div>

              <div className="flex w-full flex-col items-start gap-5 text-left lg:max-w-[320px]">
                <a href="tel:+18884621726" className="group flex w-full items-center justify-start gap-4 transition-all">
                  <span className="flex-shrink-0 text-[20px] text-[#333333] dark:text-white">
                    <MdCall />
                  </span>
                  <span className="text-[15px] font-normal text-black transition-colors group-hover:text-[#3b82f6] dark:text-white">
                    (888) 462-1726
                  </span>
                </a>

                <a href="mailto:sales@hushh.ai" className="group flex w-full items-center justify-start gap-4 transition-all">
                  <span className="flex-shrink-0 text-[20px] text-[#333333] dark:text-white">
                    <MdMail />
                  </span>
                  <span className="text-[15px] font-normal text-black transition-colors group-hover:text-[#3b82f6] dark:text-white">
                    sales@hushh.ai
                  </span>
                </a>
              </div>
            </div>

            <div className="pt-8 text-left text-xs">
              <p className="text-gray-500">© 2026 HushOne Inc. All rights reserved.</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-left text-[11px] leading-relaxed text-[#86868B]">
                <Link href="/legal/termsofuse" className="transition-colors hover:text-[#3b82f6]">
                  Terms of Service
                </Link>
                <span className="px-2 text-gray-300">|</span>
                <Link href="/legal/privacypolicy" className="transition-colors hover:text-[#3b82f6]">
                  Privacy Policy
                </Link>
                <span className="px-2 text-gray-300">|</span>
                <span>Duns # 119019629</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default FooterComponent;
