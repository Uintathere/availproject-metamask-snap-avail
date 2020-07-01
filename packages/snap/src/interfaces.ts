import {MetamaskPolkadotRpcRequest, SnapConfig, Transaction} from "@nodefactory/metamask-polkadot-types";

export type FMethodCallback = (
  originString: string,
  requestObject: MetamaskPolkadotRpcRequest
) => Promise<unknown>;

export type MetamaskState = {
  polkadot: {
    config: SnapConfig;
    transactions: TransactionState[];
  };
};

export interface TransactionState {
  transaction: Transaction;
  sent: boolean;
}

export const EmptyMetamaskState: () => MetamaskState = () => ({polkadot: {config: null, transactions: []}});

export interface Wallet {
  registerApiRequestHandler: (origin: unknown) => unknown;
  registerRpcMessageHandler: (fn: FMethodCallback) => unknown;
  send(options: {method: string; params: unknown[]}): unknown;
  getAppKey(): Promise<string>;
  updatePluginState(state: MetamaskState): void;
  getPluginState(): MetamaskState;
}

export interface Asset {
  balance: string|number;
  customViewUrl?: string;
  decimals?: number;
  identifier: string;
  image?: string;
  symbol: string;
}