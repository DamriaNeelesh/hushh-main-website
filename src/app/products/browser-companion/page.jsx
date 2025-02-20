import React from "react";
import ClientBrowserCompanion from "../../clientside/BrowserCompanion";

export const metadata = {
  title: "Hushh | Browser Companion - track your digital footprints",
  description:
    "Hushh Web Browser Extension takes personalized online experiences to the next level",
  keywords:
  [
     "HUSHH", "hushh", "Enhanced Recommendations","Personalized Experience","digital footprint","Gen AI", "product that helps you keep track of your digital footprint, Tired of being tracked online, Track your own browsing activity, Choose what data to collect, Track your interests over time, Export the collected data to your hushh wallet, Sell your data responsibly and get tailored services, Streamlined Integration via Browser Companion, enables users to share their user activity in their Hushh Wallet, easy to organize and access important information, Intelligent Insights and Recommendations, extension utilizes advanced algorithms and AI technology, latest trends with Gen AI, receive personalized recommendations, analyze the captured data and generate brilliant insights",
  ]
};

const browserCompanion = () => {
  return (
    <>
      <ClientBrowserCompanion />
    </>
  );
};

export default browserCompanion;
