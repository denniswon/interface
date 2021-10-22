/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pool
// ====================================================

export interface pool_pool_token0 {
  __typename: "Token";
  symbol: string;
  id: string;
  decimals: any;
}

export interface pool_pool_token1 {
  __typename: "Token";
  symbol: string;
  id: string;
  decimals: any;
}

export interface pool_pool {
  __typename: "Pool";
  tick: any | null;
  token0: pool_pool_token0;
  token1: pool_pool_token1;
  feeTier: any;
  sqrtPrice: any;
  liquidity: any;
}

export interface pool {
  pool: pool_pool | null;
}

export interface poolVariables {
  poolAddress: string;
}
