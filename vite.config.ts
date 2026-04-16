import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: parseInt(process.env.PORT || "3001"),
        host: true,
        allowedHosts: true,
    },
    build: {
        outDir: "dist",
        emptyOutDir: true,
        target: "es2020",
        cssMinify: true,
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 2,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    "framer": ["framer-motion"],
                    "react-vendor": ["react", "react-dom"],
                    "imask": ["react-imask"],
                },
            },
            treeshake: {
                preset: "recommended",
            },
        },
    },
});
