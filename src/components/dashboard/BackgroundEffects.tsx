import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.018)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      {/* Aurora Gradient - Top */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 left-1/4 right-1/4 h-[500px] rounded-full bg-gradient-to-b from-arc-blue/[0.06] via-arc-cyan/[0.03] to-transparent blur-[120px]"
      />

      {/* Aurora Gradient - Bottom */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], x: [-20, 20, -20] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 left-1/3 right-1/4 h-[400px] rounded-full bg-gradient-to-t from-arc-purple/[0.05] via-arc-pink/[0.02] to-transparent blur-[120px]"
      />

      {/* Floating Orb 1 */}
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/5 h-72 w-72 rounded-full bg-arc-blue/[0.04] blur-[80px]"
      />

      {/* Floating Orb 2 */}
      <motion.div
        animate={{
          x: [0, -40, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/5 h-80 w-80 rounded-full bg-arc-purple/[0.035] blur-[90px]"
      />

      {/* Floating Orb 3 - Cyan accent */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-arc-cyan/[0.025] blur-[60px]"
      />

      {/* Subtle particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 4 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
            className="absolute h-1 w-1 rounded-full bg-arc-blue/40"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(10, 11, 15, 0.6) 100%)"
      }} />

      {/* Top edge light */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-arc-blue/20 to-transparent" />
    </div>
  );
}
