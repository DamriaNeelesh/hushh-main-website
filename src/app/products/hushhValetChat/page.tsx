import React from "react";
import ClientHushhValetChat from "../../clientside/HushhValetChat";

export const metadata = {
  title: "Hushh | Valet Chat - manage your finance at one place",
  description:
    "Collect all your receipts from mail and manage them to help you better understand your spending habits and finance",
  keywords:
    "Hushh Valet Chat, collect all your receipts from mai,  understand your spending habits and finance, Manage all your receipts at one place, get insights on your finance with Gen AI, Valet chat is your one stop solution to find and manage all your receipts at one place , Valet chat helps you Manage Finance, Sync all your receipts automatically, Chat with our AI to understand your Finances better, Manage and categories receipts for easy access, Share your receipts with people and receive insights, enables users to share their Reciepts in their Hushh Wallet, makes it easy to organize and access important information, such as receipts, warranty details, and more, all in one secure place, Intelligent Finance and Receipts Management, utilizes advanced algorithms and AI technology to analyze the captured data, Users receive personalized Insights on receipts",
};

const hushhValetChat = () => {
  return (
    <>
      <ClientHushhValetChat />
    </>
  );
};

export default hushhValetChat;
