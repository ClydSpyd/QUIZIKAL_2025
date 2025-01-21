/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main1: "#ff8f1c",
        main2: "#90ff2e",
        main3: "#ffc600",
        yellowDark:"#a7850a83",
        black1:"#1a1a1a",
        grey1:"#2e2e2e",
        grey2:"#383838",
        grey3:"#525252",
        greyOpaque:"#ffffff05",
        greyOpaque2:"#3636365f",
      }
    },
  },
  plugins: [],
}

