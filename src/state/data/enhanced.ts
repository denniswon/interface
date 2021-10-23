import { api as generatedApi } from './generated'

// tag that should be applied to queries that need to be invalidated when the chain changes
export const CHAIN_TAG = 'Chain'

// enhanced api to provide/invalidate tags
export const api = generatedApi.enhanceEndpoints({
  addTagTypes: [CHAIN_TAG],
  endpoints: {
    allV3Ticks: {
      providesTags: [CHAIN_TAG],
    },
    feeTierDistribution: {
      providesTags: [CHAIN_TAG],
    },
    tokensBulk: {
      providesTags: [CHAIN_TAG],
    },
    topTokens: {
      providesTags: [CHAIN_TAG],
    },
    tokenDayDatas: {
      providesTags: [CHAIN_TAG],
    },
    tokenHourDatas: {
      providesTags: [CHAIN_TAG],
    },
    tokenSearch: {
      providesTags: [CHAIN_TAG],
    },
    poolDayDatas: {
      providesTags: [CHAIN_TAG],
    },
    topPools: {
      providesTags: [CHAIN_TAG],
    },
    poolsBulk: {
      providesTags: [CHAIN_TAG],
    },
    poolsForToken: {
      providesTags: [CHAIN_TAG],
    },
    poolForToken: {
      providesTags: [CHAIN_TAG],
    },
    transactions: {
      providesTags: [CHAIN_TAG],
    },
    poolTransactions: {
      providesTags: [CHAIN_TAG],
    },
    surroundingTicks: {
      providesTags: [CHAIN_TAG],
    },
    poolsSearch: {
      providesTags: [CHAIN_TAG],
    },
    uniswapDayData: {
      providesTags: [CHAIN_TAG],
    },
    uniswapFactories: {
      providesTags: [CHAIN_TAG],
    },
    topTransactions: {
      providesTags: [CHAIN_TAG],
    },
  },
})

export const {
  useAllV3TicksQuery,
  useFeeTierDistributionQuery,
  useTokensBulkQuery,
  useTopTokensQuery,
  useTokenDayDatasQuery,
  useTokenHourDatasQuery,
  useTokenSearchQuery,
  usePoolDayDatasQuery,
  useTopPoolsQuery,
  usePoolsBulkQuery,
  usePoolsForTokenQuery,
  usePoolForTokenQuery,
  useTransactionsQuery,
  usePoolTransactionsQuery,
  useSurroundingTicksQuery,
  usePoolsSearchQuery,
  useUniswapDayDataQuery,
  useUniswapFactoriesQuery,
  useTopTransactionsQuery,

  useLazyAllV3TicksQuery,
  useLazyFeeTierDistributionQuery,
  useLazyTopTokensQuery,
  useLazyTokenDayDatasQuery,
  useLazyTokenHourDatasQuery,
  useLazyTokenSearchQuery,
  useLazyPoolDayDatasQuery,
  useLazyTopPoolsQuery,
  useLazyPoolsBulkQuery,
  useLazyPoolsForTokenQuery,
  useLazyPoolForTokenQuery,
  useLazyTransactionsQuery,
  useLazyPoolTransactionsQuery,
  useLazySurroundingTicksQuery,
  useLazyPoolsSearchQuery,
  useLazyUniswapDayDataQuery,
  useLazyUniswapFactoriesQuery,
  useLazyTopTransactionsQuery,
} = api
