/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F0F0F",   // Charcoal Black
        gold: "#C9A24D",      // Champagne Gold
        ivory: "#F9F6F1",     // Soft White
        beige: "#F3EFEA",     // Warm Beige
        muted: "#6B7280",     // Gray text
      },
    },
  },
  plugins: [],
};
