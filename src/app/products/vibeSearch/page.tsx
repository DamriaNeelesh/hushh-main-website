import React from "react";
import ClientVibeSearch from "../../clientside/VibeSearch";
import VibeSearchIntegrationBox from "../../_components/svg/vibeIntegrationBox.svg";
import OgImage from "../../../../public/Images/Logo/Logo.png";

export const metadata = {
  title: "Hushh | Vibe Search - match your perfect outfit with us",
  description:
    "Find perfect items to express your individuality in just one click with our vibe search",
  keywords:
    "Vibe Search, The vibe search app lets find and store all your favorite products that you come across by just taking a picture or by typing, Fashion, Vibe Match, Vibe search your companion for fashion and style, Find your style with your own stylist, Find products based on image and text, Save all your liked products, Get insights on your Fit and Style, Share your best Fit with Family and Friends, Find that perfect Fit and perfect look with just a click of a button, Integrate You Vibe with Vibe Search, vibe search also enables users to share your style preferences in their Hushh Wallet, easy to share and access important information, such as Your Size, FIt, Brands , Budget and Purchase history, Fit Brands and Sizes, Your Budget and purchase history track, Vibe search is more than just an app its your personal stylist on tap of a button, Share and Benefit, Search Any Style, Image based search, Save all your searches, Share curated list of products according to your vibe and fit along with your friends and family, Search any style throughout the internet, Your Personal Fashion Stylist at your Fingertips, Vibe search utilizes advanced algorithms and AI technology to analyze the captured data Find the best fit, Users receive personalized recommendations, discover new products and brands aligned with their interests, and stay up-to-date with the latest trends with Gen AI",
  openGraph: {
    images: [
      {
        src: "../../../../public/Images/Logo/Logo.png",
        alt: "Vibe Search App",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const vibeSearch = () => {
  return (
    <>
      <ClientVibeSearch />
    </>
  );
};

export default vibeSearch;
