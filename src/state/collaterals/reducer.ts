import { createReducer } from '@reduxjs/toolkit'
import { CompoundChainId } from 'constants/chains'
import { PaginationSummary } from 'data/collaterals/compAccounts'

import { currentTimestamp } from './../../utils'
import { updateCompAccountsData, updatePaginationSummary } from './actions'

export interface CValue {
  value: string
}

export interface CTokenData {
  address: string
  borrow_balance_underlying: CValue
  lifetime_borrow_interest_accrued: CValue
  lifetime_supply_interest_accrued: CValue
  supply_balance_underlying: CValue
}

export interface CompAccountData {
  address: string
  block_updated?: number
  health?: CValue
  tokens: CTokenData[]
  total_borrow_value_in_eth: CValue
  total_collateral_value_in_eth: CValue
}

export interface CompAccountChartEntry {
  data: CompAccountData
  lastUpdated: number
}

export interface CompAccountsData {
  [address: string]: CompAccountChartEntry
}

export interface CompAccountsState {
  compAccountsMap: {
    [chainId: number]: CompAccountsData
  }

  compAccounts: {
    [chainId: number]: CompAccountChartEntry[]
  }

  paginationSummary: {
    [chainId: number]: PaginationSummary | null
  }
}

export const initialState: CompAccountsState = {
  compAccountsMap: {
    [CompoundChainId.MAINNET]: {},
    [CompoundChainId.RINKEBY]: {},
    [CompoundChainId.ROPSTEN]: {},
  },

  compAccounts: {
    [CompoundChainId.MAINNET]: [],
    [CompoundChainId.RINKEBY]: [],
    [CompoundChainId.ROPSTEN]: [],
  },

  paginationSummary: {
    [CompoundChainId.MAINNET]: null,
    [CompoundChainId.RINKEBY]: null,
    [CompoundChainId.ROPSTEN]: null,
  },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(updateCompAccountsData, (state, { payload: { compAccounts, chainId = CompoundChainId.MAINNET } }) => {
      compAccounts.forEach((compAccountData: CompAccountData) => {
        if (!state.compAccountsMap[chainId]) return
        const entry: CompAccountChartEntry = {
          data: compAccountData,
          lastUpdated: currentTimestamp(),
        }
        state.compAccountsMap[chainId][compAccountData.address] = entry
        state.compAccounts[chainId].push(entry)
      })
    })
    .addCase(
      updatePaginationSummary,
      (state, { payload: { paginationSummary, chainId = CompoundChainId.MAINNET } }) => {
        if (!state.compAccountsMap[chainId]) return
        state.paginationSummary[chainId] = paginationSummary
      }
    )
)
