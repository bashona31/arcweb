import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arc: {
          bg: "#050816",
          surface: "rgba(15,23,42,0.7)",
          panel: "rgba(15,23,42,0.5)",
          border: "rgba(255,255,255,0.08)",
          "border-glow": "rgba(124,58,237,0.3)",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          purple: "#7C3AED",
          pink: "#EC4899",
          green: "#10B981",
          red: "#EF4444",
          orange: "#F59E0B",
          text: "#F8FAFC",
          "text-muted": "#94A3B8",
          "text-dim": "#64748B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-purple": "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
        "glow-cyan": "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
        "glow-blue": "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(124, 58, 237, 0.4), 0 0 60px rgba(124, 58, 237, 0.1)",
        "glow-lg": "0 0 60px rgba(124, 58, 237, 0.5), 0 0 120px rgba(124, 58, 237, 0.15)",
        "glow-cyan": "0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.1)",
        "glow-blue": "0 0 30px rgba(59, 130, 246, 0.3)",
        neon: "0 0 5px #7C3AED, 0 0 20px #7C3AED, 0 0 40px rgba(124,58,237,0.3)",
        "neon-cyan": "0 0 5px #06B6D4, 0 0 20px #06B6D4, 0 0 40px rgba(6,182,212,0.3)",
        card: "0 4px 30px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.04)",
        "card-hover": "0 8px 50px rgba(124,58,237,0.15), 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fade-in 0.6s ease-out",
        shimmer: "shimmer 2.5s linear infinite",
        "shimmer-text": "shimmer-text 8s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
        blob: "blob 10s infinite",
        aurora: "aurora 20s ease-in-out infinite",
        "border-glow": "border-glow 4s ease-in-out infinite alternate",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 10px rgba(124, 58, 237, 0.2), 0 0 40px rgba(124, 58, 237, 0.05)" },
          "100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.5), 0 0 80px rgba(124, 58, 237, 0.15)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
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
        "shimmer-text": {
          "0%, 100%": { backgroundPosition: "0% center" },
          "50%": { backgroundPosition: "200% center" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.15)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.85)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        aurora: {
          "0%": { opacity: "0.3", transform: "translateX(-20px) scale(1)" },
          "50%": { opacity: "0.6", transform: "translateX(20px) scale(1.1)" },
          "100%": { opacity: "0.3", transform: "translateX(-20px) scale(1)" },
        },
        "border-glow": {
          "0%": { borderColor: "rgba(124, 58, 237, 0.15)" },
          "100%": { borderColor: "rgba(6, 182, 212, 0.25)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
