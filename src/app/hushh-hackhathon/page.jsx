import React from 'react'
import HushhHackhathon from '../clientside/HushhHackhathon'
import Image from 'next/image';
// import OGImage from '../../../public/OG/daraNexusOG.png';

export const metadata = {
  title: "Hushh | Data Nexus Hackhathon",
  description:
    "hackathon data nexus project on hushh.ai ",
  keywords:
    "HUSHH, Hackhathon Submission, Data Nexus, data nexus, hushh hackhathon, hushh.ai, project upload, project submission, assignment submission, hackhathon submission, data nexus, Hushh Data Nexus, Extended Reality, IOT, Internet of things, Blockchain, 3D Modelling, In terms of technologies, Hushh Datanexus  will leverage the emerging technologies and technologies of tomorrow, specifically in the realm of Metaverse and AI. These themes and technologies provide a broad scope for participants to explore and develop innovative solutions that address real-world challenges in various domains",
    // openGraph: {
    //   images: <Image src={OGImage} alt='Data Nexus'/>,
    //   locale: "en_US",
    //   type: "website",
    // },
};

const page = () => {
  return (
   <HushhHackhathon/>
  )
}

export default page