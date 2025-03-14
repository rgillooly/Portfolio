import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "./", // Ensure root is correctly set to client directory
  build: {
    outDir: "dist", // This ensures the build output goes to 'client/dist'
  },
});
