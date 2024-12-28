import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate", // Automatically updates the service worker
			manifest: {
				name: "React Vite App",
				short_name: "ReactApp",
				description: "A React app with PWA functionality",
				theme_color: "#ffffff",
				icons: [
					{
						src: "pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					{
						src: "maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
			},
			workbox: {
				globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,woff,ttf,eot}"], // Add font extensions
				cleanupOutdatedCaches: true,
				skipWaiting: true,
				clientsClaim: true,
				runtimeCaching: [
					{
						urlPattern: ({ url }) => {
							// Match API requests with a dynamic check
							return url.origin === "http://localhost:8000" && url.pathname.startsWith("/notes");
						},
						handler: "NetworkFirst",
						options: {
							cacheName: "sapi-cache",
							expiration: {
								maxEntries: 150,
								maxAgeSeconds: 7 * 24 * 60 * 60, // Cache expires after 7 days
							},
							cacheableResponse: { statuses: [0, 200, 304] }, // Cache successful and modified responses
							fetchOptions: {
								credentials: "same-origin", // Adjust for CORS
							},
							networkTimeoutSeconds: 10, // Avoid timing out too quickly
						},
					},
				],
			},

			devOptions: {
				enabled: true,
				navigateFallback: "index.html",
				type: "module",
			},
		}),
	],
});
