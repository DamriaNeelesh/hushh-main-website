/*@jsxRuntime automatic @jsxImportSource react*/
import Onboarding from '../../app/_components/developerApiContent/onboarding';
import ProfileSetup from '../../app/_components/developerApiContent/profileSetup';
import GenerateApiKey from '../../app/_components/developerApiContent/generateApiKey';
import SessionToken from '../../app/_components/developerApiContent/sessionToken';
function createContent(props: any) {
  const _components = Object.assign({
    h3: "h3",
    p: "p",
    hr: "hr"
  }, props.components), {Steps, Callout} = _components;
  if (!Callout) _missingContentReference("Callout", true);
  if (!Steps) _missingContentReference("Steps", true);
  return <><Steps><_components.h3>{"Sign up"}</_components.h3><_components.p>{"Create your developer account to access the Hushh Agentic Developer APIs."}</_components.p><Onboarding /><Callout type="info"><_components.p>{"Sign up first so you can generate your API key and session token."}</_components.p></Callout><_components.h3>{"Profile setup"}</_components.h3><_components.p>{"Complete your organization profile to unlock consent attribution."}</_components.p><ProfileSetup /><_components.h3>{"Generate your API key"}</_components.h3><_components.p>{"Use this key for authenticated API requests."}</_components.p><GenerateApiKey /><Callout type="warning"><_components.p>{"Never share your API key publicly."}</_components.p></Callout><_components.h3>{"Generate your session token"}</_components.h3><_components.p>{"Session tokens are required for secure agent calls."}</_components.p><SessionToken /></Steps>{"\n"}<_components.hr />{"\n"}<_components.h3>{"Support"}</_components.h3>{"\n"}<_components.p>{"If you have questions, contact sales@hushh.ai or support@hushh.ai"}</_components.p>{"\n"}<_components.hr />{"\n"}<_components.p>{"Copyright 2024. HushOne Inc. All rights reserved."}</_components.p></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}
function _missingContentReference(id: string, component: boolean) {
  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it.");
}

export const contentMeta = {};
export const contentHeadings = [
  {
    "text": "Sign up",
    "level": 3,
    "slug": "sign-up"
  },
  {
    "text": "Profile setup",
    "level": 3,
    "slug": "profile-setup"
  },
  {
    "text": "Generate your API key",
    "level": 3,
    "slug": "generate-your-api-key"
  },
  {
    "text": "Generate your session token",
    "level": 3,
    "slug": "generate-your-session-token"
  },
  {
    "text": "Support",
    "level": 3,
    "slug": "support"
  }
];
export const contentPlainText = "Sign up Create your developer account to access the Hushh Agentic Developer APIs. Sign up first so you can generate your API key and session token. Profile setup Complete your organization profile to unlock consent attribution. Generate your API key Use this key for authenticated API requests. Never share your API key publicly. Generate your session token Session tokens are required for secure agent calls. Support If you have questions, contact sales@hushh.ai or support@hushh.ai Copyright 2024. HushOne Inc. All rights reserved.";
