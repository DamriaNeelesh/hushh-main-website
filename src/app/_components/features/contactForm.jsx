"use client";

import { useState } from "react";
import { FaGithub, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MdCalendarToday, MdEmail, MdLocationOn, MdOpenInNew, MdSend } from "react-icons/md";

const SCHEDULE_MEETING_URL = "https://calendly.com/hushh/office-hours-1-hour-focused-deep-dives";
const CONTACT_EMAIL = "eng@hush1one.com";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/hushh-ai/",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/hushh-labs",
    icon: FaGithub,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@hushhAI",
    icon: FaYoutube,
  },
];

const initialFormState = {
  full_name: "",
  email: "",
  company: "",
  phone: "",
  subject: "",
  message: "",
};

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: "error",
        message: "Full name, email, and message are required.",
      });
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      setStatus({
        type: "error",
        message: "Enter a valid email address before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: formData.subject.trim() || "General Inquiry",
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload?.error || payload?.message || "Failed to send message.");
      }

      setFormData(initialFormState);
      setStatus({
        type: "success",
        message: payload?.message || "Message sent successfully. The Hushh team will get back to you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="get-in-touch"
      aria-labelledby="contact-hushh-title"
      className="border-b border-slate-200 bg-[rgba(248,246,241,0.68)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="site-contact-grid">
          <div className="site-page-card site-contact-aside">
            <div className="site-contact-aside-block space-y-4">
              <p className="site-page-eyebrow">Contact</p>
              <h2 id="contact-hushh-title" className="site-contact-title">Talk with the Hushh team</h2>
              <p className="site-page-copy">
                Share project context, rollout timing, or partnership goals in the form. If you
                would rather work through it live, book a focused session directly with the team.
              </p>
            </div>

            <div className="site-contact-aside-block site-contact-action-stack">
              <a
                href={SCHEDULE_MEETING_URL}
                target="_blank"
                rel="noreferrer"
                className="site-contact-link site-contact-link--primary"
              >
                <span className="site-contact-link-content">
                  <span className="site-contact-link-title-wrap">
                    <MdCalendarToday className="site-contact-link-icon" />
                    <span className="site-contact-link-title">Schedule Meeting</span>
                  </span>
                  <span className="site-contact-link-copy">
                    Office hours · 60 minute working session
                  </span>
                </span>
                <MdOpenInNew className="site-contact-link-arrow" />
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="site-contact-link"
              >
                <span className="site-contact-link-content">
                  <span className="site-contact-link-title-wrap">
                    <MdEmail className="site-contact-link-icon" />
                    <span className="site-contact-link-title">Email Hushh</span>
                  </span>
                  <span className="site-contact-link-copy">{CONTACT_EMAIL}</span>
                </span>
                <MdOpenInNew className="site-contact-link-arrow" />
              </a>
            </div>

            <div className="site-contact-meta-grid">
              <div className="site-contact-meta-card">
                <p className="site-page-eyebrow">Location</p>
                <p className="mt-3 flex items-start gap-2 text-[15px] leading-7 text-[rgba(15,23,42,0.82)]">
                  <MdLocationOn className="mt-[2px] text-[18px] text-[var(--brand-gold,#C8A96A)]" />
                  <span>1021 5th St W., Kirkland, WA 98033</span>
                </p>
              </div>
            </div>

            <div className="site-contact-meta-card bg-white">
              <p className="site-page-eyebrow">Follow Hushh</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-[rgba(17,24,39,0.08)] bg-[rgba(15,23,42,0.03)] px-4 py-2 text-[13px] font-medium text-[rgba(15,23,42,0.82)] transition hover:bg-[rgba(15,23,42,0.08)]"
                    >
                      <Icon className="text-[15px]" />
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="site-page-card site-contact-form-card">
            <div className="space-y-3">
              <p className="site-page-eyebrow">Typed contact form</p>
              <h3 className="site-contact-form-title">Tell us what you are building</h3>
              <p className="site-page-copy">
                Send the essentials and the team can reply with the right next step, owner, or
                meeting recommendation.
              </p>
            </div>

            <form className="site-contact-form-grid mt-8" onSubmit={handleSubmit}>
              <label className="site-form-stack">
                <span className="site-form-label">Full Name</span>
                <input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="site-form-input"
                />
              </label>

              <label className="site-form-stack">
                <span className="site-form-label">Email Address</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@company.com"
                  className="site-form-input"
                />
              </label>

              <label className="site-form-stack">
                <span className="site-form-label">Company</span>
                <input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                  className="site-form-input"
                />
              </label>

              <label className="site-form-stack">
                <span className="site-form-label">Phone</span>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 425 555 0000"
                  className="site-form-input"
                />
              </label>

              <label className="site-form-stack site-contact-form-span">
                <span className="site-form-label">Subject</span>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="site-form-input"
                />
              </label>

              <label className="site-form-stack site-contact-form-span">
                <span className="site-form-label">Message</span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={7}
                  placeholder="Tell us about your product, integration, or question."
                  className="site-form-input site-form-input--textarea"
                />
              </label>

              {status.message ? (
                <div
                  className={`site-contact-status ${
                    status.type === "success"
                      ? "bg-[rgba(16,185,129,0.12)] text-[rgba(6,95,70,0.92)]"
                      : "bg-[rgba(239,68,68,0.12)] text-[rgba(153,27,27,0.92)]"
                  }`}
                  aria-live="polite"
                >
                  {status.message}
                </div>
              ) : null}

              <div className="site-contact-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-midnight site-contact-cta disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <MdSend className="text-[16px]" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                <a
                  href={SCHEDULE_MEETING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline site-contact-cta"
                >
                  <MdCalendarToday className="text-[16px]" />
                  Schedule Meeting
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
