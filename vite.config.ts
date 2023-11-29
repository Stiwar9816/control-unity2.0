import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { compression } from 'vite-plugin-compression2'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/]
    }),
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'auto',
      scope: '/',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'pwa-144x144.png', 'mask-icon.svg'],
      manifest: {
        id: '/',
        name: 'Control Unity | Sistema de control de implementos y salones',
        short_name: 'Control Unity',
        start_url: '/',
        display: 'minimal-ui',
        display_override: ['minimal-ui', 'window-controls-overlay'],
        lang: 'es',
        screenshots: [
          {
            type: 'browser',
            src: '/screenshots/screenshot_windows.png',
            sizes: '1200x800',
            form_factor: 'wide',
            platform: 'windows',
            label: 'Vista del navegador en Windows'
          },
          {
            type: 'ui',
            src: '/screenshots/screenshot-ui.jpg',
            sizes: '400x800',
            form_factor: 'narrow',
            platform: 'ios',
            label: 'Interfaz de usuario en un dispositivo IOS'
          }
        ],
        description: 'Sistema de control de implementos y reservas de salones',
        theme_color: '#379295',
        icons: [
          {
            src: '/images/pwa-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
