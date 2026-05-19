import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/dashboard/Navbar";
import { HeroPanel } from "@/components/dashboard/HeroPanel";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { WalletPanel } from "@/components/dashboard/WalletPanel";
import { NetworkStatus } from "@/components/dashboard/NetworkStatus";
import { SendPanel } from "@/components/dashboard/SendPanel";
import { FaucetPanel } from "@/components/dashboard/FaucetPanel";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { BlockExplorer } from "@/components/dashboard/BlockExplorer";
import { AnalyticsPanel } from "@/components/dashboard/AnalyticsPanel";
import { BackgroundEffects } from "@/components/dashboard/BackgroundEffects";

const tabContent: Record<string, React.ReactNode> = {};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-arc-bg text-arc-text">
      <BackgroundEffects />
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="relative z-10 pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <HeroPanel />
              <StatsGrid />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TransactionFeed />
                </div>
                <div className="space-y-6">
                  <WalletPanel />
                  <NetworkStatus />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "faucet" && (
            <motion.div
              key="faucet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-5"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">
                  ARC Faucet Hub
                </h2>
                <p className="text-sm text-arc-text-muted">
                  Claim free testnet ARC for development and testing
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                <div className="lg:col-span-3">
                  <FaucetPanel />
                </div>
                <div className="lg:col-span-2 space-y-5">
                  <WalletPanel />
                  <NetworkStatus />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "sender" && (
            <motion.div
              key="sender"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Token Sender
                </h2>
                <p className="text-sm text-arc-text-muted">
                  Send ARC transactions on ARC Testnet
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SendPanel />
                <div className="space-y-6">
                  <WalletPanel />
                  <NetworkStatus />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "explorer" && (
            <motion.div
              key="explorer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Block Explorer
                </h2>
                <p className="text-sm text-arc-text-muted">
                  Browse recent blocks and transactions on ARC Testnet
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <BlockExplorer />
                </div>
                <div className="space-y-6">
                  <TransactionFeed />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Network Analytics
                </h2>
                <p className="text-sm text-arc-text-muted">
                  Real-time performance metrics and historical data
                </p>
              </div>
              <StatsGrid />
              <AnalyticsPanel />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TransactionFeed />
                <BlockExplorer />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
