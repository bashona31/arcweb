import React from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import "@rainbow-me/rainbowkit/styles.css";

const arcTestnet = defineChain({
  id: 5042002,
  name: "ARC Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ARC",
    symbol: "ARC",
  },
  rpcUrls: {
    default: {
      http: ["https://arc-testnet.g.alchemy.com/v2/wR4tuK-24rvsCM_vjZbJVh0pwqw4KEeB"],
    },
  },
  blockExplorers: {
    default: {
      name: "ARC Explorer",
      url: "https://testnet.arcscan.io",
    },
  },
  testnet: true,
});

const config = getDefaultConfig({
  appName: "ARC Dashboard",
  projectId: "arc-testnet-dashboard-2024",
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http(
      "https://arc-testnet.g.alchemy.com/v2/wR4tuK-24rvsCM_vjZbJVh0pwqw4KEeB"
    ),
  },
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#3b82f6",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export { arcTestnet };
