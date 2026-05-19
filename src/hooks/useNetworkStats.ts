import { useState, useEffect, useCallback } from "react";
import { getNetworkStats, getRecentBlocks } from "@/services/blockchain";

export interface NetworkStats {
  blockNumber: number;
  gasPrice: string;
  txCount: number;
  gasUsed: number;
  gasLimit: number;
  gasUtilization: string;
  timestamp: number;
  tps: number;
}

export function useNetworkStats(pollInterval = 5000) {
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tpsHistory, setTpsHistory] = useState<number[]>([]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await getNetworkStats();
      const tps = data.txCount / 12; // approximate TPS based on 12s blocks
      const newStats = { ...data, tps };
      setStats(newStats);
      setTpsHistory((prev) => [...prev, tps].slice(-30));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, pollInterval);
    return () => clearInterval(interval);
  }, [fetchStats, pollInterval]);

  return { stats, loading, error, tpsHistory };
}

export function useRecentBlocks(count = 10, pollInterval = 10000) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetch = async () => {
      try {
        const data = await getRecentBlocks(count);
        if (!cancelled) {
          setBlocks(data);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) setLoading(false);
      }
    };
    fetch();
    const interval = setInterval(fetch, pollInterval);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [count, pollInterval]);

  return { blocks, loading };
}
