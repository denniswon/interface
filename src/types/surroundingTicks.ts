/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: surroundingTicks
// ====================================================

export interface surroundingTicks_ticks {
  __typename: "Tick";
  tickIdx: any;
  liquidityGross: any;
  liquidityNet: any;
  price0: any;
  price1: any;
}

export interface surroundingTicks {
  ticks: surroundingTicks_ticks[];
}

export interface surroundingTicksVariables {
  poolAddress?: string | null;
  tickIdxLowerBound: any;
  tickIdxUpperBound: any;
  skip: number;
}
