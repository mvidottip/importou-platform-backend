#!/usr/bin/env node
"use strict";

/**
 * Feedback sensor: format the edited file with Prettier when applicable.
 * Fail open — a formatter hiccup must not block the agent loop.
 */

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const FORMATTABLE = /\.(ts|tsx|js|jsx|mjs|cjs|json|md|yml|yaml)$/i;

let input = "";

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  let filePath = "";
  try {
    filePath = JSON.parse(input || "{}").file_path || "";
  } catch {
    process.exit(0);
  }

  if (!filePath || !FORMATTABLE.test(filePath) || !fs.existsSync(filePath)) {
    process.exit(0);
  }

  const prettierBin = path.join(process.cwd(), "node_modules", ".bin", "prettier");
  if (!fs.existsSync(prettierBin)) {
    process.exit(0);
  }

  spawnSync(prettierBin, ["--write", "--log-level", "warn", filePath], {
    stdio: "ignore",
    cwd: process.cwd(),
  });

  process.exit(0);
});
