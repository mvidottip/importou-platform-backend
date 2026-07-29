#!/usr/bin/env node
"use strict";

/**
 * Gate hook: blocks destructive / irreversible shell commands.
 * Fail closed via hooks.json — exit 2 also denies.
 */

let input = "";

process.stdin.on("data", (chunk) => {
  input += chunk;
});

process.stdin.on("end", () => {
  let command = "";
  try {
    command = JSON.parse(input || "{}").command || "";
  } catch {
    process.stdout.write(
      JSON.stringify({
        permission: "deny",
        user_message: "Blocked: invalid shell hook payload.",
        agent_message: "Shell gate received invalid JSON; command was denied.",
      }),
    );
    process.exit(2);
  }

  const denyPatterns = [
    /\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f|-rf|-fr)\s+[\/~]/,
    /\bgit\s+push\s+.*--force(-\w+)?\b/,
    /\bgit\s+push\s+-f\b/,
    /\bgit\s+reset\s+--hard\b/,
    /\bgit\s+clean\s+-[a-zA-Z]*f/,
    /\bgit\s+filter-(branch|repo)\b/,
    /\bdrop\s+(table|database)\b/i,
    /\btruncate\s+table\b/i,
  ];

  const askPatterns = [
    /\b(npm|yarn|pnpm)\s+publish\b/,
    /\b(gh|git)\s+release\b/,
    /\bkubectl\s+apply\b/,
    /\bterraform\s+apply\b/,
    /\bdocker\s+push\b/,
  ];

  if (denyPatterns.some((re) => re.test(command))) {
    process.stdout.write(
      JSON.stringify({
        permission: "deny",
        user_message: "Blocked: destructive or irreversible shell command.",
        agent_message:
          "A beforeShellExecution gate denied this command. Use a safer alternative or ask the user to run it manually.",
      }),
    );
    return;
  }

  if (askPatterns.some((re) => re.test(command))) {
    process.stdout.write(
      JSON.stringify({
        permission: "ask",
        user_message: "Confirm outbound / deploy-related shell command.",
        agent_message: "This command may publish or deploy. Wait for user confirmation.",
      }),
    );
    return;
  }

  process.stdout.write(JSON.stringify({ permission: "allow" }));
});
