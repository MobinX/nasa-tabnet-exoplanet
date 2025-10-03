import vercel from "vite-plugin-vercel";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [vike(), react(), tailwindcss(), vercel()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    target: "es2022",
  },
});
