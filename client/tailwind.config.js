/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: "2rem",
      center: true,
    },
    extend: {
      fontFamily: ["Roboto", "sans-serif"],
      colors: {
        primaryColor: "#0f1518",
        secondaryColor: "#31363F",
        tertiaryColor: "#EEEEEE",
        positiveColor: "#29a2a7",
        negativeColor: "#9e3e3c",
      },
      screens: {
        xs: "480px",
      },
    },
  },
};
