// file: scripts/flow.js
const child_process = require("child_process");
const dir = process.cwd();
const client_root = dir.charAt(0).toLowerCase() + dir.slice(1);
// execFileSync passes argv directly, so the path is never parsed by a shell
child_process.execFileSync("flow", ["status", client_root], {
  stdio: [0, 1, 2]
});
