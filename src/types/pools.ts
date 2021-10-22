/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pools
// ====================================================

export interface pools_as0_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
}

export interface pools_as0_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
}

export interface pools_as0 {
  __typename: "Pool";
  id: string;
  feeTier: any;
  token0: pools_as0_token0;
  token1: pools_as0_token1;
}

export interface pools_as1_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
}

export interface pools_as1_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
}

export interface pools_as1 {
  __typename: "Pool";
  id: string;
  feeTier: any;
  token0: pools_as1_token0;
  token1: pools_as1_token1;
}

export interface pools_asAddress_token0 {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
}

export interface pools_asAddress_token1 {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
}

export interface pools_asAddress {
  __typename: "Pool";
  id: string;
  feeTier: any;
  token0: pools_asAddress_token0;
  token1: pools_asAddress_token1;
}

export interface pools {
  as0: pools_as0[];
  as1: pools_as1[];
  asAddress: pools_asAddress[];
}

export interface poolsVariables {
  tokens?: string[] | null;
  id?: string | null;
}
