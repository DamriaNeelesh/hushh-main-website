import React from "react";
import ClientHushhWallet from "../../clientside/HushhWallet";

export const metadata = {
  title: "Hushh | Wallet App - first AI powered data wallet",
  description:
    "World's First AI Powered Data Wallet - Your personal data Your own business",
  keywords:
    "Hushh Wallet App, Wallet App, Your personal data your own business, App that puts you in control of your digital identity, Scattered Data with Unified Identity, Aggregates your data from various sources including Phone data, Data Companies, Shopping Brands, With Hushh, you become the curator of your own identity, it's a paradigm shift that empowers you too, Buld Meaning Connections, Take Ownership of your digital identity, unlock the true potential of your data, Pesonalized Experiences, Rewarded Interactions, Connect with brands and sales agents you trust​, Get rewarded for sharing data​​​, Sell your data​, Transparency and Control​​​, Hushh prioritizes your privacy and control, Earn rewards for the valuable information you contribute, You can sell your data directly to brands and agencies, Share your curated data cards with businesses you choose, enabling them to offer personalized experiences and recommendations",
};

const hushhWalletApp = () => {
  return (
    <>
      <ClientHushhWallet />
    </>
  );
};

export default hushhWalletApp;
