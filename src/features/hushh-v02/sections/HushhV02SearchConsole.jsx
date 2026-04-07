import SearchLaneTabs from "../components/SearchLaneTabs";
import IntentChips from "../components/IntentChips";
import { HUSHH_V02_DEFAULT_SUGGESTIONS_BY_LANE } from "../content/intents";

/* ------------------------------------------------------------------ */
/*  Status line — contextual message below the console                */
/* ------------------------------------------------------------------ */
function StatusLine({ lane, phase, phaseError, searchStatus, searchError, isReady }) {
  const base = "text-sm leading-relaxed";

  if (lane === "web") {
    if (searchError) return <p className={`${base} text-red-700`}>{searchError}</p>;
    if (searchStatus === "searching")
      return (
        <p className={`${base} text-slate-600`}>
          Hushh is scanning the open web, clustering evidence, and preparing proof-backed next moves.
        </p>
      );
    return (
      <p className={`${base} text-slate-600`}>
        Hushh Web is ready. Search the open web with proof, credible sources, and next actions.
      </p>
    );
  }

  if (phaseError && !isReady) return <p className={`${base} text-red-700`}>{phaseError}</p>;
  if (searchError) return <p className={`${base} text-red-700`}>{searchError}</p>;
  if (searchStatus === "searching")
    return <p className={`${base} text-indigo-600`}>Hushh is querying your dossier and public footprint.</p>;
  if (phase === "researching-profile")
    return (
      <p className={`${base} text-indigo-600`}>
        Research in progress. We are verifying identity signals and grounded public matches.
      </p>
    );
  if (phase === "researching-dossier")
    return (
      <p className={`${base} text-indigo-600`}>
        Identity context mapped. Hushh is synthesizing your first dossier now.
      </p>
    );
  if (isReady)
    return <p className={`${base} text-indigo-600`}>Dossier ready. Ask follow-up questions using your public footprint.</p>;
  return (
    <p className={`${base} text-slate-500`}>
      Your first Me search asks for your name, email, and live location permission.
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Thread summary pill                                               */
/* ------------------------------------------------------------------ */
function ThreadSummary({ lane, threadCount, pendingQuery, isReady }) {
  if (lane === "me" && pendingQuery && !isReady) {
    return (
      <div className="flex max-w-full items-center gap-2 rounded-[1rem] bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-700 sm:inline-flex sm:rounded-full">
        <span className="shrink-0">Saved query</span>
        <span className="truncate normal-case tracking-normal text-slate-900">{pendingQuery}</span>
      </div>
    );
  }

  if (!threadCount) return null;

  const tone = lane === "me" ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-600";
  return (
    <div className={`inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${tone}`}>
      <span className="shrink-0">Thread</span>
      <span className="normal-case tracking-normal text-slate-900">
        {threadCount} turn{threadCount === 1 ? "" : "s"} remembered
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Identity badge — shown inside the Me console                      */
/* ------------------------------------------------------------------ */
function IdentityBadge({ identityName, phase, isReady, onOpenIdentityModal }) {
  const phaseLabel =
    isReady
      ? "Dossier active"
      : phase === "researching-profile" || phase === "researching-dossier"
        ? "Researching…"
        : "Not connected";

  const dotColor = isReady ? "bg-emerald-400" : phase === "locked" ? "bg-slate-300" : "bg-amber-400 animate-pulse";

  return (
    <button
      type="button"
      onClick={onOpenIdentityModal}
      className="group flex items-center gap-3 rounded-2xl border border-indigo-200/60 bg-indigo-50/60 px-4 py-3 text-left transition-all hover:border-indigo-300 hover:bg-indigo-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#4f46e5_0%,#6366f1_100%)] text-sm font-bold text-white shadow-[0_8px_20px_-10px_rgba(79,70,229,0.6)]">
        {identityName ? identityName.charAt(0).toUpperCase() : "?"}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">
          {identityName || "Connect your identity"}
        </p>
        <div className="flex items-center gap-1.5">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${dotColor}`} />
          <span className="text-xs font-medium text-slate-500">{phaseLabel}</span>
        </div>
      </div>
      <span className="text-xs font-semibold text-indigo-500 opacity-0 transition-opacity group-hover:opacity-100">
        {isReady ? "Edit" : phase === "locked" ? "Unlock" : "Edit"}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main console export                                               */
/* ------------------------------------------------------------------ */
export default function HushhV02SearchConsole({
  lane,
  onLaneChange,
  query,
  onQueryChange,
  onSubmit,
  onOpenIdentityModal,
  onClearIdentity,
  onClearWebThread,
  intent,
  onIntentChange,
  phase,
  phaseError,
  searchStatus,
  searchError,
  isReady,
  identityName,
  pendingQuery,
  threadCount,
}) {
  const isMe = lane === "me";
  const busy =
    searchStatus === "searching" ||
    (isMe && (phase === "requesting-location" || phase === "researching-profile" || phase === "researching-dossier"));

  const suggestions = HUSHH_V02_DEFAULT_SUGGESTIONS_BY_LANE[lane] || HUSHH_V02_DEFAULT_SUGGESTIONS_BY_LANE.me;

  /* ---- Lane-specific design tokens ---- */
  const laneDesign = isMe
    ? {
        cardBorder: "border-indigo-200/50",
        cardBg: "bg-white/85",
        cardShadow: "shadow-[0_18px_50px_-30px_rgba(79,70,229,0.28)]",
        inputBorder: "border-indigo-200",
        inputFocusBorder: "focus:border-indigo-300",
        inputFocusRing: "focus:ring-indigo-100",
        inputBg: "bg-indigo-50/40",
        inputFocusBg: "focus:bg-white",
        submitGradient: "bg-[linear-gradient(135deg,#4f46e5_0%,#6366f1_100%)]",
        submitShadow: "shadow-[0_12px_24px_-16px_rgba(79,70,229,0.85)]",
        chipBg: "bg-indigo-50",
        chipText: "text-indigo-700",
        chipHover: "hover:bg-indigo-100",
        utilityBg: "bg-indigo-50/50",
        utilityBorder: "border-indigo-200/60",
        placeholder: "Search your identity and personal intelligence…",
        submitLabel: busy ? "Researching" : "Search Me",
      }
    : {
        cardBorder: "border-slate-200",
        cardBg: "bg-white/80",
        cardShadow: "shadow-[0_18px_50px_-30px_rgba(15,23,42,0.38)]",
        inputBorder: "border-slate-200",
        inputFocusBorder: "focus:border-blue-200",
        inputFocusRing: "focus:ring-blue-100",
        inputBg: "bg-slate-50/90",
        inputFocusBg: "focus:bg-white",
        submitGradient: "bg-[linear-gradient(135deg,#0058bc_0%,#0070eb_100%)]",
        submitShadow: "shadow-[0_12px_24px_-16px_rgba(0,88,188,0.85)]",
        chipBg: "bg-blue-50",
        chipText: "text-blue-700",
        chipHover: "hover:bg-blue-100",
        utilityBg: "bg-slate-50/75",
        utilityBorder: "border-slate-200/80",
        placeholder: "Search the open web with proof and next moves…",
        submitLabel: busy ? "Investigating" : "Search Web",
      };

  return (
    <section className="mx-auto mt-12 w-full max-w-5xl">
      <div
        className={`space-y-4 rounded-[1.6rem] border p-4 backdrop-blur-xl transition-colors duration-300 sm:rounded-[2rem] sm:p-5 md:p-6 ${laneDesign.cardBorder} ${laneDesign.cardBg} ${laneDesign.cardShadow}`}
      >
        {/* ---- Toggle ---- */}
        <SearchLaneTabs value={lane} onChange={onLaneChange} />

        {/* ---- Me lane: Identity badge ---- */}
        {isMe && (
          <IdentityBadge
            identityName={identityName}
            phase={phase}
            isReady={isReady}
            onOpenIdentityModal={onOpenIdentityModal}
          />
        )}

        {/* ---- Search form ---- */}
        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
          <div className="relative">
            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">
              {isMe ? "🤫" : "⌕"}
            </span>
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onFocus={() => {
                if (isMe && !isReady && phase === "locked") {
                  onOpenIdentityModal();
                }
              }}
              placeholder={laneDesign.placeholder}
              className={`w-full rounded-2xl border py-4 pl-12 pr-5 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 sm:py-5 md:rounded-full md:pr-52 md:text-lg ${laneDesign.inputBorder} ${laneDesign.inputBg} ${laneDesign.inputFocusBorder} ${laneDesign.inputFocusRing} ${laneDesign.inputFocusBg} focus:ring-4`}
            />
            <div className="mt-3 flex gap-2 md:absolute md:inset-y-2 md:right-2 md:mt-0 md:items-center">
              {isMe && (
                <button
                  type="button"
                  onClick={onOpenIdentityModal}
                  className="flex-1 rounded-full border border-indigo-200 bg-white px-4 py-3 text-sm font-semibold text-indigo-700 transition-colors hover:bg-indigo-50 md:flex-none"
                >
                  {isReady ? "Identity" : phase === "locked" ? "Unlock" : "Edit"}
                </button>
              )}
              <button
                type="submit"
                disabled={busy}
                className={`flex-1 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 md:flex-none ${laneDesign.submitGradient} ${laneDesign.submitShadow}`}
              >
                {laneDesign.submitLabel}
              </button>
            </div>
          </div>

          {/* ---- Intent chips ---- */}
          <IntentChips value={intent} onChange={onIntentChange} />

          {/* ---- Utility bar ---- */}
          <div
            className={`flex flex-col gap-3 rounded-2xl border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:px-5 ${laneDesign.utilityBg} ${laneDesign.utilityBorder}`}
          >
            {isMe ? (
              <>
                <p className="text-sm font-semibold text-slate-800">
                  {isReady
                    ? `Searching as ${identityName}`
                    : phase === "researching-profile" || phase === "researching-dossier"
                      ? `Researching ${identityName}`
                      : "Connect your identity to unlock Me search"}
                </p>
                <button
                  type="button"
                  onClick={isReady ? onClearIdentity : onOpenIdentityModal}
                  className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-200 transition-colors hover:bg-indigo-50 sm:w-auto"
                >
                  {isReady ? "Reset Identity" : "Edit Identity"}
                </button>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-slate-800">Open-web search is ready</p>
                <button
                  type="button"
                  onClick={onClearWebThread}
                  className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 sm:w-auto"
                >
                  Clear Web Thread
                </button>
              </>
            )}
          </div>

          {/* ---- Status + thread ---- */}
          <StatusLine
            lane={lane}
            phase={phase}
            phaseError={phaseError}
            searchStatus={searchStatus}
            searchError={searchError}
            isReady={isReady}
          />

          <ThreadSummary lane={lane} threadCount={threadCount} pendingQuery={pendingQuery} isReady={isReady} />

          {/* ---- Suggestions ---- */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onQueryChange(suggestion)}
                className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${laneDesign.chipBg} ${laneDesign.chipText} ${laneDesign.chipHover}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
