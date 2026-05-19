import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLiveTransactions } from "@/hooks/useTransactions";
import { shortenAddress, shortenHash, timeAgo } from "@/lib/utils";
import { EXPLORER_URL, NATIVE_SYMBOL } from "@/lib/constants";
import {
  ArrowRightLeft,
  ExternalLink,
  Clock,
  Fuel,
  ChevronDown,
  ChevronUp,
  Activity,
} from "lucide-react";

export function TransactionFeed() {
  const { transactions, loading } = useLiveTransactions(5000);
  const [expandedTx, setExpandedTx] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-arc-border bg-arc-surface/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-arc-border">
        <div className="flex items-center gap-2">
          <div className="relative">
            <ArrowRightLeft className="h-4 w-4 text-arc-cyan" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-arc-green animate-pulse" />
          </div>
          <h3 className="text-sm font-semibold text-white">Live Transactions</h3>
        </div>
        <span className="text-xs text-arc-text-muted px-2 py-1 rounded-md bg-arc-bg border border-arc-border">
          {transactions.length} txs
        </span>
      </div>

      {/* Transaction List */}
      <div className="max-h-[500px] overflow-y-auto scrollbar-thin">
        {loading ? (
          <div className="p-5 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-lg bg-arc-border/30 animate-pulse"
              />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="p-8 text-center">
            <Activity className="h-8 w-8 text-arc-text-dim mx-auto mb-3" />
            <p className="text-sm text-arc-text-muted">
              Waiting for transactions...
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {transactions.map((tx, i) => (
              <motion.div
                key={tx.hash}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="border-b border-arc-border/50 last:border-0"
              >
                <button
                  onClick={() =>
                    setExpandedTx(expandedTx === tx.hash ? null : tx.hash)
                  }
                  className="w-full px-5 py-3 flex items-center gap-3 hover:bg-arc-bg/50 transition-colors text-left"
                >
                  {/* Tx Type Icon */}
                  <div className="h-8 w-8 rounded-full bg-arc-green/10 border border-arc-green/20 flex items-center justify-center flex-shrink-0">
                    <ArrowRightLeft className="h-3.5 w-3.5 text-arc-green" />
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-white">
                        {shortenHash(tx.hash)}
                      </span>
                      <span className="text-xs text-arc-text-dim">•</span>
                      <span className="text-xs text-arc-text-muted">
                        <Clock className="h-3 w-3 inline mr-0.5" />
                        {timeAgo(tx.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs text-arc-text-muted">
                        {shortenAddress(tx.from)}
                      </span>
                      <span className="text-xs text-arc-text-dim">→</span>
                      <span className="text-xs text-arc-text-muted">
                        {tx.to ? shortenAddress(tx.to) : "Contract Create"}
                      </span>
                    </div>
                  </div>

                  {/* Value */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-semibold text-white">
                      {parseFloat(tx.value) > 0
                        ? `${parseFloat(tx.value).toFixed(4)} ${NATIVE_SYMBOL}`
                        : `0 ${NATIVE_SYMBOL}`}
                    </p>
                    <p className="text-xs text-arc-text-dim">
                      Block #{tx.blockNumber}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-arc-text-dim">
                    {expandedTx === tx.hash ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {expandedTx === tx.hash && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 py-3 bg-arc-bg/50 space-y-2 mx-3 mb-3 rounded-lg border border-arc-border/50">
                        <DetailRow label="Hash" value={tx.hash} mono />
                        <DetailRow label="From" value={tx.from} mono />
                        <DetailRow
                          label="To"
                          value={tx.to || "Contract Creation"}
                          mono
                        />
                        <DetailRow label="Value" value={`${tx.value} ${NATIVE_SYMBOL}`} />
                        <DetailRow label="Gas Price" value={`${tx.gasPrice} Gwei`} />
                        <DetailRow
                          label="Block"
                          value={`#${tx.blockNumber}`}
                        />
                        <div className="pt-2">
                          <a
                            href={`${EXPLORER_URL}/tx/${tx.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-arc-green hover:underline"
                          >
                            View on Explorer
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-arc-text-muted flex-shrink-0">{label}</span>
      <span
        className={`text-xs text-white truncate ${mono ? "font-mono" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}
