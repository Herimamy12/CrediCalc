import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'synthwave-dark': '#0a0e27',
        'synthwave-bg': '#1a1f3a',
        'synthwave-card': '#242d47',
        'synthwave-border': '#3d4a6b',
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        credicalc: {
          "primary": "#2563eb",      // Bleu électrique - confiance & action
          "primary-content": "#ffffff",
          "secondary": "#10b981",    // Vert émeraude - croissance & épargne
          "secondary-content": "#ffffff",
          "accent": "#06b6d4",       // Cyan - accent lumineux
          "accent-content": "#0a0e27",
          "neutral": "#1e293b",      // Gris-bleu foncé
          "neutral-content": "#f1f5f9",
          "base-100": "#0f172a",     // Fond très sombre
          "base-200": "#1a1f3a",     // Fond semi-sombre
          "base-300": "#242d47",     // Fond cards
          "base-content": "#f1f5f9",
          "info": "#0ea5e9",         // Sky blue
          "info-content": "#ffffff",
          "success": "#10b981",      // Green
          "success-content": "#ffffff",
          "warning": "#f59e0b",      // Amber
          "warning-content": "#ffffff",
          "error": "#ef4444",        // Red
          "error-content": "#ffffff",
        },
      },
    ],
    darkTheme: "credicalc",
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  },
} satisfies Config
