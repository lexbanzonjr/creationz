/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Update this path based on your project structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        arial: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
