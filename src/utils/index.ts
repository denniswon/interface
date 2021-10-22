import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { Token } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { ArbitrumNetworkInfo, NetworkInfo, OptimismNetworkInfo } from 'constants/networks'

import { TokenAddressMap } from '../state/lists/hooks'

export const currentTimestamp = () => new Date().getTime()

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

// account is not optional
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(tokenAddressMap: TokenAddressMap, token?: Token): boolean {
  return Boolean(token?.isToken && tokenAddressMap[token.chainId]?.[token.address])
}

export function formattedFeeAmount(feeAmount: FeeAmount): number {
  return feeAmount / 10000
}

export function feeTierPercent(fee: number): string {
  return (fee / 10000).toPrecision(1) + '%'
}

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined
}

const ETHERSCAN_PREFIXES: { [key: number]: string } = {
  1: '',
  3: 'ropsten.',
  4: 'rinkeby.',
  5: 'goerli.',
  42: 'kovan.',
}

export function getEtherscanLink(
  chainId: number,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block',
  networkVersion: NetworkInfo
): string {
  const prefix =
    networkVersion === ArbitrumNetworkInfo
      ? 'https://arbiscan.io/'
      : networkVersion === OptimismNetworkInfo
      ? 'https://optimistic.etherscan.io'
      : `https://${ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]}etherscan.io`

  if (networkVersion === OptimismNetworkInfo) {
    switch (type) {
      case 'transaction': {
        return `${prefix}/tx/${data}`
      }
      case 'token': {
        return `${prefix}/address/${data}`
      }
      case 'block': {
        return `https://optimistic.etherscan.io`
      }
      case 'address':
      default: {
        return `${prefix}/address/${data}`
      }
    }
  }

  if (networkVersion === ArbitrumNetworkInfo) {
    switch (type) {
      case 'transaction': {
        return `${prefix}/tx/${data}`
      }
      case 'token': {
        return `${prefix}/address/${data}`
      }
      case 'block': {
        return 'https://arbiscan.io/'
      }
      case 'address':
      default: {
        return `${prefix}/address/${data}`
      }
    }
  }

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`
    }
    case 'token': {
      return `${prefix}/token/${data}`
    }
    case 'block': {
      return `${prefix}/block/${data}`
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`
    }
  }
}
