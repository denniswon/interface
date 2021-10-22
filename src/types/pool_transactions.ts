/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pool_transactions
// ====================================================

export interface pool_transactions_mints_transaction {
  __typename: "Transaction";
  id: string;
}

export interface pool_transactions_mints_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface pool_transactions_mints_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface pool_transactions_mints_pool {
  __typename: "Pool";
  token0: pool_transactions_mints_pool_token0;
  token1: pool_transactions_mints_pool_token1;
}

export interface pool_transactions_mints {
  __typename: "Mint";
  timestamp: any;
  transaction: pool_transactions_mints_transaction;
  pool: pool_transactions_mints_pool;
  owner: any;
  sender: any | null;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any | null;
}

export interface pool_transactions_swaps_transaction {
  __typename: "Transaction";
  id: string;
}

export interface pool_transactions_swaps_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface pool_transactions_swaps_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface pool_transactions_swaps_pool {
  __typename: "Pool";
  token0: pool_transactions_swaps_pool_token0;
  token1: pool_transactions_swaps_pool_token1;
}

export interface pool_transactions_swaps {
  __typename: "Swap";
  timestamp: any;
  transaction: pool_transactions_swaps_transaction;
  pool: pool_transactions_swaps_pool;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any;
}

export interface pool_transactions_burns_transaction {
  __typename: "Transaction";
  id: string;
}

export interface pool_transactions_burns_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface pool_transactions_burns_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface pool_transactions_burns_pool {
  __typename: "Pool";
  token0: pool_transactions_burns_pool_token0;
  token1: pool_transactions_burns_pool_token1;
}

export interface pool_transactions_burns {
  __typename: "Burn";
  timestamp: any;
  transaction: pool_transactions_burns_transaction;
  pool: pool_transactions_burns_pool;
  owner: any | null;
  amount0: any;
  amount1: any;
  amountUSD: any | null;
}

export interface pool_transactions {
  mints: pool_transactions_mints[];
  swaps: pool_transactions_swaps[];
  burns: pool_transactions_burns[];
}

export interface pool_transactionsVariables {
  address: string;
}
