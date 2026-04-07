"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/app/context/AuthContext";

import IdentityBootstrapModal from "./components/IdentityBootstrapModal";
import ResearchCanvas from "./components/ResearchCanvas";
import ResultPanel from "./components/ResultPanel";
import { useHushhV02Intelligence } from "./hooks/useHushhV02Intelligence";
import HushhV02Hero from "./sections/HushhV02Hero";
import HushhV02SearchConsole from "./sections/HushhV02SearchConsole";
import { hushhV02Tokens } from "./theme/tokens";

function FooterLink({ href, children }) {
  return (
    <Link href={href} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-blue-600 sm:text-xs sm:tracking-[0.2em]">
      {children}
    </Link>
  );
}

export default function HushhV02Page() {
  const { user } = useAuth();
  const {
    activeLane,
    setActiveLane,
    session,
    dossier,
    isReady,
    phase,
    phaseError,
    searchStatus,
    searchError,
    searchResult,
    activeThread,
    submitIdentity,
    retryResearch,
    setPendingQuery,
    runSearch,
    clearSession,
    clearWebThread,
  } = useHushhV02Intelligence();

  const [query, setQuery] = useState("");
  const [intent, setIntent] = useState("general");
  const [isBootstrapOpen, setBootstrapOpen] = useState(false);

  const defaultName = session?.name || user?.displayName || (user?.email ? user.email.split("@")[0] : "");
  const defaultEmail = session?.email || user?.email || "";

  useEffect(() => {
    if (!session?.pendingQuery) {
      return;
    }

    setQuery((current) => (current ? current : session.pendingQuery));
  }, [session?.pendingQuery]);

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery);
    if (activeLane === "me" && session && !isReady) {
      setPendingQuery(nextQuery);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }
    if (activeLane === "web") {
      try {
        await runSearch({ query: trimmedQuery, intent, lane: "web" });
      } catch {
        return;
      }
      return;
    }

    if (!isReady) {
      if (session) {
        setPendingQuery(trimmedQuery);
        if (phase === "error") {
          try {
            await retryResearch();
          } catch {
            return;
          }
        }
        return;
      }

      setBootstrapOpen(true);
      return;
    }
    try {
      await runSearch({ query: trimmedQuery, intent, lane: "me" });
    } catch {
      return;
    }
  };

  const handleBootstrapSubmit = async (payload) => {
    try {
      await submitIdentity({
        ...payload,
        pendingQuery: query,
        onConsentGranted: () => setBootstrapOpen(false),
      });
    } catch {
      return;
    }
  };

  const handleReset = () => {
    clearSession();
    setBootstrapOpen(true);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#f8f9fa] text-[#191c1d]"
      style={{ backgroundImage: hushhV02Tokens.gradients.background }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-blue-500/10 blur-[90px]" />
      <div className="pointer-events-none absolute -right-20 top-24 h-96 w-96 rounded-full bg-blue-400/10 blur-[110px]" />

      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/65 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-10">
          <Link href="/hushh-v02" className="text-2xl font-extrabold tracking-[-0.06em] text-slate-950">
            hushh
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/solutions" className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600">
              Platform
            </Link>
            <Link href="/privacy" className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600">
              Privacy
            </Link>
            <Link href="/developers" className="text-sm font-semibold text-slate-600 transition-colors hover:text-blue-600">
              Developers
            </Link>
          </nav>
          <Link
            href="/login"
            className="shrink-0 rounded-full bg-[linear-gradient(135deg,#0058bc_0%,#0070eb_100%)] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_14px_28px_-18px_rgba(0,88,188,0.9)] sm:px-5 sm:py-3 sm:text-sm"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-12 sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <HushhV02Hero />
        <HushhV02SearchConsole
          lane={activeLane}
          onLaneChange={setActiveLane}
          query={query}
          onQueryChange={handleQueryChange}
          onSubmit={handleSearchSubmit}
          onOpenIdentityModal={() => setBootstrapOpen(true)}
          onClearIdentity={handleReset}
          onClearWebThread={clearWebThread}
          intent={intent}
          onIntentChange={setIntent}
          phase={phase}
          phaseError={phaseError}
          searchStatus={searchStatus}
          searchError={searchError}
          isReady={isReady}
          identityName={session?.name || defaultName || "you"}
          pendingQuery={session?.pendingQuery || ""}
          threadCount={activeThread.length}
        />

        <section className="mx-auto mt-8 w-full max-w-5xl overflow-x-hidden md:mt-10">
          {activeLane === "me" && !isReady && session ? (
            <ResearchCanvas
              phase={phase}
              session={session}
              error={phase === "error" ? phaseError : ""}
              onRetry={() => {
                void retryResearch();
              }}
              onEditIdentity={() => setBootstrapOpen(true)}
            />
          ) : null}

          <ResultPanel
            lane={activeLane}
            session={session}
            dossier={dossier}
            result={searchResult}
            thread={activeThread}
            onSuggestionSelect={handleQueryChange}
          />
        </section>
      </main>

      <footer className="border-t border-white/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">UAT Search Console</p>
          <div className="flex flex-wrap gap-4 sm:gap-5">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/solutions">Platform</FooterLink>
            <FooterLink href="/developers">Developers</FooterLink>
            <FooterLink href="/products/kai">Kai</FooterLink>
          </div>
        </div>
      </footer>

      <IdentityBootstrapModal
        isOpen={isBootstrapOpen}
        onClose={() => setBootstrapOpen(false)}
        defaultName={defaultName}
        defaultEmail={defaultEmail}
        status={phase}
        error={phase === "locked" || phase === "requesting-location" ? phaseError : ""}
        onSubmit={handleBootstrapSubmit}
      />
    </div>
  );
}
