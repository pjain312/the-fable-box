/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#A57FB4',      // Light purple
          'purple-dark': '#7F5C88', // Dark purple
          'purple-light': '#C9A8D9', // Lighter shade
          'purple-lighter': '#E8D9F0', // Very light purple
          black: '#000000',       // Black
          'dark-gray': '#1F2937', // Dark grey
          'gray': '#4B5563',      // Medium grey
          'gray-light': '#6B7280', // Light grey
        },
      },
      fontFamily: {
        cute: ['Comic Sans MS', 'cursive'],
      }
    },
  },
  plugins: [],
}

