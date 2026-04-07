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
    return <p className={`${base} text-slate-600`}>Hushh is querying your dossier and public footprint.</p>;
  if (phase === "researching-profile")
    return (
      <p className={`${base} text-slate-600`}>
        Research in progress. We are verifying identity signals and grounded public matches.
      </p>
    );
  if (phase === "researching-dossier")
    return (
      <p className={`${base} text-slate-600`}>
        Identity context mapped. Hushh is synthesizing your first dossier now.
      </p>
    );
  if (isReady)
    return <p className={`${base} text-slate-600`}>Dossier ready. Ask follow-up questions using your public footprint.</p>;
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
      <div className="flex max-w-full items-center gap-2 rounded-[1rem] bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2563eb] sm:inline-flex sm:rounded-full">
        <span className="shrink-0">Saved query</span>
        <span className="truncate normal-case tracking-normal text-slate-900">{pendingQuery}</span>
      </div>
    );
  }

  if (!threadCount) return null;

  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
      <span className="shrink-0">Thread</span>
      <span className="normal-case tracking-normal text-slate-900">
        {threadCount} turn{threadCount === 1 ? "" : "s"} remembered
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Identity badge — shown inside the Me console only                 */
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
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-left transition-all hover:border-slate-300 hover:bg-slate-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.6)]">
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
      <span className="text-xs font-semibold text-[#2563eb] opacity-0 transition-opacity group-hover:opacity-100">
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

  const placeholder = isMe
    ? "Search your identity and personal intelligence…"
    : "Search the open web with proof and next moves…";

  const submitLabel = busy
    ? isMe ? "Researching" : "Investigating"
    : isMe ? "Search Me" : "Search Web";

  const utilityLabel = isMe
    ? isReady
      ? `Searching as ${identityName}`
      : phase === "researching-profile" || phase === "researching-dossier"
        ? `Researching ${identityName}`
        : "Connect your identity to unlock Me search"
    : "Open-web search is ready";

  return (
    <section className="mx-auto mt-12 w-full max-w-5xl">
      <div className="space-y-4 rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.38)] backdrop-blur-xl sm:rounded-[2rem] sm:p-5 md:p-6">
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
              ⌕
            </span>
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onFocus={() => {
                if (isMe && !isReady && phase === "locked") {
                  onOpenIdentityModal();
                }
              }}
              placeholder={placeholder}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/90 py-4 pl-12 pr-5 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:py-5 md:rounded-full md:pr-52 md:text-lg"
            />
            <div className="mt-3 flex gap-2 md:absolute md:inset-y-2 md:right-2 md:mt-0 md:items-center">
              {isMe && (
                <button
                  type="button"
                  onClick={onOpenIdentityModal}
                  className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 md:flex-none"
                >
                  {isReady ? "Identity" : phase === "locked" ? "Unlock" : "Edit"}
                </button>
              )}
              <button
                type="submit"
                disabled={busy}
                className="flex-1 rounded-full bg-[#2563eb] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(37,99,235,0.85)] transition-transform hover:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 md:flex-none"
              >
                {submitLabel}
              </button>
            </div>
          </div>

          {/* ---- Intent chips ---- */}
          <IntentChips value={intent} onChange={onIntentChange} />

          {/* ---- Utility bar ---- */}
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/75 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-full sm:px-5">
            <p className="text-sm font-semibold text-slate-800">{utilityLabel}</p>
            {isMe ? (
              <button
                type="button"
                onClick={isReady ? onClearIdentity : onOpenIdentityModal}
                className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 sm:w-auto"
              >
                {isReady ? "Reset Identity" : "Edit Identity"}
              </button>
            ) : (
              <button
                type="button"
                onClick={onClearWebThread}
                className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 sm:w-auto"
              >
                Clear Web Thread
              </button>
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
                className="shrink-0 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2563eb] transition-colors hover:bg-blue-100"
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
