/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MONOCHROME
        'mono-white': '#F5F5FA',
        'mono-lightgrey': '#CCCCCC',
        'mono-grey': '#878787',
        'mono-darkgrey': '#494A50',
        'mono-black': '#13131A',

        // MAIN COLOR
        'mainblue-1': '#C0DEF1',
        'mainblue-2': '#93C3E1',
        'mainblue-3': '#66A7D1',
        'mainblue-4': '#2A83BB',
        'mainblue-5': '#236C9A',
        'mainblue-6': '#1B5478',
        'mainblue-7': '#143D57',

        // ADDITIONAL COLOR
        'add-dark-yellow': '#A98600',
        'add-brown': '#AE4300',
        'add-blue': '#0E27CB',
        'add-green': '#1ABA0C',
        'add-red': '#EE0000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

