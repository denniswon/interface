export const COMPOUND_ACCOUNTS_API_ENDPOINT = 'https://api.compound.finance/api/v2/account'

export const DEFAULT_ACCOUNTS_PAGE_SIZE = 100

export enum CompAccountsApiErrorCode {
  NO_ERROR = 0,
  INTERNAL_ERROR = 1,
  INVALID_PAGE_NUMBER = 2,
  INVALID_PAGE_SIZE = 3,
}
