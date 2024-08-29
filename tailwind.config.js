const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'phone': {
          max: '700px'
        },
        'desktop': {
          min: '700px'
        }
      }
    },
  },
  plugins: [nextui()],
}

