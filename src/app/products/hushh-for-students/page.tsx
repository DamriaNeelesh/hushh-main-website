import React from "react";
import ClientHFS from "../../clientside/HFS";

export const metadata = {
  title: "Hushh | Hushh For Students - Control & Manage Your Own Data",
  description:
    "Rewards & empowers students with data control and unlocks the true potential of your data.",
  keywords:
    "Hushh For Students, Empowering and rewarding digital engagement, Revolutionizing data exchange by empowering students, providing businesses with valuable insights, Data Value Setting, Secure Data Exchange, Rewards and Points System, HFS makes your data work for you, Build meaningful connection, Unlock the true potential of your data, Take ownership of your digital identity, Hushh Caters to a wide range of needs including - Students, Business, Developers",
  canonical: "https://hushh.ai/products/hushh-for-students",
  alternates: {
    canonical: "https://hushh.ai/hushh-for-students",
  },
  openGraph: {
    title: "Hushh | Hushh For Students - Control & Manage Your Own Data",
    description:
      "Rewards & empowers students with data control and unlocks the true potential of your data.",
    url: "https://hushh.ai/products/hushh-for-students",
    // images: [
    //   {
    //     url: "/path/to/hushh-for-students-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh For Students Image",
    //   },
    // ],
  },
};

const hushhForStudents = () => {
  return (
    <>
      <ClientHFS />
    </>
  );
};

export default hushhForStudents;
