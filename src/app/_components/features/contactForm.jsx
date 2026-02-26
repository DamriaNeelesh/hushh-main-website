"use client";

import React from "react";
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import {
  MdBusiness,
  MdCalendarToday,
  MdEmail,
  MdExpandMore,
  MdLocationOn,
  MdLock,
  MdMic,
  MdOpenInNew,
  MdPhone,
  MdPhoneInTalk,
  MdSchedule,
  MdSend,
  MdUploadFile,
  MdVideocam,
} from "react-icons/md";

const socialLinks = [
  {
    label: "LinkedIn",
    description: "Follow us on LinkedIn",
    href: "https://www.linkedin.com/company/hushh-ai/",
    bg: "bg-[#0077b5]/10",
    color: "text-[#0077b5]",
    icon: FaLinkedinIn,
  },
  {
    label: "Twitter",
    description: "Follow us on Twitter",
    href: "https://twitter.com/hushh_ai",
    bg: "bg-[#1DA1F2]/10",
    color: "text-[#1DA1F2]",
    icon: FaTwitter,
  },
  {
    label: "Instagram",
    description: "Follow us on Instagram",
    href: "https://instagram.com/hushh.ai",
    bg: "bg-[#E1306C]/10",
    color: "text-[#E1306C]",
    icon: FaInstagram,
  },
  {
    label: "YouTube",
    description: "Follow us on YouTube",
    href: "https://youtube.com/@hushhAI",
    bg: "bg-[#FF0000]/10",
    color: "text-[#FF0000]",
    icon: FaYoutube,
  },
  {
    label: "GitHub",
    description: "Follow us on GitHub",
    href: "https://github.com/hushh-labs",
    bg: "bg-[#181717]/10",
    color: "text-[#181717]",
    icon: FaGithub,
  },
];

