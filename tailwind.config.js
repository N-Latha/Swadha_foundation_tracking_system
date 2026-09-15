/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        swadha: {
          blue: '#2ea3f2',
          dark: '#32373c',
        }
      },
      fontFamily: {
        sans: ['"Open Sans"', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
