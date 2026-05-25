import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const rawArgs = process.argv.slice(2);

let host = "127.0.0.1";
let port = "3000";
const passthrough = ["dev", "--turbopack"];

for (let index = 0; index < rawArgs.length; index += 1) {
  const arg = rawArgs[index];
  const next = rawArgs[index + 1];

  if ((arg === "--host" || arg === "--hostname" || arg === "-H") && next) {
    host = next;
    index += 1;
    continue;
  }

  if ((arg === "--port" || arg === "-p") && next) {
    port = next;
    index += 1;
  }
}

passthrough.push("-H", host, "-p", port);

const child = spawn(process.execPath, [nextBin, ...passthrough], {
  stdio: "inherit",
  shell: false
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
