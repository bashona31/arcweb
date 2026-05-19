import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWebSocketConnection } from "@/hooks/useWebSocket";
import { getLatestBlockNumber, getGasPrice } from "@/services/blockchain";
import { Wifi, WifiOff, Radio, Server, Clock, Hash } from "lucide-react";

export function NetworkStatus() {
  const { isConnected } = useWebSocketConnection();
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [gasPrice, setGasPrice] = useState<string>("0");
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bn, gp] = await Promise.all([
          getLatestBlockNumber(),
          getGasPrice(),
        ]);
        setBlockNumber(bn);
        setGasPrice(gp);
        setLastUpdate(new Date());
      } catch (e) {}
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl border border-arc-border bg-arc-surface/50 backdrop-blur-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Radio className="h-4 w-4 text-arc-cyan" />
          Network Status
        </h3>
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            isConnected
              ? "bg-arc-green/10 text-arc-green border border-arc-green/20"
              : "bg-arc-red/10 text-arc-red border border-arc-red/20"
          }`}
        >
          {isConnected ? (
            <>
              <Wifi className="h-3 w-3" />
              Connected
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3" />
              Disconnected
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <StatusRow
          icon={Server}
          label="Chain"
          value="ARC Testnet"
        />
        <StatusRow
          icon={Hash}
          label="Latest Block"
          value={`#${blockNumber.toLocaleString()}`}
          pulse
        />
        <StatusRow
          icon={Clock}
          label="Session"
          value={formatUptime(uptime)}
        />
        <div className="pt-2 border-t border-arc-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-arc-text-muted">WebSocket RPC</span>
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{
                  scale: isConnected ? [1, 1.2, 1] : 1,
                  opacity: isConnected ? [1, 0.5, 1] : 0.3,
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-arc-green" : "bg-arc-red"}`}
              />
              <span className={`font-mono ${isConnected ? "text-arc-green" : "text-arc-red"}`}>
                {isConnected ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusRow({
  icon: Icon,
  label,
  value,
  pulse,
}: {
  icon: any;
  label: string;
  value: string;
  pulse?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-arc-text-muted" />
        <span className="text-xs text-arc-text-muted">{label}</span>
      </div>
      <span className={`text-xs font-mono text-white ${pulse ? "animate-pulse-slow" : ""}`}>
        {value}
      </span>
    </div>
  );
}
