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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-arc-bg/60 backdrop-blur-2xl backdrop-saturate-150">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-arc-blue to-arc-cyan flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-shadow duration-300">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-arc-blue to-arc-cyan opacity-40 blur-lg group-hover:opacity-60 transition-opacity" />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-black text-white tracking-tight uppercase">ARC</span>
              <span className="text-sm font-light text-arc-text-muted tracking-wide">Terminal</span>
            </div>
            {/* WS Status */}
            <div className="hidden sm:flex items-center gap-1.5 ml-3 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
              {isConnected ? (
                <>
                  <div className="h-1.5 w-1.5 rounded-full bg-arc-green shadow-[0_0_6px_rgba(16,185,129,0.8)] animate-pulse" />
                  <span className="text-[10px] text-arc-green/90 font-medium tracking-wide">LIVE</span>
                </>
              ) : (
                <>
                  <div className="h-1.5 w-1.5 rounded-full bg-arc-red/80" />
                  <span className="text-[10px] text-arc-red/80 font-medium">OFFLINE</span>
                </>
              )}
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-arc-text-muted hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08] shadow-[0_0_12px_rgba(59,130,246,0.1)]"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <Icon className="h-3.5 w-3.5 relative z-10" />
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
              className="md:hidden p-2 text-arc-text-muted hover:text-white transition-colors"
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
            className="md:hidden border-t border-white/[0.04] bg-arc-bg/95 backdrop-blur-2xl"
          >
            <div className="p-4 space-y-1.5">
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
                    className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/[0.05] border border-white/[0.08] text-white shadow-[0_0_12px_rgba(59,130,246,0.08)]"
                        : "text-arc-text-muted hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-3 border-t border-white/[0.04]">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
