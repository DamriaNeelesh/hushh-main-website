import React from 'react'
import ConsentAILanding from '../_components/features/ConsentAILanding';
import CodeLikeBacteriaSection from '../_components/features/CodeLikeBacteriaSection';
import ConsentAgentsAsOperons from '../_components/features/ConsentAgentsAsOperons';
import VerifiediOSUserSection from '../_components/features/VerifiediOSUserSection';
import ContactForm from '../_components/features/contactForm';

const page = () => {
  return (
    <>
     {/* New ConsentAI Landing Section */}
     <ConsentAILanding />
      
      {/* Code Like Bacteria Section */}
      <CodeLikeBacteriaSection />
      
      {/* Consent Agents as Operons Section */}
      <ConsentAgentsAsOperons />
      
      {/* Eukaryotic Backbone Section */}
      {/* <EukaryoticBackbone /> */}
      
      {/* For the Verified iOS User Section */}
      <VerifiediOSUserSection />
      
      {/* Contact Form */}
      <ContactForm />
      
    </>
  )
}

export default page