import { motion } from "framer-motion";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { Activity, Box, Fuel, TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { NATIVE_SYMBOL } from "@/lib/constants";

export function HeroPanel() {
  const { stats, loading } = useNetworkStats(4000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -5 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      className="relative overflow-hidden rounded-2xl border border-arc-border bg-arc-surface/50 backdrop-blur-xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-arc-blue/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-arc-purple/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* 3D floating orbs */}
        <motion.div
          animate={{ y: [-5, 5, -5], x: [-3, 3, -3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 right-20 h-3 w-3 rounded-full bg-arc-cyan/40 blur-sm"
        />
        <motion.div
          animate={{ y: [5, -5, 5], x: [3, -3, 3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-32 h-2 w-2 rounded-full bg-arc-purple/40 blur-sm"
        />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-arc-green animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-xs font-medium text-arc-green uppercase tracking-wider">
              Network Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
            ARC Testnet <span className="text-transparent bg-clip-text bg-gradient-to-r from-arc-blue to-arc-cyan">Dashboard</span>
          </h1>
          <p className="text-sm text-arc-text-muted max-w-lg">
            Real-time blockchain monitoring, {NATIVE_SYMBOL} token operations, and network analytics for the ARC ecosystem.
          </p>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6"
        >
          <StatCard icon={Box} label="Block Height" value={stats ? formatNumber(stats.blockNumber) : "—"} loading={loading} color="blue" />
          <StatCard icon={Fuel} label="Gas Price" value={stats ? `${stats.gasPrice} Gwei` : "—"} loading={loading} color="purple" />
          <StatCard icon={Activity} label="TPS" value={stats ? stats.tps.toFixed(2) : "—"} loading={loading} color="cyan" />
          <StatCard icon={TrendingUp} label="Gas Usage" value={stats ? `${stats.gasUtilization}%` : "—"} loading={loading} color="green" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, loading, color }: {
  icon: any; label: string; value: string; loading: boolean;
  color: "blue" | "purple" | "cyan" | "green";
}) {
  const colorMap = {
    blue: "from-arc-blue/10 to-transparent border-arc-blue/20 text-arc-blue",
    purple: "from-arc-purple/10 to-transparent border-arc-purple/20 text-arc-purple",
    cyan: "from-arc-cyan/10 to-transparent border-arc-cyan/20 text-arc-cyan",
    green: "from-arc-green/10 to-transparent border-arc-green/20 text-arc-green",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3, rotateX: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`relative rounded-xl border bg-gradient-to-br p-4 ${colorMap[color]} overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]`}
    >
      {loading ? (
        <div className="space-y-2">
          <div className="h-4 w-12 rounded bg-arc-border animate-pulse" />
          <div className="h-6 w-20 rounded bg-arc-border animate-pulse" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-1">
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium text-arc-text-muted">{label}</span>
          </div>
          <p className="text-lg font-bold text-white">{value}</p>
        </>
      )}
    </motion.div>
  );
}
