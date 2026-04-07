function Card({ title, children, className = "" }) {
  return (
    <section
      className={`rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] sm:rounded-[2rem] sm:p-6 ${className}`}
    >
      <h3 className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Pill({ children, tone = "slate" }) {
  const styles = {
    slate: "bg-slate-100 text-slate-700",
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-100 text-amber-800",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em] ${styles[tone]}`}>
      {children}
    </span>
  );
}

function formatWarning(warning) {
  return warning.replaceAll("_", " ");
}

function groupSources(sources) {
  const groups = new Map();

  (sources || []).forEach((source) => {
    let key = source.source_type || "source";
    try {
      const url = new URL(source.uri);
      key = url.hostname.replace(/^www\./, "");
    } catch {
      key = source.source_type || "source";
    }

    const entry = groups.get(key) || { label: key, count: 0, items: [] };
    entry.count += 1;
    entry.items.push(source);
    groups.set(key, entry);
  });

  return Array.from(groups.values()).sort((left, right) => right.count - left.count);
}

function SectionBlock({ label, section }) {
  if (!section) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">{label}</p>
      <p className="text-sm leading-7 text-slate-700">{section.summary}</p>
      {section.bullet_points?.length ? (
        <ul className="space-y-2 text-sm leading-6 text-slate-600">
          {section.bullet_points.map((point) => (
            <li key={point}>- {point}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function AnswerCockpit({ title, summary, confidence, warnings, impactSnapshot }) {
  return (
    <div className="space-y-5">
      <p className="text-base leading-7 text-slate-900 sm:text-lg sm:leading-8">{title}</p>
      {summary ? <p className="text-sm leading-7 text-slate-600">{summary}</p> : null}
      <div className="flex flex-wrap items-center gap-3">
        {typeof confidence === "number" ? <Pill tone="blue">Confidence {confidence}</Pill> : null}
        {(warnings || []).map((warning) => (
          <Pill key={warning} tone="amber">
            {formatWarning(warning)}
          </Pill>
        ))}
      </div>
      {impactSnapshot ? (
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="font-semibold text-slate-900">{impactSnapshot.headline}</p>
          {impactSnapshot.bullet_points?.length ? (
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {impactSnapshot.bullet_points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
          ) : null}
          {impactSnapshot.notable_domains?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {impactSnapshot.notable_domains.map((domain) => (
                <span key={domain} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  {domain}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function ProofPointsCard({ proofPoints }) {
  return (
    <Card title="Proof">
      {proofPoints?.length ? (
        <div className="space-y-4">
          {proofPoints.map((point) => (
            <div key={`${point.claim}-${point.evidence}`} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="font-semibold text-slate-900">{point.claim}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{point.evidence}</p>
              {point.citations?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {point.citations.map((citation) => (
                    <span key={citation} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                      {citation}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-7 text-slate-600">Proof points will appear here once the console has grounded evidence to show.</p>
      )}
    </Card>
  );
}

function ActionCardsCard({ actionCards, suggestions, onSuggestionSelect }) {
  return (
    <Card title="Next Moves">
      <div className="space-y-3">
        {actionCards?.length ? (
          actionCards.map((card) => (
            <button
              key={`${card.title}-${card.query || card.description}`}
              type="button"
              onClick={() => {
                if (card.query) {
                  onSuggestionSelect?.(card.query);
                }
              }}
              className="block w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 text-left transition-colors hover:border-blue-200 hover:bg-blue-50/50"
            >
              <p className="font-semibold text-slate-900">{card.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
              {card.query ? <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{card.query}</p> : null}
            </button>
          ))
        ) : (
          <p className="text-sm leading-7 text-slate-600">Action-oriented follow-ups will appear here.</p>
        )}

        {suggestions?.length ? (
          <div className="flex flex-wrap gap-3 pt-2">
            {suggestions.map((suggestion) => (
              <button
                key={`${suggestion.label}-${suggestion.query}`}
                type="button"
                onClick={() => onSuggestionSelect?.(suggestion.query)}
                className="w-full rounded-[1rem] bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 sm:w-auto sm:rounded-full sm:py-2"
              >
                {suggestion.label}: {suggestion.query}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function SourcesCard({ sources, title = "Sources" }) {
  return (
    <Card title={title}>
      {(sources || []).length ? (
        <div className="space-y-3">
          {sources.map((source) => (
            <a
              key={`${source.uri}-${source.title}`}
              href={source.uri}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-slate-200 px-4 py-3 transition-colors hover:border-blue-200 hover:bg-blue-50/40"
            >
              <p className="font-semibold text-slate-900">{source.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-500">{source.source_type}</p>
              <p className="mt-2 break-all text-sm text-slate-600 sm:truncate">{source.uri}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-600">Grounded sources will appear here.</p>
      )}
    </Card>
  );
}

function SourceClustersCard({ sources }) {
  const groups = groupSources(sources);

  return (
    <Card title="Source Clusters">
      {groups.length ? (
        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.label} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">{group.label}</p>
                <Pill>{group.count} source{group.count === 1 ? "" : "s"}</Pill>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {group.items.slice(0, 2).map((item) => item.title).join(" • ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-7 text-slate-600">Source groups will appear once grounded results are available.</p>
      )}
    </Card>
  );
}

function ThreadCard({ thread, onSuggestionSelect }) {
  return (
    <Card title="Investigation Thread">
      {thread?.length ? (
        <div className="space-y-3">
          {[...thread].reverse().map((entry) => (
            <button
              key={entry.id}
              type="button"
              onClick={() => onSuggestionSelect?.(entry.query)}
              className="block w-full rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4 text-left transition-colors hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="blue">{entry.intent}</Pill>
                {typeof entry.confidence === "number" ? <Pill tone="emerald">{entry.confidence}</Pill> : null}
              </div>
              <p className="mt-3 font-semibold text-slate-900">{entry.query}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{entry.summary}</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm leading-7 text-slate-600">Each lane remembers its own recent investigation thread.</p>
      )}
    </Card>
  );
}

function MeContextRail({ session, dossier }) {
  const identitySnapshot = dossier?.identity_snapshot || {};

  return (
    <>
      <Card title="Identity Snapshot">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Pill tone="blue">{identitySnapshot.name || session?.name || "Unknown"}</Pill>
            <Pill>{identitySnapshot.email || session?.email || "Email unavailable"}</Pill>
            {session?.profile?.confidence_score ? <Pill tone="emerald">Profile {session.profile.confidence_score}</Pill> : null}
          </div>
          {identitySnapshot.formatted_address ? <p className="text-sm leading-7 text-slate-700">{identitySnapshot.formatted_address}</p> : null}
          {identitySnapshot.location_context ? <p className="text-sm leading-7 text-slate-600">{identitySnapshot.location_context}</p> : null}
          {identitySnapshot.notable_domains?.length ? (
            <div className="flex flex-wrap gap-2">
              {identitySnapshot.notable_domains.map((domain) => (
                <span key={domain} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {domain}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Card>

      <Card title="Dossier Signals">
        <div className="space-y-5">
          <SectionBlock label="Professional" section={dossier?.professional_presence} />
          <SectionBlock label="Public Footprint" section={dossier?.digital_footprint} />
          <SectionBlock label="Reputation" section={dossier?.reputation_signals} />
          <SectionBlock label="Regional Context" section={dossier?.regional_context} />
        </div>
      </Card>

      <Card title="OSINT Evidence">
        {(dossier?.osint_cards || []).length ? (
          <div className="space-y-3">
            {dossier.osint_cards.map((card) => (
              <div key={card.key} className="rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-slate-900">{card.title}</p>
                  {card.confidence ? <Pill>{card.confidence}</Pill> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{card.summary}</p>
                {card.items?.length ? (
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {card.items.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm leading-7 text-slate-600">Passive evidence cards will appear here when the profile has supported signals.</p>
        )}
      </Card>
    </>
  );
}

function MeReadyState({ session, dossier, thread, onSuggestionSelect }) {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card title="Me Workspace" className="lg:col-span-2">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Pill tone="blue">{dossier.identity_snapshot?.name || session?.name || "Unknown"}</Pill>
            <Pill>{dossier.identity_snapshot?.email || session?.email || "Email unavailable"}</Pill>
            <Pill tone="emerald">Confidence {dossier.confidence}</Pill>
            {(dossier.warnings || []).map((warning) => (
              <Pill key={warning} tone="amber">
                {formatWarning(warning)}
              </Pill>
            ))}
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-700">Dossier ready</p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-slate-950 sm:text-3xl">{dossier.headline}</h2>
          </div>
          <p className="max-w-4xl text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">{dossier.executive_summary}</p>
          {dossier.suggestions?.length ? (
            <div className="flex flex-wrap gap-3">
              {dossier.suggestions.map((suggestion) => (
                <button
                  key={`${suggestion.label}-${suggestion.query}`}
                  type="button"
                  onClick={() => onSuggestionSelect?.(suggestion.query)}
                  className="w-full rounded-[1rem] bg-slate-100 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 sm:w-auto sm:rounded-full sm:py-2"
                >
                  {suggestion.label}: {suggestion.query}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </Card>

      <ThreadCard thread={thread} onSuggestionSelect={onSuggestionSelect} />
      <SourcesCard sources={dossier.sources} title="Grounded Dossier Sources" />
      <div className="grid gap-4 sm:gap-6 lg:col-span-2 lg:grid-cols-3">
        <MeContextRail session={session} dossier={dossier} />
      </div>
    </div>
  );
}

function MeSearchWorkspace({ session, dossier, result, thread, onSuggestionSelect }) {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card title="Answer Cockpit" className="lg:col-span-2">
        <AnswerCockpit
          title={result.answer}
          summary={result.summary}
          confidence={result.confidence}
          warnings={result.warnings}
          impactSnapshot={result.impact_snapshot}
        />
      </Card>

      <ProofPointsCard proofPoints={result.proof_points} />
      <ActionCardsCard
        actionCards={result.action_cards}
        suggestions={result.suggestions}
        onSuggestionSelect={onSuggestionSelect}
      />
      <ThreadCard thread={thread} onSuggestionSelect={onSuggestionSelect} />
      <SourcesCard sources={result.sources?.length ? result.sources : dossier.sources} title="Evidence Sources" />
      <div className="grid gap-4 sm:gap-6 lg:col-span-2 lg:grid-cols-3">
        <MeContextRail session={session} dossier={dossier} />
      </div>
    </div>
  );
}

function WebEmptyState({ thread, onSuggestionSelect }) {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card title="Web Workspace" className="lg:col-span-2">
        <div className="space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-700">Answer + proof + actions</p>
          <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-950 sm:text-3xl">
            Search the open web without losing trust or structure
          </h2>
          <p className="max-w-4xl text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
            Web mode is built to answer directly, show why the answer is credible, and tell you what to do next.
            It is designed as a workspace, not a list of blue links.
          </p>
        </div>
      </Card>

      <SourceClustersCard sources={[]} />
      <ThreadCard thread={thread} onSuggestionSelect={onSuggestionSelect} />
    </div>
  );
}

function WebSearchWorkspace({ result, thread, onSuggestionSelect }) {
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Card title="Web Answer Cockpit" className="lg:col-span-2">
        <AnswerCockpit
          title={result.answer}
          summary={result.summary}
          confidence={result.confidence}
          warnings={result.warnings}
        />
      </Card>

      <ProofPointsCard proofPoints={result.proof_points} />
      <ActionCardsCard
        actionCards={result.action_cards}
        suggestions={result.suggestions}
        onSuggestionSelect={onSuggestionSelect}
      />
      <SourceClustersCard sources={result.sources} />
      <SourcesCard sources={result.sources} />
      <div className="lg:col-span-2">
        <ThreadCard thread={thread} onSuggestionSelect={onSuggestionSelect} />
      </div>
    </div>
  );
}

export default function ResultPanel({ lane, session, dossier, result, thread, onSuggestionSelect }) {
  if (lane === "web") {
    if (!result) {
      return <WebEmptyState thread={thread} onSuggestionSelect={onSuggestionSelect} />;
    }
    return <WebSearchWorkspace result={result} thread={thread} onSuggestionSelect={onSuggestionSelect} />;
  }

  if (!dossier) {
    return null;
  }

  if (!result) {
    return <MeReadyState session={session} dossier={dossier} thread={thread} onSuggestionSelect={onSuggestionSelect} />;
  }

  return (
    <MeSearchWorkspace
      session={session}
      dossier={dossier}
      result={result}
      thread={thread}
      onSuggestionSelect={onSuggestionSelect}
    />
  );
}
