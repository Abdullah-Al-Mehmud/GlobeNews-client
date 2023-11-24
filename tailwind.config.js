/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "main-blue": {
        50: "#f0f6fe",
        100: "#deeafb",
        200: "#c4dcf9",
        300: "#83b7f3",
        400: "#6ba5ef",
        500: "#4984e8",
        600: "#3367dd",
        700: "#2b53ca",
        800: "#2945a4",
        900: "#263d82",
        950: "#1b2750",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate"],
  },
};
