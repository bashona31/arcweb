import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWebSocketConnection } from "@/hooks/useWebSocket";
import {
  Activity,
  Droplets,
  Send,
  BarChart3,
  Compass,
  Menu,
  X,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Activity },
  { id: "faucet", label: "Faucet", icon: Droplets },
  { id: "sender", label: "Sender", icon: Send },
  { id: "explorer", label: "Explorer", icon: Compass },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isConnected } = useWebSocketConnection();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-arc-border bg-arc-bg/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-arc-blue to-arc-cyan flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-arc-blue to-arc-cyan opacity-50 blur-md" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              ARC<span className="text-arc-blue">.</span>Testnet
            </span>
            {/* WS Status */}
            <div className="hidden sm:flex items-center gap-1.5 ml-3 px-2 py-1 rounded-full bg-arc-surface border border-arc-border">
              {isConnected ? (
                <>
                  <div className="h-2 w-2 rounded-full bg-arc-green animate-pulse" />
                  <span className="text-xs text-arc-green font-medium">Live</span>
                </>
              ) : (
                <>
                  <div className="h-2 w-2 rounded-full bg-arc-red" />
                  <span className="text-xs text-arc-red font-medium">Offline</span>
                </>
              )}
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-arc-text-muted hover:text-white hover:bg-arc-surface"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-arc-surface border border-arc-border-glow"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className="h-4 w-4 relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ConnectButton
                accountStatus="avatar"
                chainStatus="icon"
                showBalance={false}
              />
            </div>
            <button
              className="md:hidden p-2 text-arc-text-muted hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-arc-border bg-arc-bg/95 backdrop-blur-xl"
          >
            <div className="p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-arc-surface border border-arc-border-glow text-white"
                        : "text-arc-text-muted hover:bg-arc-surface hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-3 border-t border-arc-border">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
