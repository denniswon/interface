import { BaseQueryFn } from '@reduxjs/toolkit/query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { SupportedChainId } from 'constants/chains'
import { DocumentNode } from 'graphql'
import { gql } from 'graphql-request'
import { ClientError, GraphQLClient } from 'graphql-request'
import { AppState } from 'state'

// List of supported subgraphs. Note that the app currently only support one active subgraph at a time
export const CHAIN_SUBGRAPH_URL: Record<number, string> = {
  [SupportedChainId.MAINNET]: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',

  [SupportedChainId.ARBITRUM_ONE]: 'https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-minimal',

  [SupportedChainId.OPTIMISM]: 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-optimism-dev',
}

// Graphql query client wrapper that builds a dynamic url based on chain id
export function graphqlRequestBaseQuery(): BaseQueryFn<
  { document: string | DocumentNode; variables?: any },
  unknown,
  Pick<ClientError, 'name' | 'message' | 'stack'>,
  Partial<Pick<ClientError, 'request' | 'response'>>
> {
  return async ({ document, variables }, { getState }) => {
    try {
      const chainId = (getState() as AppState).application.chainId

      const subgraphUrl = chainId ? CHAIN_SUBGRAPH_URL[chainId] : undefined

      if (!subgraphUrl) {
        return {
          error: {
            name: 'UnsupportedChainId',
            message: `Subgraph queries against ChainId ${chainId} are not supported.`,
            stack: '',
          },
        }
      }

      return { data: await new GraphQLClient(subgraphUrl).request(document, variables), meta: {} }
    } catch (error) {
      if (error instanceof ClientError) {
        const { name, message, stack, request, response } = error
        return { error: { name, message, stack }, meta: { request, response } }
      }
      throw error
    }
  }
}

