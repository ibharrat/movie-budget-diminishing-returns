/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        matte: {
          black: '#121316',
          panel: '#191a1f',
          surface: '#1e2026',
          elevated: '#23262f',
          border: '#282b34',
          borderLight: '#2f2f35',
          blueBg: '#270e10',
          blueBorder: '#631f24',
        },
        dark: {
          950: '#121316',
          900: '#0e0f12',
          850: '#191a1f',
          800: '#1e2026',
          700: '#23262f',
          600: '#282b34',
        },
        icy: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#ef4444',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'flat': '0 1px 3px 0 rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
