import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Para Vercel (dominio raíz). Cambiar a '/Lumina-Studio/' si usas GitHub Pages
  plugins: [
    react(),
    tailwindcss(),
  ],
})
