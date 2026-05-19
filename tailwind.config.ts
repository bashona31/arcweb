import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arc: {
          bg: "#050816",
          surface: "rgba(15,23,42,0.72)",
          panel: "rgba(15,23,42,0.5)",
          border: "rgba(255,255,255,0.06)",
          "border-glow": "rgba(163,230,53,0.2)",
          blue: "#A3E635",
          cyan: "#A3E635",
          purple: "#A3E635",
          pink: "#A3E635",
          green: "#A3E635",
          red: "#EF4444",
          orange: "#F59E0B",
          text: "#F8FAFC",
          "text-muted": "#CBD5E1",
          "text-dim": "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-green": "linear-gradient(135deg, #A3E635 0%, #84CC16 100%)",
        "glow-lime": "linear-gradient(135deg, #84CC16 0%, #A3E635 100%)",
        "glow-neon": "linear-gradient(135deg, #BEF264 0%, #A3E635 100%)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(163,230,53,0.15)",
        "glow-lg": "0 0 40px rgba(163,230,53,0.2)",
        "glow-cyan": "0 0 20px rgba(163,230,53,0.15)",
        "glow-purple": "0 0 20px rgba(163,230,53,0.12)",
        "glow-blue": "0 0 20px rgba(163,230,53,0.12)",
        neon: "0 0 5px rgba(163,230,53,0.3), 0 0 15px rgba(163,230,53,0.15)",
        "neon-cyan": "0 0 5px rgba(163,230,53,0.3), 0 0 15px rgba(163,230,53,0.15)",
        card: "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.5), 0 0 1px rgba(163,230,53,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
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
          "0%": { boxShadow: "0 0 5px rgba(163,230,53,0.1)" },
          "100%": { boxShadow: "0 0 15px rgba(163,230,53,0.2)" },
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
          "50%": { opacity: "0.5", transform: "translateX(20px) scale(1.05)" },
          "100%": { opacity: "0.3", transform: "translateX(-20px) scale(1)" },
        },
        "border-glow": {
          "0%": { borderColor: "rgba(255,255,255,0.06)" },
          "100%": { borderColor: "rgba(163,230,53,0.12)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
