import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 星际主题色
        cosmos: {
          50: "#f0e6ff",
          100: "#d4b8ff",
          200: "#b388ff",
          300: "#9158ff",
          400: "#7c3aed",
          500: "#6d28d9",
          600: "#5b21b6",
          700: "#4c1d95",
          800: "#3b0f7a",
          900: "#1e0a3c",
          950: "#0d0521",
        },
        void: {
          DEFAULT: "#060612",
          light: "#0c0c24",
          deep: "#030308",
        },
        starlight: {
          DEFAULT: "#e8d5f5",
          warm: "#fbbf24",
          cool: "#67e8f9",
          green: "#4ade80",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        space: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "cosmos-gradient":
          "linear-gradient(135deg, #0d0521 0%, #1e0a3c 25%, #0c0c24 50%, #060612 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(109,40,217,0.15) 0%, rgba(6,6,18,0.8) 100%)",
        "starlight-glow":
          "radial-gradient(ellipse at center, rgba(232,213,245,0.08) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(109,40,217,0.3), 0 0 60px rgba(109,40,217,0.1)",
        "glow-sm":
          "0 0 10px rgba(109,40,217,0.2), 0 0 30px rgba(109,40,217,0.05)",
        "star-green":
          "0 0 15px rgba(74,222,128,0.4), 0 0 45px rgba(74,222,128,0.1)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-star": "pulseStar 2s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "ship-fly": "shipFly 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseStar: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shipFly: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(5px) translateY(-3px)" },
          "75%": { transform: "translateX(-5px) translateY(3px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;