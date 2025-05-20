/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main1: "#ff8f1c",
        main1Dark: "var(--main1-dark)",
        main2: "#90ff2e",
        main2Dark: "var(--main2-dark)",
        main3: "#ffc600",
        main3Dark: "var(--main3-dark)",
        yellowDark: "#a7850a83",
        black1: "#1a1a1a",
        grey1: "#2e2e2e",
        grey2: "#383838",
        grey3: "#525252",
        greyOpaque: "#ffffff05",
        greyOpaque2: "#3636365f",
      },
    },
  },
  plugins: [],
};

