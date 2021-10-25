import { createAction } from '@reduxjs/toolkit'
import { PaginationSummary } from 'data/collaterals/compAccounts'

import { CompAccountData } from './reducer'

export const updateCompAccountsData = createAction<{
  compAccounts: CompAccountData[]
  chainId?: number
}>('compAccount/updateCompAccountsData')

export const updatePaginationSummary = createAction<{
  paginationSummary: PaginationSummary
  chainId?: number
}>('compAccount/updatePaginationSummary')
