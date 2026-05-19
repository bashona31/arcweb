import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FAUCET_URL, NATIVE_SYMBOL } from "@/lib/constants";
import {
  Droplets,
  ExternalLink,
  Wallet,
  Clock,
  CheckCircle,
  Zap,
} from "lucide-react";

export function FaucetPanel() {
  const { address, isConnected } = useAccount();
  const [cooldown, setCooldown] = useState(0);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleClaim = () => {
    window.open(`${FAUCET_URL}`, "_blank");
    setCooldown(60);
    setClaimed(true);
  };

  const formatCooldown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      whileHover={{ rotateX: 1, rotateY: -1, scale: 1.005 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className="rounded-2xl border border-arc-border bg-arc-surface/50 backdrop-blur-xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 rounded-lg bg-arc-cyan/10 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
          <Droplets className="h-4 w-4 text-arc-cyan" />
        </div>
        <h3 className="text-sm font-semibold text-white">ARC Faucet</h3>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <div className="inline-flex p-4 rounded-full bg-arc-cyan/5 border border-arc-cyan/10 mb-4 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <Wallet className="h-6 w-6 text-arc-cyan" />
          </div>
          <p className="text-sm text-arc-text-muted mb-4">
            Connect wallet to claim testnet {NATIVE_SYMBOL} tokens
          </p>
          <ConnectButton />
        </div>
      ) : (
        <div className="space-y-5">
          {/* Faucet Orb */}
          <div className="relative flex justify-center py-6">
            <motion.div
              animate={{
                boxShadow: cooldown > 0
                  ? "0 0 20px rgba(6, 182, 212, 0.1)"
                  : ["0 0 20px rgba(6, 182, 212, 0.2)", "0 0 60px rgba(6, 182, 212, 0.4)", "0 0 20px rgba(6, 182, 212, 0.2)"],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-24 w-24 rounded-full bg-gradient-to-br from-arc-cyan/20 to-arc-blue/20 border border-arc-cyan/30 flex items-center justify-center"
            >
              <motion.div
                animate={cooldown > 0 ? {} : { rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="h-16 w-16 rounded-full bg-gradient-to-br from-arc-cyan/30 to-arc-blue/30 border border-arc-cyan/40 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Droplets className="h-6 w-6 text-arc-cyan" />
              </motion.div>
            </motion.div>
            {cooldown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="3" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="3"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - cooldown / 60)}`}
                    strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-arc-bg/80 border border-arc-border shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
              <span className="text-xs text-arc-text-muted">Your Address</span>
              <span className="text-xs font-mono text-white">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-arc-bg/80 border border-arc-border shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
              <span className="text-xs text-arc-text-muted">Network</span>
              <span className="text-xs text-white">ARC Testnet</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-arc-bg/80 border border-arc-border shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
              <span className="text-xs text-arc-text-muted">Token</span>
              <span className="text-xs text-arc-cyan font-semibold">{NATIVE_SYMBOL}</span>
            </div>
          </div>

          {cooldown > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-arc-cyan/5 border border-arc-cyan/20">
              <Clock className="h-4 w-4 text-arc-cyan" />
              <span className="text-xs text-arc-cyan">Cooldown: {formatCooldown(cooldown)}</span>
            </div>
          )}

          {claimed && cooldown === 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-arc-green/5 border border-arc-green/20">
              <CheckCircle className="h-4 w-4 text-arc-green" />
              <span className="text-xs text-arc-green">Faucet opened! Complete captcha to receive {NATIVE_SYMBOL}.</span>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClaim}
            disabled={cooldown > 0}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-arc-cyan to-arc-blue text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden shadow-[0_4px_20px_rgba(6,182,212,0.4),0_0_0_1px_rgba(6,182,212,0.2)]"
          >
            {cooldown > 0 ? (
              <><Clock className="h-4 w-4" /> Wait {formatCooldown(cooldown)}</>
            ) : (
              <><Zap className="h-4 w-4" /> Claim Testnet {NATIVE_SYMBOL}</>
            )}
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.button>

          <p className="text-xs text-arc-text-dim text-center">
            Opens Circle Faucet — requires captcha verification
          </p>
        </div>
      )}
    </motion.div>
  );
}
