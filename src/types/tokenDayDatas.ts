/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: tokenDayDatas
// ====================================================

export interface tokenDayDatas_tokenDayDatas {
  __typename: "TokenDayData";
  date: number;
  volumeUSD: any;
  totalValueLockedUSD: any;
}

export interface tokenDayDatas {
  tokenDayDatas: tokenDayDatas_tokenDayDatas[];
}

export interface tokenDayDatasVariables {
  startTime: number;
  skip: number;
  address: string;
}
