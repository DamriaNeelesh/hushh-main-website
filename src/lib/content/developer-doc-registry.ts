import type { ReactElement } from "react";
import Doc0, { contentHeadings as docHeadings0, contentPlainText as docPlainText0 } from "../../content/developerApi/additional-requirements";
import Doc1, { contentHeadings as docHeadings1, contentPlainText as docPlainText1 } from "../../content/developerApi/agent-kai";
import Doc2, { contentHeadings as docHeadings2, contentPlainText as docPlainText2 } from "../../content/developerApi/agent-reference";
import Doc3, { contentHeadings as docHeadings3, contentPlainText as docPlainText3 } from "../../content/developerApi/agentic-apis";
import Doc4, { contentHeadings as docHeadings4, contentPlainText as docPlainText4 } from "../../content/developerApi/brand-engineering-onboarding";
import Doc5, { contentHeadings as docHeadings5, contentPlainText as docPlainText5 } from "../../content/developerApi/data-resources";
import Doc6, { contentHeadings as docHeadings6, contentPlainText as docPlainText6 } from "../../content/developerApi/data-retrieval-insertion";
import Doc7, { contentHeadings as docHeadings7, contentPlainText as docPlainText7 } from "../../content/developerApi/getting-started";
import Doc8, { contentHeadings as docHeadings8, contentPlainText as docPlainText8 } from "../../content/developerApi/intelligence-portal";
import Doc9, { contentHeadings as docHeadings9, contentPlainText as docPlainText9 } from "../../content/developerApi/investor-onboarding";
import Doc10, { contentHeadings as docHeadings10, contentPlainText as docPlainText10 } from "../../content/developerApi/on-boarding";
import Doc11, { contentHeadings as docHeadings11, contentPlainText as docPlainText11 } from "../../content/developerApi/support";
import Doc12, { contentHeadings as docHeadings12, contentPlainText as docPlainText12 } from "../../content/developerApi/top-level-use-cases";

export type DeveloperDocContentEntry = {
  slug: string;
  headings: Array<{ text: string; level: number; slug: string }>;
  plainText: string;
  Content: (props: { components?: Record<string, unknown> }) => ReactElement;
};

export const developerDocContentEntries: DeveloperDocContentEntry[] = [
  { slug: "additional-requirements", headings: docHeadings0, plainText: docPlainText0, Content: Doc0 },
  { slug: "agent-kai", headings: docHeadings1, plainText: docPlainText1, Content: Doc1 },
  { slug: "agent-reference", headings: docHeadings2, plainText: docPlainText2, Content: Doc2 },
  { slug: "agentic-apis", headings: docHeadings3, plainText: docPlainText3, Content: Doc3 },
  { slug: "brand-engineering-onboarding", headings: docHeadings4, plainText: docPlainText4, Content: Doc4 },
  { slug: "data-resources", headings: docHeadings5, plainText: docPlainText5, Content: Doc5 },
  { slug: "data-retrieval-insertion", headings: docHeadings6, plainText: docPlainText6, Content: Doc6 },
  { slug: "getting-started", headings: docHeadings7, plainText: docPlainText7, Content: Doc7 },
  { slug: "intelligence-portal", headings: docHeadings8, plainText: docPlainText8, Content: Doc8 },
  { slug: "investor-onboarding", headings: docHeadings9, plainText: docPlainText9, Content: Doc9 },
  { slug: "on-boarding", headings: docHeadings10, plainText: docPlainText10, Content: Doc10 },
  { slug: "support", headings: docHeadings11, plainText: docPlainText11, Content: Doc11 },
  { slug: "top-level-use-cases", headings: docHeadings12, plainText: docPlainText12, Content: Doc12 },
];

export const developerDocContentBySlug = Object.fromEntries(developerDocContentEntries.map((entry) => [entry.slug, entry]));
