import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Briefcase, MapPin } from "lucide-react";
import ContentWrapper from "../../_components/layout/ContentWrapper";
import { getJobById, jobs } from "../../_components/career/jobs";
import { HIRING_PROCESS_STEPS } from "../../_components/career/hiringProcess";
import HiringProcessSteps from "../../_components/career/HiringProcessSteps";
import ApplySection from "../../_components/career/ApplySection";
import { MotionSection } from "../../_components/motion/SectionReveal";

export function generateStaticParams() {
  return jobs.map((job) => ({ id: job.id.toString() }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    return {
      title: "Role not found | Hushh Careers",
      description: "This role is no longer available on the Hushh careers board.",
    };
  }

  return {
    title: `${job.title} | Hushh Careers`,
    description: `${job.title} in ${job.location}. Explore the mission, responsibilities, and application process at Hushh.`,
    alternates: {
      canonical: `https://www.hushh.ai/job/${job.id}`,
    },
    openGraph: {
      title: `${job.title} | Hushh Careers`,
      description: `${job.title} in ${job.location}. Explore the mission, responsibilities, and application process at Hushh.`,
      url: `https://www.hushh.ai/job/${job.id}`,
    },
  };
}

function StoryBlock({ eyebrow, title, children }) {
  return (
    <div className="site-page-card flex flex-col gap-4">
      {eyebrow ? <p className="site-page-eyebrow">{eyebrow}</p> : null}
      {title ? <h2 className="text-2xl font-semibold text-[#1a1a1b]">{title}</h2> : null}
      {children}
    </div>
  );
}

function RequirementList({ items }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[#57524a]">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b7a789]" aria-hidden="true" />
          <span className="leading-relaxed">{item.trim()}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    notFound();
  }

  const qualifications = [
    ...(job.basicQualifications || []),
    ...(job.additionalRequirements || []),
  ];

  return (
    <ContentWrapper surface="accent" minHeight="100vh">
      <MotionSection as="div" family="marketing">
        <div className="site-page-band pb-16 pt-8 md:pb-20">
          <Link
            href="/career"
            className="mb-8 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
            All open roles
          </Link>

          <p className="site-page-eyebrow mb-4" style={{ color: "#d7ccb8" }}>
            Careers at Hushh
          </p>
          <h1 className="site-page-title site-page-title--inverted mb-6">{job.title}</h1>

          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85">
              <MapPin size={14} strokeWidth={1.8} aria-hidden="true" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85">
              <Briefcase size={14} strokeWidth={1.8} aria-hidden="true" />
              {job.employmentType}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85">
              {job.category}
            </span>
          </div>

          <a href="#apply" className="site-cta-outline-branded mt-10 inline-flex w-fit px-8">
            Apply for this role
            <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </MotionSection>

      <div style={{ background: "var(--site-surface-muted)" }}>
        <MotionSection as="div" family="marketing" delay={0.04}>
          <div className="site-page-band grid gap-6 py-16 md:py-20">
            <StoryBlock eyebrow="Mission" title="Why this role exists">
              <p className="site-page-copy">{job.aboutCompany}</p>
            </StoryBlock>

            {job.responsibilities?.length ? (
              <StoryBlock eyebrow="Ownership" title="What you'll own">
                <RequirementList items={job.responsibilities} />
              </StoryBlock>
            ) : null}

            {qualifications.length ? (
              <StoryBlock eyebrow="Fit" title="What you bring">
                <RequirementList items={qualifications} />
              </StoryBlock>
            ) : null}
          </div>
        </MotionSection>

        <MotionSection as="div" family="marketing" delay={0.06}>
          <div className="site-page-band pt-0">
            <div className="mb-8 text-center">
              <p className="site-page-eyebrow">How hiring works</p>
              <h2 className="mt-3 text-3xl font-semibold text-[#1a1a1b]">A quick, honest process</h2>
            </div>
            <HiringProcessSteps steps={HIRING_PROCESS_STEPS} />
          </div>
        </MotionSection>
      </div>

      <MotionSection as="div" family="marketing" delay={0.08}>
        <div style={{ background: "#ffffff" }} className="py-16 md:py-20">
          <ApplySection job={job} />
        </div>
      </MotionSection>
    </ContentWrapper>
  );
}
