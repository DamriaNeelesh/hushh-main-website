import React from "react";
import ContactForm from "../_components/features/contactForm";
import AboutFaq from "../_components/features/faq/aboutFaq";
import UserGuide from "../clientside/UserGuide";

export const metadata = {
  title: "Hushh | User Guide Walkthrough",
  description:
    "Manage your data with hushh with ease and genAI",
  keywords:
    "",
};

const userGuide = () => {
 

  return (
  <>  
    <UserGuide/>
    <AboutFaq/>
    <ContactForm/>
  </>  
  );
};

export default userGuide;
