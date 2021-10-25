import { CompoundChainId } from 'constants/chains'
import { AccountsResponse, fetchCompAccountsData, PaginationSummary } from 'data/collaterals/compAccounts'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateCompAccountsData, updatePaginationSummary } from 'state/collaterals/actions'

import { AppDispatch, AppState } from './../index'
import { CompAccountChartEntry, CompAccountData, CompAccountsData } from './reducer'

export function useCompAccountsData(): CompAccountsData {
  const { chainId } = useActiveWeb3React()
  return useSelector((state: AppState) => (chainId ? state.collaterals.compAccounts[chainId] || {} : {}))
}

export function useUpdateCompAccountsData(): (compAccounts: CompAccountData[]) => void {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  return useCallback(
    (compAccounts: CompAccountData[]) => dispatch(updateCompAccountsData({ compAccounts, chainId })),
    [dispatch, chainId]
  )
}

export function usePaginationSummary(): PaginationSummary | null {
  const { chainId } = useActiveWeb3React()
  return useSelector((state: AppState) => state.collaterals.paginationSummary[chainId || CompoundChainId.MAINNET])
}

export function useUpdatePaginationSummary(): (paginationSummary: PaginationSummary) => void {
  const dispatch = useDispatch<AppDispatch>()
  const { chainId } = useActiveWeb3React()
  return useCallback(
    (paginationSummary: PaginationSummary) => dispatch(updatePaginationSummary({ paginationSummary, chainId })),
    [dispatch, chainId]
  )
}

export function useCompAccountChartEntries(): CompAccountChartEntry[] {
  const { chainId } = useActiveWeb3React()
  return useSelector((state: AppState) => (chainId ? state.collaterals.compAccounts[chainId] || [] : []))
}

export function useUpdateCompAccountChartEntries(): () => void {
  const { chainId } = useActiveWeb3React()
  const updateCompAccountsData = useUpdateCompAccountsData()
  const updatePaginationSummary = useUpdatePaginationSummary()

  return useCallback(() => {
    const fetch = async () => {
      const res: AccountsResponse = await fetchCompAccountsData(chainId)
      updateCompAccountsData(res.accounts)
      if (res.pagination_summary) {
        updatePaginationSummary(res.pagination_summary)
      }
    }
    fetch()
  }, [updateCompAccountsData, updatePaginationSummary, chainId])
}
