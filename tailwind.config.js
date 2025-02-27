/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        black: "#0B0C10",
        primary: "#FFFFFF",
        green: "#006E00",
        "green-light": "#28A745",
        red: "#E53935",
        blue: "#0040AA",
        gray: {
          "15p": "#C5C6C726",
          "30p": "#C5C6C74D",
          "50p": "#C5C6C780",
          "70p": "#C5C6C7B3",
        },
      },
      fontFamily: {
        opensregular: ["OpenSans-Regular", "sans-serif"],
        opensmedium: ["OpenSans-Medium", "sans-serif"],
        openslight: ["OpenSans-Light", "sans-serif"],
        openssemibold: ["OpenSans-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
