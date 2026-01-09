import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react({
      // React Fast Refresh habilitado por defecto
      jsxRuntime: 'automatic',
    }),
    tailwindcss(),
  ],
  build: {
    // Optimizaciones de build
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    target: 'es2015', // Soporte moderno pero más pequeño
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separar vendor chunks más agresivamente
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Framer Motion (pesado, separar)
            if (id.includes('framer-motion')) {
              return 'framer-motion';
            }
            // Three.js (muy pesado, cargar solo cuando se necesite)
            if (id.includes('three') || id.includes('@react-three')) {
              return 'three-vendor';
            }
            // Form libraries
            if (id.includes('react-hook-form')) {
              return 'form-vendor';
            }
            // Icons (pueden ser pesados)
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'icons-vendor';
            }
            // Otros vendors
            return 'vendor';
          }
        },
        // Optimizar nombres de chunks
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/${ext}/[name]-[hash][extname]`;
        },
      },
    },
    // Aumentar límite pero mantener alertas
    chunkSizeWarningLimit: 600, // Reducir a 600KB para detectar bundles grandes
    // Optimizar assets
    assetsInlineLimit: 4096,
    // Compresión
    reportCompressedSize: true,
  },
  // Optimizaciones de desarrollo
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'framer-motion',
      'use-sync-external-store',
      'use-sync-external-store/shim',
      'use-sync-external-store/shim/with-selector',
    ],
    esbuildOptions: {
      target: 'esnext',
      format: 'esm',
    },
    force: true, // Forzar re-optimización
  },
  // Configuración de servidor
  server: {
    headers: {
      // En desarrollo, no cachear para evitar problemas
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
})
