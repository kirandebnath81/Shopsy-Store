/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        primary: "0px 0px 12px 0px rgba(0, 0, 0, 0.12)",
        secondary: "0px 1.5px 5px 0px rgba(0, 0, 0, 0.2)",
        light: "0px 1px 3px 0px rgba(0, 0, 0, 0.18)",
        extralight: "0px 2px 2px 0px rgba(0, 0, 0, 0.1)",
        img: "1.5px 1px 2px 0px rgba(0, 0, 0, 0.1)",
        formShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "custom-banner":
          "linear-gradient(to right,rgba(0,0,0,0.9),rgba(0,0,0,0.15)),url('/src/assets/banner.jpg')",
      },
    },
    screens: {
      ss: "420px",
      xs: "620px",
      sm: "770px",
      md: "1024px",
      lg: "1280px",
      xl: "1500px",
    },
  },

  plugins: [],
};
