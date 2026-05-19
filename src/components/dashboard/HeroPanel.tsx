import { motion } from "framer-motion";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { Activity, Box, Fuel, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { NATIVE_SYMBOL } from "@/lib/constants";

export function HeroPanel() {
  const { stats, loading } = useNetworkStats(4000);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-arc-border/60 bg-arc-surface/30 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_0_80px_rgba(59,130,246,0.04)]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-arc-blue/[0.07] blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-arc-purple/[0.06] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-arc-cyan/[0.04] blur-[80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-2 w-2 rounded-full bg-arc-green shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            <span className="text-[10px] font-semibold text-arc-green/90 uppercase tracking-[0.2em]">
              System Online
            </span>
          </div>

          {/* Giant Title: ARC TERMINAL */}
          <div className="mb-4">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.85]">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60">
                ARC
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-arc-blue via-arc-cyan to-arc-purple animate-shimmer-text">
                TERMINAL
              </span>
            </h1>
            {/* Glow layer behind text */}
            <div className="absolute top-16 left-0 text-5xl sm:text-7xl lg:text-8xl font-black tracking-[-0.04em] leading-[0.85] opacity-20 blur-2xl pointer-events-none select-none" aria-hidden="true">
              <span className="block text-arc-blue">ARC</span>
              <span className="block text-arc-cyan">TERMINAL</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-arc-text-muted/80 max-w-md font-light tracking-wide">
            Real-time blockchain operating system for the ARC ecosystem.
          </p>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8"
        >
          <StatCard icon={Box} label="Block Height" value={stats ? formatNumber(stats.blockNumber) : "—"} loading={loading} color="blue" />
          <StatCard icon={Fuel} label="Gas Price" value={stats ? `${stats.gasPrice} Gwei` : "—"} loading={loading} color="purple" />
          <StatCard icon={Activity} label="TPS" value={stats ? stats.tps.toFixed(2) : "—"} loading={loading} color="cyan" />
          <StatCard icon={TrendingUp} label="Gas Usage" value={stats ? `${stats.gasUtilization}%` : "—"} loading={loading} color="green" />
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, loading, color }: {
  icon: any; label: string; value: string; loading: boolean;
  color: "blue" | "purple" | "cyan" | "green";
}) {
  const colorMap = {
    blue: "border-arc-blue/15 text-arc-blue hover:border-arc-blue/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
    purple: "border-arc-purple/15 text-arc-purple hover:border-arc-purple/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
    cyan: "border-arc-cyan/15 text-arc-cyan hover:border-arc-cyan/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
    green: "border-arc-green/15 text-arc-green hover:border-arc-green/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]",
  };

  return (
    <div className={`relative rounded-xl border bg-arc-bg/40 backdrop-blur-sm p-4 transition-all duration-300 ${colorMap[color]}`}>
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 w-12 rounded bg-arc-border/50 animate-pulse" />
          <div className="h-6 w-20 rounded bg-arc-border/50 animate-pulse" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-1.5">
            <Icon className="h-3.5 w-3.5 opacity-70" />
            <span className="text-[10px] font-medium text-arc-text-dim uppercase tracking-wider">{label}</span>
          </div>
          <p className="text-lg font-bold text-white">{value}</p>
        </>
      )}
    </div>
  );
}
