/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'brand': ["GFS Didot", 'serif'],
        'logo': [ "Bodoni Moda SC",, 'serif']
      },
    },
  },
  plugins: [],
}

