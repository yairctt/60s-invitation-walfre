import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: "#fdfbf7",
          DEFAULT: "#f8f3e8",
          dark: "#ede5d3",
        },
        navy: {
          light: "#1f3158",
          DEFAULT: "#14213d",
          hover: "#0b1530",
          dark: "#0a1224",
        },
        gold: {
          shimmer: "#e6c65a",
          light: "#f3de8a",
          DEFAULT: "#c9a227",
          dark: "#9d7e1c",
          deep: "#70560a",
        },
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        "cake-card": "0 10px 30px -5px rgba(20, 33, 61, 0.08), 0 0 0 1px rgba(201, 162, 39, 0.25)",
        "sphere-gold": "inset -4px -4px 10px rgba(112, 86, 10, 0.6), 2px 4px 8px rgba(0, 0, 0, 0.15)",
        "sphere-navy": "inset -4px -4px 10px rgba(5, 10, 20, 0.8), 2px 4px 8px rgba(0, 0, 0, 0.18)",
        "sphere-white": "inset -4px -4px 8px rgba(180, 170, 150, 0.4), 2px 4px 8px rgba(0, 0, 0, 0.12)",
        "light-glow": "0 0 8px 2px rgba(230, 198, 90, 0.65)",
      },
      keyframes: {
        "light-twinkle": {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "gold-shimmer": {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "light-twinkle": "light-twinkle 3s ease-in-out infinite",
        "gold-shimmer": "gold-shimmer 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
