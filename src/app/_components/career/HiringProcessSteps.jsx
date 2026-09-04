import { ChevronRight } from "lucide-react";

/**
 * Shared hiring-process stepper.
 *
 * Pass `steps` as [{ label, description? }]. Steps without a `description`
 * render as a compact label chain (used under the apply form); steps with
 * one render as a fuller, numbered walkthrough (used on the careers hub).
 */
export default function HiringProcessSteps({ steps, compact = false }) {
  const isCompact = compact || steps.every((step) => !step.description);

  if (isCompact) {
    return (
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="Hiring process">
        {steps.map((step, index) => (
          <li key={step.label} className="flex items-center gap-2">
            <span className="rounded-full border border-[#e5e5ea] bg-white px-4 py-2 text-[13px] font-semibold text-[#1a1a1b]">
              {step.label}
            </span>
            {index < steps.length - 1 ? (
              <ChevronRight size={16} strokeWidth={2} className="text-[#b7a789]" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-label="Hiring process">
      {steps.map((step, index) => (
        <li key={step.label} className="site-page-card relative flex flex-col gap-2">
          <span className="font-heading text-3xl font-semibold text-[#d7ccb8]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-base font-semibold text-[#1a1a1b]">{step.label}</p>
          {step.description ? (
            <p className="text-sm leading-relaxed text-[#57524a]">{step.description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
