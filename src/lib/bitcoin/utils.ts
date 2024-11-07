import { getAddressInfo as _getAddressInfo, validate } from "bitcoin-address-validation";

export function satToBtc(sat: number) {
  // TODO: use big int library
  return sat / Math.pow(10, 8);
}

// https://bitzuma.com/posts/making-sense-of-bitcoin-transaction-fees/
export function estimateSegWitFee(
  inputs: number,
  outputs: number,
  price: number
) {
  return Math.ceil((42 + 272 * inputs + 128 * outputs) / 4) * price;
}

export const validateAddress = (address: string) => {
  return validate(address);
};

export const isSameNetwork = (network?: string, address?: string) => {
  if (!address || !network) return false;

  if (network && network.startsWith("btc-")) {
    network = network.replace("btc-", "");
  }

  try {
    return _getAddressInfo(address).network === network;
  } catch { /* empty */ }

  return false;
};

export const getAddressInfo = (address?: string) => {
  if (!address) return;
  try {
    const info = _getAddressInfo(address);
    
    return {
      cofferNetwork: `btc-${info.network}`,
      ...info
    };
  } catch { /* empty */ }
}