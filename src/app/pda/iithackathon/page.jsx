import React from 'react'
import HushhHackhathon from '../../clientside/HushhHackhathon'
import ContentWrapper from '../../_components/layout/ContentWrapper';
// import OGImage from '../../../public/OG/daraNexusOG.png';

export const metadata = {
  title: "Hushh | Data Nexus Hackathon",
  description:
    "Participate in the Hushh Data Nexus Hackathon on hushh.ai. Explore innovative solutions using emerging technologies.",
  keywords:
    "HUSHH, Hackathon Submission, Data Nexus, hushh hackathon, hushh.ai, project upload, project submission, assignment submission, hackathon submission, Hushh Data Nexus, Extended Reality, IoT, Internet of Things, Blockchain, 3D Modelling, Metaverse, AI, Emerging Technologies",
  canonical: "https://www.hushh.ai/pda/iithackathon",
  alternates: {
    canonical: "https://www.hushh.ai/pda/iithackathon",
  },
  openGraph: {
    title: "Hushh | Data Nexus Hackathon",
    description:
      "Participate in the Hushh Data Nexus Hackathon on hushh.ai. Explore innovative solutions using emerging technologies.",
    url: "https://www.hushh.ai/pda/iithackathon",
    // images: [
    //   {
    //     url: "/path/to/hackathon-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Hackathon Image",
    //   },
    // ],
  },
};

const page = () => {
  return (
    <ContentWrapper>
      <HushhHackhathon />
    </ContentWrapper>
  )
}

export default page
