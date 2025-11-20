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
        // Chainlink inspired color palette
        primary: {
          DEFAULT: "#375BD2",
          dark: "#2A4AB3",
          light: "#4A6FE8",
        },
        background: {
          DEFAULT: "#0B0F1E",
          secondary: "#141823",
          tertiary: "#1A1F2E",
          light: "#F8FAFC",
          "light-secondary": "#F1F5F9",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A0AEC0",
          muted: "#718096",
          "light-primary": "#1E293B",
          "light-secondary": "#475569",
        },
        accent: {
          blue: "#375BD2",
          cyan: "#00D4FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;







