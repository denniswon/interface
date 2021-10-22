/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: tokenHourDatas
// ====================================================

export interface tokenHourDatas_tokenHourDatas {
  __typename: "TokenHourData";
  periodStartUnix: number;
  high: any;
  low: any;
  open: any;
  close: any;
}

export interface tokenHourDatas {
  tokenHourDatas: tokenHourDatas_tokenHourDatas[];
}

export interface tokenHourDatasVariables {
  startTime: number;
  skip: number;
  address: string;
}
