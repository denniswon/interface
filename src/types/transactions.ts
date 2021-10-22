/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: transactions
// ====================================================

export interface transactions_mintsAs0_transaction {
  __typename: "Transaction";
  id: string;
}

export interface transactions_mintsAs0_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_mintsAs0_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_mintsAs0_pool {
  __typename: "Pool";
  token0: transactions_mintsAs0_pool_token0;
  token1: transactions_mintsAs0_pool_token1;
}

export interface transactions_mintsAs0 {
  __typename: "Mint";
  timestamp: any;
  transaction: transactions_mintsAs0_transaction;
  pool: transactions_mintsAs0_pool;
  owner: any;
  sender: any | null;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any | null;
}

export interface transactions_mintsAs1_transaction {
  __typename: "Transaction";
  id: string;
}

export interface transactions_mintsAs1_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_mintsAs1_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_mintsAs1_pool {
  __typename: "Pool";
  token0: transactions_mintsAs1_pool_token0;
  token1: transactions_mintsAs1_pool_token1;
}

export interface transactions_mintsAs1 {
  __typename: "Mint";
  timestamp: any;
  transaction: transactions_mintsAs1_transaction;
  pool: transactions_mintsAs1_pool;
  owner: any;
  sender: any | null;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any | null;
}

export interface transactions_swapsAs0_transaction {
  __typename: "Transaction";
  id: string;
}

export interface transactions_swapsAs0_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_swapsAs0_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_swapsAs0_pool {
  __typename: "Pool";
  token0: transactions_swapsAs0_pool_token0;
  token1: transactions_swapsAs0_pool_token1;
}

export interface transactions_swapsAs0 {
  __typename: "Swap";
  timestamp: any;
  transaction: transactions_swapsAs0_transaction;
  pool: transactions_swapsAs0_pool;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any;
}

export interface transactions_swapsAs1_transaction {
  __typename: "Transaction";
  id: string;
}

export interface transactions_swapsAs1_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_swapsAs1_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_swapsAs1_pool {
  __typename: "Pool";
  token0: transactions_swapsAs1_pool_token0;
  token1: transactions_swapsAs1_pool_token1;
}

export interface transactions_swapsAs1 {
  __typename: "Swap";
  timestamp: any;
  transaction: transactions_swapsAs1_transaction;
  pool: transactions_swapsAs1_pool;
  origin: any;
  amount0: any;
  amount1: any;
  amountUSD: any;
}

export interface transactions_burnsAs0_transaction {
  __typename: "Transaction";
  id: string;
}

export interface transactions_burnsAs0_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_burnsAs0_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_burnsAs0_pool {
  __typename: "Pool";
  token0: transactions_burnsAs0_pool_token0;
  token1: transactions_burnsAs0_pool_token1;
}

export interface transactions_burnsAs0 {
  __typename: "Burn";
  timestamp: any;
  transaction: transactions_burnsAs0_transaction;
  pool: transactions_burnsAs0_pool;
  owner: any | null;
  amount0: any;
  amount1: any;
  amountUSD: any | null;
}

export interface transactions_burnsAs1_transaction {
  __typename: "Transaction";
  id: string;
}

export interface transactions_burnsAs1_pool_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_burnsAs1_pool_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
}

export interface transactions_burnsAs1_pool {
  __typename: "Pool";
  token0: transactions_burnsAs1_pool_token0;
  token1: transactions_burnsAs1_pool_token1;
}

export interface transactions_burnsAs1 {
  __typename: "Burn";
  timestamp: any;
  transaction: transactions_burnsAs1_transaction;
  pool: transactions_burnsAs1_pool;
  owner: any | null;
  amount0: any;
  amount1: any;
  amountUSD: any | null;
}

export interface transactions {
  mintsAs0: transactions_mintsAs0[];
  mintsAs1: transactions_mintsAs1[];
  swapsAs0: transactions_swapsAs0[];
  swapsAs1: transactions_swapsAs1[];
  burnsAs0: transactions_burnsAs0[];
  burnsAs1: transactions_burnsAs1[];
}

export interface transactionsVariables {
  address: string;
}
