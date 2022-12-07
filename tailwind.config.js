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
        "light-grey": "#A8A8A8",
        "mid-grey": "#8A8A8A",
        "dark-grey": "#474747",
        "light-organse-gold": "#FFBD4A",
      },
    },
  },
  plugins: [],
};
