/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pivory: "#f5f5dc",
        psilver: "#c0c0c0",
        pblue: "#003458",
        pnwar: "#392f31",
        pbrown: "cd853f",
      },
      fontFamily: {
        sans: ["Pretendard", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
