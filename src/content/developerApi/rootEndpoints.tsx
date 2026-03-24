/*@jsxRuntime automatic @jsxImportSource react*/
/*
{
title: "Fill gaps with Gemini",
description: "Run a second-pass enrichment for higher confidence traits.",
endpoint: {
method: "POST",
path: "/api/a2a/gemini",
requestBody: {
text: {
type: "string",
example:
"Using the Gemini Public Data Agent, provide a detailed JSON profile for Sundar Pichai with email sundar.pichai@example.com and phone +1 6505559001."
},
sessionId: { type: "string" },
id: { type: "string" }
}
}
},
*/
import ApiSection from '../../app/_components/developerApiContent/apiTester';
import TryItOut from '../../app/_components/developerApiContent/tryItOut';
export const tryItOutSamples = [{
  title: "Enrich a profile",
  description: "Generate a full profile using public signals.",
  endpoint: {
    method: "POST",
    path: "/api/a2a/public",
    requestBody: {
      text: {
        type: "string",
        example: "Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }
}, {
  /*
  {
  title: "Fill gaps with Gemini",
  description: "Run a second-pass enrichment for higher confidence traits.",
  endpoint: {
  method: "POST",
  path: "/api/a2a/gemini",
  requestBody: {
  text: {
  type: "string",
  example:
  "Using the Gemini Public Data Agent, provide a detailed JSON profile for Sundar Pichai with email sundar.pichai@example.com and phone +1 6505559001."
  },
  sessionId: { type: "string" },
  id: { type: "string" }
  }
  }
  },
  */
  title: "Create a profile",
  description: "Create a new Supabase profile from natural language.",
  endpoint: {
    method: "POST",
    path: "/api/a2a/hushh-profile",
    requestBody: {
      text: {
        type: "string",
        example: "Create a profile for Sundar Pichai with email sundar.pichai@example.com, phone +1 6505559001, occupation CEO, city Mountain View, and country USA."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }
}, {
  title: "Update a profile",
  description: "Update preferences or details in the profile.",
  endpoint: {
    method: "POST",
    path: "/api/a2a/hushh-profile-update",
    requestBody: {
      text: {
        type: "string",
        example: "Update the city for Sundar Pichai to Mountain View and set the occupation to CEO."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }
}, {
  title: "Query a profile",
  description: "Fetch a profile by email, phone, or name.",
  endpoint: {
    method: "POST",
    path: "/api/a2a/hushh",
    requestBody: {
      text: {
        type: "string",
        example: "Fetch all details for Sundar Pichai with phone +1 6505559001."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }
}, {
  title: "Normalize brand signals",
  description: "Summarize likes, dislikes, and brand affinity.",
  endpoint: {
    method: "POST",
    path: "/api/a2a/brand",
    requestBody: {
      text: {
        type: "string",
        example: "Summarize likes, dislikes, and brand affinity for Sundar Pichai using the consented profile."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }
}];
function createContent(props: any) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    code: "code",
    h2: "h2",
    pre: "pre",
    h3: "h3",
    ul: "ul",
    li: "li"
  }, props.components), {Callout, Steps} = _components;
  if (!Callout) _missingContentReference("Callout", true);
  if (!Steps) _missingContentReference("Steps", true);
  return <><_components.h1>{"Hushh Agentic Developer APIs"}</_components.h1>{"\n"}<_components.p>{"These endpoints power consented profile enrichment for enterprise brands like LVMH and Reliance. They run on MuleSoft CloudHub and use the A2A (Agent-to-Agent) JSON-RPC 2.0 protocol."}</_components.p>{"\n"}<Callout type="info"><_components.p>{"Use "}<_components.code>{"/api/a2a/{agent}"}</_components.code>{" for testing in this documentation. Call direct MuleSoft endpoints from your backend only."}</_components.p></Callout>{"\n"}<_components.h2>{"Base URL"}</_components.h2>{"\n"}<_components.p><_components.code>{"https://hushh.ai"}</_components.code></_components.p>{"\n"}<_components.h2>{"Request shape"}</_components.h2>{"\n"}<_components.pre><_components.code className="language-json">{"{\n  \"text\": \"Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001.\",\n  \"sessionId\": \"session-123\",\n  \"id\": \"task-abc123\"\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Core endpoints (testable)"}</_components.h2>{"\n"}<TryItOut title="Run a live agent request" subtitle="Pick a workflow on the left, edit the payload, and send a request to the test endpoint." samples={tryItOutSamples} />{"\n"}<_components.h3>{"OpenAI Public Data Agent"}</_components.h3>{"\n"}<_components.p>{"Enriches profiles using public signals to infer interests, lifestyle, and brand affinities."}</_components.p>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/public",
    description: "OpenAI Public Data Agent enrichment",
    requestBody: {
      text: {
        type: "string",
        example: "Provide a detailed JSON profile for Sundar Pichai, email sundar.pichai@example.com, phone +1 6505559001."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Gemini Public Data Agent"}</_components.h3>{"\n"}<_components.p>{"Second-pass enrichment that fills gaps and adds higher-confidence traits."}</_components.p>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/gemini",
    description: "Gemini Public Data Agent enrichment",
    requestBody: {
      text: {
        type: "string",
        example: "Using the Gemini Public Data Agent, provide a detailed JSON profile for Sundar Pichai with email sundar.pichai@example.com and phone +1 6505559001."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Supabase Profile Creation Agent"}</_components.h3>{"\n"}<_components.p>{"Creates a new profile in Supabase from a natural-language instruction."}</_components.p>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/hushh-profile",
    description: "Supabase profile creation agent",
    requestBody: {
      text: {
        type: "string",
        example: "Create a profile for Sundar Pichai with email sundar.pichai@example.com, phone +1 6505559001, occupation CEO, city Mountain View, and country USA."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Supabase Profile Update Agent"}</_components.h3>{"\n"}<_components.p>{"Updates an existing profile with new details or preferences."}</_components.p>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/hushh-profile-update",
    description: "Supabase profile update agent",
    requestBody: {
      text: {
        type: "string",
        example: "Update the city for Sundar Pichai to Mountain View and set the occupation to CEO."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Supabase Profile Query Agent"}</_components.h3>{"\n"}<_components.p>{"Retrieves existing profile data by email, phone, or name."}</_components.p>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/hushh",
    description: "Supabase profile query agent",
    requestBody: {
      text: {
        type: "string",
        example: "Fetch all details for Sundar Pichai with phone +1 6505559001."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h3>{"Brand User Data Query Agent"}</_components.h3>{"\n"}<_components.p>{"Normalizes likes, dislikes, and brand preference signals into a CRM-ready profile."}</_components.p>{"\n"}<ApiSection endpoint={{
    method: "POST",
    path: "/api/a2a/brand",
    description: "Brand user data query agent (Salesforce CRM)",
    requestBody: {
      text: {
        type: "string",
        example: "Summarize likes, dislikes, and brand affinity for Sundar Pichai using the consented profile."
      },
      sessionId: {
        type: "string"
      },
      id: {
        type: "string"
      }
    }
  }} />{"\n"}<_components.h2>{"Direct MuleSoft endpoints (server to server)"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"OpenAI Public Data Agent: "}<_components.code>{"https://hushh-open-ai-agent-app-bubqpu.5sc6y6-3.usa-e2.cloudhub.io/public-data-agent"}</_components.code></_components.li>{"\n"}<_components.li>{"Gemini Public Data Agent: "}<_components.code>{"https://hushh-gemini-ai-agent-app-bubqpu.5sc6y6-3.usa-e2.cloudhub.io/public-data-agent"}</_components.code></_components.li>{"\n"}<_components.li>{"Supabase Profile Creation/Update: "}<_components.code>{"https://hushh-supabase-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-agent"}</_components.code></_components.li>{"\n"}<_components.li>{"Supabase Profile Query: "}<_components.code>{"https://hushh-supabase-query-agent-app-bubqpu.5sc6y6-2.usa-e2.cloudhub.io/supabase-query-agent"}</_components.code></_components.li>{"\n"}<_components.li>{"Brand User Data Query (CRM): "}<_components.code>{"https://hushh-brand-agent-app-bubqpu.5sc6y6-4.usa-e2.cloudhub.io/crm-agent"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Recommended flow"}</_components.h2>{"\n"}<Steps><_components.h3>{"1) Create or query a profile"}</_components.h3><_components.p>{"Use the Supabase Profile Creation or Query agent to establish a user record."}</_components.p><_components.h3>{"2) Enrich with Public and Gemini agents"}</_components.h3><_components.p>{"Send the same identity payload to "}<_components.code>{"/api/a2a/public"}</_components.code>{" and "}<_components.code>{"/api/a2a/gemini"}</_components.code>{"."}</_components.p><_components.h3>{"3) Normalize likes and dislikes"}</_components.h3><_components.p>{"Call "}<_components.code>{"/api/a2a/brand"}</_components.code>{" to summarize brand affinities."}</_components.p><_components.h3>{"4) Store and activate"}</_components.h3><_components.p>{"Write the merged JSON profile into your CRM, CDP, or personalization engine."}</_components.p></Steps></>;
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
    "text": "Base URL",
    "level": 2,
    "slug": "base-url"
  },
  {
    "text": "Request shape",
    "level": 2,
    "slug": "request-shape"
  },
  {
    "text": "Core endpoints (testable)",
    "level": 2,
    "slug": "core-endpoints-testable"
  },
  {
    "text": "OpenAI Public Data Agent",
    "level": 3,
    "slug": "openai-public-data-agent"
  },
  {
    "text": "Gemini Public Data Agent",
    "level": 3,
    "slug": "gemini-public-data-agent"
  },
  {
    "text": "Supabase Profile Creation Agent",
    "level": 3,
    "slug": "supabase-profile-creation-agent"
  },
  {
    "text": "Supabase Profile Update Agent",
    "level": 3,
    "slug": "supabase-profile-update-agent"
  },
  {
    "text": "Supabase Profile Query Agent",
    "level": 3,
    "slug": "supabase-profile-query-agent"
  },
  {
    "text": "Brand User Data Query Agent",
    "level": 3,
    "slug": "brand-user-data-query-agent"
  },
  {
    "text": "Direct MuleSoft endpoints (server to server)",
    "level": 2,
    "slug": "direct-mulesoft-endpoints-server-to-server"
  },
  {
    "text": "Recommended flow",
    "level": 2,
    "slug": "recommended-flow"
  },
  {
    "text": "1) Create or query a profile",
    "level": 3,
    "slug": "1-create-or-query-a-profile"
  },
  {
    "text": "2) Enrich with Public and Gemini agents",
    "level": 3,
    "slug": "2-enrich-with-public-and-gemini-agents"
  },
  {
    "text": "3) Normalize likes and dislikes",
    "level": 3,
    "slug": "3-normalize-likes-and-dislikes"
  },
  {
    "text": "4) Store and activate",
    "level": 3,
    "slug": "4-store-and-activate"
  }
];
export const contentPlainText = "export const tryItOutSamples = [ , sessionId: , id: } } }, / , sessionId: , id: } } }, / , sessionId: , id: } } }, , sessionId: , id: } } }, , sessionId: , id: } } }, , sessionId: , id: } } } ] Hushh Agentic Developer APIs These endpoints power consented profile enrichment for enterprise brands like LVMH and Reliance. They run on MuleSoft CloudHub and use the A2A (Agent to Agent) JSON RPC 2.0 protocol. Use for testing in this documentation. Call direct MuleSoft endpoints from your backend only. Base URL Request shape Core endpoints (testable) OpenAI Public Data Agent Enriches profiles using public signals to infer interests, lifestyle, and brand affinities. Gemini Public Data Agent Second pass enrichment that fills gaps and adds higher confidence traits. Supabase Profile Creation Agent Creates a new profile in Supabase from a natural language instruction. Supabase Profile Update Agent Updates an existing profile with new details or preferences. Supabase Profile Query Agent Retrieves existing profile data by email, phone, or name. Brand User Data Query Agent Normalizes likes, dislikes, and brand preference signals into a CRM ready profile. Direct MuleSoft endpoints (server to server) OpenAI Public Data Agent: Gemini Public Data Agent: Supabase Profile Creation/Update: Supabase Profile Query: Brand User Data Query (CRM): Recommended flow 1) Create or query a profile Use the Supabase Profile Creation or Query agent to establish a user record. 2) Enrich with Public and Gemini agents Send the same identity payload to and . 3) Normalize likes and dislikes Call to summarize brand affinities. 4) Store and activate Write the merged JSON profile into your CRM, CDP, or personalization engine.";
