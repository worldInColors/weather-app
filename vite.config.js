import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        // Precache your static assets
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        // Custom caching rules for API responses:
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "weather-api-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60, // keep for 60 minutes
              },
            },
          },
        ],
      },
    }),
  ],
});
