"use client";

import React from "react";
import {
  MdArrowRightAlt,
  MdAssistant,
  MdAutoAwesome,
  MdCalendarToday,
  MdDiversity1,
  MdFolderShared,
  MdHistory,
  MdHub,
  MdLock,
  MdManageSearch,
  MdMemory,
  MdMonetizationOn,
  MdPayments,
  MdPsychology,
  MdPsychologyAlt,
  MdRule,
  MdSmartToy,
  MdTimeline,
  MdVerifiedUser,
  MdWarning,
} from "react-icons/md";
import ContactForm from "../_components/features/contactForm";

const leadersTop = [
  "Albert Bourla",
  "Michael Dell",
  "Reed Hastings",
  "Doug McMillon",
  "Cristiano Amon",
  "Lisa Su",
  "Arvind Krishna",
  "Ginni Rometty",
  "Safra Catz",
];

const leadersFocus = ["Manish Sainani","Sundar Pichai","Stephane Bancel", "Alex Gorsky"];

const leadersBottom = [
  "Bill Gates",
  "Jeff Bezos",
  "Satya Nadella",
  "Tim Cook",
  "Andy Jassy",
  "Mark Zuckerberg",
];

const leadersSequence = [...leadersTop, ...leadersFocus, ...leadersBottom];

const getLeaderClass = (index) => {
  if (index <= 1) return "text-lg font-medium text-gray-200 blur-[1px]";
  if (index <= 3) return "text-xl font-medium text-gray-300";
  if (index === 4) return "text-2xl font-medium text-gray-400";
  if (index === 5) return "text-3xl font-semibold text-gray-500";
  if (index === 6) return "text-3xl font-bold text-gray-600";
  if (index <= 8) return "text-4xl font-bold text-gray-700";
  if (index <= 10) return "text-5xl font-extrabold brand-gradient leading-none";
  if (index === 11) return "text-4xl font-bold text-gray-800";
  if (index === 12) return "text-3xl font-bold text-gray-700";
  if (index === 13) return "text-3xl font-semibold text-gray-600";
  if (index <= 15) return "text-2xl font-medium text-gray-400";
  return "text-xl font-medium text-gray-200 blur-[1px]";
};

const aboutHighlights = [
  {
    title: "Privacy-first",
    description: "Your data stays yours.",
    icon: MdVerifiedUser,
    iconTone: "bg-[rgba(23,27,41,0.08)] text-[#171b29]",
  },
  {
    title: "AI-Driven",
    description: "Intelligent organization.",
    icon: MdSmartToy,
    iconTone: "bg-[rgba(143,133,112,0.14)] text-[#171b29]",
  },
  {
    title: "Monetized by You",
    description: "Value from your data.",
    icon: MdMonetizationOn,
    iconTone: "bg-[rgba(183,167,137,0.18)] text-[#171b29]",
  },
];

const solutionItems = [
  {
    title: "Organizes your digital life",
    description: "Collects and organizes your data: email, docs, receipts, and habits.",
    icon: MdFolderShared,
    tone: "text-[#171b29] bg-[rgba(23,27,41,0.08)]",
  },
  {
    title: "Predictive Intelligence",
    description: "Answers your questions before you ask.",
    icon: MdPsychology,
    tone: "text-[#171b29] bg-[rgba(183,167,137,0.18)]",
  },
  {
    title: "Your Personal Agent",
    description: "Buys things for you. Sells things you permit.",
    icon: MdAssistant,
    tone: "text-[#171b29] bg-[rgba(143,133,112,0.14)]",
  },
  {
    title: "Tracks your life",
    description: "Tracks your spend, tasks, and life across services.",
    icon: MdTimeline,
    tone: "text-[#171b29] bg-[rgba(248,246,241,0.92)]",
  },
  {
    title: "Earn from your data",
    description: "Finds offers you love and pays you when sharing is consented.",
    icon: MdMonetizationOn,
    tone: "text-[#171b29] bg-[rgba(183,167,137,0.18)]",
  },
];

