/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        assam: {
          dark: '#0c2340',
          navy: '#13335a',
          gold: '#c29b38',
          lightgold: '#f9f3e5',
          red: '#b91c1c',
          green: '#15803d',
          paper: '#fcfbfa'
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        assamese: ['"Noto Serif Bengali"', '"Mukti Narrow"', 'Kalpurush', 'SolaimanLipi', 'sans-serif']
      }
    },
  },
  plugins: [],
}
