#!/usr/bin/env node
"use strict";

/**
 * Gate hook: keep real secrets out of model context.
 * Allows templates like .env.example.
 */

const path = require("path");

let input = "";

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  let filePath = "";
  try {
    filePath = JSON.parse(input || "{}").file_path || "";
  } catch {
    process.stdout.write(
      JSON.stringify({
        permission: "deny",
        user_message: "Blocked: invalid beforeReadFile payload.",
      }),
    );
    process.exit(2);
  }

  const base = path.basename(filePath);
  const blocked =
    /^\.env($|\.)/i.test(base) && !/\.example$/i.test(base) && !/\.sample$/i.test(base) && !/\.template$/i.test(base);

  const keyLike = /(^|\/)(id_rsa|id_ed25519|.*\.(pem|p12|pfx)|credentials\.json|service-account.*\.json)$/i.test(
    filePath,
  );

  if (blocked || keyLike) {
    process.stdout.write(
      JSON.stringify({
        permission: "deny",
        user_message: `Blocked read of secret-bearing file: ${base}`,
      }),
    );
    return;
  }

  process.stdout.write(JSON.stringify({ permission: "allow" }));
});
