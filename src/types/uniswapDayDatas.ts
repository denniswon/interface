/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: uniswapDayDatas
// ====================================================

export interface uniswapDayDatas_uniswapDayDatas {
  __typename: "UniswapDayData";
  id: string;
  date: number;
  volumeUSD: any;
  tvlUSD: any;
}

export interface uniswapDayDatas {
  uniswapDayDatas: uniswapDayDatas_uniswapDayDatas[];
}

export interface uniswapDayDatasVariables {
  startTime: number;
  skip: number;
}
