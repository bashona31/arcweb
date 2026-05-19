import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* 3D Perspective Grid Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-20"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.03) 100%)",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
          backgroundImage: "linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated Blobs */}
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-arc-blue/4 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -40, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-arc-purple/4 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 40, -30, 0], y: [0, -20, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 right-1/3 h-64 w-64 rounded-full bg-arc-cyan/3 blur-[100px]"
      />

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-arc-blue/5 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(10, 11, 15, 0.5) 100%)"
      }} />
    </div>
  );
}