const nowVsFuture = [
  {
    now: "Track my monthly subscriptions manually",
    futureTitle: "Finds & Alerts",
    futureDescription: "Finds recurring charges & alerts you.",
    icon: MdManageSearch,
    iconTone: "bg-[rgba(23,27,41,0.08)] text-[#171b29]",
    arrowTone: "text-[#171b29]",
    cornerTone: "from-[rgba(23,27,41,0.12)] to-transparent",
  },
  {
    now: "Book appointments when I have time",
    futureTitle: "Full Scheduling",
    futureDescription: "Logs events automatically for you.",
    icon: MdCalendarToday,
    iconTone: "bg-[rgba(143,133,112,0.14)] text-[#171b29]",
    arrowTone: "text-[#171b29]",
    cornerTone: "from-[rgba(143,133,112,0.18)] to-transparent",
  },
  {
    now: "Share preferences with local shops",
    futureTitle: "Consent First",
    futureDescription: "Only what's necessary, with consent.",
    icon: MdVerifiedUser,
    iconTone: "bg-[rgba(183,167,137,0.18)] text-[#171b29]",
    arrowTone: "text-[#171b29]",
    cornerTone: "from-[rgba(183,167,137,0.2)] to-transparent",
  },
  {
    now: "Sell my fitness data to brands",
    futureTitle: "You Profit",
    futureDescription: "Earn from your own data.",
    icon: MdPayments,
    iconTone: "bg-[rgba(248,246,241,0.92)] text-[#171b29]",
    arrowTone: "text-[#171b29]",
    cornerTone: "from-[rgba(23,27,41,0.1)] to-transparent",
  },
];

const differentiators = [
  {
    title: "Elite Expertise",
    description: "Built by former Google AI and Cloud leaders with deep execution experience.",
    icon: MdPsychologyAlt,
    iconTone: "text-[#171b29] bg-[rgba(23,27,41,0.08)]",
  },
  {
    title: "Consent First",
    description: "Runs on consent-first infrastructure where permission is always explicit.",
    icon: MdVerifiedUser,
    iconTone: "text-[#171b29] bg-[rgba(143,133,112,0.14)]",
  },
  {
    title: "Human Centric",
    description: "Designed with human psychology at the core, not just technology.",
    icon: MdDiversity1,
    iconTone: "text-[#171b29] bg-[rgba(183,167,137,0.18)]",
  },
  {
    title: "You Profit",
    description: "Monetization powered by you and for you, not for advertisers.",
    icon: MdPayments,
    iconTone: "text-[#171b29] bg-[rgba(248,246,241,0.92)]",
  },
  {
    title: "Open Protocols",
    description: "Built on open protocols like A2A, MCP, and ADK.",
    icon: MdHub,
    iconTone: "text-[#171b29] bg-[rgba(23,27,41,0.08)]",
  },
];

const trustItems = [
  {
    title: "Encrypted Vault",
    description: "End-to-end encrypted personal data vault.",
    icon: MdLock,
    iconTone: "text-[#171b29] bg-[rgba(23,27,41,0.08)]",
  },
  {
    title: "On-Device Learning",
    description: "Preference learning happens locally on your phone.",
    icon: MdMemory,
    iconTone: "text-[#171b29] bg-[rgba(143,133,112,0.14)]",
  },
  {
    title: "Strict Opt-In",
    description: "No data is shared without your explicit permission.",
    icon: MdRule,
    iconTone: "text-[#171b29] bg-[rgba(183,167,137,0.18)]",
  },
  {
    title: "Transparent Logs",
    description: "Clear audit logs for every action taken.",
    icon: MdHistory,
    iconTone: "text-[#171b29] bg-[rgba(248,246,241,0.92)]",
  },
];

