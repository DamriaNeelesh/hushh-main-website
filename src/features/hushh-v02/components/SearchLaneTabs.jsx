import { HUSHH_V02_LANES } from "../content/intents";

export default function SearchLaneTabs({ value, onChange }) {
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <div className="inline-flex min-w-full items-center gap-1 rounded-2xl border border-slate-200 bg-slate-100/85 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:min-w-0 sm:rounded-full">
        {HUSHH_V02_LANES.map((lane) => {
          const active = lane.value === value;
          return (
            <button
              key={lane.value}
              type="button"
              onClick={() => onChange(lane.value)}
              className={`flex min-w-[5.75rem] flex-1 items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all sm:min-w-[7rem] sm:rounded-full ${
                active
                  ? "bg-slate-950 text-white shadow-[0_12px_24px_-18px_rgba(15,23,42,0.72)]"
                  : "text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
            >
              {lane.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
