import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Static SPA build for GitHub Pages.
// Set VITE_BASE to "/REPO_NAME/" when deploying to a project page (e.g. username.github.io/REPO_NAME).
// Defaults to "/" which is correct for username.github.io and custom domains.
export default defineConfig({
  base: "/layer-lab-shop/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
  },
});
