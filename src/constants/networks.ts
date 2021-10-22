import ARBITRUM_LOGO_URL from '../assets/images/arbitrum.svg'
import ETHEREUM_LOGO_URL from '../assets/images/ethereum-logo.png'
import OPTIMISM_LOGO_URL from '../assets/images/optimism.svg'
import { SupportedChainId } from './chains'

export enum SupportedNetwork {
  ETHEREUM,
  RINKEBY,
  ARBITRUM,
  OPTIMISM,
}

export type NetworkInfo = {
  id: SupportedNetwork
  chainId: number
  route: string
  name: string
  imageURL: string
  bgColor: string
  primaryColor: string
  secondaryColor: string
  blurb?: string
}

export const EthereumNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.ETHEREUM,
  chainId: SupportedChainId.MAINNET,
  route: '',
  name: 'Ethereum',
  bgColor: '#fc077d',
  primaryColor: '#fc077d',
  secondaryColor: '#2172E5',
  imageURL: ETHEREUM_LOGO_URL,
}

export const RinkebyNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.RINKEBY,
  chainId: SupportedChainId.RINKEBY,
  route: '',
  name: 'Rinkeby',
  bgColor: '#fc077d',
  primaryColor: '#fc077d',
  secondaryColor: '#2172E5',
  imageURL: ETHEREUM_LOGO_URL,
}

export const ArbitrumNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.ARBITRUM,
  chainId: SupportedChainId.ARBITRUM_ONE,
  route: 'arbitrum',
  name: 'Arbitrum',
  imageURL: ARBITRUM_LOGO_URL,
  bgColor: '#0A294B',
  primaryColor: '#0490ED',
  secondaryColor: '#96BEDC',
  blurb: 'L2 Beta',
}

export const OptimismNetworkInfo: NetworkInfo = {
  id: SupportedNetwork.OPTIMISM,
  chainId: SupportedChainId.OPTIMISM,
  route: 'optimism',
  name: 'OΞ (Optimism)',
  bgColor: '#F01B36',
  primaryColor: '#F01B36',
  secondaryColor: '#FB7876',
  imageURL: OPTIMISM_LOGO_URL,
  blurb: 'L2 Beta',
}

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [
  EthereumNetworkInfo,
  RinkebyNetworkInfo,
  OptimismNetworkInfo,
  ArbitrumNetworkInfo,
]

export const SUBGRAPH_SUPPORTED_NETWORKS: { [key: number]: NetworkInfo } = {
  [SupportedChainId.MAINNET]: EthereumNetworkInfo,
  [SupportedChainId.RINKEBY]: RinkebyNetworkInfo,
  [SupportedChainId.OPTIMISM]: OptimismNetworkInfo,
  [SupportedChainId.ARBITRUM_ONE]: ArbitrumNetworkInfo,
}
