/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flexBasis: {
        "2/7": "45%",
      },
    },
  },
  plugins: [],
};
