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
            "src": "BestBook.png",
            "sizes": "1200x630",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/Bookstagram.jpg",
            "sizes": "500x500",
            "type": "image/jpg",
            "purpose": "any"
          },
          {
            "src": "/apple-touch-icon.png",
            "sizes": "180x180",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/dont-make-me-think.jpeg",
            "sizes": "200x257",
            "type": "image/jpeg",
            "purpose": "maskable"
          },
          {
            "src": "/favicon.svg",
            "sizes": "114x27",
            "type": "image/svg",
            "purpose": "maskable"
          },
          {
            "src": "/favoritebook.jpg",
            "sizes": "200x266",
            "type": "image/jpg",
            "purpose": "maskable"
          },
          {
            "src": "/makt-de-48-lagarna.jpg",
            "sizes": "200x306",
            "type": "image/jpg",
            "purpose": "maskable"
          },
          {
            "src": "/profile.jpg",
            "sizes": "225x225",
            "type": "image/jpg",
            "purpose": "maskable"
          },
          {
            "src": "banner-books/grytor-och-gratanger.jpg",
            "sizes": "200x267",
            "type": "image/jpg",
            "purpose": "maskable"
          }
        ],
         workbox: {
          globPatterns: ['**/*.{js,css,html,woff2,webp,png,jpeg,svg,jpg}'],
          includeAssets: ['/assets/banner-books/*',  '/*.png', '/*.svg',  '/*.ico','/*.jpeg ','/*.jpeg'],
        },
      }
    } )
  ],
})
