# ARC Testnet Dashboard

A premium real-time Web3 dashboard for the ARC Testnet ecosystem. Built with React, TypeScript, Tailwind CSS, Wagmi, RainbowKit, and Framer Motion.

![ARC Dashboard](https://img.shields.io/badge/ARC-Testnet-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- **Real-time Transaction Monitor** — Live WebSocket-powered transaction feed
- **Wallet Connection** — MetaMask & WalletConnect via RainbowKit
- **Token Sender** — Send ETH on ARC Testnet with full validation
- **Faucet Hub** — Claim testnet ETH via Circle Faucet
- **Block Explorer** — Browse recent blocks with gas analytics
- **Network Analytics** — TPS, gas usage, and performance charts
- **WebSocket Integration** — Real-time updates via Alchemy WebSocket RPC

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Wagmi + Viem (Web3 interactions)
- RainbowKit (wallet UI)
- Recharts (data visualization)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Network Configuration

- **Chain ID:** 1637450
- **RPC:** `https://arc-testnet.g.alchemy.com/v2/...`
- **WebSocket:** `wss://arc-testnet.g.alchemy.com/v2/...`
- **Explorer:** https://testnet.arcscan.io

## Architecture

```
src/
├── components/dashboard/   # Dashboard UI components
├── hooks/                  # Custom React hooks
├── services/               # Blockchain & WebSocket services
├── providers/              # Web3 context providers
├── pages/                  # Page layouts
├── lib/                    # Utilities & constants
└── styles/                 # Global styles
```

## License

MIT