const ContactForm = () => {
  return (
    <div className="bg-white">
      <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #0056d2 0%, #d42880 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .glass-shine {
          position: relative;
          overflow: hidden;
        }

        .glass-shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }

        .glass-shine:hover::after {
          left: 100%;
        }

        .liquid-pane {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-shadow:
            0 20px 40px -4px rgba(0, 0, 0, 0.08),
            0 8px 16px -4px rgba(0, 0, 0, 0.04),
            inset 0 1px 1px rgba(255, 255, 255, 0.9);
          border-radius: 24px;
        }

        .liquid-input {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid #e5e7eb;
        }

        .liquid-glass {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          border-radius: 1rem;
        }
      `}</style>

      <section id="get-in-touch" className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="relative mx-auto flex w-full max-w-[390px] min-h-[844px] flex-col overflow-hidden bg-white md:max-w-3xl md:min-h-0 lg:max-w-5xl lg:rounded-[28px] lg:border lg:border-slate-100 lg:shadow-[0_16px_50px_-34px_rgba(15,23,42,0.35)]">
            <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/2 rounded-full bg-[#0056D2]/5 blur-[100px]" />
            <div className="pointer-events-none absolute left-0 top-[30%] h-72 w-72 -translate-x-1/3 rounded-full bg-[#D42880]/5 blur-[80px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-emerald-100/30 blur-[90px]" />

            <main className="z-10 flex h-full flex-1 flex-col px-[20px] pb-[34px] pt-[48px] md:px-10 md:pb-12 md:pt-14 lg:grid lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
              <div>
              <header className="mb-8 text-center lg:text-left">
                <h2 className="mb-4 text-[32px] font-bold tracking-tight text-black">
                  Get in{" "}
                  <span className="gradient-text relative inline-block">
                    Touch
                    <span className="absolute bottom-1 left-0 h-[6px] w-full rounded-full bg-gradient-to-r from-[#0056D2] to-[#D42880] opacity-20 blur-[1px]" />
                  </span>
                </h2>
                <p className="mx-auto max-w-[330px] text-[16.3px] font-medium leading-[1.4] text-[#86868B]">
                  Ready to take control of your data? Let&apos;s start a conversation about how Hushh can empower your
                  digital journey.
                </p>
              </header>

              <div className="mb-8 space-y-4 lg:mb-0">
                <a
                  href="https://wa.me/14256441447?text=Hi%20Hushh"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-shine flex h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[#25D366] text-[17px] font-semibold text-white shadow-[0_8px_20px_-4px_rgba(37,211,102,0.4)] transition-all active:scale-[0.98] hover:shadow-[0_12px_24px_-4px_rgba(37,211,102,0.5)]"
                >
                  <FaWhatsapp className="text-[24px]" />
                  WhatsApp Chat
                </a>

                <a
                  href="https://calendly.com/hushh/office-hours-1-hour-focused-deep-dives"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[56px] w-full items-center justify-center gap-3 rounded-full border border-[#0071E3] bg-white text-[17px] font-semibold text-[#0071E3] shadow-sm transition-all active:scale-[0.98] hover:bg-blue-50"
                >
                  <MdCalendarToday className="text-[22px]" />
                  Schedule Meeting
                </a>
              </div>
              </div>

              <div className="liquid-pane relative mb-6 flex flex-1 flex-col items-center p-6 text-center lg:mb-0 lg:h-full">
                <div className="absolute left-0 top-0 h-1 w-full rounded-t-[24px] bg-gradient-to-r from-[#0056D2] via-[#25D366] to-[#D42880] opacity-80" />

                <div className="mb-3 mt-2 flex items-center gap-2">
                  <MdMic className="text-[24px] text-[#0071E3]" />
                  <h3 className="text-[20px] font-bold text-black">Express Yourself Your Way</h3>
                </div>

                <p className="mb-8 max-w-[290px] text-[16.3px] font-medium leading-[1.5] text-[#86868B]">
                  Skip the typing. Record a quick voice note, send a video message, or upload files directly.
                </p>

                <div className="mb-auto w-full space-y-4">
                  <button
                    type="button"
                    className="flex h-[54px] w-full items-center justify-center gap-3 rounded-full bg-[#0071E3] font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform active:scale-[0.98]"
                  >
                    <MdMic className="text-[22px]" />
                    Record Voice Note
                  </button>
                  <button
                    type="button"
                    className="flex h-[54px] w-full items-center justify-center gap-3 rounded-full border border-indigo-200 bg-white font-semibold text-indigo-600 shadow-sm transition-transform active:scale-[0.98]"
                  >
                    <MdVideocam className="text-[22px]" />
                    Record Video Message
                  </button>
                  <button
                    type="button"
                    className="flex h-[54px] w-full items-center justify-center gap-3 rounded-full border border-emerald-200 bg-white font-semibold text-emerald-600 shadow-sm transition-transform active:scale-[0.98]"
                  >
                    <MdUploadFile className="text-[22px]" />
                    Upload Files
                  </button>
                </div>

                <div className="mt-8 flex w-full flex-col items-center gap-2 opacity-80">
                  <div className="flex w-full items-center justify-center gap-6">
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#86868B]">
                      <MdMic className="text-[16px] text-[#0071E3]" />
                      HD Audio
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#86868B]">
                      <MdVideocam className="text-[16px] text-indigo-500" />
                      4K Video
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-[12px] font-medium text-[#86868B]">
                    <MdLock className="text-[16px] text-emerald-500" />
                    Secure Upload
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto w-full max-w-[390px] min-h-[844px] bg-white md:max-w-3xl md:min-h-0 lg:max-w-5xl lg:rounded-[28px] lg:border lg:border-slate-100 lg:shadow-[0_16px_50px_-34px_rgba(15,23,42,0.35)]">
            <main className="flex h-full flex-1 flex-col overflow-y-auto px-[20px] pb-[34px] pt-[48px] md:px-10 md:pb-12 md:pt-14">
              <header className="mb-8 text-center">
                <h2 className="mb-4 text-[32px] font-bold tracking-tight text-black">Contact Form</h2>
                <p className="mx-auto max-w-[330px] text-[16.3px] font-medium leading-[1.4] text-[#86868B]">
                  Prefer typing? Fill out the details below and we&apos;ll get back to you soon
                </p>
              </header>

              <form className="grid flex-1 grid-cols-1 gap-5 pb-8 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="fullName" className="block text-sm font-bold text-black">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-[48px] w-full rounded-[8px] border border-[#E5E7EB] bg-gray-50/50 px-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0071E3] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                  />
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="emailAddress" className="block text-sm font-bold text-black">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="emailAddress"
                    type="email"
                    placeholder="your.email@company.com"
                    className="h-[48px] w-full rounded-[8px] border border-[#E5E7EB] bg-gray-50/50 px-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0071E3] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                  />
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="company" className="block text-sm font-bold text-black">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your company name"
                    className="h-[48px] w-full rounded-[8px] border border-[#E5E7EB] bg-gray-50/50 px-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0071E3] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                  />
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="phone" className="block text-sm font-bold text-black">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="h-[48px] w-full rounded-[8px] border border-[#E5E7EB] bg-gray-50/50 px-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0071E3] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                  />
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="department" className="block text-sm font-bold text-black">
                    Department
                  </label>
                  <div className="relative">
                    <select
                      id="department"
                      defaultValue="Sales"
                      className="liquid-input h-[48px] w-full appearance-none rounded-[8px] px-4 pr-10 text-gray-900 transition-colors focus:border-[#0071E3] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                    >
                      <option>Sales</option>
                      <option>Support</option>
                      <option>Partnerships</option>
                      <option>General Inquiry</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <MdExpandMore className="text-[20px]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="preferredContact" className="block text-sm font-bold text-black">
                    Preferred Contact
                  </label>
                  <div className="relative">
                    <select
                      id="preferredContact"
                      defaultValue="Email"
                      className="liquid-input h-[48px] w-full appearance-none rounded-[8px] px-4 pr-10 text-gray-900 transition-colors focus:border-[#0071E3] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                    >
                      <option>Email</option>
                      <option>Phone</option>
                      <option>WhatsApp</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <MdExpandMore className="text-[20px]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-bold text-black">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Brief subject of your message"
                    className="h-[48px] w-full rounded-[8px] border border-[#E5E7EB] bg-gray-50/50 px-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0071E3] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-bold text-black">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    className="h-[140px] w-full resize-none rounded-[8px] border border-[#E5E7EB] bg-gray-50/50 p-4 text-gray-900 placeholder-gray-400 transition-colors focus:border-[#0071E3] focus:outline-none focus:ring-1 focus:ring-[#0071E3]"
                  />
                </div>

                <div className="pt-6 md:col-span-2">
                  <button
                    type="submit"
                    className="flex h-[56px] w-full items-center justify-center gap-2.5 rounded-full bg-[#0071E3] text-[17px] font-semibold text-white shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] hover:bg-blue-600"
                  >
                    <MdSend className="relative left-[-2px] top-[-1px] -rotate-45 text-[20px]" />
                    Send Message
                  </button>
                </div>
              </form>
            </main>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto w-full max-w-[390px] min-h-[844px] bg-white px-6 md:max-w-3xl md:min-h-0 md:px-10 lg:max-w-5xl lg:rounded-[28px] lg:border lg:border-slate-100 lg:shadow-[0_16px_50px_-34px_rgba(15,23,42,0.35)]">
            <header className="mb-10 pt-[48px] md:pt-[56px]">
              <h2 className="text-center text-3xl font-extrabold leading-tight tracking-tight text-black">
                Contact Information
              </h2>
            </header>

            <main className="grid grid-cols-1 gap-6 pb-12 lg:grid-cols-2">
              <div className="liquid-glass p-6 transition-transform duration-300 hover:scale-[1.01]">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Global Headquarters</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-blue-50 p-2 text-[#2563eb]">
                      <MdLocationOn className="text-xl" />
                    </div>
                    <p className="text-[15px] font-medium leading-snug text-gray-600">
                      1021 5th St W, Kirkland, WA 98033, United States
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-[#2563eb]">
                      <MdPhone className="text-xl" />
                    </div>
                    <a href="tel:+18884621726" className="text-[15px] font-semibold text-[#2563eb] hover:underline">
                      +1 (888) 462-1726
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-2 text-[#2563eb]">
                      <MdEmail className="text-xl" />
                    </div>
                    <a href="mailto:eng@hush1one.com" className="text-[15px] font-semibold text-[#2563eb] hover:underline">
                      eng@hush1one.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="liquid-glass p-6 transition-transform duration-300 hover:scale-[1.01]">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Corporate Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-purple-50 p-2 text-[#9333ea]">
                      <MdBusiness className="text-xl" />
                    </div>
                    <p className="text-[15px] font-medium leading-snug text-gray-600">
                      Innovation District, San Francisco, CA 94105, United States
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-50 p-2 text-[#9333ea]">
                      <MdPhone className="text-xl" />
                    </div>
                    <a href="tel:+15551234567" className="text-[15px] font-semibold text-[#9333ea] hover:underline">
                      +1 (555) 123-4567
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-purple-50 p-2 text-[#9333ea]">
                      <MdEmail className="text-xl" />
                    </div>
                    <a href="mailto:corporate@hushh.ai" className="text-[15px] font-semibold text-[#9333ea] hover:underline">
                      corporate@hushh.ai
                    </a>
                  </div>
                </div>
              </div>

              <div className="liquid-glass p-6 transition-transform duration-300 hover:scale-[1.01]">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Customer Support</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-50 p-2 text-[#22c55e]">
                      <MdSchedule className="text-xl" />
                    </div>
                    <p className="text-[15px] font-medium text-gray-600">24/7 Support Available</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-50 p-2 text-[#22c55e]">
                      <MdPhoneInTalk className="text-xl" />
                    </div>
                    <a href="tel:+17655324284" className="text-[15px] font-semibold text-[#22c55e] hover:underline">
                      +1 (765) 532-4284
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-50 p-2 text-[#22c55e]">
                      <FaWhatsapp className="text-[20px]" />
                    </div>
                    <a
                      href="https://wa.me/17655324284?text=Hi%20Hushh%20Support"
                      target="_blank"
                      rel="noreferrer"
                      className="text-left text-[15px] font-semibold text-[#22c55e] hover:underline"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="pb-10 pt-8 lg:pt-0">
                <h3 className="mb-6 pl-1 text-xl font-bold text-gray-900">Connect With Us</h3>
                <div className="space-y-6 px-1">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${item.bg}`}>
                          <Icon className={item.color} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[16px] font-bold leading-tight text-gray-900">{item.label}</h4>
                          <p className="text-[14px] font-medium text-gray-500">{item.description}</p>
                        </div>
                        <MdOpenInNew className="text-xl text-gray-400 transition-colors group-hover:text-[#2563eb]" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="liquid-glass mt-16 p-6 lg:col-span-2 lg:mt-2">
                <h3 className="mb-2 text-xl font-bold text-black">Schedule a Meeting</h3>
                <p className="mb-6 text-[16.3px] font-medium leading-snug text-gray-500">
                  Book a one-on-one consultation with our team to discuss your specific needs and explore how Hushh can
                  help.
                </p>
                <a
                  href="https://calendly.com/hushh/office-hours-1-hour-focused-deep-dives"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] py-4 font-semibold text-white shadow-lg transition-colors active:scale-[0.98] hover:bg-blue-600"
                >
                  <MdCalendarToday className="text-[20px]" />
                  <span>Book Meeting Now</span>
                </a>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;

