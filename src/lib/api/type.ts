
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  code: 200 | 10002 | 10003;
  msg: string;
  data: T | null;
}

export interface Network {
  type: string;   
  name: string;   
  meta: string;
}

export interface GlobalSettings {
  networks: Network[];
}

export interface WalletStatistics {
  netWorth: number;
  totalAsset: number;
  totalRewards: number;
  totalDebts: number;
}

export interface Assets {
  asset: string;
  assetType: string;
  balances: number;
  price: number;
  name: string;
  logo: string;
  value: string;
  networkType: string; // e.g., "btc-mainnet"
}

export type WalletAssetsList = Assets[];

export interface CreateMultisig {
  name: string;  // hex
  network?: string;  // e.g., "btc-mainnet"
  signers: {
    name: string;  
    address: string;
    isConnected?: boolean;
  }[];
  threshold: number;
  addressType: 'p2wsh' | 'p2tr' | string;
  // description: string;
}

export type MultisigView = CreateMultisig;

export interface MultisigParticipant {
  address: string;
  addressType: string;
  isJoin: 0 | 1;
}

export interface Multisig {
  id: string;
  name: string;  
  description: string;
  address: string;
  createdAt: number;
  status: 'fulfilled' | 'unfulfilled';
  participants: MultisigParticipant[];
  threshold?: number;
  addressType?: string;
}

export type MultisigListResponse = Multisig[];

export interface JoinMultisig {
  id: string;
  walletAddress: string;
  publicKey: string;
  walletType: string;
  network: string;
}

export interface AddAddressBookRequest {
  name: string; // hex 
  address: string;
}


export interface AddressBookEntry {
  uuid: string;
  contactName: string;  
  contactAddress: string;
  createdAt: number;
  updatedAt: number;
}

export type AddressBookListResponse = AddressBookEntry[];


export interface UpdateAddressBookRequest {
  name: string;  
  address: string;
}

export interface DeleteAddressBookResponse {
  name: string;  
  address: string;
}

export interface EstimateFeeRate {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}


export enum TransactionStatus {
  Signing = 'signing',
  Signed = 'signed',
  Broadcasted = 'broadcasted',
  Completed = 'completed',
}

export interface BtcTransactionRequest {
  originAddress: string;
  destinationAddresses: {
    address: string;
    amount: number;
  }[];
  asset: string; // e.g., "btc"
  networkType: string; // e.g., "btc-mainnet"
  txFeeRate: number;
}


export interface Brc20TransactionRequest {
  originAddress: string;
  destinationAddresses: {
    address: string;
    amount: number;
  }[];
  asset: string; // e.g., "ordi"
  networkType: string; // e.g., "btc-mainnet"
}


export interface RunesTransactionRequest {
  originAddress: string;
  destinationAddresses: {
    address: string;
    amount: number;
  }[];
  asset: string; // e.g., "UNCOMMON•GOODS"
  networkType: string; // e.g., "btc-mainnet"
  txFeeRate: number;
}


export interface Transaction {
  id: string;
  createdAt: number;
  executedAt: number | null;
  createBy: string;  
  description: string;
  destinationAddresses: {
    address: string;
    amount: number;
    isChange: number;
  }[];
  asset: string;
  utxoTotal: string;
  feeRate: number;
  transactionStatus: TransactionStatus;
  signedInfo: {
    name: string;
    action: 'approved' | 'rejected';
    actionAt: number;
    address: string;
  }[];
  signedStatus: {
    M: number;
    N: number;
  }
  broadcastedInfo: {
    txid: string;
    confirmed: boolean;
    block: string;
    broadcastedAt: number;
  } | null;
  txid?: string;
}

export type TransactionListResponse = Transaction[];


export type TransactionStatusResponse = Transaction


export interface GetTransactionPsbtResponse {
  rawPsbt: string;
}


export interface PostTransactionPsbtRequest {
  rawPsbt?: string;
  signedPsbt?: string;
  action: "approve" | "reject"
}

export interface AppMarket {
  id: string;
  name: string;
  targetUrl: string;
  icon: string;
  description: string;
}

export type AppMarketListResponse = AppMarket[];


export type UserInfo = {
  address: string;
  addressType: string;
  network: string;
  publicKey: string;
  userId: number;
}

export type Provider = {
  commission?: string;
  eots_pk?: string;
  description?: {
    "moniker": string,
    "identity": string,
    "website": string,
    "security_contact": string,
    "details": string
  }
  rank?: number;
  total_delegations?: number;
}

export type Staker = {
  active_delegations?: number;
  active_tvl?: number;
  staker_pk_hex?: string;
  total_delegations?: number;
  total_tvl?: number;
  providers?: Provider[];
  staker_address?: string;
  rank?: number;
}


export type Delegation = {
  _id: string;
  staker_pk_hex: string;
  finality_provider_pk_hex: string;
  staking_value: number;
  state: string; 
  staking_tx: {
      tx_hex: string;
      output_index: number;
      start_timestamp: number;
      start_height: number;
      timelock: number;
  };
  is_overflow: boolean;
  staker_address?: string;
  to_address?: string;
};

export type StakerDetail = {
  _id: string;
  active_delegations: number;
  active_tvl: number;
  total_delegations: number;
  total_tvl: number;
  delegations: Delegation[];
  finality_providers?: string[];
  staker_address?: string;
} & Page;


export type Page = {
  pi: number,
  pn: number,
  total: number,
}

export type Pagination<T> = Page & {
  items: Array<T>,
}