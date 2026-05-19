import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { shortenAddress } from "@/lib/utils";
import {
  Wallet,
  Copy,
  ExternalLink,
  Shield,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { EXPLORER_URL } from "@/lib/constants";

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
    <div className="rounded-xl border border-arc-border bg-arc-surface/50 backdrop-blur-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="h-4 w-4 text-arc-purple" />
        <h3 className="text-sm font-semibold text-white">Wallet</h3>
      </div>

      {isConnected && address ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {/* Address Display */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-arc-bg border border-arc-border">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-arc-blue to-arc-purple flex items-center justify-center">
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

          {/* Balance */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-arc-blue/5 to-arc-purple/5 border border-arc-blue/10">
            <p className="text-xs text-arc-text-muted mb-1">Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {balance ? parseFloat(balance.formatted).toFixed(4) : "0.0000"}
              </span>
              <span className="text-sm text-arc-text-muted">
                {balance?.symbol || "ETH"}
              </span>
            </div>
          </div>

          {/* Chain Status */}
          <div className="flex items-center gap-2 text-xs">
            {chain?.id === 5042002 
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
          <div className="inline-flex p-4 rounded-full bg-arc-blue/5 border border-arc-blue/10 mb-4">
            <Wallet className="h-6 w-6 text-arc-blue" />
          </div>
          <p className="text-sm text-arc-text-muted mb-4">
            Connect your wallet to interact with ARC Testnet
          </p>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
