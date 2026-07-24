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
        navy: {
          50: "#f1f6fb",
          100: "#dfeaf5",
          200: "#c3d8ec",
          300: "#97bcdd",
          400: "#6499c9",
          500: "#417db4",
          600: "#2f6398",
          700: "#28507b",
          800: "#254467",
          900: "#0b2545",
          950: "#071930",
        },
        accent: {
          50: "#fff6ed",
          100: "#ffe9d4",
          200: "#ffcfa8",
          300: "#ffad70",
          400: "#fd8037",
          500: "#f2610d",
          600: "#e34d06",
          700: "#bc3908",
          800: "#952e0e",
          900: "#78290f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Flatter, more "document"-like elevation. Cards already carry a
        // hairline border, so the shadow only needs to lift them subtly —
        // editorial restraint over floaty-SaaS depth.
        card: "0 1px 2px 0 rgb(11 37 69 / 0.04), 0 3px 10px -4px rgb(11 37 69 / 0.07)",
        "card-hover":
          "0 2px 4px 0 rgb(11 37 69 / 0.05), 0 10px 24px -10px rgb(11 37 69 / 0.13)",
        // Restrained lift for the primary action — a subtle warmth, not a neon glow.
        glow: "0 5px 18px -8px rgb(242 97 13 / 0.30)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease-out both",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
