/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    ul: "ul",
    li: "li",
    strong: "strong",
    code: "code",
    ol: "ol",
    br: "br"
  }, props.components);
  return <><_components.h2>{"🔐 Introduction"}</_components.h2>{"\n"}<_components.p>{"Hushh isn’t just a product. It’s a protocol—a living system where agents speak the language of consent, powered by open-source code and governed by user trust. But behind this philosophy lies a smart, scalable architecture that blends biological metaphors with modern software design."}</_components.p>{"\n"}<_components.p>{"In this post, we’ll walk through the structure of the Hushh Consent Protocol repo—exploring its operons, vaults, agent kits, and the micro-consent handshake layer that brings it all together."}</_components.p>{"\n"}<_components.h2>{"🏛 The Monorepo: Hushh’s Digital Genome"}</_components.h2>{"\n"}<_components.p>{"While Hushh encourages micro-code contributions, it uses a well-organized monorepo to coordinate large-scale operations."}</_components.p>{"\n"}<_components.p>{"Here's what you'll find inside:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li><_components.strong>{"/vault:"}</_components.strong>{" Secure data schemas and encryption logic (like the DNA vault of each user-agent)"}</_components.li>{"\n"}<_components.li><_components.strong>{"/link:"}</_components.strong>{" Manages identity, permissions, and Apple ID verification. This is where trust begins."}</_components.li>{"\n"}<_components.li><_components.strong>{"/flow:"}</_components.strong>{" Governs value exchange—reward logic, token gating, and brand interactions, always with user consent."}</_components.li>{"\n"}<_components.li><_components.strong>{"/agentkit:"}</_components.strong>{" Boilerplate and scaffolding to help developers bootstrap new agents or operons quickly."}</_components.li>{"\n"}<_components.li><_components.strong>{"/mcp:"}</_components.strong>{" Micro Consent Protocol handlers for secure agent-to-agent (A2A) and agent-to-cloud (A2K) data handshakes."}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"This structure balances flexibility with safety. You can experiment locally, but the backbone ensures global coherence across the Hushh ecosystem."}</_components.p>{"\n"}<_components.h2>{"🛠 Operons in Action"}</_components.h2>{"\n"}<_components.p>{"Each operon is a plug-and-play workflow. For example:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li><_components.code>{"summarizeEmail()"}</_components.code>{" – takes a user’s inbox and returns a summary, only if consent is granted"}</_components.li>{"\n"}<_components.li><_components.code>{"shareFitnessStats()"}</_components.code>{" – allows one-time sharing of Apple Health data with a fitness app"}</_components.li>{"\n"}<_components.li><_components.code>{"connectGmailWithOAuth()"}</_components.code>{" – handles secure email sync"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"All operons are self-contained and documented to be “yoinkable” (yes, that’s the official term)."}</_components.p>{"\n"}<_components.p>{"This modularity allows developers to:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"Ship faster in hackathons"}</_components.li>{"\n"}<_components.li>{"Write highly reusable code"}</_components.li>{"\n"}<_components.li>{"Empower personal agents with new skills incrementally"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"🤝 Consent as a Protocol, Not a Pop-Up"}</_components.h2>{"\n"}<_components.p>{"The most powerful layer is "}<_components.code>{"/mcp"}</_components.code>{"—the Micro Consent Protocol. This is where:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"Every API call is permission-checked"}</_components.li>{"\n"}<_components.li>{"Every data flow is logged and traceable"}</_components.li>{"\n"}<_components.li>{"Apple-native identity ensures the user is always in control"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"Consent isn’t a checkbox. It’s the communication protocol between agents, users, and brands."}</_components.p>{"\n"}<_components.h2>{"🌐 Contribution Flow: From Fork to Ecosystem"}</_components.h2>{"\n"}<_components.ol>{"\n"}<_components.li><_components.strong>{"Fork the Repo"}</_components.strong><_components.br />{"\n"}{"Get the latest from "}<_components.code>{"hushhai/consent-protocol"}</_components.code></_components.li>{"\n"}<_components.li><_components.strong>{"Write a Tiny Function"}</_components.strong><_components.br />{"\n"}{"Build something self-contained and portable. Can someone paste it into their app? Then it’s good."}</_components.li>{"\n"}<_components.li><_components.strong>{"Test in Isolation"}</_components.strong><_components.br />{"\n"}{"Don’t wait for full integration. If it works alone, it works."}</_components.li>{"\n"}<_components.li><_components.strong>{"Submit a PR"}</_components.strong><_components.br />{"\n"}{"Tag it clearly (e.g., "}<_components.code>{"operon: summarizeEmail"}</_components.code>{") and follow the Consent Developer Covenant."}</_components.li>{"\n"}</_components.ol>{"\n"}<_components.p><_components.strong>{"Bonus:"}</_components.strong>{" Join the Discord, remix other operons in the Playground, or contribute to MCP standards."}</_components.p>{"\n"}<_components.h2>{"🧬 Final Thoughts"}</_components.h2>{"\n"}<_components.p>{"Hushh’s architecture isn’t accidental. It’s a hybrid of nature and design:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"Modular like bacteria"}</_components.li>{"\n"}<_components.li>{"Coordinated like human cells"}</_components.li>{"\n"}<_components.li>{"Ethical by default"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"This structure empowers a new wave of developers—not just to build apps, but to shape the consent-native internet. Whether you’re hacking a new feature or proposing a protocol change, your code is part of something alive."}</_components.p>{"\n"}<_components.p>{"So build boldly. Fork freely. And remember: your next operon might just power someone’s personal AI."}</_components.p></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}

export const contentMeta = {
  "title": "Inside Hushh’s Consent AI Stack — From Monorepo to Micro Operons",
  "description": "Hushh isn’t just a product. It’s a protocol—a living system where agents speak the language of consent, powered by open-source code and governed by user trust.",
  "image": "/blogs/new/hushh-consent-ai-stack.png",
  "publishedAt": "July 20, 2025",
  "updatedAt": "July 20, 2025",
  "author": "Manish Sainani",
  "isPublished": true,
  "tags": [
    "AI",
    "Open Source",
    "Hushh",
    "Consent Protocol"
  ]
};
export const contentHeadings = [
  {
    "text": "🔐 Introduction",
    "level": 2,
    "slug": "-introduction"
  },
  {
    "text": "🏛 The Monorepo: Hushh’s Digital Genome",
    "level": 2,
    "slug": "-the-monorepo-hushhs-digital-genome"
  },
  {
    "text": "🛠 Operons in Action",
    "level": 2,
    "slug": "-operons-in-action"
  },
  {
    "text": "🤝 Consent as a Protocol, Not a Pop-Up",
    "level": 2,
    "slug": "-consent-as-a-protocol-not-a-pop-up"
  },
  {
    "text": "🌐 Contribution Flow: From Fork to Ecosystem",
    "level": 2,
    "slug": "-contribution-flow-from-fork-to-ecosystem"
  },
  {
    "text": "🧬 Final Thoughts",
    "level": 2,
    "slug": "-final-thoughts"
  }
];
export const contentPlainText = "🔐 Introduction Hushh isn’t just a product. It’s a protocol—a living system where agents speak the language of consent, powered by open source code and governed by user trust. But behind this philosophy lies a smart, scalable architecture that blends biological metaphors with modern software design. In this post, we’ll walk through the structure of the Hushh Consent Protocol repo—exploring its operons, vaults, agent kits, and the micro consent handshake layer that brings it all together. 🏛 The Monorepo: Hushh’s Digital Genome While Hushh encourages micro code contributions, it uses a well organized monorepo to coordinate large scale operations. Here's what you'll find inside: /vault: Secure data schemas and encryption logic (like the DNA vault of each user agent) /link: Manages identity, permissions, and Apple ID verification. This is where trust begins. /flow: Governs value exchange—reward logic, token gating, and brand interactions, always with user consent. /agentkit: Boilerplate and scaffolding to help developers bootstrap new agents or operons quickly. /mcp: Micro Consent Protocol handlers for secure agent to agent (A2A) and agent to cloud (A2K) data handshakes. This structure balances flexibility with safety. You can experiment locally, but the backbone ensures global coherence across the Hushh ecosystem. 🛠 Operons in Action Each operon is a plug and play workflow. For example: – takes a user’s inbox and returns a summary, only if consent is granted – allows one time sharing of Apple Health data with a fitness app – handles secure email sync All operons are self contained and documented to be “yoinkable” (yes, that’s the official term). This modularity allows developers to: Ship faster in hackathons Write highly reusable code Empower personal agents with new skills incrementally 🤝 Consent as a Protocol, Not a Pop Up The most powerful layer is —the Micro Consent Protocol. This is where: Every API call is permission checked Every data flow is logged and traceable Apple native identity ensures the user is always in control Consent isn’t a checkbox. It’s the communication protocol between agents, users, and brands. 🌐 Contribution Flow: From Fork to Ecosystem 1. Fork the Repo Get the latest from 2. Write a Tiny Function Build something self contained and portable. Can someone paste it into their app? Then it’s good. 3. Test in Isolation Don’t wait for full integration. If it works alone, it works. 4. Submit a PR Tag it clearly (e.g., ) and follow the Consent Developer Covenant. Bonus: Join the Discord, remix other operons in the Playground, or contribute to MCP standards. 🧬 Final Thoughts Hushh’s architecture isn’t accidental. It’s a hybrid of nature and design: Modular like bacteria Coordinated like human cells Ethical by default This structure empowers a new wave of developers—not just to build apps, but to shape the consent native internet. Whether you’re hacking a new feature or proposing a protocol change, your code is part of something alive. So build boldly. Fork freely. And remember: your next operon might just power someone’s personal AI.";
