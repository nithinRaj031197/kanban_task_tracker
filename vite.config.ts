import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteCompressionPlugin from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteCompressionPlugin({
      algorithm: "gzip",
      ext: ".gz",
      filter: /\.(js|css)$/i,
    }),
  ],
});
