import { HUSHH_V02_LANES } from "../content/intents";

const LANE_STYLES = {
  me: {
    active: "bg-[linear-gradient(135deg,#4f46e5_0%,#6366f1_100%)] text-white shadow-[0_12px_24px_-18px_rgba(79,70,229,0.72)]",
    icon: "🤫",
  },
  web: {
    active: "bg-slate-950 text-white shadow-[0_12px_24px_-18px_rgba(15,23,42,0.72)]",
    icon: "🌐",
  },
  kai: {
    active: "bg-[linear-gradient(135deg,#0058bc_0%,#0070eb_100%)] text-white shadow-[0_12px_24px_-18px_rgba(0,88,188,0.72)]",
    icon: "✦",
  },
};

export default function SearchLaneTabs({ value, onChange }) {
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <div className="inline-flex min-w-full items-center gap-1 rounded-2xl border border-slate-200 bg-slate-100/85 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:min-w-0 sm:rounded-full">
        {HUSHH_V02_LANES.map((lane) => {
          const active = lane.value === value;
          const style = LANE_STYLES[lane.value] || LANE_STYLES.web;
          return (
            <button
              key={lane.value}
              type="button"
              onClick={() => onChange(lane.value)}
              className={`flex min-w-[5.75rem] flex-1 items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all sm:min-w-[7rem] sm:rounded-full ${
                active
                  ? style.active
                  : "text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
            >
              <span className="text-xs leading-none">{style.icon}</span>
              {lane.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
