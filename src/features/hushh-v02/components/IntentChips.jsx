import { HUSHH_V02_INTENTS } from "../content/intents";

export default function IntentChips({ value, onChange }) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
      {HUSHH_V02_INTENTS.map((intent) => {
        const active = intent.value === value;
        return (
          <button
            key={intent.value}
            type="button"
            onClick={() => onChange(intent.value)}
            className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold transition-all sm:px-4 ${
              active
                ? "bg-blue-600 text-white shadow-[0_10px_24px_-16px_rgba(0,88,188,0.7)]"
                : "bg-white/80 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
            }`}
            title={intent.description}
          >
            {intent.label}
          </button>
        );
      })}
    </div>
  );
}
