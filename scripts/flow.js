// file: scripts/flow.js
const child_process = require("child_process");
const dir = process.cwd();
const client_root = dir.charAt(0).toLowerCase() + dir.slice(1);
child_process.execSync(`flow status ${client_root}`, { stdio: [0, 1, 2] });
