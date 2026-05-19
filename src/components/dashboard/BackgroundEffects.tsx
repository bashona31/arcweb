import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Animated cyber grid - masked to fade at edges */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
        }}
      />

      {/* Primary aurora - top left purple */}
      <motion.div
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [1, 1.15, 1],
          x: [-30, 30, -30],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Secondary aurora - top right cyan */}
      <motion.div
        animate={{
          opacity: [0.2, 0.45, 0.2],
          scale: [1, 1.1, 1],
          x: [20, -20, 20],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -right-[15%] h-[600px] w-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Bottom ambient - deep purple */}
      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          y: [-20, 20, -20],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[15%] left-[20%] h-[500px] w-[800px] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Center ambient light source */}
      <motion.div
        animate={{
          opacity: [0.08, 0.18, 0.08],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[40%] h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)",
        }}
      />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -(15 + i * 3), 0],
            x: [0, (i % 2 === 0 ? 8 : -8), 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 5 + i * 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
          className="absolute rounded-full"
          style={{
            width: `${1.5 + (i % 3)}px`,
            height: `${1.5 + (i % 3)}px`,
            left: `${8 + i * 7.5}%`,
            top: `${15 + (i * 17) % 70}%`,
            background: i % 3 === 0
              ? "rgba(124,58,237,0.6)"
              : i % 3 === 1
              ? "rgba(6,182,212,0.5)"
              : "rgba(59,130,246,0.5)",
            boxShadow: i % 3 === 0
              ? "0 0 6px rgba(124,58,237,0.4)"
              : i % 3 === 1
              ? "0 0 6px rgba(6,182,212,0.4)"
              : "0 0 6px rgba(59,130,246,0.4)",
          }}
        />
      ))}

      {/* Top edge cinematic light */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.3) 30%, rgba(6,182,212,0.3) 70%, transparent 100%)",
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Deep vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,8,22,0.7) 100%)",
        }}
      />
    </div>
  );
}
