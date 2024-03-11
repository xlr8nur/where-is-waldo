import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/components/tests/setup.js",
});