import React from "react";
import ClientHushhValetChat from "../../clientside/HushhValetChat";

export const metadata = {
  title: "Hushh | Valet Chat - Manage Your Finance in One Place",
  description:
    "Collect all your receipts from mail and manage them to help you better understand your spending habits and finance.",
  keywords:
    "Hushh Valet Chat, collect all your receipts from mail, understand your spending habits and finance, Manage all your receipts in one place, get insights on your finance with Gen AI, Valet chat is your one-stop solution to find and manage all your receipts in one place, Valet chat helps you Manage Finance, Sync all your receipts automatically, Chat with our AI to understand your Finances better, Manage and categorize receipts for easy access, Share your receipts with people and receive insights, enables users to share their Receipts in their Hushh Wallet, makes it easy to organize and access important information, such as receipts, warranty details, and more, all in one secure place, Intelligent Finance and Receipts Management, utilizes advanced algorithms and AI technology to analyze the captured data, Users receive personalized Insights on receipts",
  canonical: "https://hushh.ai/products/hushh-valet-chat",
  alternates: {
    canonical: "https://hushh.ai/hushh-valet-chat",
  },
  openGraph: {
    title: "Hushh | Valet Chat - Manage Your Finance in One Place",
    description:
      "Collect all your receipts from mail and manage them to help you better understand your spending habits and finance.",
    url: "https://hushh.ai/products/hushh-valet-chat",
    // images: [
    //   {
    //     url: "/path/to/hushh-valet-chat-og-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Hushh Valet Chat Image",
    //   },
    // ],
  },
};

const hushhValetChat = () => {
  return (
    <>
      <ClientHushhValetChat />
    </>
  );
};

export default hushhValetChat;
