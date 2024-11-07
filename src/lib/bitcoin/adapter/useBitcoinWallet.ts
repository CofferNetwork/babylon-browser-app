import React from 'react';
import type { Account, Balance } from '@ant-design/web3-common';

import type { Inscription, SignPsbtParams, SignPsbtResult, TransferParams } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface BitcoinWallet<Provider = any> {
  name: string;
  provider?: Provider;
  account?: Account & { publicKey?: string };
  getBalance: () => Promise<Balance>;
  connect: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  sendTransfer: (params: TransferParams) => Promise<string>;
  signPsbt: (params: SignPsbtParams) => Promise<SignPsbtResult>;
  getInscriptions: (
    offset?: number,
    size?: number,
  ) => Promise<{ total: number; list: Inscription[] }>;
}

export const BitcoinAdapterContext = React.createContext<BitcoinWallet>({} as BitcoinWallet);

export const useBitcoinWallet = () => {
  const adapter = React.useContext(BitcoinAdapterContext);
  return adapter;
};
