import { motion } from "framer-motion";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { Activity, Box, Fuel, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { NATIVE_SYMBOL } from "@/lib/constants";

export function HeroPanel() {
  const { stats, loading } = useNetworkStats(4000);

  return (
    <div className="relative overflow-hidden rounded-2xl glass-card p-8 sm:p-12">
      {/* Internal ambient light sources */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-64 w-96 rounded-full bg-arc-green/[0.08] blur-[100px]" />
        <div className="absolute -bottom-20 right-1/4 h-48 w-72 rounded-full bg-arc-cyan/[0.06] blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full bg-arc-blue/[0.05] blur-[60px]" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="relative">
              <div className="h-2 w-2 rounded-full bg-arc-green shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-arc-green animate-ping opacity-40" />
            </div>
            <span className="text-[10px] font-semibold text-arc-green uppercase tracking-[0.25em]">
              System Online
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-arc-green/30 to-transparent" />
          </div>

          {/* Giant ARC TERMINAL Title */}
          <div className="relative mb-6">
            <h1 className="text-6xl sm:text-8xl lg:text-[120px] font-black leading-[0.85] tracking-[-0.05em]">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="block text-white"
              >
                ARC
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="block animate-shimmer-text"
              >
                TERMINAL
              </motion.span>
            </h1>

            {/* Blur glow layer behind title */}
            <div className="absolute top-0 left-0 text-6xl sm:text-8xl lg:text-[120px] font-black leading-[0.85] tracking-[-0.05em] pointer-events-none select-none opacity-30 blur-[30px]" aria-hidden="true">
              <span className="block text-arc-green">ARC</span>
              <span className="block text-arc-cyan">TERMINAL</span>
            </div>

            {/* Glow orb beside title */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-1/2 -translate-y-1/2 h-24 w-24 sm:h-32 sm:w-32 rounded-full hidden sm:block"
              style={{
                background: "radial-gradient(circle, rgba(163,230,53,0.12) 0%, rgba(6,182,212,0.15) 40%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm sm:text-base text-arc-text-muted max-w-lg leading-relaxed"
          >
            Real-time blockchain operating system for the{" "}
            <span className="text-arc-cyan">ARC</span> ecosystem.
          </motion.p>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10"
        >
          <StatCard icon={Box} label="Block Height" value={stats ? formatNumber(stats.blockNumber) : "—"} loading={loading} color="purple" />
          <StatCard icon={Fuel} label="Gas Price" value={stats ? `${stats.gasPrice} Gwei` : "—"} loading={loading} color="cyan" />
          <StatCard icon={Activity} label="TPS" value={stats ? stats.tps.toFixed(2) : "—"} loading={loading} color="blue" />
          <StatCard icon={TrendingUp} label="Gas Usage" value={stats ? `${stats.gasUtilization}%` : "—"} loading={loading} color="green" />
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, loading, color }: {
  icon: any; label: string; value: string; loading: boolean;
  color: "purple" | "cyan" | "blue" | "green";
}) {
  const styles = {
    purple: {
      border: "border-arc-green/20 hover:border-arc-green/40",
      glow: "hover:shadow-[0_0_25px_rgba(163,230,53,0.12)]",
      icon: "text-arc-green",
      dot: "bg-arc-green shadow-[0_0_6px_rgba(163,230,53,0.2)]",
    },
    cyan: {
      border: "border-arc-cyan/20 hover:border-arc-cyan/40",
      glow: "hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]",
      icon: "text-arc-cyan",
      dot: "bg-arc-cyan shadow-[0_0_6px_rgba(6,182,212,0.6)]",
    },
    blue: {
      border: "border-arc-blue/20 hover:border-arc-blue/40",
      glow: "hover:shadow-[0_0_25px_rgba(59,130,246,0.12)]",
      icon: "text-arc-blue",
      dot: "bg-arc-blue shadow-[0_0_6px_rgba(59,130,246,0.6)]",
    },
    green: {
      border: "border-arc-green/20 hover:border-arc-green/40",
      glow: "hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]",
      icon: "text-arc-green",
      dot: "bg-arc-green shadow-[0_0_6px_rgba(16,185,129,0.6)]",
    },
  };

  const s = styles[color];

  return (
    <div className={`relative rounded-xl border bg-white/[0.02] backdrop-blur-sm p-4 transition-all duration-300 ${s.border} ${s.glow}`}>
      {/* Corner glow dot */}
      <div className={`absolute top-3 right-3 h-1.5 w-1.5 rounded-full ${s.dot}`} />

      {loading ? (
        <div className="space-y-2.5">
          <div className="h-3 w-14 rounded bg-white/[0.04] animate-pulse" />
          <div className="h-6 w-20 rounded bg-white/[0.04] animate-pulse" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`h-3.5 w-3.5 ${s.icon} opacity-80`} />
            <span className="text-[10px] font-medium text-arc-text-dim uppercase tracking-[0.1em]">{label}</span>
          </div>
          <p className="text-lg font-bold text-arc-text">{value}</p>
        </>
      )}
    </div>
  );
}
