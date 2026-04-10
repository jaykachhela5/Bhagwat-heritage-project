import { spawn } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const tempDir = path.join(projectRoot, ".temp");
const viteBin = path.join(projectRoot, "node_modules", "vite", "bin", "vite.js");

mkdirSync(tempDir, { recursive: true });
mkdirSync(path.join(tempDir, "yarn-temp"), { recursive: true });
mkdirSync(path.join(tempDir, "yarn-cache"), { recursive: true });

if (!existsSync(viteBin)) {
  console.error("Vite is not installed. Run 'npm install' or 'yarn install' in the frontend folder first.");
  process.exit(1);
}

const viteArgs = process.argv.slice(2);
if (viteArgs.length === 0) {
  viteArgs.push("dev");
}

const command = viteArgs[0];
const env = {
  ...process.env,
  TEMP: tempDir,
  TMP: tempDir,
  TMPDIR: tempDir,
};

if (command === "dev" && !env.CHOKIDAR_USEPOLLING) {
  env.CHOKIDAR_USEPOLLING = "1";
}

const child = spawn(process.execPath, [viteBin, ...viteArgs], {
  cwd: projectRoot,
  env,
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
  console.error("Failed to start Vite:", error);
  process.exit(1);
});
