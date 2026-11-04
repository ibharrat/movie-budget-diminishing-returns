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
          black: '#000000',
          panel: '#0d0d0f',
          surface: '#121215',
          elevated: '#151518',
          border: '#222226',
          borderLight: '#2f2f35',
          blueBg: '#0c1a29',
          blueBorder: '#1e446e',
        },
        dark: {
          950: '#000000',
          900: '#08080a',
          850: '#0d0d0f',
          800: '#121215',
          700: '#151518',
          600: '#222226',
        },
        icy: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
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