const HushhPDA = () => {
  return (
    <>
    <div className="relative w-full overflow-hidden bg-white text-[#111827]">
      <style jsx>{`
        .brand-gradient {
          background: linear-gradient(90deg, #171b29 0%, #8f8570 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .text-gradient-brand {
          background: linear-gradient(90deg, #171b29 0%, #8f8570 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .glass-card-enhanced {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.08), 0 4px 10px -5px rgba(0, 0, 0, 0.03);
        }

        .leaders-mask {
          mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
        }

        .leaders-marquee {
          height: clamp(420px, 70vh, 620px);
          overflow: hidden;
          position: relative;
        }

        .leaders-track {
          display: flex;
          flex-direction: column;
          animation: leadersUp 22s linear infinite;
        }

        .leaders-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0;
        }

        @keyframes leadersUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .leaders-track {
            animation: none;
          }
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.76);
          border: 1px solid rgba(226, 232, 240, 0.8);
          backdrop-filter: blur(12px);
          box-shadow: 0 18px 40px -26px rgba(15, 23, 42, 0.32);
        }

        .brush-underline {
          position: relative;
          display: inline-block;
        }

        .brush-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -7px;
          width: 100%;
          height: 8px;
          background: linear-gradient(90deg, rgba(23, 27, 41, 0.14) 0%, rgba(143, 133, 112, 0.3) 100%);
          border-radius: 999px;
          transform: skewX(-14deg);
        }

      `}</style>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#F3F4F6]">
        <div className="pointer-events-none absolute -left-16 bottom-28 h-44 w-44 rounded-full bg-[rgba(143,133,112,0.22)] blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-1/3 h-52 w-52 rounded-full bg-[rgba(23,27,41,0.12)] blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14 xl:py-20">
          <div className="grid gap-10 xl:grid-cols-[1fr_0.95fr] xl:items-center">
            <div className="mx-auto flex w-full max-w-[430px] flex-col items-center text-center xl:mx-0 xl:max-w-[520px] xl:items-start xl:text-left">
            <p className="flex items-center gap-1.5 text-sm font-medium text-slate-600 md:text-base">
              <span>Powered by</span>
              <img src="/svgs/hushhEmoji.svg" alt="Hushh emoji" className="h-4 w-4 object-contain" />
              <span className="font-bold text-[#8f8570]">Hushh.ai</span>
            </p>

            <h1 className="mt-5 max-w-[320px] text-4xl font-extrabold leading-tight tracking-tight text-[#101828] md:max-w-[360px] md:text-5xl xl:max-w-[520px] xl:text-6xl">
              Personal Data Agent
            </h1>

            <p className="mt-5 text-lg font-medium leading-relaxed text-slate-600 md:text-xl xl:text-[1.45rem] xl:leading-[1.45]">
              Your Agent. Your data.
              <br />
              Your business. Your vibe.
            </p>

            <a
              href="#get-in-touch"
              className="mt-8 inline-flex h-[56px] w-full max-w-[370px] items-center justify-center rounded-full bg-[#171b29] px-8 text-lg font-semibold text-white shadow-[0_14px_28px_-10px_rgba(23,27,41,0.35)] transition hover:bg-[#0f1422] xl:max-w-[320px]"
            >
              Get Early Access
            </a>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 xl:pl-1">
              Privacy first. Always.
            </p>
            </div>

            <div className="mx-auto w-full max-w-[312px] xl:max-w-[430px]">
              <img
                src="/svgs/pdamobile1.svg"
                alt="Hushh PDA mobile preview"
                className="h-auto w-full object-contain drop-shadow-[0_26px_54px_rgba(23,27,41,0.18)] xl:drop-shadow-[0_36px_70px_rgba(23,27,41,0.22)]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F3F4F6]">
        <div className="mx-auto max-w-6xl px-4 py-12 md:py-16 xl:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <header className="mx-auto max-w-[430px] text-center lg:mx-0 lg:text-left">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-800 md:text-4xl">
              Top 1024 Leaders we want to onboard onto our platform
            </h2>
            <p className="mt-3 text-sm font-medium text-slate-500">Join the exclusive network today</p>
          </header>

          <div className="mx-auto w-full max-w-[430px] lg:mt-0 lg:max-w-[520px]">
            <div className="leaders-mask leaders-marquee">
              <div className="leaders-track">
                {[0, 1].map((copyIndex) => (
                  <div className="leaders-group" key={`leaders-copy-${copyIndex}`}>
                    {leadersSequence.map((name, index) => (
                      <p key={`${copyIndex}-${name}`} className={`${getLeaderClass(index)} text-center leading-tight`}>
                        {name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
              About <span className="brush-underline brand-gradient">hushh pda</span>
            </h2>

            <p className="mt-8 text-lg font-medium leading-relaxed text-slate-900">
              Meet your Personal Data Agent called hushh until you give it your personal <span className="brand-gradient font-bold">hushhname</span>
              , like <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-base">mani$h</span>{" "}
              for our founder and CEO, Manish Sainani.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-slate-500">
              AI that organizes your life, protects your privacy, and helps your data work for you, not the other way
              around.
            </p>
          </div>

          <div className="space-y-4">
            {aboutHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="glass-card flex items-center gap-4 rounded-[2rem] p-5">
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${item.iconTone}`}>
                    <Icon className="text-[28px]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-slate-500">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-red-600">
              <MdWarning className="text-base" /> The Problem
            </div>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
              You don&apos;t control
              <br />
              <span className="brush-underline brand-gradient">your own data.</span>
            </h2>

            <p className="mt-6 text-base font-semibold leading-relaxed text-slate-800">
              The most powerful companies in the world are built on your data. But you don&apos;t control it. You don&apos;t
              profit from it. You can&apos;t even see it. We built <span className="brand-gradient font-bold">hushh</span> to
              change that forever.
            </p>
          </div>

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[rgba(143,133,112,0.16)] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#171b29]">
              <MdAutoAwesome className="text-base" /> The Solution
            </div>

            <p className="mb-7 text-base leading-relaxed text-slate-600">
              A smart AI that lives on your device, learns your preferences, and acts on your behalf.
            </p>

            <div className="space-y-4">
              {solutionItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article key={item.title} className="glass-card rounded-2xl p-4">
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.tone}`}>
                        <Icon className="text-xl" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F3F4F6]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14" style={{ fontFamily: "Inter, sans-serif" }}>
          <div className="mx-auto w-full max-w-[980px] rounded-[28px] border border-white/70 bg-[#F3F4F6] shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)]">
          <header className="z-10 px-6 pb-6 pt-[59px] text-center md:px-10 md:pt-14">
            <h2 className="text-[2.5rem] font-extrabold leading-none tracking-[-1px] text-[#111827] md:text-[3rem]">
              Now <span className="mx-1 align-middle text-2xl font-medium text-[#374151]">vs.</span>
              <span className="relative inline-block">
                <span className="text-gradient-brand">Future You</span>
                <svg className="absolute -bottom-2 left-0 h-3 w-full text-[rgba(143,133,112,0.34)]" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M0 5 Q 50 12 100 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                </svg>
              </span>
            </h2>
            <p className="mt-4 text-[16.3px] font-medium leading-[1.4] text-[#333333]">We&apos;re not just another AI app.</p>
          </header>

          <div className="relative z-0 flex flex-col px-[20px] pb-[60px] md:px-10 md:pb-12">
            <div className="pointer-events-none absolute right-0 top-20 -z-10 h-64 w-64 rounded-full bg-[rgba(143,133,112,0.16)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-40 left-0 -z-10 h-64 w-64 rounded-full bg-[rgba(23,27,41,0.08)] blur-3xl" />

            <div className="space-y-4">
              <div className="mb-2 grid grid-cols-[1fr_24px_1.4fr] items-center gap-3 px-2 md:grid-cols-[1fr_36px_1fr] md:gap-4">
                <div className="pl-3 text-[11px] font-extrabold uppercase tracking-[0.1em] text-gray-400">Now</div>
                <div />
                <div className="pl-3.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#171b29]">Future</div>
              </div>

              {nowVsFuture.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.futureTitle}
                    className={`grid grid-cols-[1fr_24px_1.4fr] items-center gap-3 md:grid-cols-[1fr_36px_1fr] md:gap-4 ${index > 0 ? "mt-2" : ""}`}
                  >
                    <div className="flex h-full flex-col justify-center pr-1">
                      <div className="flex h-full items-start gap-2 py-4">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        <p className="text-[14px] font-medium leading-tight text-[#333333] md:text-[15px]">{item.now}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <MdArrowRightAlt className={`text-[24px] ${item.arrowTone}`} style={{ fontWeight: 600 }} />
                    </div>

                    <div className="glass-card-enhanced relative overflow-hidden rounded-2xl p-3.5 md:p-4">
                      <div
                        className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-bl-full bg-gradient-to-br ${item.cornerTone}`}
                      />
                      <div className="flex h-full flex-col">
                        <div className="mb-2">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-sm ${item.iconTone}`}>
                            <Icon className="text-[20px]" />
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-0.5 text-[14px] font-bold leading-tight text-black md:text-[15px]">{item.futureTitle}</h3>
                          <p className="text-[12px] font-medium leading-tight text-[#333333] md:text-[13px]">{item.futureDescription}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50/80">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <header className="text-center">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
              Why is <span className="brush-underline brand-gradient">hushh</span> Different?
            </h2>
            <p className="mt-4 text-lg font-medium text-slate-700">We&apos;re not just another AI app.</p>
            <p className="mt-1 text-xl font-black tracking-tight text-slate-900">We&apos;re a movement for data sovereignty.</p>
          </header>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {differentiators.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className={`glass-card rounded-2xl p-5 ${index === differentiators.length - 1 ? "md:col-span-2" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${item.iconTone}`}>
                      <Icon className="text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#get-in-touch"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-[#171b29] px-7 text-base font-semibold text-white transition hover:bg-[#0f1422]"
            >
              Continue
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
          <header className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Trust and Privacy <span className="brush-underline brand-gradient">First</span>
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-500">
              Your data security is our top priority. Here&apos;s how we protect you.
            </p>
          </header>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${item.iconTone}`}>
                    <Icon className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </article>
              );
            })}
          </div>

          <p className="mt-10 text-center text-2xl font-bold leading-snug text-slate-900">
            You decide what gets shared,
            <br />
            <span className="brand-gradient">when, and why.</span>
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F3F4F6]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
          <div className="mx-auto w-full max-w-[980px] rounded-[28px] border border-white/70 bg-[#F3F4F6] px-5 pb-8 pt-12 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)] md:px-10 md:pb-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div className="order-2 text-center lg:order-1 lg:text-left">
                <header>
                  <h2 className="mx-auto max-w-[290px] text-[32px] font-bold leading-[1.1] tracking-tight text-slate-900 lg:mx-0">
                    Developer and Partner CTA
                  </h2>
                  <p className="mt-3 text-[22px] font-semibold leading-tight text-slate-900">
                    Build with <span className="brand-gradient">hushhKit.</span>
                  </p>
                </header>

                <div className="mt-6">
                  <h3 className="text-[16.3px] font-semibold leading-snug text-slate-900">
                    Are you a dev, creator, or data agent architect?
                  </h3>
                  <p className="mx-auto mt-4 max-w-[330px] text-[17px] leading-[1.45] text-slate-600 lg:mx-0">
                    Use our open tools to build AI agents that plug into hushh&apos;s consent-first data vault, memory
                    graph, and monetization APIs.
                  </p>
                </div>

                <div className="mt-6 text-center lg:text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8f8570]">
                    HushhLink trust tokens for identity
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2 lg:justify-start">
                    <span className="h-[6px] w-[6px] rounded-full bg-black" />
                    <span className="h-[6px] w-[6px] rounded-full bg-[#D1D5DB]" />
                    <span className="h-[6px] w-[6px] rounded-full bg-[#D1D5DB]" />
                  </div>
                </div>

                <div className="mt-8 pb-1">
                  <a
                    href="/developers"
                    className="inline-flex h-[54px] w-full items-center justify-center rounded-full bg-[#171b29] px-8 text-[17px] font-semibold text-white shadow-[0_12px_24px_-8px_rgba(23,27,41,0.32)] transition hover:bg-[#0f1422] md:mx-auto md:max-w-[360px] lg:mx-0"
                  >
                    Launch Your Agent
                  </a>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative mx-auto flex h-[280px] w-full max-w-[300px] items-center justify-center md:h-[320px] md:max-w-[360px]">
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(143,133,112,0.14)] blur-3xl" />
                  <div className="pointer-events-none absolute bottom-4 left-5 h-20 w-20 rounded-full bg-[rgba(23,27,41,0.1)] blur-2xl" />
                  <img
                    src="/svgs/develoeprpartnercta.svg"
                    alt="Developer and Partner CTA visual"
                    className="relative z-10 h-auto w-full max-w-[290px] object-contain drop-shadow-[0_16px_36px_rgba(23,27,41,0.18)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>
      <ContactForm />
    </>
  );
};

export default HushhPDA;
