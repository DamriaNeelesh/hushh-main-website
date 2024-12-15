// components/index.js
import CustomPre from './CustomPre';
import Onboarding from './onboarding';
// Import other custom components here

const MDXComponents = {
  pre: CustomPre,
  OnBoarding:Onboarding,
  
  // Map other tags to custom components
};

export default MDXComponents;
