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
  Activity,
  Radio,
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
    <div className="relative rounded-2xl overflow-hidden" style={{ background: "rgba(15,23,42,0.7)", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 30px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
      {/* Internal ambient light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-60 rounded-full bg-arc-cyan/[0.06] blur-[60px]" />
        <div className="absolute -bottom-10 left-1/4 h-32 w-48 rounded-full bg-arc-purple/[0.04] blur-[50px]" />
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg" style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.15)", boxShadow: "0 0 12px rgba(6,182,212,0.15)" }}>
              <Droplets className="h-4 w-4 text-arc-cyan" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">ARC Faucet</h3>
              <p className="text-[10px] text-arc-text-dim">Testnet Token Dispenser</p>
            </div>
          </div>
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <div className="relative">
              <div className="h-1.5 w-1.5 rounded-full bg-arc-green" style={{ boxShadow: "0 0 6px rgba(16,185,129,0.8)" }} />
              <div className="absolute inset-0 rounded-full bg-arc-green animate-ping opacity-30" />
            </div>
            <span className="text-[9px] font-semibold text-arc-green tracking-wider">ACTIVE</span>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center py-10">
            <div className="inline-flex p-5 rounded-full mb-4" style={{ background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.1)", boxShadow: "0 0 40px rgba(6,182,212,0.08)" }}>
              <Wallet className="h-7 w-7 text-arc-cyan" />
            </div>
            <p className="text-sm text-arc-text-muted mb-5">
              Connect wallet to claim testnet {NATIVE_SYMBOL}
            </p>
            <ConnectButton />
          </div>
        ) : (
          <div className="space-y-5">
            {/* === PREMIUM ENERGY ORB === */}
            <div className="relative flex justify-center py-8">
              {/* Outer glow aura */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)" }}
              />

              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full"
                style={{ border: "1px solid rgba(6,182,212,0.12)" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-arc-cyan" style={{ boxShadow: "0 0 8px rgba(6,182,212,0.8)" }} />
              </motion.div>

              {/* Middle pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full"
                style={{ border: "1px solid rgba(6,182,212,0.3)" }}
              />

              {/* Second pulse wave */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full"
                style={{ border: "1px solid rgba(124,58,237,0.2)" }}
              />

              {/* Core orb */}
              <motion.div
                animate={{
                  boxShadow: cooldown > 0
                    ? "0 0 20px rgba(6,182,212,0.1), inset 0 0 20px rgba(6,182,212,0.05)"
                    : [
                        "0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.15), inset 0 0 30px rgba(6,182,212,0.1)",
                        "0 0 50px rgba(6,182,212,0.5), 0 0 100px rgba(6,182,212,0.2), inset 0 0 40px rgba(6,182,212,0.15)",
                        "0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(6,182,212,0.15), inset 0 0 30px rgba(6,182,212,0.1)",
                      ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-24 w-24 rounded-full flex items-center justify-center"
                style={{
                  background: "radial-gradient(circle at 30% 30%, rgba(6,182,212,0.2), rgba(124,58,237,0.1), rgba(15,23,42,0.9))",
                  border: "1px solid rgba(6,182,212,0.3)",
                }}
              >
                {/* Inner rotating ring */}
                <motion.div
                  animate={cooldown > 0 ? {} : { rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full"
                  style={{ border: "1px dashed rgba(6,182,212,0.2)" }}
                />

                {/* Icon */}
                <motion.div
                  animate={cooldown > 0 ? {} : { scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Droplets className="h-7 w-7 text-arc-cyan relative z-10" style={{ filter: "drop-shadow(0 0 8px rgba(6,182,212,0.6))" }} />
                </motion.div>

                {/* Energy particles around orb */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20 - i * 5, 0],
                      x: [0, (i % 2 === 0 ? 10 : -10), 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 2.5 + i * 0.3,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.4,
                    }}
                    className="absolute rounded-full"
                    style={{
                      width: "2px",
                      height: "2px",
                      background: i % 2 === 0 ? "rgba(6,182,212,0.8)" : "rgba(124,58,237,0.7)",
                      boxShadow: i % 2 === 0 ? "0 0 4px rgba(6,182,212,0.6)" : "0 0 4px rgba(124,58,237,0.5)",
                      bottom: "50%",
                      left: `${30 + i * 8}%`,
                    }}
                  />
                ))}
              </motion.div>

              {/* Cooldown Ring */}
              {cooldown > 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="2" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(6,182,212,0.7)" strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - cooldown / 60)}`}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                      style={{ filter: "drop-shadow(0 0 4px rgba(6,182,212,0.5))" }}
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Info Cards - improved glass */}
            <div className="space-y-2">
              <InfoRow label="Your Address" value={`${address?.slice(0, 6)}...${address?.slice(-4)}`} mono />
              <InfoRow label="Network" value="ARC Testnet" />
              <InfoRow label="Token" value={NATIVE_SYMBOL} accent />
              <InfoRow label="Provider" value="Circle Faucet" link />
            </div>

            {/* Status */}
            {cooldown > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl"
                style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)" }}
              >
                <Clock className="h-4 w-4 text-arc-cyan" />
                <span className="text-xs text-arc-cyan font-medium">Cooldown: {formatCooldown(cooldown)}</span>
              </motion.div>
            )}

            {claimed && cooldown === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl"
                style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}
              >
                <CheckCircle className="h-4 w-4 text-arc-green" />
                <span className="text-xs text-arc-green">Faucet opened! Complete captcha to receive {NATIVE_SYMBOL}.</span>
              </motion.div>
            )}

            {/* Claim Button - premium style */}
            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleClaim}
              disabled={cooldown > 0}
              className="w-full py-3.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed relative overflow-hidden"
              style={{
                background: cooldown > 0
                  ? "rgba(255,255,255,0.04)"
                  : "linear-gradient(135deg, rgba(6,182,212,0.9) 0%, rgba(59,130,246,0.9) 100%)",
                boxShadow: cooldown > 0
                  ? "none"
                  : "0 4px 20px rgba(6,182,212,0.3), 0 0 0 1px rgba(6,182,212,0.2)",
              }}
            >
              {cooldown > 0 ? (
                <><Clock className="h-4 w-4" /> Wait {formatCooldown(cooldown)}</>
              ) : (
                <><Zap className="h-4 w-4" /> Claim Testnet {NATIVE_SYMBOL}</>
              )}
              {cooldown === 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              )}
            </motion.button>

            <p className="text-[10px] text-arc-text-dim text-center tracking-wide">
              Opens Circle Faucet — requires captcha verification
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value, mono, accent, link }: { label: string; value: string; mono?: boolean; accent?: boolean; link?: boolean }) {
  return (
    <div
      className="flex items-center justify-between p-3 rounded-xl transition-all hover:border-white/[0.1]"
      style={{
        background: "rgba(15,23,42,0.5)",
        border: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
      }}
    >
      <span className="text-[11px] text-arc-text-muted">{label}</span>
      <span className={`text-[11px] ${mono ? "font-mono" : ""} ${accent ? "text-arc-cyan font-semibold" : link ? "text-arc-cyan" : "text-white"}`}>
        {value}
        {link && <ExternalLink className="h-2.5 w-2.5 inline ml-1 opacity-60" />}
      </span>
    </div>
  );
}
