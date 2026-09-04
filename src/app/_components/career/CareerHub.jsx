"use client";

import { useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { jobs, TEAMS } from "./jobs";
import { HIRING_PROCESS_STEPS } from "./hiringProcess";
import HiringProcessSteps from "./HiringProcessSteps";
import RoleCard from "./RoleCard";
import { MotionSection, MotionStaggerGroup } from "../motion/SectionReveal";

const ANY = "Any";

const missionPillars = [
  {
    title: "Why Hushh",
    copy:
      "We're a team of AI researchers and engineers on a mission to deepen humanity's understanding of the world through groundbreaking AI systems — with ambitious goals, rapid execution, and a shared sense of urgency.",
  },
  {
    title: "What we do",
    copy:
      "We push the boundaries of AI, from advanced machine learning algorithms to AI-powered applications, constantly exploring new frontiers across research and product.",
  },
  {
    title: "Our culture",
    copy:
      "A fast-paced, collaborative environment where the team pushes boundaries and learns continuously. Our Hushh Garages in Pune and Mumbai bring living and working together under one roof.",
  },
];

const benefits = [
  { title: "Competitive compensation", copy: "Highly competitive cash and equity-based packages." },
  { title: "Flexible PTO", copy: "Unlimited paid time off, subject to approval." },
  { title: "Networking", copy: "Collaborate with seasoned professionals and dynamic young innovators." },
  {
    title: "Garage benefits",
    copy: "Free Wi-Fi, maintenance, and electricity, plus accommodation and food subsidies at the Hushh Garages.",
  },
];

const locations = ["Palo Alto, California", "San Francisco, CA", "Pune, India"];

function useUniqueValues(key) {
  return useMemo(() => {
    const values = new Set(jobs.map((job) => job[key]).filter(Boolean));
    return [ANY, ...Array.from(values).sort()];
  }, [key]);
}

export default function CareerHub() {
  const [search, setSearch] = useState("");
  const [team, setTeam] = useState(ANY);
  const [category, setCategory] = useState(ANY);
  const [employmentType, setEmploymentType] = useState(ANY);
  const rolesRef = useRef(null);

  const teams = useUniqueValues("team");
  const categories = useUniqueValues("category");
  const employmentTypes = useUniqueValues("employmentType");

  const hasActiveFilters =
    search.trim() !== "" || team !== ANY || category !== ANY || employmentType !== ANY;

  const filteredJobs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        job.title.toLowerCase().includes(query) ||
        job.category.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query);
      const matchesTeam = team === ANY || job.team === team;
      const matchesCategory = category === ANY || job.category === category;
      const matchesEmploymentType = employmentType === ANY || job.employmentType === employmentType;
      return matchesSearch && matchesTeam && matchesCategory && matchesEmploymentType;
    });
  }, [search, team, category, employmentType]);

  const clearFilters = () => {
    setSearch("");
    setTeam(ANY);
    setCategory(ANY);
    setEmploymentType(ANY);
  };

  const scrollToRoles = () => {
    rolesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <MotionSection as="div" family="marketing">
        <div className="site-page-band pb-10 text-center">
          <p className="site-page-eyebrow">Careers at Hushh</p>
          <h1 className="site-page-title mx-auto mt-4 max-w-4xl">
            Own your work. Build the future of AI.
          </h1>
          <p className="site-page-copy mx-auto mt-6 max-w-2xl">
            We&apos;re a team of passionate AI researchers and engineers on a mission to deepen humanity&apos;s
            understanding of the world through groundbreaking AI systems. If you&apos;re ready to shape the
            future of AI, we want to hear from you.
          </p>
          <button
            type="button"
            onClick={scrollToRoles}
            className="site-cta-solid mx-auto mt-8 px-8"
          >
            View open roles
          </button>
        </div>
      </MotionSection>

      <MotionStaggerGroup as="div" family="marketing">
        <div className="site-page-band pt-0">
          <div className="grid gap-6 md:grid-cols-3">
            {missionPillars.map((pillar) => (
              <div key={pillar.title} data-motion-stagger-item className="card-premium p-8">
                <h2 className="text-lg font-semibold text-[#1a1a1b]">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#57524a]">{pillar.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionStaggerGroup>

      <div style={{ background: "var(--site-surface-muted)" }}>
        <MotionStaggerGroup as="div" family="marketing">
          <div className="site-page-band">
            <p className="site-page-eyebrow text-center">Perks &amp; benefits</p>
            <h2 className="mt-3 text-center text-3xl font-semibold text-[#1a1a1b]">
              We take care of the people who build with us
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit.title} data-motion-stagger-item className="site-page-card">
                  <h3 className="text-base font-semibold text-[#1a1a1b]">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#57524a]">{benefit.copy}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm italic text-[#6e6e73]">
              All applications and interviews are handled directly by our technical team via Google Meet —
              no recruiters involved.
            </p>
          </div>
        </MotionStaggerGroup>
      </div>

      <MotionSection as="div" family="marketing">
        <div className="site-page-band">
          <p className="site-page-eyebrow text-center">Locations</p>
          <h2 className="mt-3 text-center text-3xl font-semibold text-[#1a1a1b]">India, currently</h2>
          <p className="site-page-copy mx-auto mt-4 max-w-2xl text-center">
            We&apos;re hiring for on-site roles at our Hushh Garages. All roles are on-site to foster our
            unique live-work culture, though we may consider remote opportunities for exceptionally
            qualified candidates.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {locations.map((location) => (
              <div key={location} className="site-page-card text-center">
                <p className="font-semibold text-[#1a1a1b]">{location}</p>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      <div style={{ background: "var(--site-surface-muted)" }}>
        <MotionSection as="div" family="marketing">
          <div className="site-page-band">
            <p className="site-page-eyebrow text-center">Application process</p>
            <h2 className="mt-3 text-center text-3xl font-semibold text-[#1a1a1b]">
              A quick, honest process
            </h2>
            <div className="mt-10">
              <HiringProcessSteps steps={HIRING_PROCESS_STEPS} />
            </div>
          </div>
        </MotionSection>
      </div>

      <div ref={rolesRef} className="scroll-mt-20">
        <MotionSection as="div" family="marketing">
          <div className="site-page-band">
            <p className="site-page-eyebrow text-center">Open roles</p>
            <h2 className="mt-3 text-center text-3xl font-semibold text-[#1a1a1b]">
              Find where you&apos;ll do your best work
            </h2>

            <div className="site-page-card mt-10 flex flex-col gap-4">
              <div className="relative">
                <Search
                  size={18}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8f8f94]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search roles, categories, locations…"
                  aria-label="Search open roles"
                  className="w-full rounded-[12px] border border-[#e5e5ea] bg-white py-3 pl-11 pr-4 text-sm text-[#1a1a1b] outline-none transition-colors focus:border-[#171b29] focus:ring-2 focus:ring-[#171b29]/15"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {teams.length > 2 ? (
                  <select
                    aria-label="Filter by team"
                    value={team}
                    onChange={(event) => setTeam(event.target.value)}
                    className="rounded-[12px] border border-[#e5e5ea] bg-white px-4 py-2.5 text-sm text-[#1a1a1b] outline-none focus:border-[#171b29]"
                  >
                    {teams.map((value) => (
                      <option key={value} value={value}>
                        {value === ANY ? "All teams" : TEAMS[value] || value}
                      </option>
                    ))}
                  </select>
                ) : null}
                <select
                  aria-label="Filter by category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="rounded-[12px] border border-[#e5e5ea] bg-white px-4 py-2.5 text-sm text-[#1a1a1b] outline-none focus:border-[#171b29]"
                >
                  {categories.map((value) => (
                    <option key={value} value={value}>
                      {value === ANY ? "All categories" : value}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Filter by employment type"
                  value={employmentType}
                  onChange={(event) => setEmploymentType(event.target.value)}
                  className="rounded-[12px] border border-[#e5e5ea] bg-white px-4 py-2.5 text-sm text-[#1a1a1b] outline-none focus:border-[#171b29]"
                >
                  {employmentTypes.map((value) => (
                    <option key={value} value={value}>
                      {value === ANY ? "All employment types" : value}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between text-sm text-[#6e6e73]">
                <span>
                  Showing {filteredJobs.length} of {jobs.length} open role{jobs.length === 1 ? "" : "s"}
                </span>
                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#171b29] hover:underline"
                  >
                    <X size={14} strokeWidth={2} aria-hidden="true" />
                    Clear filters
                  </button>
                ) : null}
              </div>
            </div>

            {filteredJobs.length > 0 ? (
              <MotionStaggerGroup as="div" family="marketing" className="mt-8 grid gap-5 md:grid-cols-2">
                {filteredJobs.map((job) => (
                  <RoleCard key={job.id} job={job} />
                ))}
              </MotionStaggerGroup>
            ) : (
              <div className="site-page-card mt-8 text-center">
                <p className="font-semibold text-[#1a1a1b]">No roles match those filters.</p>
                <p className="mt-2 text-sm text-[#6e6e73]">Try a different search term or clear your filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn-outline mx-auto mt-6"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </MotionSection>
      </div>
    </>
  );
}
