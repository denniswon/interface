/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: tokens
// ====================================================

export interface tokens_asSymbol {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
  totalValueLockedUSD: any;
}

export interface tokens_asName {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
  totalValueLockedUSD: any;
}

export interface tokens_asAddress {
  __typename: "Token";
  id: string;
  symbol: string;
  name: string;
  totalValueLockedUSD: any;
}

export interface tokens {
  asSymbol: tokens_asSymbol[];
  asName: tokens_asName[];
  asAddress: tokens_asAddress[];
}

export interface tokensVariables {
  value?: string | null;
  id?: string | null;
}
