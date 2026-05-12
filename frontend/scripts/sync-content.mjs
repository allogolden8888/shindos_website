import { copyFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendRoot = join(__dirname, "..");
const src = join(frontendRoot, "..", "backend", "data", "content.json");
const destDir = join(frontendRoot, "public");
const dest = join(destDir, "content.json");

if (!existsSync(src)) {
  console.error("Missing file:", src);
  console.error("Expected backend/data/content.json at repo root.");
  process.exit(1);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log("Synced backend/data/content.json → frontend/public/content.json");
