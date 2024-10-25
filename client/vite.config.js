import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA(
      {
     registerType: 'autoUpdate',
      manifest: {
        name: 'Bokhuset',
        short_name: 'BokH',
        description: 'Buy and sell Your Books for the Best prices',
        theme_color: '#FFFFFF',
        icons: [
          {
            "src": "/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/pwa-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
        ],
         workbox: {
          globPatterns: ['**/*.{js,css,html,woff2,webp,png}'],
          includeAssets: ['/*.webp', '/*.png', '/*.svg','/*.ico', '/*.jpeg'],
        },
      }
    } )
  ],
})
