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
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top edge glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-arc-green/40 to-transparent" />

      <div className="border-b border-white/[0.06] bg-[#050816]/70 backdrop-blur-2xl backdrop-saturate-150">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              {/* Arc Logo - Arch/Gate shape */}
              <div className="relative group cursor-pointer">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <path
                    d="M16 3C9.373 3 4 8.373 4 15v13h4V15c0-4.418 3.582-8 8-8s8 3.582 8 8v13h4V15c0-6.627-5.373-12-12-12z"
                    fill="url(#arc-logo-gradient)"
                  />
                  <defs>
                    <linearGradient id="arc-logo-gradient" x1="4" y1="3" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#94A3B8" />
                      <stop offset="1" stopColor="#64748B" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300 bg-white/20 rounded-lg" />
              </div>
              {/* Brand Name */}
              <span className="text-lg font-semibold text-white/90 tracking-tight">
                Arc
              </span>

              {/* WebSocket Status */}
              <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
                <div className="relative">
                  <div className={`h-1.5 w-1.5 rounded-full ${isConnected ? "bg-arc-green" : "bg-arc-red/70"}`}
                    style={isConnected ? { boxShadow: "0 0 8px rgba(16,185,129,0.8)" } : {}}
                  />
                  {isConnected && (
                    <div className="absolute inset-0 h-1.5 w-1.5 rounded-full bg-arc-green animate-ping opacity-30" />
                  )}
                </div>
                <span className={`text-[10px] font-semibold tracking-[0.15em] ${isConnected ? "text-arc-green" : "text-arc-red/70"}`}>
                  {isConnected ? "LIVE" : "OFFLINE"}
                </span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]">
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
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: "rgba(127, 255, 0, 0.08)",
                          border: "1px solid rgba(127, 255, 0, 0.25)",
                          boxShadow: "0 0 15px rgba(127, 255, 0, 0.1), inset 0 0 15px rgba(127, 255, 0, 0.03)",
                        }}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                    <Icon className="h-3.5 w-3.5 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                    {/* Active neon underline */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-px"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(127,255,0,0.6), transparent)",
                        }}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
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
                className="md:hidden p-2 text-arc-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
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
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-white/[0.06] bg-[#050816]/95 backdrop-blur-2xl"
          >
            <div className="p-4 space-y-1">
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
                    className={`flex w-full items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "text-white bg-arc-green/[0.08] border border-arc-green/20 shadow-[0_0_15px_rgba(127,255,0,0.08)]"
                        : "text-arc-text-muted hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-arc-green" : ""}`} />
                    {item.label}
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-arc-green shadow-[0_0_6px_rgba(127,255,0,0.8)]" />
                    )}
                  </button>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/[0.06]">
                <ConnectButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
