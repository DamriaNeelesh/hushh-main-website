#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2);

function readOption(optionName, fallbackValue) {
  const optionIndex = args.lastIndexOf(optionName);
  if (optionIndex === -1 || optionIndex === args.length - 1) {
    return fallbackValue;
  }

  return args[optionIndex + 1];
}

const port = String(readOption("--port", process.env.PORT || "3001"));
const host = readOption("--host", process.env.LOCAL_HOST || "localhost");
const standaloneServer = path.join(ROOT, ".next", "standalone", "server.js");
const standaloneRoot = path.join(ROOT, ".next", "standalone");
const staticDirectory = path.join(ROOT, ".next", "static");
const standaloneStaticDirectory = path.join(standaloneRoot, ".next", "static");
const publicDirectory = path.join(ROOT, "public");
const standalonePublicDirectory = path.join(standaloneRoot, "public");

function ensureRuntimeMirror(sourceDirectory, targetDirectory) {
  if (!fs.existsSync(sourceDirectory)) {
    return;
  }

  const parentDirectory = path.dirname(targetDirectory);
  fs.mkdirSync(parentDirectory, { recursive: true });

  try {
    const existingStats = fs.lstatSync(targetDirectory);
    if (existingStats.isSymbolicLink() && fs.realpathSync(targetDirectory) === sourceDirectory) {
      return;
    }

    fs.rmSync(targetDirectory, { recursive: true, force: true });
  } catch {
    // Target does not exist yet.
  }

  fs.symlinkSync(sourceDirectory, targetDirectory, "dir");
}

if (!fs.existsSync(standaloneServer)) {
  console.error("Standalone server not found at .next/standalone/server.js. Run `npm run build` first.");
  process.exit(1);
}

if (!fs.existsSync(staticDirectory)) {
  console.error("Static assets are missing at .next/static. Start the standalone server from repo root after a build.");
  process.exit(1);
}

ensureRuntimeMirror(staticDirectory, standaloneStaticDirectory);
ensureRuntimeMirror(publicDirectory, standalonePublicDirectory);

console.log(`Starting standalone server from repo root on http://${host}:${port}.`);

const child = spawn(process.execPath, [standaloneServer], {
  cwd: ROOT,
  env: {
    ...process.env,
    PORT: port,
    HOSTNAME: host,
  },
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
