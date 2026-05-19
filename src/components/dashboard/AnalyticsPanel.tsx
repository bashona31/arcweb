import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNetworkStats, useRecentBlocks } from "@/hooks/useNetworkStats";
import { BarChart3, TrendingUp, Activity, Fuel } from "lucide-react";

interface ChartDataPoint {
  time: string;
  tps: number;
  gasUsed: number;
  txCount: number;
}

export function AnalyticsPanel() {
  const { stats, tpsHistory } = useNetworkStats(5000);
  const { blocks } = useRecentBlocks(20, 8000);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [activeChart, setActiveChart] = useState<"tps" | "gas" | "txs">("tps");

  useEffect(() => {
    if (blocks.length > 0) {
      const data = blocks
        .map((block) => ({
          time: new Date(parseInt(block.timestamp, 16) * 1000).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          ),
          tps: block.transactions?.length
            ? block.transactions.length / 12
            : 0,
          gasUsed: parseInt(block.gasUsed, 16) / 1e6,
          txCount: block.transactions?.length || 0,
        }))
        .reverse();
      setChartData(data);
    }
  }, [blocks]);

  const chartTabs = [
    { id: "tps" as const, label: "TPS", icon: Activity },
    { id: "gas" as const, label: "Gas Used", icon: Fuel },
    { id: "txs" as const, label: "Tx Count", icon: TrendingUp },
  ];

  return (
    <motion.div
      whileHover={{ rotateX: 0.3, rotateY: -0.3 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      className="rounded-2xl border border-arc-border bg-arc-surface/50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-arc-border">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-arc-purple" />
          <h3 className="text-sm font-semibold text-white">Network Analytics</h3>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-arc-bg border border-arc-border">
          {chartTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveChart(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeChart === tab.id
                    ? "bg-arc-surface text-white border border-arc-border-glow"
                    : "text-arc-text-muted hover:text-white"
                }`}
              >
                <Icon className="h-3 w-3" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="p-5">
        <div className="h-64">
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-8 w-8 text-arc-text-dim mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-arc-text-muted">Loading chart data...</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === "tps" ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="tpsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2035" />
                  <XAxis
                    dataKey="time"
                    stroke="#475569"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161822",
                      border: "1px solid #1e2035",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="tps"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    fill="url(#tpsGradient)"
                  />
                </AreaChart>
              ) : activeChart === "gas" ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="gasGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2035" />
                  <XAxis
                    dataKey="time"
                    stroke="#475569"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161822",
                      border: "1px solid #1e2035",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="gasUsed"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#gasGradient)"
                  />
                </AreaChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2035" />
                  <XAxis
                    dataKey="time"
                    stroke="#475569"
                    fontSize={10}
                    tickLine={false}
                  />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#161822",
                      border: "1px solid #1e2035",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                  />
                  <Bar
                    dataKey="txCount"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    opacity={0.8}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>

        {/* Chart Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-arc-border">
          <div className="text-center">
            <p className="text-xs text-arc-text-muted mb-0.5">Avg TPS</p>
            <p className="text-sm font-semibold text-white">
              {tpsHistory.length > 0
                ? (tpsHistory.reduce((a, b) => a + b, 0) / tpsHistory.length).toFixed(2)
                : "—"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-arc-text-muted mb-0.5">Peak TPS</p>
            <p className="text-sm font-semibold text-white">
              {tpsHistory.length > 0 ? Math.max(...tpsHistory).toFixed(2) : "—"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-arc-text-muted mb-0.5">Blocks Analyzed</p>
            <p className="text-sm font-semibold text-white">{blocks.length}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
