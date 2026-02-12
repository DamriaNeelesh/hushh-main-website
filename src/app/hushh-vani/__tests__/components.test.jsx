/**
 * Hushh Vani — Component Render Tests
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HushhVaniHeader from "../components/HushhVaniHeader";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorks from "../components/HowItWorks";
import HushhVaniFooter from "../components/HushhVaniFooter";
import { FEATURES, STATS } from "../lib/constants";

// Mock next/font/google
jest.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    variable: "--font-plus-jakarta",
    className: "mock-font",
  }),
}));

// ── HushhVaniHeader ─────────────────────────────────────────
describe("HushhVaniHeader", () => {
  it("renders the logo", () => {
    render(<HushhVaniHeader />);
    expect(screen.getByText("hushh")).toBeInTheDocument();
    expect(screen.getByText("वाणी")).toBeInTheDocument();
  });

  it("renders desktop nav links", () => {
    render(<HushhVaniHeader />);
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("How It Works")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders Get Started CTA", () => {
    render(<HushhVaniHeader />);
    const ctas = screen.getAllByText("Get Started");
    expect(ctas.length).toBeGreaterThan(0);
  });

  it("toggles mobile menu on button click", () => {
    render(<HushhVaniHeader />);
    const toggleBtn = screen.getByLabelText("Toggle menu");
    
    // Menu should not be visible initially (mobile items are hidden via CSS, 
    // but the mobile div is not rendered)
    fireEvent.click(toggleBtn);
    
    // After click, mobile nav links should appear
    const mobileFeatures = screen.getAllByText("Features");
    expect(mobileFeatures.length).toBeGreaterThan(1);
  });
});

// ── HeroSection ─────────────────────────────────────────────
describe("HeroSection", () => {
  it("renders the headline", () => {
    render(<HeroSection />);
    expect(screen.getByText("Apni Pehchaan")).toBeInTheDocument();
    expect(screen.getByText("Banayein")).toBeInTheDocument();
  });

  it("renders the AI-Powered badge", () => {
    render(<HeroSection />);
    expect(screen.getByText("AI-Powered for Bharat")).toBeInTheDocument();
  });

  it("renders CTAs", () => {
    render(<HeroSection />);
    expect(screen.getByText("Start Building")).toBeInTheDocument();
    expect(screen.getByText("Explore Features")).toBeInTheDocument();
  });

  it("renders all stats", () => {
    render(<HeroSection />);
    STATS.forEach((stat) => {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
    });
  });
});

// ── FeatureCard ─────────────────────────────────────────────
describe("FeatureCard", () => {
  const testFeature = FEATURES[0];

  it("renders feature title", () => {
    render(<FeatureCard feature={testFeature} index={0} />);
    expect(screen.getByText(testFeature.title)).toBeInTheDocument();
  });

  it("renders Hindi title and tagline", () => {
    render(<FeatureCard feature={testFeature} index={0} />);
    expect(screen.getByText(testFeature.hindiTitle)).toBeInTheDocument();
    expect(screen.getByText(testFeature.tagline)).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<FeatureCard feature={testFeature} index={0} />);
    expect(screen.getByText(testFeature.description)).toBeInTheDocument();
  });

  it("renders all capabilities", () => {
    render(<FeatureCard feature={testFeature} index={0} />);
    testFeature.capabilities.forEach((cap) => {
      expect(screen.getByText(cap)).toBeInTheDocument();
    });
  });

  it("applies offset class for odd-indexed cards", () => {
    const { container } = render(
      <FeatureCard feature={testFeature} index={1} />
    );
    const article = container.querySelector("article");
    expect(article.className).toContain("lg:translate-y-8");
  });

  it("does NOT apply offset class for even-indexed cards", () => {
    const { container } = render(
      <FeatureCard feature={testFeature} index={0} />
    );
    const article = container.querySelector("article");
    expect(article.className).not.toContain("lg:translate-y-8");
  });
});

// ── FeaturesSection ─────────────────────────────────────────
describe("FeaturesSection", () => {
  it("renders section heading", () => {
    render(<FeaturesSection />);
    expect(
      screen.getByText("Built for India. Powered by AI.")
    ).toBeInTheDocument();
  });

  it("renders all 5 feature cards", () => {
    render(<FeaturesSection />);
    FEATURES.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeInTheDocument();
    });
  });
});

// ── HowItWorks ──────────────────────────────────────────────
describe("HowItWorks", () => {
  it("renders the section heading", () => {
    render(<HowItWorks />);
    expect(
      screen.getByText("Four Steps to Bharat-Ready Marketing")
    ).toBeInTheDocument();
  });

  it("renders all 4 steps", () => {
    render(<HowItWorks />);
    expect(screen.getByText("Connect Your Brand")).toBeInTheDocument();
    expect(screen.getByText("AI Localizes Everything")).toBeInTheDocument();
    expect(screen.getByText("Launch & Measure")).toBeInTheDocument();
    expect(screen.getByText("Scale Across Bharat")).toBeInTheDocument();
  });

  it("renders Hindi tags for all steps", () => {
    render(<HowItWorks />);
    expect(screen.getByText("ब्रांड जोड़ें")).toBeInTheDocument();
    expect(screen.getByText("AI सब समझे")).toBeInTheDocument();
    expect(screen.getByText("लॉन्च और मापें")).toBeInTheDocument();
    expect(screen.getByText("पूरे भारत में फैलाएं")).toBeInTheDocument();
  });

  it("renders step numbers", () => {
    render(<HowItWorks />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
  });
});

// ── HushhVaniFooter ─────────────────────────────────────────
describe("HushhVaniFooter", () => {
  it("renders the brand name", () => {
    render(<HushhVaniFooter />);
    expect(screen.getByText("hushh")).toBeInTheDocument();
    expect(screen.getByText("वाणी")).toBeInTheDocument();
  });

  it("renders nav links", () => {
    render(<HushhVaniFooter />);
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders hushh.ai external link", () => {
    render(<HushhVaniFooter />);
    const externalLink = screen.getByText("hushh.ai");
    expect(externalLink).toHaveAttribute("href", "https://hushh.ai");
    expect(externalLink).toHaveAttribute("target", "_blank");
  });

  it("renders copyright text", () => {
    render(<HushhVaniFooter />);
    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} Hushh AI. All rights reserved.`)
    ).toBeInTheDocument();
  });

  it("renders the Bharat tagline", () => {
    render(<HushhVaniFooter />);
    expect(screen.getByText("अपनी पहचान बनायें")).toBeInTheDocument();
  });
});
