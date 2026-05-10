import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF6EF",
        ivory: "#FDFCF8",
        charcoal: "#2B2A28",
        graphite: "#4A4742",
        gold: "#A8854B",
        goldsoft: "#C9A866",
        taupe: "#A09384",
        mist: "#E8E3DA",
        blush: "#E5C6BD",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(43, 42, 40, 0.04), 0 8px 24px rgba(43, 42, 40, 0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
