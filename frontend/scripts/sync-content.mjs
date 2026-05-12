import { copyFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendRoot = join(__dirname, "..");
const src = join(frontendRoot, "..", "backend", "data", "content.json");
const destDir = join(frontendRoot, "public");
const dest = join(destDir, "content.json");

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log("Synced backend/data/content.json → frontend/public/content.json");
