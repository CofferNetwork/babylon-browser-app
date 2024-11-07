/* v8 ignore start */
import type { Account, Balance } from '@ant-design/web3-common';

import { NoAddressError, NoProviderError } from '../../error';
import { getBalanceObject } from '../../helpers';
import type { SignPsbtParams, SignPsbtResult, TransferParams } from '../../types';
import type { BitcoinWallet } from '../useBitcoinWallet';

export class UnisatBitcoinWallet implements BitcoinWallet {
  name: string;
  // provider?: Unisat.Provider;
  account?: Account & { publicKey?: string };

  constructor(name: string) {
    this.name = name;
    // this.provider = window.unisat;
    this.account = undefined;
  }

  get provider() {
    return (window as any).unisat;
  }

  connect = async (): Promise<void> => {
    if (!this.provider) {
      throw new NoProviderError();
    }
    try {
      const accounts = await this.provider.requestAccounts();
      const publicKey = await this.provider.getPublicKey();
      this.account = { address: accounts[0], publicKey };
    } catch (e) {
      throw e;
    }
  };

  getBalance = async (): Promise<Balance> => {
    if (!this.provider) {
      throw new NoProviderError();
    }
    const { confirmed } = await this.provider.getBalance();
    const balance = getBalanceObject(confirmed);
    return balance;
  };

  signMessage = async (msg: string): Promise<string> => {
    if (!this.provider) {
      throw new NoProviderError();
    }
    const signature = await this.provider.signMessage(msg);
    return signature;
  };

  sendTransfer = async ({ to, sats, options }: TransferParams): Promise<string> => {
    if (!this.provider) {
      throw new NoProviderError();
    }
    let txid = '';
    try {
      txid = await this.provider.sendBitcoin(to, sats, options);
    } catch (e) {
      throw e;
    }
    return txid;
  };

  signPsbt = async ({ psbt, options = {} }: SignPsbtParams): Promise<SignPsbtResult> => {
    if (!this.provider) {
      throw new NoProviderError();
    }
    if (!this.account?.address) {
      throw new NoAddressError();
    }
    const { broadcast = false, signInputs = {}, signHash } = options;
    const toSignInputs = [];

    // Convert xverse-compatible signInputs to unisat-compatible toSignInputs
    for (const address in signInputs) {
      for (const input of signInputs[address]) {
        toSignInputs.push({
          address,
          index: input,
          sighashTypes: signHash ? [signHash] : undefined,
          publicKey: this.account?.publicKey,
        });
      }
    }
    const signedPsbt = await this.provider.signPsbt(psbt, {
      autoFinalized: broadcast,
      toSignInputs: toSignInputs.length === 0 ? undefined : toSignInputs,
    });
    return {
      psbt: signedPsbt,
    };
  };

  getInscriptions = async (offset = 0, size = 20) => {
    if (!this.provider) {
      throw new NoProviderError();
    }
    const inscriptions = await this.provider.getInscriptions(offset, size);
    return inscriptions;
  };
}
