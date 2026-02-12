-- ============================================================
-- Hushh Vani — Supabase Migration
-- Independent vani_* tables for the Hushh Vani module
-- ============================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── vani_campaigns ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vani_campaigns (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  description   TEXT,
  status        TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  languages     TEXT[] DEFAULT '{}',
  budget        NUMERIC(12,2),
  start_date    TIMESTAMPTZ,
  end_date      TIMESTAMPTZ,
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── vani_translations ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS vani_translations (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id   UUID REFERENCES vani_campaigns(id) ON DELETE CASCADE,
  source_lang   TEXT NOT NULL DEFAULT 'en',
  target_lang   TEXT NOT NULL,
  source_text   TEXT NOT NULL,
  translated_text TEXT NOT NULL,
  quality_score NUMERIC(3,2) CHECK (quality_score >= 0 AND quality_score <= 1),
  reviewed      BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── vani_analytics ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vani_analytics (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type    TEXT NOT NULL,
  event_data    JSONB DEFAULT '{}',
  campaign_id   UUID REFERENCES vani_campaigns(id) ON DELETE SET NULL,
  user_agent    TEXT,
  ip_hash       TEXT,
  timestamp     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── vani_influencers ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vani_influencers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  platform      TEXT NOT NULL CHECK (platform IN ('instagram', 'youtube', 'twitter', 'whatsapp', 'other')),
  handle        TEXT,
  followers     INTEGER DEFAULT 0,
  languages     TEXT[] DEFAULT '{}',
  categories    TEXT[] DEFAULT '{}',
  engagement_rate NUMERIC(5,2),
  verified      BOOLEAN DEFAULT FALSE,
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── vani_leads ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vani_leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  company         TEXT,
  message         TEXT,
  target_languages TEXT[] DEFAULT '{}',
  source          TEXT DEFAULT 'hushh-vani-landing',
  status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Indexes ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_vani_campaigns_status ON vani_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_vani_translations_campaign ON vani_translations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_vani_translations_lang ON vani_translations(target_lang);
CREATE INDEX IF NOT EXISTS idx_vani_analytics_type ON vani_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_vani_analytics_campaign ON vani_analytics(campaign_id);
CREATE INDEX IF NOT EXISTS idx_vani_analytics_timestamp ON vani_analytics(timestamp);
CREATE INDEX IF NOT EXISTS idx_vani_influencers_platform ON vani_influencers(platform);
CREATE INDEX IF NOT EXISTS idx_vani_leads_status ON vani_leads(status);
CREATE INDEX IF NOT EXISTS idx_vani_leads_email ON vani_leads(email);

-- ── Updated-at triggers ─────────────────────────────────────
CREATE OR REPLACE FUNCTION vani_update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_vani_campaigns_updated
  BEFORE UPDATE ON vani_campaigns
  FOR EACH ROW EXECUTE FUNCTION vani_update_updated_at();

CREATE TRIGGER trg_vani_translations_updated
  BEFORE UPDATE ON vani_translations
  FOR EACH ROW EXECUTE FUNCTION vani_update_updated_at();

CREATE TRIGGER trg_vani_influencers_updated
  BEFORE UPDATE ON vani_influencers
  FOR EACH ROW EXECUTE FUNCTION vani_update_updated_at();

CREATE TRIGGER trg_vani_leads_updated
  BEFORE UPDATE ON vani_leads
  FOR EACH ROW EXECUTE FUNCTION vani_update_updated_at();

-- ── RLS Policies ────────────────────────────────────────────
ALTER TABLE vani_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE vani_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE vani_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE vani_influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vani_leads ENABLE ROW LEVEL SECURITY;

-- Public read access for campaigns
CREATE POLICY "Public can read active campaigns"
  ON vani_campaigns FOR SELECT
  USING (status = 'active');

-- Public read access for influencers
CREATE POLICY "Public can read verified influencers"
  ON vani_influencers FOR SELECT
  USING (verified = true);

-- Public can insert leads (contact form)
CREATE POLICY "Public can submit leads"
  ON vani_leads FOR INSERT
  WITH CHECK (true);

-- Public can insert analytics events
CREATE POLICY "Public can track analytics"
  ON vani_analytics FOR INSERT
  WITH CHECK (true);
