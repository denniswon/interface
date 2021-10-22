/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: poolsForToken
// ====================================================

export interface poolsForToken_asToken0 {
  __typename: "Pool";
  id: string;
}

export interface poolsForToken_asToken1 {
  __typename: "Pool";
  id: string;
}

export interface poolsForToken {
  asToken0: poolsForToken_asToken0[];
  asToken1: poolsForToken_asToken1[];
}

export interface poolsForTokenVariables {
  address: string;
}
