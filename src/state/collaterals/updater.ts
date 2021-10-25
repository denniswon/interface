import { useActiveWeb3React } from 'hooks/web3'
import { useEffect } from 'react'

import { useUpdateCompAccountChartEntries } from './hooks'

export default function Updater() {
  const { chainId } = useActiveWeb3React()
  const updateCompAccountChartEntries = useUpdateCompAccountChartEntries()
  useEffect(() => {
    updateCompAccountChartEntries()
  }, [updateCompAccountChartEntries, chainId])
  return null
}
