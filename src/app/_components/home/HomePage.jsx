import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  Bot,
  Cpu,
  Database,
  HeartPulse,
  Landmark,
  LockKeyhole,
  Mail,
  MessageSquare,
  MessagesSquare,
  Plane,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Workflow,
} from "lucide-react";
import { MotionSection, MotionStaggerGroup, MotionStaggerItem } from "../motion/SectionReveal";
import InteractiveSandbox from "./InteractiveSandbox";

const heroCards = [
  {
    title: "Secure by Design",
    description: "Every decision is encrypted and permissioned, with no hidden data sharing.",
    icon: ShieldCheck,
  },
  {
    title: "Consent at Every Step",
    description: "Your agent acts only when you approve, with transparent controls for each interaction.",
    icon: LockKeyhole,
  },
];

const trustItems = [
  { label: "Open Source DNA", icon: Database },
  { label: "Consent-First Protocol", icon: Workflow },
  { label: "iOS Verified Access", icon: BadgeCheck },
];

const featureCards = [
  {
    title: "Unified Data Management",
    description: "Organize your data across Gmail, Drive, iCloud, and more",
    icon: Database,
  },
  {
    title: "Privacy-First Integrations",
    description: "Consent-aware personal API for every app",
    icon: ShieldCheck,
  },
  {
    title: "Intelligent Shopping Assistant",
    description: "Smart shopping with agents that know your style and budget",
    icon: ShoppingBag,
  },
  {
    title: "Automated Business Workflows",
    description: "Automate business tasks without handing over your life",
    icon: Workflow,
  },
];

const productCards = [
  {
    title: "Agent Kai",
    description: "Explainable investing with consented PKM context and transparent committee-style reasoning.",
    href: "/products/kai",
    background: "/figma-assets/personal-agent-interface-luxury.svg",
    overlay: "/figma-assets/overlay-agent-5.svg",
    icon: Bot,
  },
  {
    title: "Hushh Vault",
    description: "Secure, encrypted storage for your most sensitive personal data assets.",
    href: "/hushh-vault",
    background: "/figma-assets/background-border-shadow.svg",
    overlay: "/figma-assets/overlay-vault.svg",
    icon: LockKeyhole,
  },
  {
    title: "Hushh Link",
    description: "The identity and permissions layer that connects you seamlessly to the web.",
    href: "/hushh-link",
    background:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4ivG2fSeYj0AxDlhS_LZNEtKv7cUNSBEN3-ph7sK9UL-y1N3cEo7Oyu4Lnw1JJoN0NDZ0kO4LsmgcAfShBiIoRoMc3B4jHNc9FU6YP9TcBiph75qsWqXdwQNf30lYHLGqcZgoyhV9ti6k-yJTPnRzsI2IgHsRnYYou2rR9SfaNE3r3J3vZin3fwVhDHGvIySJz2XgTHgogE1wq9aTHzMZ02ZfpC4IXAfv7B2uKzDNFYDMklb_R8JoR4mew0VBaBzF_c3x_Qh-qeTy",
    overlay: "/figma-assets/overlay-link.svg",
    icon: MessageSquare,
  },
  {
    title: "Hushh Flow",
    description: "Automation tools for brands to discover and interact with users fairly.",
    href: "/products/hushh-flow",
    background:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3JsshHOJ9Q57Lavm3WPurzIQo6j2ulu1lSbpJAon77s6J5vzxQFd-M_WVMd01pZCil4ipxV5BzUf97rSJ89CywaBRMsRBkLWiB_FUtebhEjPVvytKaeKG-Y7qWvFdd443bPiNgtuY_MaeExP-TahMRCYKOzK8BZrR5cKQUPY1P5o7p82yCDUP-Vi75sQu98UnvvEmphxNixuvaO1exoniPxHQ_e_npI0v1MxLJRqU8tQ0jGbNKo7XmMjbpZqUSg7mLYBamIXyl1eR",
    overlay: "/figma-assets/overlay-flow.svg",
    icon: Workflow,
  },
  {
    title: "Hushh Grid",
    description: "The compute engine built for agentic AI.",
    href: "/products/hushh-grid",
    background:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDAxn-abrBktwmJsNiiWrq1nIukULvZC8yEPSUPpi4qDMnecE8siSeLhY-t_M2c84hnpPqqM3X1252h4WVwK98mlv9lb1IfbyUg_LwUuXmFc7hfqUrblVIigCdj8sYEVAhM1EMrbSCM-a4U2BP3LmT0a2W_ltI1bJtdZ-9mhUZ1LiJMu_fscnJ4AUn3nEGTtC1JcifCpyKEtJZx8CssEyTlbWBNCXZAK7BbwaCvmLuXs4VDTYysd5STjiK-PKtaJkvxbMvjl1Dik6Xn",
    overlay: "/figma-assets/overlay-grid.svg",
    icon: Cpu,
  },
];

