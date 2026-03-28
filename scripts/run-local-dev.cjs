#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const NEXT_BIN = require.resolve("next/dist/bin/next", { paths: [ROOT] });
const args = process.argv.slice(2);

function readFlag(flagName) {
  return args.includes(flagName);
}

function readOption(optionName, fallbackValue) {
  const optionIndex = args.lastIndexOf(optionName);
  if (optionIndex === -1 || optionIndex === args.length - 1) {
    return fallbackValue;
  }

  return args[optionIndex + 1];
}

const port = String(readOption("--port", process.env.PORT || "3002"));
const host = readOption("--host", process.env.LOCAL_HOST || "localhost");
const useWebpack = readFlag("--webpack");
const cleanBuildState = readFlag("--clean");

if (cleanBuildState) {
  fs.rmSync(path.join(ROOT, ".next"), { recursive: true, force: true });
  console.log("Removed .next before starting local dev.");
}

const nextArgs = ["dev", "--hostname", host, "--port", port];
if (useWebpack) {
  nextArgs.push("--webpack");
}

console.log(
  `Starting Next.js dev server on http://${host}:${port} (${useWebpack ? "webpack" : "turbopack"}) from repo root.`,
);

const child = spawn(process.execPath, [NEXT_BIN, ...nextArgs], {
  cwd: ROOT,
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(error.message);
  process.exit(1);
});
