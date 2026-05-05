"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "../../../lib/motion/framer-shim";
import { Database, FileUp, Lock, ScanSearch } from "lucide-react";

const sampleUpload = [
  "name=Olivia Carter",
  "email=olivia.carter@hushhmail.com",
  "phone=+1 (415) 555-0188",
  "cc=4242 4242 4242 4242",
  "ssn=123-45-6789",
  "intent=book premium wellness retreat in Kyoto",
];

const piiRules = [
  { label: "Email", pattern: /([a-z0-9._%+-]+)@([a-z0-9.-]+\.[a-z]{2,})/gi, mask: "[REDACTED_EMAIL]" },
  { label: "Phone", pattern: /(?:\+?\d{1,3}[\s.-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, mask: "[REDACTED_PHONE]" },
  { label: "Credit Card", pattern: /\b(?:\d[ -]*?){13,16}\b/g, mask: "[REDACTED_CARD]" },
  { label: "SSN", pattern: /\b\d{3}-\d{2}-\d{4}\b/g, mask: "[REDACTED_SSN]" },
  { label: "Full Name", pattern: /\bname=([A-Z][a-z]+\s[A-Z][a-z]+)\b/g, mask: "name=[REDACTED_NAME]" },
];

function anonymizeLine(line) {
  return piiRules.reduce((acc, rule) => acc.replace(rule.pattern, rule.mask), line);
}

function encryptLocal(payload) {
  const source = JSON.stringify(payload);
  return btoa(unescape(encodeURIComponent(source)));
}

export default function InteractiveSandbox() {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const timer = setInterval(() => {
      setStep((current) => (current < sampleUpload.length ? current + 1 : current));
    }, 680);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (step >= sampleUpload.length) {
      setIsRunning(false);
    }
  }, [step]);

  const visibleRows = useMemo(() => sampleUpload.slice(0, step), [step]);
  const anonymizedRows = useMemo(() => visibleRows.map(anonymizeLine), [visibleRows]);

  const operonJson = useMemo(() => {
    const payload = {
      schema: "hushh.operon.v1",
      pipeline: ["local_upload", "regex_anonymization", "vault_encrypt"],
      redaction_rules: piiRules.map((rule) => rule.label),
      record_count: anonymizedRows.length,
      data: anonymizedRows,
      encrypted_at: new Date().toISOString(),
    };

    return {
      operon_id: "op_local_sandbox_kai",
      consent_scope: "homepage_demo",
      encryption: "aes256-local-sim",
      encrypted_payload: encryptLocal(payload),
    };
  }, [anonymizedRows]);

  const progress = (step / sampleUpload.length) * 100;

  return (
    <section className="mx-auto max-w-7xl border-t border-borderLight px-6 py-24 md:px-12">
      <div className="mb-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-yukonGold">Interactive Sandbox</p>
        <h2 className="mt-4 text-4xl font-medium leading-tight text-richBlack md:text-6xl">
          Upload. Redact. Encrypt.
          <br />
          <span className="italic text-mutedSlate">The Agent Kai Privacy Loop.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="card-premium bg-white p-6"
        >
          <div className="mb-5 flex items-center gap-3 text-richBlack">
            <FileUp className="text-yukonGold" size={20} />
            <h3 className="text-xl serif-font">1) Data Upload</h3>
          </div>
          <div className="space-y-2 rounded-xl border border-borderLight bg-offWhite p-3">
            {visibleRows.length ? (
              visibleRows.map((row) => (
                <motion.p
                  key={row}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-md border border-borderLight/60 bg-white px-2 py-1 text-xs text-richBlack"
                >
                  {row}
                </motion.p>
              ))
            ) : (
              <p className="text-xs text-mutedSlate">Waiting for local upload stream...</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="card-premium bg-white p-6"
        >
          <div className="mb-5 flex items-center gap-3 text-richBlack">
            <ScanSearch className="text-yukonGold" size={20} />
            <h3 className="text-xl serif-font">2) Regex Anonymization</h3>
          </div>
          <div className="mb-4 h-2 overflow-hidden rounded-full bg-offWhite">
            <motion.div
              className="h-full bg-yukonGold"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </div>
          <div className="space-y-2 rounded-xl border border-borderLight bg-offWhite p-3">
            {anonymizedRows.length ? (
              anonymizedRows.map((row, idx) => (
                <motion.p
                  key={`${row}-${idx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-md border border-borderLight/60 bg-white px-2 py-1 font-mono text-[11px] text-richBlack"
                >
                  {row}
                </motion.p>
              ))
            ) : (
              <p className="text-xs text-mutedSlate">PII detection engine is standing by...</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
          className="card-premium bg-richBlack p-6 text-white"
        >
          <div className="mb-5 flex items-center gap-3">
            <Lock className="text-yukonGold" size={20} />
            <h3 className="text-xl serif-font">3) Encrypted Operon JSON</h3>
          </div>
          <div className="max-h-[280px] overflow-auto rounded-xl border border-white/10 bg-[#0f1116] p-3">
            <pre className="text-[11px] leading-relaxed text-white/80">
              {JSON.stringify(operonJson, null, 2)}
            </pre>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setIsRunning(true);
          }}
          className="btn-midnight"
        >
          Replay Sandbox
        </button>
        <p className="inline-flex items-center gap-2 text-xs text-mutedSlate">
          <Database size={14} className="text-yukonGold" />
          Runs fully in-browser. No raw PII leaves the device.
        </p>
      </div>
    </section>
  );
}
