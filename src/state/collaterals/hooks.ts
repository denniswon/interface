import { AccountsResponse, fetchCompAccountsData, PaginationSummary } from 'data/collaterals/compAccounts'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveNetworkVersion } from 'state/application/hooks'
import { updateCompAccountsData, updatePaginationSummary } from 'state/collaterals/actions'

import { AppDispatch, AppState } from './../index'
import { CompAccountChartEntry, CompAccountData, CompAccountsData } from './reducer'

export function useCompAccountsData(): CompAccountsData {
  const [activeNetwork] = useActiveNetworkVersion()
  return useSelector((state: AppState) => state.collaterals.compAccountsMap[activeNetwork.chainId] || {})
}

export function useUpdateCompAccountsData(): (compAccounts: CompAccountData[]) => void {
  const dispatch = useDispatch<AppDispatch>()
  const [activeNetwork] = useActiveNetworkVersion()
  return useCallback(
    (compAccounts: CompAccountData[]) =>
      dispatch(updateCompAccountsData({ compAccounts, chainId: activeNetwork.chainId })),
    [dispatch, activeNetwork]
  )
}

export function usePaginationSummary(): PaginationSummary | null {
  const [activeNetwork] = useActiveNetworkVersion()
  return useSelector((state: AppState) => state.collaterals.paginationSummary[activeNetwork.chainId])
}

export function useUpdatePaginationSummary(): (paginationSummary: PaginationSummary) => void {
  const dispatch = useDispatch<AppDispatch>()
  const [activeNetwork] = useActiveNetworkVersion()
  return useCallback(
    (paginationSummary: PaginationSummary) =>
      dispatch(updatePaginationSummary({ paginationSummary, chainId: activeNetwork.chainId })),
    [dispatch, activeNetwork]
  )
}

export function useCompAccountChartEntries(): CompAccountChartEntry[] {
  const [activeNetwork] = useActiveNetworkVersion()
  return useSelector((state: AppState) => state.collaterals.compAccounts[activeNetwork.chainId] || [])
}

export function useUpdateCompAccountChartEntries(): () => void {
  const [activeNetwork] = useActiveNetworkVersion()
  const updateCompAccountsData = useUpdateCompAccountsData()
  const updatePaginationSummary = useUpdatePaginationSummary()

  return useCallback(() => {
    const fetch = async () => {
      const res: AccountsResponse = await fetchCompAccountsData(activeNetwork.chainId)
      updateCompAccountsData(res.accounts)
      if (res.pagination_summary) {
        updatePaginationSummary(res.pagination_summary)
      }
    }
    fetch()
  }, [updateCompAccountsData, updatePaginationSummary, activeNetwork])
}
