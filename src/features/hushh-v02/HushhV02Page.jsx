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
    <Link
      href={href}
      className="text-[12px] font-medium tracking-[-0.01em] text-[#6e6e73] transition-colors duration-200 hover:text-[#1d1d1f]"
    >
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

  const handleLaneChange = (nextLane) => {
    if (nextLane !== activeLane) {
      setQuery("");
      setIntent("general");
    }
    setActiveLane(nextLane);
  };

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
      className="relative min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f] antialiased"
      style={{
        backgroundImage: hushhV02Tokens.gradients.background,
        fontFamily: hushhV02Tokens.typography.body,
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/90 via-white/55 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-white/70 blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 top-56 h-72 w-72 rounded-full bg-[#7aa6ff]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 top-36 h-80 w-80 rounded-full bg-white/80 blur-[120px]" />

      <header className="sticky top-0 z-30 border-b border-black/5 bg-[rgba(251,251,253,0.72)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/hushh-v02" className="text-[2rem] font-semibold tracking-[-0.07em] text-[#1d1d1f]">
            hushh
          </Link>
          <nav className="hidden items-center gap-10 md:flex">
            <Link href="/solutions" className="text-[0.95rem] font-medium tracking-[-0.01em] text-[#424245] transition-colors duration-200 hover:text-[#1d1d1f]">
              Platform
            </Link>
            <Link href="/privacy" className="text-[0.95rem] font-medium tracking-[-0.01em] text-[#424245] transition-colors duration-200 hover:text-[#1d1d1f]">
              Privacy
            </Link>
            <Link href="/developers" className="text-[0.95rem] font-medium tracking-[-0.01em] text-[#424245] transition-colors duration-200 hover:text-[#1d1d1f]">
              Developers
            </Link>
          </nav>
          <Link
            href="/login"
            className="shrink-0 rounded-full bg-[#0071e3] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-22px_rgba(0,113,227,0.75)] transition-transform duration-200 hover:scale-[0.985]"
          >
            Sign In
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1120px] flex-col px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pb-24">
        <HushhV02Hero />
        <HushhV02SearchConsole
          lane={activeLane}
          onLaneChange={handleLaneChange}
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

        <section className="mx-auto mt-10 w-full max-w-[1060px] overflow-x-hidden sm:mt-12">
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

      <footer className="border-t border-black/5 bg-[rgba(251,251,253,0.72)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="text-[12px] font-medium tracking-[-0.01em] text-[#8f8f95]">UAT Search Console</p>
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
