import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#04070D]" />
      {/* Green grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(127,255,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(127,255,0,0.4) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%)",
      }} />
      {/* Green aurora top */}
      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2], scale: [1, 1.1, 1], x: [-20, 20, -20] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] h-[700px] w-[700px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(127,255,0,0.1) 0%, transparent 70%)" }}
      />
      {/* Secondary green aurora */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], x: [20, -20, 20] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[10%] -right-[15%] h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%)" }}
      />

      {/* Bottom ambient */}
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1], y: [-20, 20, -20] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[15%] left-[20%] h-[500px] w-[800px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(50,205,50,0.06) 0%, transparent 60%)" }}
      />
      {/* Green particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -(12 + i * 3), 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 4 + i * 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          className="absolute rounded-full"
          style={{
            width: `${1.5 + (i % 3)}px`, height: `${1.5 + (i % 3)}px`,
            left: `${8 + i * 9}%`, top: `${15 + (i * 17) % 70}%`,
            background: "rgba(127,255,0,0.6)",
            boxShadow: "0 0 6px rgba(127,255,0,0.4)",
          }}
        />
      ))}
      {/* Top edge light */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{
        background: "linear-gradient(90deg, transparent 0%, rgba(127,255,0,0.25) 50%, transparent 100%)",
      }} />
      {/* Noise */}
      <div className="absolute inset-0 noise-overlay" />
      {/* Vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(4,7,13,0.7) 100%)",
      }} />
    </div>
  );
}
