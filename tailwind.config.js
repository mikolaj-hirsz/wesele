/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        romantic: {
          bg: "#fff7f8",
          surface: "#ffffff",
          primary: "#b76e79",
          secondary: "#f6d9de",
          text: "#3b2f33",
          muted: "#7a5f66",
        },
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        romantic: {
          primary: "#b76e79",
          secondary: "#f6d9de",
          accent: "#e8b4bc",
          neutral: "#3b2f33",
          "base-100": "#fff7f8",
          "base-200": "#fdf0f2",
          "base-300": "#f6d9de",
          "base-content": "#3b2f33",
        },
      },
    ],
  },
};
