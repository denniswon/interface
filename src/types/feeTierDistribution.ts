/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: feeTierDistribution
// ====================================================

export interface feeTierDistribution__meta_block {
  __typename: "_Block_";
  /**
   * The block number
   */
  number: number;
}

export interface feeTierDistribution__meta {
  __typename: "_Meta_";
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   */
  block: feeTierDistribution__meta_block;
}

export interface feeTierDistribution_asToken0 {
  __typename: "Pool";
  feeTier: any;
  totalValueLockedToken0: any;
  totalValueLockedToken1: any;
}

export interface feeTierDistribution_asToken1 {
  __typename: "Pool";
  feeTier: any;
  totalValueLockedToken0: any;
  totalValueLockedToken1: any;
}

export interface feeTierDistribution {
  /**
   * Access to subgraph metadata
   */
  _meta: feeTierDistribution__meta | null;
  asToken0: feeTierDistribution_asToken0[];
  asToken1: feeTierDistribution_asToken1[];
}

export interface feeTierDistributionVariables {
  token0: string;
  token1: string;
}
