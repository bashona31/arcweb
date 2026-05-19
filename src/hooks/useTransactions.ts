import { useState, useEffect, useCallback } from "react";
import { getBlock, getLatestBlockNumber } from "@/services/blockchain";

export interface ParsedTransaction {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  gasPrice: string;
  blockNumber: number;
  timestamp: number;
}

export function useLiveTransactions(pollInterval = 6000) {
  const [transactions, setTransactions] = useState<ParsedTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastBlockFetched, setLastBlockFetched] = useState(0);

  const fetchTransactions = useCallback(async () => {
    try {
      const currentBlock = await getLatestBlockNumber();
      
      // Don't re-fetch same block
      if (currentBlock === lastBlockFetched) return;
      
      const block = await getBlock(currentBlock);
      if (!block || !block.transactions) return;

      const timestamp = parseInt(block.timestamp, 16);
      const blockNum = parseInt(block.number, 16);

      const newTxs: ParsedTransaction[] = block.transactions
        .slice(0, 20)
        .map((tx: any) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: (parseInt(tx.value, 16) / 1e18).toFixed(6),
          gasPrice: (parseInt(tx.gasPrice || "0", 16) / 1e9).toFixed(2),
          blockNumber: blockNum,
          timestamp,
        }));

      setTransactions((prev) => {
        const combined = [...newTxs, ...prev];
        // Deduplicate by hash
        const seen = new Set<string>();
        return combined.filter((tx) => {
          if (seen.has(tx.hash)) return false;
          seen.add(tx.hash);
          return true;
        }).slice(0, 50);
      });

      setLastBlockFetched(currentBlock);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching transactions:", e);
      setLoading(false);
    }
  }, [lastBlockFetched]);

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, pollInterval);
    return () => clearInterval(interval);
  }, [fetchTransactions, pollInterval]);

  return { transactions, loading };
}
