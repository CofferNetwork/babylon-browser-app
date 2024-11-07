import { Account } from "@ant-design/web3";

export type WalletAccount = Account & { publicKey?: string };