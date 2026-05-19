import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#050816]" />

      {/* Subtle grid - very faint */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: "linear-gradient(rgba(163,230,53,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.3) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse at 50% 50%, black 10%, transparent 60%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 10%, transparent 60%)",
      }} />

      {/* Soft aurora - very subtle */}
      <motion.div
        animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.05, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] left-[10%] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(163,230,53,0.04) 0%, transparent 70%)" }}
      />

      {/* Secondary soft glow */}
      <motion.div
        animate={{ opacity: [0.05, 0.1, 0.05], x: [10, -10, 10] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] -right-[10%] h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(163,230,53,0.03) 0%, transparent 60%)" }}
      />

      {/* Very subtle particles - only 4 */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -(8 + i * 2), 0], opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          className="absolute rounded-full"
          style={{
            width: "2px", height: "2px",
            left: `${20 + i * 20}%`, top: `${30 + (i * 15) % 40}%`,
            background: "rgba(163,230,53,0.4)",
            boxShadow: "0 0 4px rgba(163,230,53,0.2)",
          }}
        />
      ))}

      {/* Top edge - very subtle */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: "linear-gradient(90deg, transparent 20%, rgba(163,230,53,0.1) 50%, transparent 80%)",
      }} />

      {/* Noise */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(5,8,22,0.6) 100%)",
      }} />
    </div>
  );
}
