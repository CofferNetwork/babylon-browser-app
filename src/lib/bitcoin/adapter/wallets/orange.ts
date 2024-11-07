/* v8 ignore start */
import type { Account, Balance } from '@ant-design/web3-common';

import { NoAddressError, NoProviderError } from '../../error';
import { getBalanceObject } from '../../helpers';
import type { SignPsbtParams, TransferParams } from '../../types';
import type { BitcoinWallet } from '../useBitcoinWallet';
import { BitcoinNetworkType, getAddress, signMessage, SignMessageOptions } from "@orangecrypto/orange-connect"

export class OrangeBitcoinWallet implements BitcoinWallet {
  name: string;
  // provider?: Unisat.Provider;
  account?: Account & { publicKey?: string };

  constructor(name: string) {
    this.name = name;
    // this.provider = window.Orangewallet?.bitcoin;
    this.account = undefined;
  }

  get provider(): any {
    return window.OrangeWalletProviders?.OrangeBitcoinProvider;
  }

  connect = async (): Promise<void> => {
    if (!this.provider) {
      throw new NoProviderError();
    }


		const getAddressOptions: any = {
			payload: {
				purposes: ['ordinals', 'payment'],
				message: 'Address for receiving Ordinals and payments',
				network: {
					type: 'Mainnet'
				},
			},
			onFinish: (response: any) => {
				const account = response.addresses?.[0];
				this.account = { address: account.address, publicKey: account.publicKey };
			},
			onCancel: () => alert('Request canceled'),
		};

		await getAddress(getAddressOptions);

    // try {
    //   const accounts = await this.provider.requestAccounts();
    //   const publicKey = await (window as any)?.Orangewallet?.bitcoin?.getPublicKey();

    //   this.account = { address: accounts[0], publicKey };
    // } catch (error) {
    //   throw error;
    // }
  };

  getBalance = async (): Promise<Balance> => {
    if (!this.provider) {
      throw new NoProviderError();
    }

    const { confirmed } = await this.provider.getBalance();
    return getBalanceObject(confirmed);
  };

  signMessage = async (msg: string): Promise<string> => {

		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (r) => {
			const signMessageOptions: SignMessageOptions = {
				payload: {
					network: {
						type: BitcoinNetworkType.Mainnet,
					},
					address: this.account?.address as string,
					message: msg,
				},
				onFinish: (response) => {
					r(response)
				},
				onCancel: () => console.log("Signature request canceled"),
			};
			
			await signMessage(signMessageOptions);
		})

    // if (!this.provider) {
    //   throw new NoProviderError();
    // }

    // return await this.provider.signMessage(msg);
  };

  sendTransfer = async ({ to, sats, options }: TransferParams): Promise<string> => {
    if (!this.provider) {
      throw new NoProviderError();
    }

    let txid = '';
    try {
      txid = await this.provider.sendBitcoin(to, sats, options);
    } catch (error) {
      throw error;
    }
    return txid;
  };

  signPsbt = async ({ psbt, options = {} }: SignPsbtParams): Promise<SignPsbtParams> => {
    if (!this.provider) {
      throw new NoProviderError();
    }
    if (!this.account?.address) {
      throw new NoAddressError();
    }

    const { broadcast = false, signInputs = {}, signHash } = options;
    const toSignInputs = [];

    for (const address in signInputs) {
      for (const input of signInputs[address]) {
        toSignInputs.push({
          address,
          index: input,
          sighashTypes: signHash ? [signHash] : undefined,
          publicKey: this.account?.address,
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
