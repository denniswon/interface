/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allV3Ticks
// ====================================================

export interface allV3Ticks_ticks {
  __typename: "Tick";
  tickIdx: any;
  liquidityNet: any;
  price0: any;
  price1: any;
}

export interface allV3Ticks {
  ticks: allV3Ticks_ticks[];
}

export interface allV3TicksVariables {
  poolAddress: string;
  skip: number;
}
