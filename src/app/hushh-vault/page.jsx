import React from 'react'
import HushhVault from '../clientside/hushhVault'
import ContentWrapper from 'src/app/_components/layout/ContentWrapper'
import { buildPageMetadata } from '../../lib/seo/pageMetadata'

export const metadata = buildPageMetadata({
  title: "Hushh Vault",
  description:
    "See how Hushh Vault organizes, protects, and activates your personal data with privacy-first control.",
  pathname: "/hushh-vault",
  keywords: ["Hushh Vault", "Personal data vault", "Privacy-first data control", "Hushh products"],
});

const page = () => {
  return (
    <>
      <ContentWrapper>
        <HushhVault />
      </ContentWrapper>
    </>
  )
}

export default page
