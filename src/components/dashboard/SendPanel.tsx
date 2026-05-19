import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, isAddress } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { EXPLORER_URL, NATIVE_SYMBOL } from "@/lib/constants";
import {
  Send,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Wallet,
} from "lucide-react";

export function SendPanel() {
  const { address, isConnected } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const { sendTransaction, data: hash, isPending, reset } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSend = () => {
    setError("");

    if (!recipient) {
      setError("Enter a recipient address");
      return;
    }
    if (!isAddress(recipient)) {
      setError("Invalid EVM address");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }

    try {
      sendTransaction({
        to: recipient as `0x${string}`,
        value: parseEther(amount),
      });
    } catch (e: any) {
      setError(e.message || "Transaction failed");
    }
  };

  const resetForm = () => {
    setRecipient("");
    setAmount("");
    setError("");
    reset();
  };

  return (
    <div className="rounded-xl border border-arc-border bg-arc-surface/50 backdrop-blur-sm p-5">
      <div className="flex items-center gap-2 mb-5">
        <div className="p-1.5 rounded-lg bg-arc-green/10">
          <Send className="h-4 w-4 text-arc-green" />
        </div>
        <h3 className="text-sm font-semibold text-white">ARC Token Sender</h3>
      </div>

      {!isConnected ? (
        <div className="text-center py-8">
          <div className="inline-flex p-4 rounded-full bg-arc-green/5 border border-arc-green/10 mb-4">
            <Wallet className="h-6 w-6 text-arc-green" />
          </div>
          <p className="text-sm text-arc-text-muted mb-4">
            Connect wallet to send ARC tokens
          </p>
          <ConnectButton />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Success State */}
          <AnimatePresence mode="wait">
            {isSuccess && hash ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                  className="inline-flex p-4 rounded-full bg-arc-green/10 border border-arc-green/20 mb-4"
                >
                  <CheckCircle className="h-8 w-8 text-arc-green" />
                </motion.div>
                <p className="text-sm font-medium text-white mb-2">
                  Transaction Confirmed!
                </p>
                <a
                  href={`${EXPLORER_URL}/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-arc-green hover:underline"
                >
                  View on Explorer
                  <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  onClick={resetForm}
                  className="block mx-auto mt-4 px-4 py-2 rounded-lg bg-arc-surface border border-arc-border text-sm text-arc-text-muted hover:text-white hover:border-arc-border-glow transition-all"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" className="space-y-4">
                {/* Recipient */}
                <div>
                  <label className="text-xs font-medium text-arc-text-muted mb-1.5 block">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="0x..."
                    className="w-full px-4 py-3 rounded-lg bg-arc-bg border border-arc-border text-sm font-mono text-white placeholder-arc-text-dim focus:outline-none focus:border-arc-green/50 focus:ring-1 focus:ring-arc-green/20 transition-all"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="text-xs font-medium text-arc-text-muted mb-1.5 block">
                    Amount ({NATIVE_SYMBOL})
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.01"
                      step="0.001"
                      min="0"
                      className="w-full px-4 py-3 rounded-lg bg-arc-bg border border-arc-border text-sm font-mono text-white placeholder-arc-text-dim focus:outline-none focus:border-arc-green/50 focus:ring-1 focus:ring-arc-green/20 transition-all pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-arc-text-muted font-medium">
                      {NATIVE_SYMBOL}
                    </span>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-arc-red/5 border border-arc-red/20"
                  >
                    <AlertCircle className="h-4 w-4 text-arc-red flex-shrink-0" />
                    <p className="text-xs text-arc-red">{error}</p>
                  </motion.div>
                )}

                {/* Pending TX Hash */}
                {hash && isConfirming && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-arc-green/5 border border-arc-green/20">
                    <Loader2 className="h-4 w-4 text-arc-green animate-spin" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-arc-green">Confirming...</p>
                      <p className="text-xs font-mono text-arc-text-muted truncate">
                        {hash}
                      </p>
                    </div>
                  </div>
                )}

                {/* Send Button */}
                <button
                  onClick={handleSend}
                  disabled={isPending || isConfirming}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-arc-green to-arc-cyan text-white text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Confirm in Wallet...
                    </>
                  ) : isConfirming ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      <ArrowUpRight className="h-4 w-4" />
                      Send {NATIVE_SYMBOL}
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
