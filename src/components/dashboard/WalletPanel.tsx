import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import { NATIVE_SYMBOL, EXPLORER_URL } from "@/lib/constants";
import {
  Wallet,
  Copy,
  ExternalLink,
  Shield,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";

export function WalletPanel() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({ address });
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className="rounded-2xl border border-arc-border bg-arc-surface/50 backdrop-blur-xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-arc-green/10 shadow-[0_0_12px_rgba(139,92,246,0.3)]">
          <Wallet className="h-4 w-4 text-arc-green" />
        </div>
        <h3 className="text-sm font-semibold text-white">Wallet</h3>
      </div>

      {isConnected && address ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 p-3 rounded-xl bg-arc-bg/80 border border-arc-border shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-arc-green to-arc-cyan flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-mono text-white truncate">
                {shortenAddress(address, 6)}
              </p>
              <p className="text-xs text-arc-text-muted">{chain?.name || "ARC Testnet"}</p>
            </div>
            <button
              onClick={copyAddress}
              className="p-1.5 rounded-md hover:bg-arc-surface transition-colors"
            >
              {copied ? (
                <CheckCircle className="h-3.5 w-3.5 text-arc-green" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-arc-text-muted" />
              )}
            </button>
            <a
              href={`${EXPLORER_URL}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md hover:bg-arc-surface transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5 text-arc-text-muted" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-arc-green/8 to-arc-green/8 border border-arc-green/15 shadow-[0_4px_20px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.03)]">
            <p className="text-xs text-arc-text-muted mb-1">Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                {balance ? parseFloat(balance.formatted).toFixed(4) : "0.0000"}
              </span>
              <span className="text-sm font-semibold text-arc-cyan">
                {NATIVE_SYMBOL}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {chain?.id === 5042002 ? (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-arc-green" />
                <span className="text-arc-green">Connected to ARC Testnet</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-3.5 w-3.5 text-arc-orange" />
                <span className="text-arc-orange">Wrong network — switch to ARC</span>
              </>
            )}
          </div>
        </motion.div>
      ) : (
        <div className="text-center py-6">
          <div className="inline-flex p-4 rounded-full bg-arc-green/5 border border-arc-green/10 mb-4 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Wallet className="h-6 w-6 text-arc-green" />
          </div>
          <p className="text-sm text-arc-text-muted mb-4">
            Connect your wallet to interact with ARC Testnet
          </p>
          <ConnectButton />
        </div>
      )}
    </motion.div>
  );
}
