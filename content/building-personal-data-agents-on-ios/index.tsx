/*@jsxRuntime automatic @jsxImportSource react*/
function createContent(props: any) {
  const _components = Object.assign({
    h2: "h2",
    p: "p",
    ul: "ul",
    li: "li",
    code: "code",
    pre: "pre",
    h3: "h3",
    ol: "ol"
  }, props.components);
  return <><_components.h2>{"🧭 Introduction"}</_components.h2>{"\n"}<_components.p>{"In 2025, Apple revolutionized AI development on its platforms by introducing the Foundation Models framework. This API gives developers access to Apple’s private, on-device ~3B parameter language model that powers Siri and Apple Intelligence. Hushh.ai builds on top of this breakthrough to offer Personal Data Agents (PDAs)—intelligent, privacy-first assistants that run completely on-device."}</_components.p>{"\n"}<_components.p>{"This blog is a deep, hands-on walkthrough for iOS developers: how to set up your environment, initialize a PDA, build privacy-safe tools, and deploy an AI-powered app that aligns with Apple’s privacy-first ethos. If you’ve ever dreamed of building your own Siri—this is how to do it."}</_components.p>{"\n"}<_components.h2>{"⚙️ Step 1: Setting Up Your Environment"}</_components.h2>{"\n"}<_components.p>{"To begin, ensure your stack is fully compatible:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"Xcode 15+ with Swift 5.9+"}</_components.li>{"\n"}<_components.li>{"macOS on Apple Silicon (M1 chip or higher)"}</_components.li>{"\n"}<_components.li>{"Deployment target: iOS 17 or later"}</_components.li>{"\n"}<_components.li>{"Use Apple’s built-in "}<_components.code>{"FoundationModels"}</_components.code>{" framework (no package needed)"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.p>{"Devices that lack Apple Neural Engine (e.g., older iPhones or Intel Macs) will not run the on-device model and will return "}<_components.code>{".deviceNotEligible"}</_components.code>{". Always check availability before showing the PDA UI:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-swift">{"if SystemLanguageModel.default.availability == .available {\n   // show PDA feature\n} else {\n   // fallback or show alternate message\n}\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"To improve first-run latency, call "}<_components.code>{"session.prewarm()"}</_components.code>{" at app launch or before your PDA feature loads. This loads model weights into RAM and dramatically reduces startup time."}</_components.p>{"\n"}<_components.h2>{"🧠 Step 2: Defining Your Agent with Guided Generation"}</_components.h2>{"\n"}<_components.p>{"The heart of the PDA is the "}<_components.code>{"LanguageModelSession"}</_components.code>{" object. You define your agent’s persona, rules, and behavior using Apple’s system instruction closure:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-swift">{"@State var session = LanguageModelSession {\n   \"\"\"\n   You are a helpful health coach. Use personal data tools to suggest wellness advice.\n   \"\"\"\n}\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"These instructions are never visible to the user but stay active throughout the session. The framework ensures all prompts pass through this system prompt, guarding against prompt injection."}</_components.p>{"\n"}<_components.h3>{"🧱 Structured Output with "}<_components.code>{"@Generable"}</_components.code></_components.h3>{"\n"}<_components.p>{"To get usable, Swift-native output, define types with the "}<_components.code>{"@Generable"}</_components.code>{" macro:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-swift">{"@Generable\nstruct HealthSummary {\n   let systolic: Int\n   let diastolic: Int\n   let advice: String\n}\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"You can now ask the model to populate this object:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-swift">{"let result: HealthSummary = try await session.respond(\n   to: userPrompt,\n   generating: HealthSummary.self\n)\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"This is Apple’s strongest innovation—typed output directly from AI, no fragile text parsing required."}</_components.p>{"\n"}<_components.h2>{"🔧 Step 3: Building Tools — Real Data Access, Safe by Design"}</_components.h2>{"\n"}<_components.p>{"AI without data is a parrot. With tools, your PDA can securely fetch user data (e.g., from HealthKit) to generate meaningful output."}</_components.p>{"\n"}<_components.p>{"Define a Tool like this:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-swift">{"final class BloodPressureTool: Tool {\n   let name = \"blood_pressure\"\n   let description = \"Fetch latest systolic and diastolic pressure from HealthKit.\"\n\n   @Generable struct Arguments {}\n\n   func call(arguments: Arguments) async throws -> ToolOutput {\n      let systolic = ... // HealthKit fetch\n      let diastolic = ...\n\n      let result = GeneratedContent(properties: [\n         \"systolic\": systolic,\n         \"diastolic\": diastolic\n      ])\n\n      return ToolOutput(result)\n   }\n}\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"Then register tools at session creation:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-swift">{"session = LanguageModelSession(tools: [BloodPressureTool()]) { ... }\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"Apple’s model was trained with tool-calling behavior, so it understands how to request tools based on instructions and user intent."}</_components.p>{"\n"}<_components.h2>{"💡 Real Example in Action"}</_components.h2>{"\n"}<_components.p>{"When the user asks, “Check my last blood pressure and give advice,” the model:"}</_components.p>{"\n"}<_components.ol>{"\n"}<_components.li>{"Identifies the need for real data."}</_components.li>{"\n"}<_components.li>{"Calls "}<_components.code>{"BloodPressureTool"}</_components.code>{", receiving "}<_components.code>{"{systolic: 122, diastolic: 82}"}</_components.code></_components.li>{"\n"}<_components.li>{"Replies: “Based on your latest reading, your blood pressure is in the normal range. Keep maintaining a healthy diet and exercise.”"}</_components.li>{"\n"}</_components.ol>{"\n"}<_components.p>{"All of this happens offline, privately, and securely."}</_components.p>{"\n"}<_components.h2>{"✅ Final Thoughts"}</_components.h2>{"\n"}<_components.p>{"Hushh’s Personal Data Agents empower users to own and use their data meaningfully. Apple’s Foundation Model makes the impossible—on-device, private LLMs—real. Together, they form the most powerful platform yet for building ethical, AI-native applications."}</_components.p>{"\n"}<_components.p>{"If you believe AI should serve the user, not surveil them, this is the stack for you."}</_components.p></>;
}
export default function Content(props: { components?: Record<string, any> } = {}) {
  return createContent(props);
}

export const contentMeta = {
  "title": "Building Personal Data Agents on iOS — A Deep Dive into Apple’s On-Device AI",
  "description": "In 2025, Apple revolutionized AI development on its platforms by introducing the Foundation Models framework. This API gives developers access to Apple’s private, on-device ~3B parameter language model that powers Siri and Apple Intelligence.",
  "image": "/blogs/new/building-personal-data-agents-on-ios.png",
  "publishedAt": "July 25, 2025",
  "updatedAt": "July 25, 2025",
  "author": "Manish Sainani",
  "isPublished": true,
  "tags": [
    "AI",
    "iOS",
    "Apple",
    "Hushh",
    "Swift"
  ]
};
export const contentHeadings = [
  {
    "text": "🧭 Introduction",
    "level": 2,
    "slug": "-introduction"
  },
  {
    "text": "⚙️ Step 1: Setting Up Your Environment",
    "level": 2,
    "slug": "️-step-1-setting-up-your-environment"
  },
  {
    "text": "🧠 Step 2: Defining Your Agent with Guided Generation",
    "level": 2,
    "slug": "-step-2-defining-your-agent-with-guided-generation"
  },
  {
    "text": "🧱 Structured Output with @Generable",
    "level": 3,
    "slug": "-structured-output-with-generable"
  },
  {
    "text": "🔧 Step 3: Building Tools — Real Data Access, Safe by Design",
    "level": 2,
    "slug": "-step-3-building-tools--real-data-access-safe-by-design"
  },
  {
    "text": "💡 Real Example in Action",
    "level": 2,
    "slug": "-real-example-in-action"
  },
  {
    "text": "✅ Final Thoughts",
    "level": 2,
    "slug": "-final-thoughts"
  }
];
export const contentPlainText = "🧭 Introduction In 2025, Apple revolutionized AI development on its platforms by introducing the Foundation Models framework. This API gives developers access to Apple’s private, on device 3B parameter language model that powers Siri and Apple Intelligence. Hushh.ai builds on top of this breakthrough to offer Personal Data Agents (PDAs)—intelligent, privacy first assistants that run completely on device. This blog is a deep, hands on walkthrough for iOS developers: how to set up your environment, initialize a PDA, build privacy safe tools, and deploy an AI powered app that aligns with Apple’s privacy first ethos. If you’ve ever dreamed of building your own Siri—this is how to do it. ⚙️ Step 1: Setting Up Your Environment To begin, ensure your stack is fully compatible: Xcode 15+ with Swift 5.9+ macOS on Apple Silicon (M1 chip or higher) Deployment target: iOS 17 or later Use Apple’s built in framework (no package needed) Devices that lack Apple Neural Engine (e.g., older iPhones or Intel Macs) will not run the on device model and will return . Always check availability before showing the PDA UI: To improve first run latency, call at app launch or before your PDA feature loads. This loads model weights into RAM and dramatically reduces startup time. 🧠 Step 2: Defining Your Agent with Guided Generation The heart of the PDA is the object. You define your agent’s persona, rules, and behavior using Apple’s system instruction closure: These instructions are never visible to the user but stay active throughout the session. The framework ensures all prompts pass through this system prompt, guarding against prompt injection. 🧱 Structured Output with To get usable, Swift native output, define types with the macro: You can now ask the model to populate this object: This is Apple’s strongest innovation—typed output directly from AI, no fragile text parsing required. 🔧 Step 3: Building Tools — Real Data Access, Safe by Design AI without data is a parrot. With tools, your PDA can securely fetch user data (e.g., from HealthKit) to generate meaningful output. Define a Tool like this: Then register tools at session creation: Apple’s model was trained with tool calling behavior, so it understands how to request tools based on instructions and user intent. 💡 Real Example in Action When the user asks, “Check my last blood pressure and give advice,” the model: 1. Identifies the need for real data. 2. Calls , receiving 3. Replies: “Based on your latest reading, your blood pressure is in the normal range. Keep maintaining a healthy diet and exercise.” All of this happens offline, privately, and securely. ✅ Final Thoughts Hushh’s Personal Data Agents empower users to own and use their data meaningfully. Apple’s Foundation Model makes the impossible—on device, private LLMs—real. Together, they form the most powerful platform yet for building ethical, AI native applications. If you believe AI should serve the user, not surveil them, this is the stack for you.";
