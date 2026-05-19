import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { Blocks, Fuel, Activity, Gauge } from "lucide-react";
import { formatNumber } from "@/lib/utils";

function AnimatedCounter({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display;
    const end = value;
    if (start === end) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <>{formatNumber(display)}</>;
}

export function StatsGrid() {
  const { stats, loading, tpsHistory } = useNetworkStats(5000);

  const statCards = [
    { icon: Blocks, label: "Block Height", value: stats?.blockNumber || 0, suffix: "", color: "blue" as const },
    { icon: Fuel, label: "Gas Price", value: parseFloat(stats?.gasPrice || "0"), suffix: " Gwei", color: "purple" as const },
    { icon: Activity, label: "Network TPS", value: stats?.tps ? Math.round(stats.tps * 100) / 100 : 0, suffix: "", color: "cyan" as const },
    { icon: Gauge, label: "Gas Utilization", value: parseFloat(stats?.gasUtilization || "0"), suffix: "%", color: "green" as const },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, i) => {
        const Icon = card.icon;
        const colors = {
          blue: { bg: "bg-arc-blue/5", border: "border-arc-blue/20", icon: "text-arc-blue", shadow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
          purple: { bg: "bg-arc-purple/5", border: "border-arc-purple/20", icon: "text-arc-purple", shadow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]" },
          cyan: { bg: "bg-arc-cyan/5", border: "border-arc-cyan/20", icon: "text-arc-cyan", shadow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]" },
          green: { bg: "bg-arc-green/5", border: "border-arc-green/20", icon: "text-arc-green", shadow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
        };
        const c = colors[card.color];
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4, rotateX: 3, rotateY: -2, scale: 1.02 }}
            style={{ transformStyle: "preserve-3d", perspective: "800px" }}
            className={`relative rounded-2xl border ${c.border} ${c.bg} p-5 backdrop-blur-xl transition-shadow hover:${c.shadow} shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)]`}
          >
            <div className={`absolute top-3 right-3 h-2 w-2 rounded-full bg-current ${c.icon} opacity-60`}>
              <div className={`absolute inset-0 rounded-full bg-current animate-ping opacity-20`} />
            </div>
            <div className={`inline-flex p-2.5 rounded-xl ${c.bg} mb-3 shadow-[0_0_12px_rgba(0,0,0,0.2)]`}>
              <Icon className={`h-5 w-5 ${c.icon}`} />
            </div>
            <p className="text-xs font-medium text-arc-text-muted mb-1">{card.label}</p>
            {loading ? (
              <div className="h-7 w-24 rounded bg-arc-border animate-pulse" />
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.05)]">
                  {typeof card.value === "number" && card.value > 100 ? <AnimatedCounter value={card.value} /> : card.value}
                  <span className="text-sm text-arc-text-muted font-normal ml-0.5">{card.suffix}</span>
                </span>
              </div>
            )}
            <div className="mt-3 flex items-end gap-[2px] h-6">
              {tpsHistory.slice(-12).map((v, idx) => (
                <div key={idx} className={`flex-1 rounded-sm ${c.icon} opacity-40`}
                  style={{ height: `${Math.max(10, (v / (Math.max(...tpsHistory) || 1)) * 100)}%`, backgroundColor: "currentColor" }} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
