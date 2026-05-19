import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRecentBlocks } from "@/hooks/useNetworkStats";
import { shortenHash, timeAgo } from "@/lib/utils";
import { EXPLORER_URL } from "@/lib/constants";
import {
  Compass,
  Box,
  ExternalLink,
  Hash,
  Clock,
  Fuel,
  ChevronRight,
  Search,
} from "lucide-react";

export function BlockExplorer() {
  const { blocks, loading } = useRecentBlocks(15, 8000);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlocks = blocks.filter((block) => {
    if (!searchQuery) return true;
    const num = parseInt(block.number, 16).toString();
    return num.includes(searchQuery) || block.hash.includes(searchQuery);
  });

  return (
    <div className="rounded-xl border border-arc-border bg-arc-surface/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-arc-border">
        <div className="flex items-center gap-2">
          <Compass className="h-4 w-4 text-arc-green" />
          <h3 className="text-sm font-semibold text-white">Block Explorer</h3>
          <span className="text-xs text-arc-text-muted px-2 py-0.5 rounded bg-arc-bg border border-arc-border">
            {blocks.length} blocks
          </span>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-arc-text-dim" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search block # or hash..."
            className="w-full sm:w-56 pl-9 pr-4 py-2 rounded-lg bg-arc-bg border border-arc-border text-xs text-white placeholder-arc-text-dim focus:outline-none focus:border-arc-green/50 transition-colors"
          />
        </div>
      </div>

      {/* Block List */}
      <div className="max-h-[600px] overflow-y-auto">
        {loading ? (
          <div className="p-5 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-20 rounded-lg bg-arc-border/30 animate-pulse"
              />
            ))}
          </div>
        ) : filteredBlocks.length === 0 ? (
          <div className="p-8 text-center">
            <Box className="h-8 w-8 text-arc-text-dim mx-auto mb-3" />
            <p className="text-sm text-arc-text-muted">No blocks found</p>
          </div>
        ) : (
          <div className="divide-y divide-arc-border/50">
            {filteredBlocks.map((block, i) => {
              const blockNum = parseInt(block.number, 16);
              const timestamp = parseInt(block.timestamp, 16);
              const txCount = block.transactions?.length || 0;
              const gasUsed = parseInt(block.gasUsed, 16);
              const gasLimit = parseInt(block.gasLimit, 16);
              const gasPercent = ((gasUsed / gasLimit) * 100).toFixed(1);

              return (
                <motion.div
                  key={block.hash}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="px-5 py-3 hover:bg-arc-bg/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Block Icon */}
                    <div className="h-10 w-10 rounded-lg bg-arc-green/10 border border-arc-green/20 flex items-center justify-center flex-shrink-0">
                      <Box className="h-4 w-4 text-arc-green" />
                    </div>

                    {/* Block Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-white">
                          #{blockNum.toLocaleString()}
                        </span>
                        <span className="text-xs text-arc-text-dim">
                          <Clock className="h-3 w-3 inline mr-0.5" />
                          {timeAgo(timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-arc-text-muted">
                        <span className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          {shortenHash(block.hash)}
                        </span>
                        <span>{txCount} txs</span>
                        <span className="flex items-center gap-1">
                          <Fuel className="h-3 w-3" />
                          {gasPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Link */}
                    <a
                      href={`${EXPLORER_URL}/block/${blockNum}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-arc-surface transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4 text-arc-text-dim hover:text-arc-green" />
                    </a>
                  </div>

                  {/* Gas Usage Bar */}
                  <div className="mt-2 ml-14">
                    <div className="h-1 rounded-full bg-arc-border overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${gasPercent}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="h-full rounded-full bg-gradient-to-r from-arc-green to-arc-cyan"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
