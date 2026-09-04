// This route permanently redirects to /career (see page.jsx). Metadata here
// is a safety net only — no JobPosting JSON-LD, since the roles it used to
// describe were never verified.
export const metadata = {
  title: "Careers at Hushh",
  alternates: {
    canonical: "https://www.hushh.ai/career",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabsCareerLayout({ children }) {
  return children;
}
