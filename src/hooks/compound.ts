// eslint-disable-next-line @typescript-eslint/no-var-requires
const Compound = require('@compound-finance/compound-js')
import { useEffect, useState } from 'react'
import { CompoundInstance } from 'types/compound'
import { compoundNetworkName } from 'utils/network'

import { useActiveWeb3React } from './web3'

export function useCompound(): CompoundInstance | null {
  const { account, chainId } = useActiveWeb3React()

  const [compound, setCompound] = useState<CompoundInstance | null>(null)

  useEffect(() => {
    if (!chainId || !account) {
      setCompound(null)
      return
    }
    const network: string | null = compoundNetworkName(chainId)
    if (!network) {
      setCompound(null)
      return
    }

    setCompound(new Compound(window.ethereum))
  }, [account, chainId])

  return compound
}
