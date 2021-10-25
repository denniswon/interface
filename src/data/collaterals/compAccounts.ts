import {
  CompAccountsApiErrorCode,
  COMPOUND_ACCOUNTS_API_ENDPOINT,
  DEFAULT_ACCOUNTS_PAGE_SIZE,
} from 'constants/compound'
import axios from 'data/axios'
import { CompAccountData } from 'state/collaterals/reducer'
import { compoundNetworkName } from 'utils/network'

interface AccountsRequest {
  addresses?: string[]
  block_number?: number
  block_timestamp?: number
  max_health?: { value: string }
  min_borrow_value_in_eth?: { value: string }
  network?: string
  page_number?: number
  page_size?: number
}

export interface PaginationSummary {
  page_number: number
  page_size: number
  total_entries: number
  total_pages: number
}

export interface AccountsResponse {
  error: CompAccountsApiErrorCode
  request: AccountsRequest
  pagination_summary?: PaginationSummary
  accounts: CompAccountData[]
}

export async function fetchCompAccountsData(
  chainId?: number,
  max_health?: number,
  page_number?: number,
  page_size?: number
): Promise<AccountsResponse> {
  const request: AccountsRequest = {
    addresses: undefined,
    block_number: 0,
    block_timestamp: 0,
    max_health: { value: `${max_health || 1.0}` },
    min_borrow_value_in_eth: undefined,
    network: compoundNetworkName(chainId) || undefined,
    page_number,
    page_size: page_size || DEFAULT_ACCOUNTS_PAGE_SIZE,
  }

  try {
    return await axios.post<AccountsResponse>(COMPOUND_ACCOUNTS_API_ENDPOINT, request)
  } catch (e) {
    return {
      error: CompAccountsApiErrorCode.INTERNAL_ERROR,
      request,
      accounts: [],
    }
  }
}
