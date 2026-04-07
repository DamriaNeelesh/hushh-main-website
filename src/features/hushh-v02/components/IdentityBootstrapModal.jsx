"use client";

import { useEffect, useRef, useState } from "react";

export default function IdentityBootstrapModal({
  isOpen,
  onClose,
  defaultName,
  defaultEmail,
  status,
  error,
  onSubmit,
}) {
  const [name, setName] = useState(defaultName || "");
  const [email, setEmail] = useState(defaultEmail || "");
  const overlayRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    setName(defaultName || "");
  }, [defaultName]);

  useEffect(() => {
    setEmail(defaultEmail || "");
  }, [defaultEmail]);

  /* Auto-focus the name input when the modal opens */
  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      const timer = setTimeout(() => nameInputRef.current?.focus(), 120);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  /* Lock body scroll while open */
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const busy = status === "requesting-location";

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ name, email });
  };

  const handleOverlayClick = (event) => {
    if (!busy && event.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4"
      style={{ backgroundColor: "rgba(10, 20, 35, 0.42)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_32px_80px_-30px_rgba(15,23,42,0.3)] sm:rounded-[2rem]"
        role="dialog"
        aria-modal="true"
        aria-label="Unlock Hushh Intelligence"
      >
        {/* Decorative top accent */}
        <div className="h-1.5 w-full bg-[#2563eb]" />

        {/* Close button */}
        {!busy && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-5 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7">
          {/* Header */}
          <div className="space-y-2 pr-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563eb] text-base text-white shadow-[0_8px_20px_-10px_rgba(37,99,235,0.6)]">
                🤫
              </div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                Unlock Hushh Intelligence
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              Before search starts, Hushh needs your consented identity context: your name, your email, and
              live location permission from this device.
            </p>
          </div>

          {/* Name field */}
          <div className="space-y-1.5">
            <label htmlFor="hushh-id-name" className="block text-sm font-semibold text-slate-800">
              Name
            </label>
            <input
              ref={nameInputRef}
              id="hushh-id-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ankit Kumar Singh"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-lg"
            />
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="hushh-id-email" className="block text-sm font-semibold text-slate-800">
              Email
            </label>
            <input
              id="hushh-id-email"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-base text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:text-lg"
            />
          </div>

          {/* Helper text */}
          <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500 sm:text-sm">
            Tap continue and your browser will open the native location-permission prompt. Once you allow
            it, this card closes and Hushh starts researching your public footprint in the background.
          </p>

          {/* Error message */}
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2563eb] px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(37,99,235,0.8)] transition-all hover:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
          >
            {busy ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Waiting for location access
              </>
            ) : (
              "Allow Location & Start Research"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
