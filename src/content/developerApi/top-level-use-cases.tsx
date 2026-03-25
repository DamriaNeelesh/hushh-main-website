export const contentHeadings = [
  { text: "LVMH and luxury maisons", level: 2, slug: "lvmh-and-luxury-maisons" },
  { text: "Reliance ecosystems", level: 2, slug: "reliance-ecosystems" },
  { text: "Marketing and CRM teams", level: 2, slug: "marketing-and-crm-teams" },
  { text: "Example onboarding flow", level: 2, slug: "example-onboarding-flow" },
  { text: "How it works", level: 2, slug: "how-it-works" },
];

export const contentPlainText =
  "These use cases show how the older Hushh Agentic APIs deliver consented customer intelligence for enterprise brands, CRM activation, and personalization.";

export default function DeveloperUseCasesDoc() {
  return (
    <>
      <section id="lvmh-and-luxury-maisons" className="space-y-4">
        <h2>LVMH and luxury maisons</h2>
        <h3>Clienteling and VIP personalization</h3>
        <ul>
          <li>Build a unified profile across maisons for high-value clients.</li>
          <li>Trigger personalized outreach based on verified preferences and intents.</li>
        </ul>
        <h3>Private events and concierge</h3>
        <ul>
          <li>Use agent-enriched profiles to craft bespoke invitations.</li>
          <li>Activate preferences for styling, beauty, and travel in real time.</li>
        </ul>
      </section>

      <section id="reliance-ecosystems" className="space-y-4">
        <h2>Reliance ecosystems</h2>
        <h3>Omnichannel segmentation</h3>
        <ul>
          <li>Unify customer context across retail, telecom, and digital services.</li>
          <li>Improve loyalty performance with consented brand affinities.</li>
        </ul>
        <h3>New user acceleration</h3>
        <ul>
          <li>Reduce cold-start friction by enriching profiles on Day 0.</li>
          <li>Personalize offers without long onboarding forms.</li>
        </ul>
      </section>

      <section id="marketing-and-crm-teams" className="space-y-4">
        <h2>Marketing and CRM teams</h2>
        <h3>Precision targeting with consent</h3>
        <ul>
          <li>Translate profile signals into CRM-ready segments.</li>
          <li>Improve response rates with relevant, respectful outreach.</li>
        </ul>
        <h3>Brand affinity scoring</h3>
        <ul>
          <li>Map purchases and preferences into brand-level insights.</li>
          <li>Use agent output to power lifecycle campaigns.</li>
        </ul>
      </section>

      <section id="example-onboarding-flow" className="space-y-4">
        <h2>Example onboarding flow</h2>
        <ol>
          <li>Create a profile with the Supabase Profile Creation Agent.</li>
          <li>Enrich with OpenAI Public Data and Gemini Public Data agents.</li>
          <li>Normalize likes, dislikes, and affinities with the Brand agent.</li>
          <li>Activate in CRM or personalization systems.</li>
        </ol>
      </section>

      <section id="how-it-works" className="space-y-4">
        <h2>How it works</h2>
        <ul>
          <li>MuleSoft orchestrates A2A JSON-RPC calls to each agent.</li>
          <li>Public and Gemini agents enrich from consented identifiers.</li>
          <li>Supabase agents create, update, and query structured profiles.</li>
          <li>The Brand agent converts signals into CRM-ready insights.</li>
        </ul>
      </section>
    </>
  );
}
