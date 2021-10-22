/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: topTransactions
// ====================================================

export interface topTransactions_transactions_mints_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface topTransactions_transactions_mints_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface topTransactions_transactions_mints_pool {
  __typename: "Pool";
  token0: topTransactions_transactions_mints_pool_token0;
  token1: topTransactions_transactions_mints_pool_token1;
}

export interface topTransactions_transactions_mints {
  __typename: "Mint";
  pool: topTransactions_transactions_mints_pool;
  owner: any;
  sender: any | null;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any | null;
}

export interface topTransactions_transactions_swaps_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface topTransactions_transactions_swaps_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface topTransactions_transactions_swaps_pool {
  __typename: "Pool";
  token0: topTransactions_transactions_swaps_pool_token0;
  token1: topTransactions_transactions_swaps_pool_token1;
}

export interface topTransactions_transactions_swaps {
  __typename: "Swap";
  pool: topTransactions_transactions_swaps_pool;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any;
}

export interface topTransactions_transactions_burns_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface topTransactions_transactions_burns_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface topTransactions_transactions_burns_pool {
  __typename: "Pool";
  token0: topTransactions_transactions_burns_pool_token0;
  token1: topTransactions_transactions_burns_pool_token1;
}

export interface topTransactions_transactions_burns {
  __typename: "Burn";
  pool: topTransactions_transactions_burns_pool;
  owner: any | null;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any | null;
}

export interface topTransactions_transactions {
  __typename: "Transaction";
  id: string;
  timestamp: any;
  mints: (topTransactions_transactions_mints | null)[];
  swaps: (topTransactions_transactions_swaps | null)[];
  burns: (topTransactions_transactions_burns | null)[];
}

export interface topTransactions {
  transactions: topTransactions_transactions[];
}
