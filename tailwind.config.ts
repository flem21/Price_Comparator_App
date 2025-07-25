import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Courier New", 'IBM Plex Mono', 'Space Mono', 'monospace'],
        mono: ["Courier New", 'IBM Plex Mono', 'Space Mono', 'monospace']
      },
      colors: {
        background: '#000000',
        foreground: '#FFFFFF',
        primary: '#FFFFFF',
        'primary-foreground': '#000000',
        accent: '#AAAAAA',
        border: '#333333',
        card: {
          DEFAULT: '#000000',
          foreground: '#FFFFFF',
        },
        button: {
          DEFAULT: 'transparent',
          foreground: '#FFFFFF',
          hover: {
            DEFAULT: '#FFFFFF',
            foreground: '#000000',
          },
        },
      },
      letterSpacing: {
        wide: '.025em',
        wider: '.05em',
        widest: '.1em',
      },
      transitionDuration: {
        '200': '200ms',
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
