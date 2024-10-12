/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    globals: true,
    onConsoleLog(log: string, type: "stdout" | "stderr"): boolean | void {
      return true; // NO console.log() statements will be printed!
    },
  },
});
