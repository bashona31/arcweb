import { useState, useEffect, useCallback } from "react";
import { wsService } from "@/services/websocket";

export function useWebSocketConnection() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    wsService.connect();
    const unsubscribe = wsService.onConnectionChange(setIsConnected);
    return () => {
      unsubscribe();
    };
  }, []);

  return { isConnected };
}

export function useBlockSubscription() {
  const [latestBlock, setLatestBlock] = useState<any>(null);
  const [blockHistory, setBlockHistory] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = wsService.subscribe("newHeads", (block) => {
      setLatestBlock(block);
      setBlockHistory((prev) => [block, ...prev].slice(0, 50));
    });
    return unsubscribe;
  }, []);

  return { latestBlock, blockHistory };
}

export function useTransactionSubscription() {
  const [pendingTxs, setPendingTxs] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = wsService.subscribe("pendingTx", (txHash) => {
      setPendingTxs((prev) => [txHash, ...prev].slice(0, 100));
    });
    return unsubscribe;
  }, []);

  return { pendingTxs };
}
