import type { Account, Balance } from '@ant-design/web3-common';
import { AddressPurpose, BitcoinNetworkType, getAddress, request, signMessage } from 'sats-connect';

import { NoAddressError, NoProviderError } from '../../error';
import { getBalanceByMempool, getInscriptionsByAddress } from '../../helpers';
import type { BitcoinProvider, SignPsbtParams, SignPsbtResult, TransferParams } from '../../types';
import type { BitcoinWallet } from '../useBitcoinWallet';


export class MagicEdenBitcoinWallet implements BitcoinWallet {
  name: string;
  // provider?: BitcoinProvider;
  account?: Account & { publicKey?: string };
  payment?: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(name: string, _id = 'magicEden.bitcoin') {
    this.name = name;
    // this.provider = getProviderById(id);
    // this.provider = (window as any)?.magicEden?.bitcoin;

  }

  get provider(): BitcoinProvider {
    return (window as any).magicEden?.bitcoin;
  }

  connect = async (): Promise<void> => {
    await getAddress({
      getProvider: () => this.provider as any,
      payload: {
        purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
        message: "Address for receiving Ordinals and payments",
        network: {
          type: BitcoinNetworkType.Mainnet,
        },
      },
      onFinish: (response) => {
    
        // do some action like updating your app context
        // connectionStatus?.setAccounts(response.addresses as unknown as Account[]);
        const account = response.addresses[0];
        this.account = { address: account.address, publicKey: account.publicKey };
      },
      onCancel: () => {
      },
    });
  };

  getBalance = async (): Promise<Balance> => {
    if (!this.payment) {
      throw new NoAddressError();
    }
    const balance = await getBalanceByMempool(this.payment);
    return balance;
  };

  signMessage = async (msg: string): Promise<string> => {
    return new Promise((resolve) => {
      signMessage({
        payload: {
          network: {
            type: BitcoinNetworkType.Mainnet,
          },
          address: this.account?.address as string,
          message: msg,
        },
        onFinish: (response) => {
          // alert(`Successfully signed message: ${response}`);
          resolve(response);
        },
        onCancel: () => {
          // alert('Request canceled');
        },
      });
    })
  };

  sendTransfer = async ({ to, sats }: TransferParams): Promise<string> => {
    let txid = '';
    const response = await request('sendTransfer', {
      recipients: [
        {
          address: to,
          amount: sats,
        },
      ],
    });
    if (response.status === 'success') {
      txid = response.result.txid;
    } else {
      throw new Error(response.error.message);
    }
    return txid;
  };

  signPsbt = async ({ psbt, options }: SignPsbtParams): Promise<SignPsbtResult> => {
    if (!this.provider) {
      throw new NoProviderError();
    }
    const response = await request('signPsbt', {
      psbt,
      signInputs: options?.signInputs ?? {},
      broadcast: !!options?.broadcast,
      allowedSignHash: options?.signHash,
    });
    if (response.status === 'success') {
      return response.result as SignPsbtResult;
    } else {
      throw new Error(response.error.message);
    }
  };

  getInscriptions = async (offset = 0, limit = 20) => {
    if (!this.account?.address) {
      throw new NoAddressError();
    }
    const inscriptions = await getInscriptionsByAddress({
      address: this.account?.address,
      offset,
      limit,
    });
    return inscriptions;
  };
}
