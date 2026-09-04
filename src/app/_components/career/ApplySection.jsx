import DeferredIframe from "../primitives/DeferredIframe";
import HiringProcessSteps from "./HiringProcessSteps";

const NEXT_STEPS = [
  { label: "Apply" },
  { label: "Review" },
  { label: "Conversation" },
  { label: "Decision" },
];

const BASE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeWzoc7AsiVKm4IX3pCxmHmiJY2OMA7Ulx_9DW6oHsQZPkrRg/viewform?embedded=true";

export default function ApplySection({ job }) {
  const formUrl = `${BASE_FORM_URL}&entry.472327161=${encodeURIComponent(job.title)}`;

  return (
    <section id="apply" className="site-page-band scroll-mt-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <div className="flex flex-col gap-4 text-center">
          <p className="site-page-eyebrow">Apply</p>
          <h2 className="site-page-title text-[clamp(1.9rem,3.4vw,2.75rem)]">
            Apply directly. We read every one.
          </h2>
          <p className="mx-auto inline-flex flex-wrap items-center justify-center gap-2 text-base text-[#57524a]">
            You&apos;re applying for
            <span className="rounded-full bg-[#f5f5f7] px-4 py-1.5 font-semibold text-[#1a1a1b]">
              {job.title}
            </span>
          </p>
        </div>

        <div className="site-page-card overflow-hidden p-0">
          <DeferredIframe
            src={formUrl}
            title={`Application form — ${job.title}`}
            minHeight="clamp(1200px, 150vh, 1600px)"
            height="clamp(1200px, 150vh, 1600px)"
            placeholder="The application form will load as you reach it."
          />
        </div>

        <div className="flex flex-col gap-5">
          <p className="site-page-eyebrow text-center">What happens next</p>
          <div className="flex justify-center">
            <HiringProcessSteps steps={NEXT_STEPS} compact />
          </div>
          <p className="text-center text-sm italic text-[#6e6e73]">
            All applications and interviews are handled directly by our technical team — no recruiters
            involved. Submit above and we&apos;ll follow up by email once your application has been reviewed.
          </p>
        </div>
      </div>
    </section>
  );
}
