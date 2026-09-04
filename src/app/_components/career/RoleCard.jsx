import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

function truncate(text, max) {
  if (!text || text.length <= max) return text || "";
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

export default function RoleCard({ job }) {
  const teaser = truncate(job.aboutRole || job.aboutCompany, 140);

  return (
    <Link
      href={`/job/${job.id}`}
      data-motion-stagger-item
      className="card-premium group flex h-full flex-col gap-5 p-7 no-underline transition-colors hover:border-[#d9d2c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171b29]/30"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge-taupe">{job.employmentType}</span>
        <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#57524a]">
          {job.category}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold leading-snug text-[#1a1a1b] transition-colors group-hover:text-[#0a1128]">
          {job.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-[#6e6e73]">
          <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
          {job.location}
        </p>
      </div>

      {teaser ? (
        <p className="text-sm leading-relaxed text-[#57524a]">{teaser}</p>
      ) : null}

      <span className="mt-auto flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#171b29]">
        View role
        <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
