import { WS_RPC_URL } from "@/lib/constants";

export type BlockData = {
  number: string;
  hash: string;
  timestamp: string;
  transactions: string[];
  gasUsed: string;
  gasLimit: string;
  miner: string;
};

export type TransactionData = {
  hash: string;
  from: string;
  to: string | null;
  value: string;
  gas: string;
  gasPrice: string;
  blockNumber: string | null;
  timestamp: number;
};

type Subscriber = (data: any) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private subscribers: Map<string, Set<Subscriber>> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;
  private isConnected = false;
  private connectionListeners: Set<(connected: boolean) => void> = new Set();
  private pendingSubscriptions: Array<{ method: string; params: any[] }> = [];
  private requestId = 1;

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    try {
      this.ws = new WebSocket(WS_RPC_URL);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.notifyConnectionListeners(true);
        // Re-subscribe to pending subscriptions
        this.pendingSubscriptions.forEach((sub) => {
          this.sendRequest(sub.method, sub.params);
        });
        // Subscribe to new heads
        this.subscribeNewHeads();
        // Subscribe to pending transactions
        this.subscribePendingTransactions();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.method === "eth_subscription") {
            const subResult = data.params?.result;
            const subId = data.params?.subscription;
            // Notify all relevant subscribers
            this.subscribers.forEach((callbacks, key) => {
              callbacks.forEach((cb) => cb(subResult));
            });
          } else if (data.result) {
            // Handle RPC responses
            this.subscribers.get("rpc-response")?.forEach((cb) => cb(data));
          }
        } catch (e) {
          console.error("WebSocket message parse error:", e);
        }
      };

      this.ws.onclose = () => {
        this.isConnected = false;
        this.notifyConnectionListeners(false);
        this.attemptReconnect();
      };

      this.ws.onerror = () => {
        this.isConnected = false;
        this.notifyConnectionListeners(false);
      };
    } catch (e) {
      console.error("WebSocket connection error:", e);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) return;
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(1.5, this.reconnectAttempts);
    setTimeout(() => this.connect(), delay);
  }

  private sendRequest(method: string, params: any[]) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          jsonrpc: "2.0",
          id: this.requestId++,
          method,
          params,
        })
      );
    }
  }

  private subscribeNewHeads() {
    this.sendRequest("eth_subscribe", ["newHeads"]);
  }

  private subscribePendingTransactions() {
    this.sendRequest("eth_subscribe", ["newPendingTransactions"]);
  }

  subscribe(event: string, callback: Subscriber) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event)!.add(callback);
    return () => {
      this.subscribers.get(event)?.delete(callback);
    };
  }

  onConnectionChange(callback: (connected: boolean) => void) {
    this.connectionListeners.add(callback);
    callback(this.isConnected);
    return () => {
      this.connectionListeners.delete(callback);
    };
  }

  private notifyConnectionListeners(connected: boolean) {
    this.connectionListeners.forEach((cb) => cb(connected));
  }

  getConnectionStatus() {
    return this.isConnected;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.subscribers.clear();
    this.connectionListeners.clear();
  }
}

export const wsService = new WebSocketService();
