import { redirect } from "next/navigation";

// /career is the single source of truth for every open role. This page
// existed as a second, unverified careers experience (its own hardcoded
// roles, salary bands, and partnership claims) with no link to the real
// jobs data — retired in favor of one careers journey.
export default function LabsCareerRedirect() {
  redirect("/career");
}
