import { HTTP_RPC_URL } from "@/lib/constants";

async function rpcCall(method: string, params: any[] = []) {
  const response = await fetch(HTTP_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params,
    }),
  });
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

export async function getLatestBlockNumber(): Promise<number> {
  const hex = await rpcCall("eth_blockNumber");
  return parseInt(hex, 16);
}

export async function getBlock(blockNumberOrTag: string | number = "latest") {
  const param =
    typeof blockNumberOrTag === "number"
      ? `0x${blockNumberOrTag.toString(16)}`
      : blockNumberOrTag;
  return await rpcCall("eth_getBlockByNumber", [param, true]);
}

export async function getTransaction(hash: string) {
  return await rpcCall("eth_getTransactionByHash", [hash]);
}

export async function getTransactionReceipt(hash: string) {
  return await rpcCall("eth_getTransactionReceipt", [hash]);
}

export async function getBalance(address: string): Promise<string> {
  const hex = await rpcCall("eth_getBalance", [address, "latest"]);
  return (parseInt(hex, 16) / 1e18).toFixed(6);
}

export async function getGasPrice(): Promise<string> {
  const hex = await rpcCall("eth_gasPrice");
  return (parseInt(hex, 16) / 1e9).toFixed(2);
}

export async function getTransactionCount(address: string): Promise<number> {
  const hex = await rpcCall("eth_getTransactionCount", [address, "latest"]);
  return parseInt(hex, 16);
}

export async function getChainId(): Promise<number> {
  const hex = await rpcCall("eth_chainId");
  return parseInt(hex, 16);
}

export async function getRecentBlocks(count = 10) {
  const latestNum = await getLatestBlockNumber();
  const blocks = [];
  for (let i = 0; i < count; i++) {
    const block = await getBlock(latestNum - i);
    if (block) blocks.push(block);
  }
  return blocks;
}

export async function getNetworkStats() {
  const [blockNumber, gasPrice, block] = await Promise.all([
    getLatestBlockNumber(),
    getGasPrice(),
    getBlock("latest"),
  ]);

  const txCount = block?.transactions?.length || 0;
  const gasUsed = block?.gasUsed ? parseInt(block.gasUsed, 16) : 0;
  const gasLimit = block?.gasLimit ? parseInt(block.gasLimit, 16) : 0;

  return {
    blockNumber,
    gasPrice,
    txCount,
    gasUsed,
    gasLimit,
    gasUtilization: gasLimit > 0 ? ((gasUsed / gasLimit) * 100).toFixed(1) : "0",
    timestamp: block?.timestamp ? parseInt(block.timestamp, 16) : 0,
  };
}
