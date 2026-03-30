import React from 'react'
import FrequentlyAskedQuestions from '../_components/features/frequentlyAskedQuestions'
import { buildPageMetadata } from '../../lib/seo/pageMetadata'

export const metadata = buildPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers about Hushh products, privacy, consent, developers, and how the platform works.",
  pathname: "/frequently-asked-questions",
  keywords: [
    "Hushh FAQ",
    "Data privacy FAQ",
    "Consent-first AI",
    "Hushh developers",
  ],
});

const page = () => {
  return (
    <FrequentlyAskedQuestions />
  )
}

export default page
