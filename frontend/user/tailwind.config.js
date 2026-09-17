/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0b4c9a",
        secondary: "#e6f0fa",
        accent: "#ff9933",
        "text-primary": "#1f2937",
        "text-secondary": "#4b5563"
      }
    },
  },
  plugins: [],
}
