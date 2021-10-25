import { CompoundChainId, SupportedChainId } from 'constants/chains'
import { EthereumNetworkInfo, NetworkInfo } from 'constants/networks'

export function networkPrefix(activeNewtork: NetworkInfo) {
  const isEthereum = activeNewtork === EthereumNetworkInfo
  if (isEthereum) {
    return '/'
  }
  const prefix = '/' + activeNewtork.route.toLocaleLowerCase() + '/'
  return prefix
}

export type Network = 'ethereum' | 'arbitrum' | 'optimism'

export function chainIdToNetworkName(networkId: SupportedChainId | number): Network | null {
  switch (networkId) {
    case SupportedChainId.MAINNET:
      return 'ethereum'
    case SupportedChainId.ARBITRUM_ONE:
      return 'arbitrum'
    case SupportedChainId.OPTIMISM:
      return 'optimism'
    default:
      return null
  }
}

export function compoundNetworkName(chainId: CompoundChainId | number | undefined): string | null {
  switch (chainId) {
    case CompoundChainId.MAINNET:
      return 'mainnet'
    case CompoundChainId.RINKEBY:
      return 'arbitrum'
    case CompoundChainId.ROPSTEN:
      return 'ropsten'
    default:
      return null
  }
}
