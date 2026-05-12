import { copyFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, "..", "dist");
const indexHtml = join(dist, "index.html");
const notFound = join(dist, "404.html");

if (!existsSync(indexHtml)) {
  console.error("dist/index.html not found. Run vite build first.");
  process.exit(1);
}
copyFileSync(indexHtml, notFound);
console.log("Copied dist/index.html → dist/404.html (GitHub Pages SPA fallback)");
