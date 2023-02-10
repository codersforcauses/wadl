/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.vue",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.js",
    "./nuxt.config.js",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      brandon: ["brandon-grotesque", "sans-serif"],
      lato: ["Lato", "sans-serif"],
      futura: ["Futura", "sans-serif"],
      jost: ["Jost", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
      carterone: ["Carter One", "cursive"],
    },
    letterSpacing: {
      12: "0.12em",
      15: "0.15em",
    },
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        gold: "#FFD700",
        "light-gold": "#FFEB87",
        "lighter-grey": "#F2F2F2",
        "light-grey": "#A8A8A8",
        "mid-grey": "#8A8A8A",
        "dark-grey": "#474747",
        "light-orange-gold": "#FFBD4A",
        "light-yellow": "#F9EFBF",
        "light-red": "hsl(0, 79%, 72%, 20%)",
        "dark-red": "#C74B4B",
        "light-green": "#3EBD93",
        "danger-red": "#D63C3C",
      },
    },
  },
  plugins: [],
};
