/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lumina-blue': '#2971F7',
        'lumina-yellow': '#FED80A',
        'lumina-pink': '#FBA0E9',
        'lumina-orange': '#F8491A',
        'lumina-green': '#37A64A',
        'lumina-dark': '#1F2127',
        'lumina-gray': '#F2F2F2',
        'lumina-lilac': '#ABA0EB',
      },
      fontFamily: {
        'serif': ['"Instrument Serif"', 'serif'],
        'sans': ['"Manrope"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

