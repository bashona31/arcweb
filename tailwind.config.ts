import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arc: {
          bg: "#0a0b0f",
          surface: "#12131a",
          panel: "#161822",
          border: "#1e2035",
          "border-glow": "#2d3060",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          purple: "#8b5cf6",
          pink: "#ec4899",
          green: "#10b981",
          red: "#ef4444",
          orange: "#f59e0b",
          text: "#e2e8f0",
          "text-muted": "#64748b",
          "text-dim": "#475569",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-blue": "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
        "glow-purple": "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        "glow-cyan": "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.4)",
        "glow-purple": "0 0 20px rgba(139, 92, 246, 0.3)",
        "glow-cyan": "0 0 20px rgba(6, 182, 212, 0.3)",
        neon: "0 0 5px theme(colors.arc.blue), 0 0 20px theme(colors.arc.blue)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        shimmer: "shimmer 2s linear infinite",
        "shimmer-text": "shimmer-text 6s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        blob: "blob 7s infinite",
        aurora: "aurora 15s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "shimmer-text": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        aurora: {
          "0%": { opacity: "0.4", transform: "translateX(0) scale(1)" },
          "50%": { opacity: "0.7", transform: "translateX(30px) scale(1.05)" },
          "100%": { opacity: "0.4", transform: "translateX(0) scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
