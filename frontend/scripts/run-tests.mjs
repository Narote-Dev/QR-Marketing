import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const testsDirectory = new URL("../tests/", import.meta.url);
const testFiles = readdirSync(testsDirectory)
  .filter((name) => name.endsWith(".test.ts"))
  .sort()
  .map((name) => fileURLToPath(new URL(name, testsDirectory)));

if (testFiles.length === 0) {
  throw new Error("No frontend test files found.");
}

const tsxCli = fileURLToPath(new URL("../node_modules/tsx/dist/cli.mjs", import.meta.url));
const result = spawnSync(process.execPath, [tsxCli, "--test", ...testFiles], { stdio: "inherit" });

process.exit(result.status ?? 1);
