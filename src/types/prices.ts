/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: prices
// ====================================================

export interface prices_current {
  __typename: "Bundle";
  ethPriceUSD: any;
}

export interface prices_oneDay {
  __typename: "Bundle";
  ethPriceUSD: any;
}

export interface prices_twoDay {
  __typename: "Bundle";
  ethPriceUSD: any;
}

export interface prices_oneWeek {
  __typename: "Bundle";
  ethPriceUSD: any;
}

export interface prices {
  current: prices_current[];
  oneDay: prices_oneDay[];
  twoDay: prices_twoDay[];
  oneWeek: prices_oneWeek[];
}

export interface pricesVariables {
  block24: number;
  block48: number;
  blockWeek: number;
}
