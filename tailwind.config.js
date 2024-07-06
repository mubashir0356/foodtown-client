/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['Bai Jamjuree', 'sans-serif'],
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-spinner::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spinner::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '.no-spinner': {
          '-moz-appearance': 'textfield',
        },
        '.bg-overlay': {
          position: 'relative',
        },
        '.bg-overlay::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: '0',
        },
      });
    }
  ],
}