const reachCards = [
  {
    title: "Inbox & Calendar",
    description:
      "Stay present in email, scheduling, and the daily planning surfaces people actually use.",
    icon: Mail,
  },
  {
    title: "Shopping & Checkout",
    description:
      "Turn preferences into better recommendations, fewer clicks, and higher-trust buying moments.",
    icon: ShoppingBag,
  },
  {
    title: "Finance & Banking",
    description:
      "Give users smarter decisions, portfolio context, and agentic help without losing privacy discipline.",
    icon: Landmark,
  },
  {
    title: "Travel & Mobility",
    description:
      "Carry preferences, loyalty context, and intent into trips, bookings, and movement-heavy experiences.",
    icon: Plane,
  },
  {
    title: "Health & Wellness",
    description:
      "Respect highly personal data while still creating useful, timely, consented support experiences.",
    icon: HeartPulse,
  },
  {
    title: "Communities & Content",
    description:
      "Create membership, creator, and audience journeys that feel personal without being invasive.",
    icon: MessagesSquare,
  },
];

const reachChips = [
  "Email",
  "Calendar",
  "Wallet",
  "Retail",
  "Finance",
  "Travel",
  "Wellness",
  "Communities",
];

function ArrowIcon() {
  return (
    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function StepArrow() {
  return (
    <div className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 opacity-20 lg:block" aria-hidden="true">
      <span className="material-symbols-outlined text-3xl text-yukonGold">arrow_forward</span>
    </div>
  );
}

function SectionKicker({ children }) {
  return <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-yukonGold">{children}</span>;
}

function ProductCard({ title, description, href, background, overlay, icon: Icon }) {
  return (
    <div className="card-premium product-pillar-card relative min-h-[420px] overflow-hidden p-10 flex flex-col justify-between group">
      <div className="absolute inset-0 z-0">
        <Image
          alt={title}
          className="object-cover"
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
          src={background}
        />
        <Image
          alt=""
          aria-hidden="true"
          className="object-cover product-pillar-overlay"
          fill
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
          src={overlay}
        />
      </div>
      <div className="relative z-10">
        <span className="mb-6 block text-yukonGold">
          <Icon size={32} strokeWidth={1.6} />
        </span>
        <h4 className="mb-4 text-2xl text-white serif-font">{title}</h4>
        <p className="max-w-[240px] text-sm leading-relaxed text-white/80">{description}</p>
      </div>
      <Link href={href} className="relative z-10 flex items-center text-xs font-bold tracking-widest text-yukonGold transition-colors group-hover:text-white">
        EXPLORE NOW
        <ArrowIcon />
      </Link>
    </div>
  );
}

function UseCaseCard({ step, icon, title, description, children, showArrow = false }) {
  return (
    <div className="relative flex flex-col">
      <div className="card-premium flex h-full min-h-[400px] flex-col border-[#F2F2F2] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
        <div className="mb-6 flex items-start justify-between">
          <span className="rounded bg-yukonGold/5 px-2 py-1 text-[10px] font-bold text-yukonGold">STEP {step}</span>
          <span className="material-symbols-outlined text-xl text-yukonGold">{icon}</span>
        </div>
        {children}
        <div className="mt-8">
          <p className="text-sm font-semibold text-richBlack">{title}</p>
          <p className="mt-2 text-xs leading-relaxed text-mutedSlate">{description}</p>
        </div>
      </div>
      {showArrow ? <StepArrow /> : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <div data-site-home-main className="site-home-main min-h-[calc(100dvh-102px)] lg:min-h-[calc(100dvh-106px)] flex flex-col">
      <MotionSection
        as="section"
        family="marketing"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-12 md:px-12 lg:grid-cols-12"
      >
        <div className="lg:col-span-7">
          <div className="mb-6">
            <span className="badge-taupe">● Personal AI Ecosystem</span>
          </div>
          <h1 className="mb-4 text-5xl font-medium leading-tight text-richBlack md:text-7xl">
            Your Data. <br />
            <span className="italic text-mutedSlate">Your Business.</span>
          </h1>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-mutedSlate">
            Meet the world&apos;s first personal data agent platform — built with trust, privacy, and power at the
            core. Automate your digital life with consent-first AI designed to work for you.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link className="btn-midnight" href="/products/kai">
              Start With Kai
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <MotionStaggerGroup family="marketing" className="space-y-6 lg:col-span-5">
          {heroCards.map(({ title, description, icon: Icon }) => (
            <MotionStaggerItem key={title} family="marketing" className="card-premium flex items-start gap-5 p-8">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-offWhite text-yukonGold">
                <Icon size={24} strokeWidth={2} />
              </div>
              <div>
                <h2 className="mb-2 text-2xl text-richBlack serif-font">{title}</h2>
                <p className="text-sm leading-relaxed text-mutedSlate">{description}</p>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStaggerGroup>
      </MotionSection>

      <MotionSection
        as="section"
        family="marketing"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 border-t border-borderLight px-6 py-24 md:px-12 lg:grid-cols-2"
        delay={0.04}
      >
        <div className="flex flex-col items-start">
          <div className="mb-6">
            <SectionKicker>Why Hushh?</SectionKicker>
          </div>
          <h2 className="mb-8 text-4xl font-medium leading-tight text-richBlack md:text-6xl">
            Built for Trust.
            <br />
            <span className="italic text-mutedSlate">Designed for Control.</span>
          </h2>
          <p className="mb-12 max-w-lg text-lg leading-relaxed text-mutedSlate">
            Every digital interaction begins with absolute consent. We&apos;ve built a personal AI agent that operates
            exclusively on your terms, putting data sovereignty back in your hands—not the algorithms&apos;.
          </p>
          <ul className="space-y-6">
            {[
              ["iOS Verified", "Exclusive to authenticated Apple iOS users for maximum network integrity."],
              ["Consent-Native", "Built on a foundational layer where user permission is the primary directive."],
              ["Open Source & Secure", "Transparent codebase audited for security and privacy by the community."],
              ["Expert Engineering", "Developed by ex-Google AI infrastructure leaders with a mission for data sovereignty."],
            ].map(([title, description]) => (
              <li key={title} className="flex items-start gap-4">
                <BadgeCheck className="mt-1 shrink-0 text-yukonGold" size={20} strokeWidth={2.5} />
                <div>
                  <p className="text-sm font-semibold text-richBlack">{title}</p>
                  <p className="mt-1 text-xs text-mutedSlate">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="group relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-[40px] border border-borderLight bg-offWhite shadow-premium">
            <div className="absolute inset-0 bg-gradient-to-br from-yukonGold/5 to-transparent opacity-50" />
            <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full border border-yukonGold opacity-10 animate-pulse" />
            <div className="absolute left-1/3 top-1/3 h-48 w-48 rounded-full border border-yukonGold/50 opacity-10" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 flex h-32 w-32 items-center justify-center rounded-2xl border border-borderLight bg-white shadow-sm">
                <LockKeyhole className="text-yukonGold" size={64} strokeWidth={1.4} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-mutedTaupe">Encrypted Hub</div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        as="section"
        family="marketing"
        className="what-it-does-section mx-auto max-w-7xl border-t border-borderLight px-6 py-24 md:px-12"
        delay={0.06}
      >
        <div className="mb-16">
          <div className="mb-6">
            <SectionKicker>What It Does</SectionKicker>
          </div>
          <h2 className="mb-4 text-4xl font-medium leading-tight text-richBlack md:text-6xl">
            Your Agent. Your World.
            <br />
            <span className="italic text-mutedSlate">Seamlessly Synced.</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-mutedSlate">
            Hushh Agents connect to your cloud, inbox, apps, and favorite brands to automate your digital life — with
            total transparency.
          </p>
        </div>
        <MotionStaggerGroup family="marketing" className="what-it-does-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(({ title, description, icon: Icon }) => (
            <MotionStaggerItem key={title} family="marketing" className="what-it-does-card card-premium flex flex-col items-start p-8">
              <div className="what-it-does-icon-wrap mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                <Icon className="what-it-does-icon" size={24} strokeWidth={2} />
              </div>
              <h3 className="mb-3 text-xl">{title}</h3>
              <p className="text-sm leading-relaxed">{description}</p>
            </MotionStaggerItem>
          ))}
        </MotionStaggerGroup>
      </MotionSection>

      <InteractiveSandbox />

      <MotionSection
        as="section"
        family="marketing"
        id="products"
        className="mx-auto max-w-7xl border-t border-borderLight px-6 py-24 md:px-12"
        delay={0.08}
      >
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-medium leading-tight text-richBlack md:text-6xl">
            One Agent. <br className="md:hidden" />
            <span className="italic text-mutedSlate">Five Pillars of Power.</span>
          </h2>
          <p className="text-xl text-mutedSlate serif-font md:text-2xl">Ready to take control of your digital future?</p>
        </div>
        <MotionStaggerGroup family="marketing" className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {productCards.map((card) => (
            <MotionStaggerItem key={card.title} family="marketing">
              <ProductCard {...card} />
            </MotionStaggerItem>
          ))}
        </MotionStaggerGroup>
      </MotionSection>

      <MotionSection
        as="section"
        family="marketing"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 border-t border-borderLight px-6 py-24 md:px-12 lg:grid-cols-2"
        delay={0.1}
      >
        <div className="flex flex-col items-start">
          <div className="mb-6">
            <SectionKicker>Explore the Stack</SectionKicker>
          </div>
          <h2 className="mb-8 text-4xl font-medium leading-tight text-richBlack md:text-6xl">
            Open Source DNA.
            <br />
            <span className="italic text-mutedSlate serif-font">Built Like Nature.</span>
          </h2>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-mutedSlate">
            Inspired by how bacteria share DNA, Hushh Protocol lets developers copy, paste, and remix consent modules
            ("operons") that run anywhere — Safari, iOS, GCP
          </p>
          <div className="flex flex-col justify-start gap-4 sm:flex-row">
            <Link
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-yukonGold px-8 py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-opacity-90"
              href="/consent-ai-protocol"
            >
              View the Consent Protocol
            </Link>
            <a
              className="btn-midnight flex items-center justify-center rounded-full px-8 py-3 text-center"
              href="https://github.com/hushh-labs"
              target="_blank"
              rel="noreferrer noopener"
            >
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Contribute on GitHub
            </a>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="stack-visual-shell">
            <div className="dna-visual-card relative w-full max-w-md overflow-hidden bg-deepNavy shadow-premium">
              <Image
                alt="DNA protocol visualization"
                className="h-full w-full object-cover"
                height={960}
                src="/figma-assets/dna-protocol-visualization.svg"
                width={960}
              />
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        as="section"
        family="marketing"
        className="mx-auto max-w-7xl border-t border-borderLight px-6 py-24 md:px-12"
        delay={0.12}
      >
        <div className="mb-16 text-left">
          <div className="mb-6">
            <SectionKicker>Use Cases</SectionKicker>
          </div>
          <h2 className="mb-4 text-4xl font-medium leading-tight text-richBlack md:text-6xl">
            Agentic Intelligence <br />
            <span className="italic text-mutedSlate">in Action.</span>
          </h2>
          <p className="mb-12 max-w-lg text-lg leading-relaxed text-mutedSlate">Real outcomes. One tap. Zero effort.</p>
        </div>

        <MotionStaggerGroup family="marketing" className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <MotionStaggerItem family="marketing">
          <UseCaseCard step="01" icon="chat_bubble" title="1. Send Request" description="You send one smart request." showArrow>
            <div className="mb-auto rounded-xl border border-borderLight bg-offWhite p-4">
              <div className="mb-3 text-[10px] uppercase tracking-widest text-mutedTaupe">Smart Request</div>
              <div className="rounded-lg border border-borderLight bg-white p-4 text-sm italic leading-relaxed text-richBlack shadow-sm">
                &quot;Find noise-canceling earbuds that work with iPhone and don&apos;t fall out&quot;
              </div>
              <div className="mt-4 flex items-center justify-between opacity-40">
                <div className="flex gap-1">
                  <div className="h-3 w-1 rounded-full bg-yukonGold animate-pulse" />
                  <div className="h-5 w-1 rounded-full bg-yukonGold animate-pulse" />
                  <div className="h-2 w-1 rounded-full bg-yukonGold animate-pulse" />
                </div>
                <span className="material-symbols-outlined text-lg text-mutedSlate">mic</span>
              </div>
            </div>
          </UseCaseCard>
          </MotionStaggerItem>

          <MotionStaggerItem family="marketing">
          <UseCaseCard
            step="02"
            icon="psychology"
            title="2. Agent Analysis"
            description="Your agent checks your data, not the algorithm&apos;s."
            showArrow
          >
            <div className="relative mb-auto flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-richBlack p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-yukonGold/10 to-transparent" />
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-yukonGold/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yukonGold/20 animate-pulse">
                  <span className="text-xl font-bold text-yukonGold">H</span>
                </div>
                <div className="absolute inset-1 animate-[spin_4s_linear_infinite] rounded-full border border-yukonGold/10" />
              </div>
            </div>
          </UseCaseCard>
          </MotionStaggerItem>

          <MotionStaggerItem family="marketing">
          <UseCaseCard
            step="03"
            icon="verified"
            title="3. Direct Response"
            description="Trusted brand agents respond to your agent — not your inbox."
            showArrow
          >
            <div className="mb-auto space-y-2 rounded-xl border border-borderLight bg-offWhite p-4">
              <div className="mb-3 text-[10px] uppercase tracking-widest text-mutedTaupe">Verified Responses</div>
              {[
                ["A", "Apple AirPods Pro", true],
                ["B", "Bose QuietComfort", false],
                ["S", "Sony WF-1000XM5", false],
              ].map(([initial, label, active]) => (
                <div
                  key={label}
                  className={`flex items-center justify-between rounded-lg border border-borderLight bg-white p-3 ${active ? "" : initial === "B" ? "opacity-60" : "opacity-40"}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-black">
                      <span className="text-[7px] font-bold text-white">{initial}</span>
                    </div>
                    <span className="text-[9px] font-medium">{label}</span>
                  </div>
                  <BadgeCheck className={active ? "text-yukonGold" : "text-yukonGold/40"} size={14} />
                </div>
              ))}
            </div>
          </UseCaseCard>
          </MotionStaggerItem>

          <MotionStaggerItem family="marketing">
          <UseCaseCard step="04" icon="shopping_cart" title="4. Final Choice" description="You choose, securely and effortlessly.">
            <div className="mb-auto rounded-xl border border-borderLight bg-offWhite p-4">
              <div className="rounded-lg border border-borderLight bg-white p-3 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-offWhite">
                    <ShoppingCart className="text-mutedSlate" size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold">AirPods Pro</div>
                    <div className="text-[8px] text-mutedSlate">2nd generation</div>
                    <div className="mt-0.5 text-[10px] font-bold text-yukonGold">$249</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="rounded bg-richBlack py-1.5 text-[8px] font-bold uppercase tracking-wider text-white">Buy Now</button>
                  <button className="rounded border border-borderLight bg-offWhite py-1.5 text-[8px] font-bold uppercase tracking-wider text-richBlack">Save</button>
                </div>
              </div>
            </div>
          </UseCaseCard>
          </MotionStaggerItem>
        </MotionStaggerGroup>
      </MotionSection>

      <MotionSection
        as="section"
        family="marketing"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 border-t border-borderLight px-6 py-24 md:px-12 lg:grid-cols-2"
        delay={0.14}
      >
        <div className="order-2 flex justify-center lg:order-1 lg:justify-center">
          <div className="card-premium philosophy-image-card w-full max-w-lg border-richBlack">
            <Image
              alt="A person interacting with Hushh luxury-tech interface on a laptop and smartphone"
              className="aspect-[16/10] h-auto w-full object-cover object-center"
              height={900}
              src="/figma-assets/personal-agent-interface-luxury.svg"
              width={1440}
            />
          </div>
        </div>
        <div className="order-1 flex flex-col items-start lg:order-2">
          <div className="mb-6">
            <SectionKicker>Our Philosophy</SectionKicker>
          </div>
          <h2 className="mb-8 text-4xl font-medium leading-tight text-richBlack md:text-6xl">
            Consent <br />
            <span className="italic text-mutedSlate serif-font">is the New Cookie</span>
          </h2>
          <p className="mb-10 max-w-lg text-lg leading-relaxed text-mutedSlate">
            Hushh helps brands engage users with trust-first intelligence. Personal data agents become your best sales
            reps — always aligned with customer needs.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link className="btn-midnight px-10" href="/contact-us">
              Become a Partner
            </Link>
            <Link className="btn-outline px-10 transition-colors" href="/demoBookingPage">
              Book a Demo
            </Link>
          </div>
        </div>
      </MotionSection>

      <MotionSection as="section" family="marketing" className="trust-strip border-y border-borderLight py-12" delay={0.16}>
        <MotionStaggerGroup family="marketing" className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-6 md:justify-between md:gap-8">
          {trustItems.map(({ label, icon: Icon }) => (
            <MotionStaggerItem key={label} family="marketing" className="trust-pill">
              <Icon className="h-4 w-4 text-yukonGold" />
              <span>{label}</span>
            </MotionStaggerItem>
          ))}
        </MotionStaggerGroup>
      </MotionSection>

      <MotionSection
        as="section"
        family="marketing"
        id="contact"
        className="mx-auto max-w-7xl border-t border-borderLight px-6 py-20 md:px-12"
        delay={0.18}
      >
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div className="flex flex-col items-start">
            <div className="mb-6">
              <SectionKicker>Everywhere Users Already Are</SectionKicker>
            </div>
            <h2 className="mb-8 text-4xl font-medium leading-tight text-richBlack md:text-6xl">
              Meet people where life already happens. <br />
              <span className="italic text-mutedSlate serif-font">Without forcing a new habit.</span>
            </h2>
            <p className="mb-6 max-w-xl text-lg leading-relaxed text-mutedSlate">
              Hushh works across the inboxes, wallets, stores, calendars, communities, and travel flows people already
              trust. The experience feels native because the intelligence lives inside the journey, not on top of it as
              a static image.
            </p>
            <p className="mb-10 max-w-xl text-sm leading-relaxed text-mutedSlate/90">
              That means brands can serve with consent, users stay in control, and Agent Kai can act in the moments
              that matter instead of dragging everyone into another disconnected dashboard.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link className="btn-midnight" href="/contact-us">
                Talk to Hushh
              </Link>
              <Link className="btn-outline" href="/products/kai">
                Explore Agent Kai
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <MotionStaggerGroup family="marketing" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reachCards.map(({ title, description, icon: Icon }) => (
                <MotionStaggerItem key={title} family="marketing" className="card-premium bg-white p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-offWhite text-yukonGold">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-3 text-xl text-richBlack serif-font">{title}</h3>
                  <p className="text-sm leading-relaxed text-mutedSlate">{description}</p>
                </MotionStaggerItem>
              ))}
            </MotionStaggerGroup>

            <div className="card-premium bg-[#FCFCFC] p-6">
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-mutedTaupe">
                Designed for the surfaces people already trust
              </div>
              <div className="flex flex-wrap gap-3">
                {reachChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-borderLight bg-white px-4 py-2 text-xs font-semibold text-richBlack"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        as="section"
        family="marketing"
        className="mx-auto max-w-7xl px-6 pb-20 pt-4 md:px-12"
        delay={0.2}
      >
        <div className="max-w-3xl text-left items-start">
          <div className="mb-6 text-left">
            <SectionKicker>Our Marketplace Reach Will Be</SectionKicker>
          </div>
          <h2 className="mb-8 text-left text-5xl font-medium leading-[0.95] text-richBlack md:text-7xl">
            Everywhere <br />
            <span className="italic text-mutedSlate serif-font">Users Already Are</span>
          </h2>
          <p className="max-w-2xl text-left text-lg leading-relaxed text-mutedSlate md:text-[1.9rem]">
            Seamlessly accessible across major marketplaces — from the iOS App Store to Hugging Face — ensuring your
            users can discover, integrate, and launch effortlessly within their existing ecosystems.
          </p>
        </div>
      </MotionSection>
    </div>
  );
}
