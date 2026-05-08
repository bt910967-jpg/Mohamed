import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          cyan: '#64CEFB',
        },
      },
      animation: {
        shine: 'shine 4s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2.5s ease infinite',
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: '200% center' },
          to: { backgroundPosition: '-200% center' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseDot: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(100,206,251,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(100,206,251,0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
