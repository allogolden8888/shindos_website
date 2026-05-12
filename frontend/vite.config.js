import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// For GitHub Pages project site set VITE_BASE_PATH=/repo-name/ (with slashes)
const base = process.env.VITE_BASE_PATH || "/";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base,
});
