/**
 * Hushh Vani — Supabase Helper Tests
 */
import { TABLES } from "../lib/supabase";

// Mock @supabase/supabase-js
jest.mock("@supabase/supabase-js", () => {
  const mockFrom = jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    range: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: {}, error: null }),
  }));

  return {
    createClient: jest.fn(() => ({
      from: mockFrom,
      auth: {
        signIn: jest.fn(),
        signOut: jest.fn(),
      },
    })),
  };
});

describe("TABLES", () => {
  it("exports all required table names", () => {
    expect(TABLES.CAMPAIGNS).toBe("vani_campaigns");
    expect(TABLES.TRANSLATIONS).toBe("vani_translations");
    expect(TABLES.ANALYTICS).toBe("vani_analytics");
    expect(TABLES.INFLUENCERS).toBe("vani_influencers");
    expect(TABLES.LEADS).toBe("vani_leads");
  });

  it("all table names are prefixed with vani_", () => {
    Object.values(TABLES).forEach((tableName) => {
      expect(tableName).toMatch(/^vani_/);
    });
  });

  it("has exactly 5 tables", () => {
    expect(Object.keys(TABLES)).toHaveLength(5);
  });
});

describe("Supabase client", () => {
  it("creates client with correct config", () => {
    process.env.NEXT_PUBLIC_SUPABASE_AUTH_ANON_KEY = "test-anon-key";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key";
    const { createClient } = require("@supabase/supabase-js");
    const { getVaniSupabase } = require("../lib/supabase");

    getVaniSupabase();

    expect(createClient).toHaveBeenCalled();
    const [url, , options] = createClient.mock.calls[0];
    expect(url).toContain("supabase.co");
    expect(options.auth.persistSession).toBe(true);
    expect(options.auth.autoRefreshToken).toBe(true);
  });
});

describe("Query helpers", () => {
  it("fetchCampaigns is a function", async () => {
    const { fetchCampaigns } = require("../lib/supabase");
    expect(typeof fetchCampaigns).toBe("function");
  });

  it("fetchTranslations is a function", async () => {
    const { fetchTranslations } = require("../lib/supabase");
    expect(typeof fetchTranslations).toBe("function");
  });

  it("createLead is a function", async () => {
    const { createLead } = require("../lib/supabase");
    expect(typeof createLead).toBe("function");
  });

  it("trackAnalytics is a function", async () => {
    const { trackAnalytics } = require("../lib/supabase");
    expect(typeof trackAnalytics).toBe("function");
  });
});
