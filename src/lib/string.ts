export const abbreviateAddress = (address: string = "") => {
  return address.substring(0, 4) + "...." + address.substr(-7, 7);
};


export function satoshiToBTC(satoshi?: number | string) {
  if (!satoshi) return;

  return (Number(satoshi) / 100000000).toFixed(8);
}