/**
 * Hushh Vani — AI Demo Component Render Tests
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TranslationDemo from "../components/TranslationDemo";
import ContentGeneratorDemo from "../components/ContentGeneratorDemo";
import VoiceSearchDemo from "../components/VoiceSearchDemo";

// Mock next/font/google
jest.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    variable: "--font-plus-jakarta",
    className: "mock-font",
  }),
}));

// Mock fetch globally
global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch.mockReset();
});

// ═══════════════════════════════════════════════════════════════
// TranslationDemo
// ═══════════════════════════════════════════════════════════════
describe("TranslationDemo", () => {
  it("renders the section heading", () => {
    render(<TranslationDemo />);
    expect(
      screen.getByText("Instant Translation to 12+ Indian Languages")
    ).toBeInTheDocument();
  });

  it("renders Cloud Translation V3 badge", () => {
    render(<TranslationDemo />);
    expect(
      screen.getByText("Live Demo — Cloud Translation V3")
    ).toBeInTheDocument();
  });

  it("renders the textarea input", () => {
    render(<TranslationDemo />);
    const textarea = screen.getByPlaceholderText(
      /Type your marketing text here/
    );
    expect(textarea).toBeInTheDocument();
  });

  it("renders Translate button", () => {
    render(<TranslationDemo />);
    expect(screen.getByText("Translate")).toBeInTheDocument();
  });

  it("Translate button is disabled when textarea is empty", () => {
    render(<TranslationDemo />);
    const btn = screen.getByText("Translate").closest("button");
    expect(btn).toBeDisabled();
  });

  it("Translate button is enabled when textarea has text", () => {
    render(<TranslationDemo />);
    const textarea = screen.getByPlaceholderText(
      /Type your marketing text here/
    );
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    const btn = screen.getByText("Translate").closest("button");
    expect(btn).not.toBeDisabled();
  });

  it("calls the translate API on button click", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: [
            { targetLanguage: "hi", translatedText: "नमस्ते दुनिया" },
            { targetLanguage: "ta", translatedText: "ஹலோ உலகம்" },
          ],
        }),
    });

    render(<TranslationDemo />);
    const textarea = screen.getByPlaceholderText(/Type your marketing text here/);
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    fireEvent.click(screen.getByText("Translate").closest("button"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/hushh-vani/api/translate",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  it("displays translations after successful API call", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: [
            { targetLanguage: "hi", translatedText: "नमस्ते दुनिया" },
            { targetLanguage: "ta", translatedText: "ஹலோ உலகம்" },
          ],
        }),
    });

    render(<TranslationDemo />);
    const textarea = screen.getByPlaceholderText(/Type your marketing text here/);
    fireEvent.change(textarea, { target: { value: "Hello world" } });
    fireEvent.click(screen.getByText("Translate").closest("button"));

    await waitFor(() => {
      expect(screen.getByText("नमस्ते दुनिया")).toBeInTheDocument();
      expect(screen.getByText("ஹலோ உலகம்")).toBeInTheDocument();
    });
  });

  it("displays error message on API failure", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: false,
          error: "Translation service unavailable",
        }),
    });

    render(<TranslationDemo />);
    const textarea = screen.getByPlaceholderText(/Type your marketing text here/);
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.click(screen.getByText("Translate").closest("button"));

    await waitFor(() => {
      expect(screen.getByText("Translation service unavailable")).toBeInTheDocument();
    });
  });

  it("displays network error on fetch failure", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<TranslationDemo />);
    const textarea = screen.getByPlaceholderText(/Type your marketing text here/);
    fireEvent.change(textarea, { target: { value: "Hello" } });
    fireEvent.click(screen.getByText("Translate").closest("button"));

    await waitFor(() => {
      expect(screen.getByText("Network error. Please try again.")).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// ContentGeneratorDemo
// ═══════════════════════════════════════════════════════════════
describe("ContentGeneratorDemo", () => {
  it("renders the section heading", () => {
    render(<ContentGeneratorDemo />);
    expect(
      screen.getByText("AI Hinglish Content Generator")
    ).toBeInTheDocument();
  });

  it("renders Gemini 2.5 Pro badge", () => {
    render(<ContentGeneratorDemo />);
    expect(
      screen.getByText("Live Demo — Gemini 2.5 Pro")
    ).toBeInTheDocument();
  });

  it("renders Brand Name and Campaign Topic inputs", () => {
    render(<ContentGeneratorDemo />);
    expect(screen.getByText("Brand Name")).toBeInTheDocument();
    expect(screen.getByText("Campaign Topic")).toBeInTheDocument();
  });

  it("renders Tone and Content Format selects", () => {
    render(<ContentGeneratorDemo />);
    expect(screen.getByText("Tone")).toBeInTheDocument();
    expect(screen.getByText("Content Format")).toBeInTheDocument();
  });

  it("renders Generate button", () => {
    render(<ContentGeneratorDemo />);
    expect(
      screen.getByText("Generate Hinglish Content")
    ).toBeInTheDocument();
  });

  it("Generate button is disabled when brand/topic empty", () => {
    render(<ContentGeneratorDemo />);
    const btn = screen.getByText("Generate Hinglish Content").closest("button");
    expect(btn).toBeDisabled();
  });

  it("Generate button is enabled with brand and topic filled", () => {
    render(<ContentGeneratorDemo />);
    const brandInput = screen.getByPlaceholderText(/Zomato/);
    const topicInput = screen.getByPlaceholderText(/Diwali sale/);
    fireEvent.change(brandInput, { target: { value: "TestBrand" } });
    fireEvent.change(topicInput, { target: { value: "Summer sale" } });
    const btn = screen.getByText("Generate Hinglish Content").closest("button");
    expect(btn).not.toBeDisabled();
  });

  it("calls the generate API on button click", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: {
            content: "Yeh summer mein kuch hatke karo! 🔥",
            model: "gemini-2.5-pro",
          },
        }),
    });

    render(<ContentGeneratorDemo />);
    fireEvent.change(screen.getByPlaceholderText(/Zomato/), {
      target: { value: "TestBrand" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Diwali sale/), {
      target: { value: "Summer sale" },
    });
    fireEvent.click(
      screen.getByText("Generate Hinglish Content").closest("button")
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/hushh-vani/api/generate",
        expect.objectContaining({ method: "POST" })
      );
    });
  });

  it("displays generated content after successful API call", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: {
            content: "Yeh summer mein kuch hatke karo! 🔥",
            model: "gemini-2.5-pro",
          },
        }),
    });

    render(<ContentGeneratorDemo />);
    fireEvent.change(screen.getByPlaceholderText(/Zomato/), {
      target: { value: "TestBrand" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Diwali sale/), {
      target: { value: "Summer sale" },
    });
    fireEvent.click(
      screen.getByText("Generate Hinglish Content").closest("button")
    );

    await waitFor(() => {
      expect(
        screen.getByText("Yeh summer mein kuch hatke karo! 🔥")
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Generated by gemini-2.5-pro/)
      ).toBeInTheDocument();
    });
  });

  it("renders Copy button for generated content", async () => {
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          success: true,
          data: {
            content: "Content here",
            model: "gemini-2.5-pro",
          },
        }),
    });

    render(<ContentGeneratorDemo />);
    fireEvent.change(screen.getByPlaceholderText(/Zomato/), {
      target: { value: "Brand" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Diwali sale/), {
      target: { value: "Topic" },
    });
    fireEvent.click(
      screen.getByText("Generate Hinglish Content").closest("button")
    );

    await waitFor(() => {
      expect(screen.getByText("Copy")).toBeInTheDocument();
    });
  });
});

// ═══════════════════════════════════════════════════════════════
// VoiceSearchDemo
// ═══════════════════════════════════════════════════════════════
describe("VoiceSearchDemo", () => {
  it("renders the section heading", () => {
    render(<VoiceSearchDemo />);
    expect(
      screen.getByText("Voice Search in Your Language")
    ).toBeInTheDocument();
  });

  it("renders Chirp 2 badge", () => {
    render(<VoiceSearchDemo />);
    expect(
      screen.getByText("Live Demo — Chirp 2 (Speech-to-Text V2)")
    ).toBeInTheDocument();
  });

  it("renders language picker buttons", () => {
    render(<VoiceSearchDemo />);
    expect(screen.getByText("हिन्दी")).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("தமிழ்")).toBeInTheDocument();
    expect(screen.getByText("বাংলা")).toBeInTheDocument();
    expect(screen.getByText("తెలుగు")).toBeInTheDocument();
    expect(screen.getByText("मराठी")).toBeInTheDocument();
  });

  it("renders the mic button", () => {
    render(<VoiceSearchDemo />);
    expect(screen.getByText(/Tap to speak in/)).toBeInTheDocument();
  });

  it("shows Hindi selected by default", () => {
    render(<VoiceSearchDemo />);
    expect(screen.getByText("Tap to speak in Hindi")).toBeInTheDocument();
  });

  it("changes selected language on language button click", () => {
    render(<VoiceSearchDemo />);
    fireEvent.click(screen.getByText("தமிழ்"));
    expect(screen.getByText("Tap to speak in Tamil")).toBeInTheDocument();
  });

  it("shows English (India) when English selected", () => {
    render(<VoiceSearchDemo />);
    fireEvent.click(screen.getByText("English"));
    expect(
      screen.getByText("Tap to speak in English (India)")
    ).toBeInTheDocument();
  });
});
