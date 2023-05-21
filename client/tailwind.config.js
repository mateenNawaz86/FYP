/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flexBasis: {
        "2/7": "45%",
      },
      maxWidth: {
        eighty: "80%",
      },
    },
  },
  plugins: [],
};
