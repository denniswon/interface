/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: poolDayDatas
// ====================================================

export interface poolDayDatas_poolDayDatas {
  __typename: "PoolDayData";
  date: number;
  volumeUSD: any;
  tvlUSD: any;
  feesUSD: any;
}

export interface poolDayDatas {
  poolDayDatas: poolDayDatas_poolDayDatas[];
}

export interface poolDayDatasVariables {
  startTime: number;
  skip: number;
  address: string;
}
