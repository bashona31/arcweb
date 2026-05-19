import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import {
  Blocks,
  Fuel,
  Activity,
  Users,
  ArrowUpRight,
  Gauge,
} from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

function AnimatedCounter({ value, duration = 1000 }: AnimatedCounterProps) {
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
  const [totalTxs, setTotalTxs] = useState(0);

  useEffect(() => {
    if (stats?.txCount) {
      setTotalTxs((prev) => prev + stats.txCount);
    }
  }, [stats?.blockNumber]);

  const statCards = [
    {
      icon: Blocks,
      label: "Block Height",
      value: stats?.blockNumber || 0,
      suffix: "",
      color: "blue" as const,
      change: "+12.5%",
    },
    {
      icon: Fuel,
      label: "Gas Price",
      value: parseFloat(stats?.gasPrice || "0"),
      suffix: " Gwei",
      color: "purple" as const,
      change: "-2.1%",
    },
    {
      icon: Activity,
      label: "Network TPS",
      value: stats?.tps ? Math.round(stats.tps * 100) / 100 : 0,
      suffix: "",
      color: "cyan" as const,
      change: "+5.3%",
    },
    {
      icon: Gauge,
      label: "Gas Utilization",
      value: parseFloat(stats?.gasUtilization || "0"),
      suffix: "%",
      color: "green" as const,
      change: "+1.2%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, i) => {
        const Icon = card.icon;
        const colors = {
          blue: {
            bg: "bg-arc-green/5",
            border: "border-arc-green/20",
            icon: "text-arc-green",
            glow: "shadow-glow",
          },
          purple: {
            bg: "bg-arc-green/5",
            border: "border-arc-green/20",
            icon: "text-arc-green",
            glow: "shadow-glow-purple",
          },
          cyan: {
            bg: "bg-arc-cyan/5",
            border: "border-arc-cyan/20",
            icon: "text-arc-cyan",
            glow: "shadow-glow-cyan",
          },
          green: {
            bg: "bg-arc-green/5",
            border: "border-arc-green/20",
            icon: "text-arc-green",
            glow: "",
          },
        };
        const c = colors[card.color];

        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className={`relative rounded-xl border ${c.border} ${c.bg} p-5 backdrop-blur-sm transition-shadow hover:${c.glow}`}
          >
            {/* Glow dot */}
            <div className={`absolute top-3 right-3 h-2 w-2 rounded-full ${c.icon} opacity-60`}>
              <div className={`absolute inset-0 rounded-full ${c.icon} animate-ping opacity-20`} />
            </div>

            <div className={`inline-flex p-2 rounded-lg ${c.bg} mb-3`}>
              <Icon className={`h-5 w-5 ${c.icon}`} />
            </div>

            <p className="text-xs font-medium text-arc-text-muted mb-1">
              {card.label}
            </p>

            {loading ? (
              <div className="h-7 w-24 rounded bg-arc-border animate-pulse" />
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-white">
                  {typeof card.value === "number" && card.value > 100 ? (
                    <AnimatedCounter value={card.value} />
                  ) : (
                    card.value
                  )}
                  <span className="text-sm text-arc-text-muted font-normal ml-0.5">
                    {card.suffix}
                  </span>
                </span>
              </div>
            )}

            {/* Mini sparkline */}
            <div className="mt-3 flex items-end gap-[2px] h-6">
              {tpsHistory.slice(-12).map((v, idx) => (
                <div
                  key={idx}
                  className={`flex-1 rounded-sm ${c.icon} opacity-40`}
                  style={{
                    height: `${Math.max(10, (v / (Math.max(...tpsHistory) || 1)) * 100)}%`,
                    backgroundColor: "currentColor",
                  }}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
