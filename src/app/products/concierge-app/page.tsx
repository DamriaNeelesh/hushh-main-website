import React from "react";
import ClientConciergeApp from "../../clientside/ConciergeApp";

export const metadata = {
  title: "Hushh | Concierge App - get luxury experience",
  description:
    "Speak Your Wish Get Transformed Luxury Redefined Experiences with our GenAI product",
  keywords:
    "HUSHH, Experience Luxury, Redefined , transforms luxury experiences through the power of voice, AI and Real time data, traditional concierge services,  prioritizes your needs, not just your preferences with Gen AI, Effortless Service​, Personalized Recommendations​​​, Real-Time Responses, Discretion and Privacy​​​, Exclusive Opportunities​, Travel, Events, Lifestyle, VIP access to high-profile events, private viewings, red carpet experiences, Personal shopping, home management, day-to-day errands, specialized requests, Bespoke itineraries, private jet charters, exclusive tours, Receipt Radar revolutionizes the way you handle receipts, automatic scanning, smart categorization, customizable options, managing expenses",
};

const conciergeApp = () => {
  return (
    <>
      <ClientConciergeApp />
    </>
  );
};

export default conciergeApp;
