export const ARC_TESTNET_CONFIG = {
  id: 5042002,
  name: "ARC Testnet",
  network: "arc-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://arc-testnet.g.alchemy.com/v2/wR4tuK-24rvsCM_vjZbJVh0pwqw4KEeB"],
      webSocket: ["wss://arc-testnet.g.alchemy.com/v2/wR4tuK-24rvsCM_vjZbJVh0pwqw4KEeB"],
    },
    public: {
      http: ["https://arc-testnet.g.alchemy.com/v2/wR4tuK-24rvsCM_vjZbJVh0pwqw4KEeB"],
      webSocket: ["wss://arc-testnet.g.alchemy.com/v2/wR4tuK-24rvsCM_vjZbJVh0pwqw4KEeB"],
    },
  },
  blockExplorers: {
    default: {
      name: "ARC Explorer",
      url: "https://testnet.arcscan.io",
    },
  },
  testnet: true,
} as const;

export const WS_RPC_URL = "wss://arc-testnet.g.alchemy.com/v2/wR4tuK-24rvsCM_vjZbJVh0pwqw4KEeB";
export const HTTP_RPC_URL = "https://arc-testnet.g.alchemy.com/v2/wR4tuK-24rvsCM_vjZbJVh0pwqw4KEeB";

export const FAUCET_URL = "https://faucet.circle.com";

export const EXPLORER_URL = "https://testnet.arcscan.io";
