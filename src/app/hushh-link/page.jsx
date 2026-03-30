import React from 'react'
import HushhLink from '../clientside/hushhLink'
import ContentWrapper from 'src/app/_components/layout/ContentWrapper'
import { buildPageMetadata } from '../../lib/seo/pageMetadata'

export const metadata = buildPageMetadata({
  title: "Hushh Link",
  description:
    "Explore Hushh Link, the consent-first sharing surface for trusted identity and connection flows.",
  pathname: "/hushh-link",
  keywords: ["Hushh Link", "Consent-first sharing", "Trusted identity", "Hushh products"],
});

const page = () => {
  return (
    <ContentWrapper>
      <HushhLink/>         
    </ContentWrapper>
  )
}

export default page
