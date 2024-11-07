import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStorageAddress = () =>
  sessionStorage.getItem("storage_address") || "";

export const setStorageAddress = (addr: string) => {
  if (!addr) {
    return sessionStorage.removeItem("storage_address");
  }
  sessionStorage.setItem("storage_address", addr);
};

const networkMap: Record<string, string> = {
  "btc-mainnet": "",
  "btc-signet": "/signet",
  "btc-testnet": "/testnet",
};

export const getMempoolAddressLink = (
  address: string,
  network: string = ""
) => {
  return `https://mempool.space${networkMap[network] || ''}/address/${address}`;
};

export const getMempoolTxLink = (tx: string, network: string = "") => {
  return `https://mempool.space${networkMap[network] || ''}/tx/${tx}`;
};
