import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { DEFAULT_TXN_DISMISS_MS } from 'constants/misc'
import { NetworkInfo, SupportedNetwork } from 'constants/networks'
import { useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import {
  arbitrumBlockClient,
  arbitrumClient,
  blockClient,
  client,
  optimismBlockClient,
  optimismClient,
} from '../../apollo/client'
import { useActiveWeb3React } from '../../hooks/web3'
import { AppState } from '../index'
import {
  addPopup,
  ApplicationModal,
  PopupContent,
  removePopup,
  setOpenModal,
  updateActiveNetworkVersion,
} from './reducer'

export function useBlockNumber(): number | undefined {
  const { chainId } = useActiveWeb3React()

  return useAppSelector((state: AppState) => state.application.blockNumber[chainId ?? -1])
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const openModal = useAppSelector((state: AppState) => state.application.openModal)
  return openModal === modal
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal)
  const dispatch = useAppDispatch()
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open])
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET)
}

export function useToggleSettingsMenu(): () => void {
  return useToggleModal(ApplicationModal.SETTINGS)
}

export function useShowClaimPopup(): boolean {
  return useModalOpen(ApplicationModal.CLAIM_POPUP)
}

export function useToggleShowClaimPopup(): () => void {
  return useToggleModal(ApplicationModal.CLAIM_POPUP)
}

export function useToggleSelfClaimModal(): () => void {
  return useToggleModal(ApplicationModal.SELF_CLAIM)
}

export function useToggleDelegateModal(): () => void {
  return useToggleModal(ApplicationModal.DELEGATE)
}

export function useToggleVoteModal(): () => void {
  return useToggleModal(ApplicationModal.VOTE)
}

// returns a function that allows adding a popup
export function useAddPopup(): (content: PopupContent, key?: string, removeAfterMs?: number) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (content: PopupContent, key?: string, removeAfterMs?: number) => {
      dispatch(addPopup({ content, key, removeAfterMs: removeAfterMs ?? DEFAULT_TXN_DISMISS_MS }))
    },
    [dispatch]
  )
}

// returns a function that allows removing a popup via its key
export function useRemovePopup(): (key: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }))
    },
    [dispatch]
  )
}

// get the list of active popups
export function useActivePopups(): AppState['application']['popupList'] {
  const list = useAppSelector((state: AppState) => state.application.popupList)
  return useMemo(() => list.filter((item) => item.show), [list])
}

// returns a function that allows adding a popup
export function useActiveNetworkVersion(): [NetworkInfo, (activeNetworkVersion: NetworkInfo) => void] {
  const dispatch = useAppDispatch()
  const activeNetwork = useAppSelector((state: AppState) => state.application.activeNetworkVersion)
  const update = useCallback(
    (activeNetworkVersion: NetworkInfo) => {
      dispatch(updateActiveNetworkVersion({ activeNetworkVersion }))
    },
    [dispatch]
  )
  return [activeNetwork, update]
}

// get the apollo client related to the active network
export function useDataClient(): ApolloClient<NormalizedCacheObject> {
  const [activeNetwork] = useActiveNetworkVersion()
  switch (activeNetwork.id) {
    case SupportedNetwork.ETHEREUM:
      return client
    case SupportedNetwork.ARBITRUM:
      return arbitrumClient
    case SupportedNetwork.OPTIMISM:
      return optimismClient
    default:
      return client
  }
}

// get the apollo client related to the active network for fetching blocks
export function useBlockClient(): ApolloClient<NormalizedCacheObject> {
  const [activeNetwork] = useActiveNetworkVersion()
  switch (activeNetwork.id) {
    case SupportedNetwork.ETHEREUM:
      return blockClient
    case SupportedNetwork.ARBITRUM:
      return arbitrumBlockClient
    case SupportedNetwork.OPTIMISM:
      return optimismBlockClient
    default:
      return blockClient
  }
}

// Get all required subgraph clients
export function useClients(): {
  dataClient: ApolloClient<NormalizedCacheObject>
  blockClient: ApolloClient<NormalizedCacheObject>
} {
  const dataClient = useDataClient()
  const blockClient = useBlockClient()
  return {
    dataClient,
    blockClient,
  }
}
