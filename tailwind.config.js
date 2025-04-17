const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(table|checkbox|form|spacer).js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2bbacf",
        secondary: "#22a4ad",
        gris: "#9597A5",
      },
    },
  },
  plugins: [heroui()],
};