export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: graphqlRequestBaseQuery(),
  endpoints: (builder) => ({
    allV3Ticks: builder.query({
      query: ({ poolAddress, skip = 0 }) => ({
        document: gql`
          query allV3Ticks($poolAddress: String!, $skip: Int!) {
            ticks(first: 1000, skip: $skip, where: { poolAddress: $poolAddress }, orderBy: tickIdx) {
              tickIdx
              liquidityNet
              price0
              price1
            }
          }
        `,
        variables: {
          poolAddress,
          skip,
        },
      }),
    }),

    feeTierDistribution: builder.query({
      query: ({ token0, token1 }) => ({
        document: gql`
          query feeTierDistribution($token0: String!, $token1: String!) {
            _meta {
              block {
                number
              }
            }
            asToken0: pools(
              orderBy: totalValueLockedToken0
              orderDirection: desc
              where: { token0: $token0, token1: $token1 }
            ) {
              feeTier
              totalValueLockedToken0
              totalValueLockedToken1
            }
            asToken1: pools(
              orderBy: totalValueLockedToken0
              orderDirection: desc
              where: { token0: $token1, token1: $token0 }
            ) {
              feeTier
              totalValueLockedToken0
              totalValueLockedToken1
            }
          }
        `,
        variables: {
          token0,
          token1,
        },
      }),
    }),

    tokensBulk: builder.query({
      query: ({ tokens, block }) => ({
        document: gql`
          query tokensBulk($tokens: [ID!], $block: Int!) {
            tokens(
              where: { id_in: $tokens }
              block: { number: $block }
              orderBy: totalValueLockedUSD
              orderDirection: desc
              subgraphError: allow
            ) {
              id
              symbol
              name
              derivedETH
              volumeUSD
              volume
              txCount
              totalValueLocked
              feesUSD
              totalValueLockedUSD
            }
          }
        `,
        variables: {
          tokens,
          block,
        },
      }),
    }),

    topTokens: builder.query({
      query: ({}) => ({
        document: gql`
          query topTokensData {
            tokens(first: 50, orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
              id
            }
          }
        `,
      }),
    }),

    tokenDayDatas: builder.query({
      query: ({ startTime, skip, address }) => ({
        document: gql`
          query tokenDayDatasData($startTime: Int!, $skip: Int!, $address: String!) {
            tokenDayDatas(
              first: 1000
              skip: $skip
              where: { token: $address, date_gt: $startTime }
              orderBy: date
              orderDirection: asc
              subgraphError: allow
            ) {
              date
              volumeUSD
              totalValueLockedUSD
            }
          }
        `,
        variables: {
          startTime,
          skip,
          address,
        },
      }),
    }),

    tokenHourDatas: builder.query({
      query: ({ startTime, skip, address }) => ({
        document: gql`
          query tokenHourDatasData($startTime: Int!, $skip: Int!, $address: String!) {
            tokenHourDatas(
              first: 100
              skip: $skip
              where: { token: $address, periodStartUnix_gt: $startTime }
              orderBy: periodStartUnix
              orderDirection: asc
            ) {
              periodStartUnix
              high
              low
              open
              close
            }
          }
        `,
        variables: {
          startTime,
          skip,
          address,
        },
      }),
    }),

    tokenSearch: builder.query({
      query: ({ value, id }) => ({
        document: gql`
          query tokenSearchData($value: String, $id: ID) {
            asSymbol: tokens(
              where: { symbol_contains: $value }
              orderBy: totalValueLockedUSD
              orderDirection: desc
              subgraphError: allow
            ) {
              id
              symbol
              name
              totalValueLockedUSD
            }
            asName: tokens(
              where: { name_contains: $value }
              orderBy: totalValueLockedUSD
              orderDirection: desc
              subgraphError: allow
            ) {
              id
              symbol
              name
              totalValueLockedUSD
            }
            asAddress: tokens(
              where: { id: $id }
              orderBy: totalValueLockedUSD
              orderDirection: desc
              subgraphError: allow
            ) {
              id
              symbol
              name
              totalValueLockedUSD
            }
          }
        `,
        variables: {
          value,
          id,
        },
      }),
    }),

    poolDayDatas: builder.query({
      query: ({ startTime, skip, address }) => ({
        document: gql`
          query poolDayDatasData($startTime: Int!, $skip: Int!, $address: String!) {
            poolDayDatas(
              first: 1000
              skip: $skip
              where: { pool: $address, date_gt: $startTime }
              orderBy: date
              orderDirection: asc
              subgraphError: allow
            ) {
              date
              volumeUSD
              tvlUSD
              feesUSD
            }
          }
        `,
        variables: {
          startTime,
          skip,
          address,
        },
      }),
    }),

    topPools: builder.query({
      query: ({}) => ({
        document: gql`
          query topPoolsData {
            pools(first: 50, orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
              id
            }
          }
        `,
      }),
    }),

    poolsBulk: builder.query({
      query: ({ pools }) => ({
        document: gql`
          query poolsBulkData($pools: [ID!]) {
            pools(where: { id_in: $pools }, orderBy: totalValueLockedUSD, orderDirection: desc, subgraphError: allow) {
              id
              feeTier
              liquidity
              sqrtPrice
              tick
              token0 {
                id
                symbol
                name
                decimals
                derivedETH
              }
              token1 {
                id
                symbol
                name
                decimals
                derivedETH
              }
              token0Price
              token1Price
              volumeUSD
              txCount
              totalValueLockedToken0
              totalValueLockedToken1
              totalValueLockedUSD
            }
          }
        `,
        variables: {
          pools,
        },
      }),
    }),

    poolsForToken: builder.query({
      query: ({ address }) => ({
        document: gql`
          query poolsForTokenData($address: String!) {
            asToken0: pools(
              first: 200
              orderBy: totalValueLockedUSD
              orderDirection: desc
              where: { token0: $address }
              subgraphError: allow
            ) {
              id
            }
            asToken1: pools(
              first: 200
              orderBy: totalValueLockedUSD
              orderDirection: desc
              where: { token1: $address }
              subgraphError: allow
            ) {
              id
            }
          }
        `,
        variables: {
          address,
        },
      }),
    }),

    poolForToken: builder.query({
      query: ({ poolAddress }) => ({
        document: gql`
          query poolData($poolAddress: ID!) {
            pool(id: $poolAddress) {
              tick
              token0 {
                symbol
                id
                decimals
              }
              token1 {
                symbol
                id
                decimals
              }
              feeTier
              sqrtPrice
              liquidity
            }
          }
        `,
        variables: {
          poolAddress,
        },
      }),
    }),

    transactions: builder.query({
      query: ({ address }) => ({
        document: gql`
          query transactionsData($address: String!) {
            mintsAs0: mints(
              first: 500
              orderBy: timestamp
              orderDirection: desc
              where: { token0: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              owner
              sender
              origin
              amount0
              amount1
              amountUSD
            }
            mintsAs1: mints(
              first: 500
              orderBy: timestamp
              orderDirection: desc
              where: { token0: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              owner
              sender
              origin
              amount0
              amount1
              amountUSD
            }
            swapsAs0: swaps(
              first: 500
              orderBy: timestamp
              orderDirection: desc
              where: { token0: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              origin
              amount0
              amount1
              amountUSD
            }
            swapsAs1: swaps(
              first: 500
              orderBy: timestamp
              orderDirection: desc
              where: { token1: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              origin
              amount0
              amount1
              amountUSD
            }
            burnsAs0: burns(
              first: 500
              orderBy: timestamp
              orderDirection: desc
              where: { token0: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              owner
              amount0
              amount1
              amountUSD
            }
            burnsAs1: burns(
              first: 500
              orderBy: timestamp
              orderDirection: desc
              where: { token1: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              owner
              amount0
              amount1
              amountUSD
            }
          }
        `,
        variables: {
          address,
        },
      }),
    }),

    poolTransactions: builder.query({
      query: ({ address }) => ({
        document: gql`
          query poolTransactionsData($address: String!) {
            mints(
              first: 100
              orderBy: timestamp
              orderDirection: desc
              where: { pool: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              owner
              sender
              origin
              amount0
              amount1
              amountUSD
            }
            swaps(
              first: 100
              orderBy: timestamp
              orderDirection: desc
              where: { pool: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              origin
              amount0
              amount1
              amountUSD
            }
            burns(
              first: 100
              orderBy: timestamp
              orderDirection: desc
              where: { pool: $address }
              subgraphError: allow
            ) {
              timestamp
              transaction {
                id
              }
              pool {
                token0 {
                  id
                  symbol
                }
                token1 {
                  id
                  symbol
                }
              }
              owner
              amount0
              amount1
              amountUSD
            }
          }
        `,
        variables: {
          address,
        },
      }),
    }),

    surroundingTicks: builder.query({
      query: ({ poolAddress, tickIdxLowerBound, tickIdxUpperBound, skip }) => ({
        document: gql`
          query surroundingTicksData(
            $poolAddress: String
            $tickIdxLowerBound: BigInt!
            $tickIdxUpperBound: BigInt!
            $skip: Int!
          ) {
            ticks(
              subgraphError: allow
              first: 1000
              skip: $skip
              where: { poolAddress: $poolAddress, tickIdx_lte: $tickIdxUpperBound, tickIdx_gte: $tickIdxLowerBound }
            ) {
              tickIdx
              liquidityGross
              liquidityNet
              price0
              price1
            }
          }
        `,
        variables: {
          poolAddress,
          tickIdxLowerBound,
          tickIdxUpperBound,
          skip,
        },
      }),
    }),

    poolsSearch: builder.query({
      query: ({ tokens, id }) => ({
        document: gql`
          query poolsSearchData($tokens: [String!], $id: ID) {
            as0: pools(where: { token0_in: $tokens }, subgraphError: allow) {
              id
              feeTier
              token0 {
                id
                symbol
                name
              }
              token1 {
                id
                symbol
                name
              }
            }
            as1: pools(where: { token1_in: $tokens }, subgraphError: allow) {
              id
              feeTier
              token0 {
                id
                symbol
                name
              }
              token1 {
                id
                symbol
                name
              }
            }
            asAddress: pools(where: { id: $id }, subgraphError: allow) {
              id
              feeTier
              token0 {
                id
                symbol
                name
              }
              token1 {
                id
                symbol
                name
              }
            }
          }
        `,
        variables: {
          tokens,
          id,
        },
      }),
    }),

    uniswapDayData: builder.query({
      query: ({ startTime, skip }) => ({
        document: gql`
          query uniswapDayDatasData($startTime: Int!, $skip: Int!) {
            uniswapDayDatas(
              first: 1000
              skip: $skip
              subgraphError: allow
              where: { date_gt: $startTime }
              orderBy: date
              orderDirection: asc
            ) {
              id
              date
              volumeUSD
              tvlUSD
            }
          }
        `,
        variables: {
          startTime,
          skip,
        },
      }),
    }),

    uniswapFactories: builder.query({
      query: ({ block }) => ({
        document: gql`
          query uniswapFactoriesData($block: Int!) {
            factories(block: { number: $block }, first: 1, subgraphError: allow) {
              txCount
              totalVolumeUSD
              totalFeesUSD
              totalValueLockedUSD
            }
          }
        `,
        variables: {
          block,
        },
      }),
    }),

    topTransactions: builder.query({
      query: ({}) => ({
        document: gql`
          query topTransactionsData {
            transactions(first: 500, orderBy: timestamp, orderDirection: desc, subgraphError: allow) {
              id
              timestamp
              mints {
                pool {
                  token0 {
                    id
                    symbol
                  }
                  token1 {
                    id
                    symbol
                  }
                }
                owner
                sender
                origin
                amount0
                amount1
                amountUSD
              }
              swaps {
                pool {
                  token0 {
                    id
                    symbol
                  }
                  token1 {
                    id
                    symbol
                  }
                }
                origin
                amount0
                amount1
                amountUSD
              }
              burns {
                pool {
                  token0 {
                    id
                    symbol
                  }
                  token1 {
                    id
                    symbol
                  }
                }
                owner
                origin
                amount0
                amount1
                amountUSD
              }
            }
          }
        `,
      }),
    }),
  }),
})
