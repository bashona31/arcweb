import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arc: {
          bg: "#04070D",
          surface: "rgba(10,15,25,0.72)",
          panel: "rgba(10,15,25,0.5)",
          border: "rgba(127,255,0,0.12)",
          "border-glow": "rgba(127,255,0,0.25)",
          blue: "#7FFF00",
          cyan: "#39FF14",
          purple: "#32CD32",
          pink: "#7FFF00",
          green: "#7FFF00",
          red: "#EF4444",
          orange: "#F59E0B",
          text: "#F8FAFC",
          "text-muted": "#CBD5E1",
          "text-dim": "#64748B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-green": "linear-gradient(135deg, #7FFF00 0%, #39FF14 100%)",
        "glow-lime": "linear-gradient(135deg, #32CD32 0%, #7FFF00 100%)",
        "glow-neon": "linear-gradient(135deg, #39FF14 0%, #32CD32 100%)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(127,255,0,0.4), 0 0 60px rgba(127,255,0,0.1)",
        "glow-lg": "0 0 60px rgba(127,255,0,0.5), 0 0 120px rgba(127,255,0,0.15)",
        "glow-cyan": "0 0 30px rgba(57,255,20,0.4)",
        "glow-purple": "0 0 30px rgba(50,205,50,0.3)",
        "glow-blue": "0 0 30px rgba(127,255,0,0.3)",
        neon: "0 0 5px #7FFF00, 0 0 20px #7FFF00, 0 0 40px rgba(127,255,0,0.3)",
        "neon-cyan": "0 0 5px #39FF14, 0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.3)",
        card: "0 4px 30px rgba(0,0,0,0.5), 0 0 1px rgba(127,255,0,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
        "card-hover": "0 8px 50px rgba(127,255,0,0.1), 0 0 1px rgba(127,255,0,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
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
          "0%": { boxShadow: "0 0 10px rgba(127,255,0,0.2), 0 0 40px rgba(127,255,0,0.05)" },
          "100%": { boxShadow: "0 0 20px rgba(127,255,0,0.5), 0 0 80px rgba(127,255,0,0.15)" },
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
          "0%": { borderColor: "rgba(127,255,0,0.12)" },
          "100%": { borderColor: "rgba(57,255,20,0.25)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
