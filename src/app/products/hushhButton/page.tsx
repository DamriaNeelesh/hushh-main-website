import React from "react";
import ClientHushhButton from "../../clientside/HushhButton";

export const metadata = {
  title: "Hushh | Hushh Button - one stop solution for data sharing",
  description:
    "Share data for Personalized recommendations and experience with just one click",
  keywords:
    "Hushh Button, Data In, Data Out, powerful plugin, bridges the gap between your preferences/choices/needs/likes and your favourite brands with GenAI, shopping feels effortless and tailored, Data Sharing for Personalized Experiences, one-stop solution for seamless data sharing ,Hushh Button For Customers, Sync your preferences, past purchases, sizing information to brands with a single click, Get your brand-specific data sent directly to your Hushh Wallet for secure storage and management, Brands can offer products and services based on your unique profile, Hushh Button for Brands, Access authentic data from Hushh users who opt-in, allowing for personalized product recommendations and marketing campaigns, Simplified data collection and ensures compliance with user privacy preferences, personalized and rewarding shopping experience, Hushh Button is a win-win, brands gain valuable insights, Transformed Shopping Experience, curates recommendations based on their unique style, Hushh Button Magic, Data Retrieval Made Easy ",
};

const hushhButton = () => {
  return (
    <>
      <ClientHushhButton />
    </>
  );
};

export default hushhButton;
