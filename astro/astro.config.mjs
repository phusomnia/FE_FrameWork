// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";
import pages from 'astro-pages';

const groupPattern = (/\/?\([^/]+?\)/g);

// https://astro.build/config
export default defineConfig({
    server: {
        port: 1337
    },
    vite: {
        plugins: [tailwindcss()],
        server: {
            proxy: {
                "/api": {
                    target: "http://localhost:8080",
                    changeOrigin: true,
                    secure: false
                },
            },
        },
    },
    output: "server",
    integrations: [
        react(),
        // Pages
        pages({
            dir: "app",
            pattern: ({ pattern }) => {
                const group = pattern.replace(groupPattern, "");
                return group;
            },
            log: "verbose"
        })
    ]
});
