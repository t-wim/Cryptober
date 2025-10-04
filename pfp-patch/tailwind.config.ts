import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        pumpkin: '#ff7a00',
        neonPurple: '#8a2be2'
      },
      boxShadow: {
        glow: '0 0 20px rgba(255, 122, 0, 0.4)'
      }
    },
  },
  plugins: [],
} satisfies Config
