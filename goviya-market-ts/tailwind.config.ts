import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      // Custom xs breakpoint for small phones (375px+)
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Yaldevi', 'system-ui', 'sans-serif'],
        sinhala: ['"Noto Sans Sinhala"', 'sans-serif'],
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        earth: {
          50:  '#fdf8f0',
          100: '#f5e6d3',
          400: '#c4894a',
          600: '#8b5e3c',
          800: '#5c3d1e',
        },
      },
      animation: {
        'fade-up':   'fadeUp 0.4s ease both',
        'pulse-dot': 'pulseDot 1.5s infinite',
        'slide-up':  'slideUp 0.3s cubic-bezier(0.32,0.72,0,1) both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%,100%': { transform: 'scale(1)' },
          '50%':     { transform: 'scale(1.4)' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to:   { transform: 'translateY(0)' },
        },
      },
      // Extra spacing tokens for safe-area padding
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom, 0px)',
        'safe-top':    'env(safe-area-inset-top, 0px)',
      },
    },
  },
  plugins: [
    // scrollbar-none utility (hide scrollbar on chip rows)
    plugin(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      })
    }),
  ],
}

export default config
