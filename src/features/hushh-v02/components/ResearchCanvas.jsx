"use client";

import { useEffect, useMemo, useState } from "react";

const STAGES = [
  "Verifying your identity signals",
  "Mapping your location context",
  "Scanning public profiles and mentions",
  "Synthesizing your intelligence dossier",
];

function stageStatus(index, activeIndex, isError) {
  if (isError && index === activeIndex) {
    return "error";
  }
  if (index < activeIndex) {
    return "complete";
  }
  if (index === activeIndex) {
    return "active";
  }
  return "pending";
}

function StageRow({ label, status }) {
  const tone = {
    complete: "border-emerald-200 bg-emerald-50 text-emerald-700",
    active: "border-blue-200 bg-blue-50 text-blue-700",
    error: "border-red-200 bg-red-50 text-red-700",
    pending: "border-slate-200 bg-white text-slate-400",
  }[status];

  return (
    <div className={`flex items-start gap-3 rounded-[1.2rem] border px-4 py-3.5 sm:items-center sm:gap-4 sm:rounded-[1.4rem] sm:py-4 ${tone}`}>
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/85 text-xs font-bold uppercase">
        {status === "complete" ? "OK" : status === "error" ? "!" : status === "active" ? "..." : ""}
      </span>
      <p className="text-sm font-semibold tracking-tight leading-6">{label}</p>
    </div>
  );
}

export default function ResearchCanvas({ phase, session, error, onRetry, onEditIdentity }) {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    if (!session?.researchStartedAt) {
      setElapsedMs(0);
      return;
    }

    const tick = () => {
      const startedAt = new Date(session.researchStartedAt).getTime();
      setElapsedMs(Number.isFinite(startedAt) ? Math.max(0, Date.now() - startedAt) : 0);
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [session?.researchStartedAt]);

  const activeIndex = useMemo(() => {
    if (phase === "researching-dossier") {
      return 3;
    }
    if (phase === "error") {
      return session?.profile ? 3 : 1;
    }
    if (phase === "ready") {
      return 4;
    }
    if (elapsedMs < 9000) {
      return 0;
    }
    if (elapsedMs < 18000) {
      return 1;
    }
    return 2;
  }, [elapsedMs, phase, session?.profile]);

  const headline = error
    ? "We paused while researching your public footprint"
    : `Researching ${session?.name || "your public footprint"}`;
  const body = error
    ? error
    : phase === "researching-dossier"
      ? "We have verified the identity context. Now Hushh is turning that evidence into your first intelligence dossier."
      : "Hushh is verifying the strongest public identity signals, pulling grounded evidence, and preparing your first dossier.";

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-5 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:rounded-[2.25rem] sm:p-6 md:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-700">Deep Intelligence Pass</p>
          <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-950 sm:text-3xl">{headline}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">{body}</p>

          {session?.pendingQuery ? (
            <div className="mt-5 flex max-w-full items-center gap-2 rounded-[1rem] bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 sm:inline-flex sm:rounded-full">
              <span className="shrink-0">Saved query</span>
              <span className="truncate text-slate-900 normal-case tracking-normal">{session.pendingQuery}</span>
            </div>
          ) : null}

          {!error && elapsedMs > 45000 ? (
            <p className="mt-5 text-sm leading-7 text-slate-500">
              This can take a little longer when the public web has multiple plausible matches to review.
            </p>
          ) : null}
        </div>

        <div className="w-full rounded-[1.3rem] border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm text-slate-600 sm:rounded-[1.6rem] sm:px-5 lg:w-auto">
          <p className="font-semibold text-slate-900">Identity context</p>
          <p className="mt-2">{session?.email || "Email unavailable"}</p>
          <p className="mt-1">Location permission granted from this device.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        {STAGES.map((label, index) => (
          <StageRow key={label} label={label} status={stageStatus(index, activeIndex, Boolean(error))} />
        ))}
      </div>

      {error ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onRetry}
            className="w-full rounded-full bg-[linear-gradient(135deg,#0058bc_0%,#0070eb_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_-18px_rgba(0,88,188,0.9)] sm:w-auto"
          >
            Continue Research
          </button>
          <button
            type="button"
            onClick={onEditIdentity}
            className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto"
          >
            Edit Identity
          </button>
        </div>
      ) : null}
    </section>
  );
}
