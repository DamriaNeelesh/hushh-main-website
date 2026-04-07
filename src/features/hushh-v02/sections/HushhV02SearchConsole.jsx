import SearchLaneTabs from "../components/SearchLaneTabs";
import IntentChips from "../components/IntentChips";
import { HUSHH_V02_DEFAULT_SUGGESTIONS_BY_LANE } from "../content/intents";

function StatusLine({ lane, phase, phaseError, searchStatus, searchError, isReady }) {
  if (lane === "web") {
    if (searchError) {
      return <p className="text-sm text-red-700">{searchError}</p>;
    }
    if (searchStatus === "searching") {
      return <p className="text-sm text-slate-600">Hushh is scanning the open web, clustering evidence, and preparing proof-backed next moves.</p>;
    }
    return <p className="text-sm text-slate-600">Hushh Web is ready. Search the open web with proof, credible sources, and next actions.</p>;
  }

  if (phaseError && !isReady) {
    return <p className="text-sm text-red-700">{phaseError}</p>;
  }
  if (searchError) {
    return <p className="text-sm text-red-700">{searchError}</p>;
  }
  if (searchStatus === "searching") {
    return <p className="text-sm text-slate-600">Hushh is querying your dossier and public footprint.</p>;
  }
  if (phase === "researching-profile") {
    return <p className="text-sm text-slate-600">Research in progress. We are verifying identity signals and grounded public matches.</p>;
  }
  if (phase === "researching-dossier") {
    return <p className="text-sm text-slate-600">Identity context mapped. Hushh is synthesizing your first dossier now.</p>;
  }
  if (isReady) {
    return <p className="text-sm text-slate-600">Dossier ready. Ask follow-up questions using your public footprint.</p>;
  }
  return <p className="text-sm text-slate-600">Your first Me search asks for your name, email, and live location permission.</p>;
}

function ThreadSummary({ lane, threadCount, pendingQuery, isReady }) {
  if (lane === "me" && pendingQuery && !isReady) {
    return (
      <div className="flex max-w-full items-center gap-2 rounded-[1rem] bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 sm:inline-flex sm:rounded-full">
        <span className="shrink-0">Saved query</span>
        <span className="truncate normal-case tracking-normal text-slate-900">{pendingQuery}</span>
      </div>
    );
  }

  if (!threadCount) {
    return null;
  }

  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
      <span className="shrink-0">Thread</span>
      <span className="normal-case tracking-normal text-slate-900">{threadCount} turn{threadCount === 1 ? "" : "s"} remembered</span>
    </div>
  );
}

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
  const busy = searchStatus === "searching" || (lane === "me" && (phase === "requesting-location" || phase === "researching-profile" || phase === "researching-dossier"));
  const suggestions = HUSHH_V02_DEFAULT_SUGGESTIONS_BY_LANE[lane] || HUSHH_V02_DEFAULT_SUGGESTIONS_BY_LANE.me;
  const placeholder = lane === "web"
    ? "Search the open web with proof and next moves..."
    : "Search your world...";
  const utilityLabel = lane === "me"
    ? isReady
      ? `Searching as ${identityName}`
      : phase === "researching-profile" || phase === "researching-dossier"
        ? `Researching ${identityName}`
        : "Unlock Me to search with your identity context"
    : "Web search is ready now";

  return (
    <section className="mx-auto mt-12 w-full max-w-5xl">
      <div className="space-y-4 rounded-[1.6rem] border border-slate-200 bg-white/80 p-4 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.38)] backdrop-blur-xl sm:rounded-[2rem] sm:p-5 md:p-6">
        <SearchLaneTabs value={lane} onChange={onLaneChange} />

        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                onFocus={() => {
                  if (lane === "me" && !isReady && phase === "locked") {
                    onOpenIdentityModal();
                  }
                }}
                placeholder={placeholder}
                className="w-full rounded-full border border-slate-200 bg-slate-50/90 py-4 pl-12 pr-5 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:py-5 md:pr-44 md:text-lg"
              />
              <div className="mt-3 flex gap-2 md:absolute md:inset-y-2 md:right-2 md:mt-0 md:items-center">
                {lane === "me" ? (
                  <button
                    type="button"
                    onClick={onOpenIdentityModal}
                    className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 md:flex-none"
                  >
                    {isReady ? "Identity" : phase === "locked" ? "Unlock" : "Edit"}
                  </button>
                ) : null}
                <button
                  type="submit"
                  disabled={busy}
                  className="flex-1 rounded-full bg-[linear-gradient(135deg,#0058bc_0%,#0070eb_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_-16px_rgba(0,88,188,0.85)] transition-transform hover:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 md:flex-none"
                >
                  {busy
                    ? lane === "web"
                      ? "Investigating"
                      : "Researching"
                    : lane === "web"
                      ? "Search Web"
                      : "Search Me"}
                </button>
              </div>
            </div>
          </div>

          <IntentChips value={intent} onChange={onIntentChange} />

          <div className="flex flex-col gap-3 rounded-[1.2rem] border border-slate-200/80 bg-slate-50/75 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-sm font-semibold text-slate-800">{utilityLabel}</p>
            {lane === "me" ? (
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

          <StatusLine
            lane={lane}
            phase={phase}
            phaseError={phaseError}
            searchStatus={searchStatus}
            searchError={searchError}
            isReady={isReady}
          />

          <ThreadSummary lane={lane} threadCount={threadCount} pendingQuery={pendingQuery} isReady={isReady} />

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onQueryChange(suggestion)}
                className="shrink-0 rounded-full bg-blue-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700 transition-colors hover:bg-blue-100"
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
