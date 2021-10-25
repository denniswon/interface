import { useEffect } from 'react'
import { useActiveNetworkVersion } from 'state/application/hooks'

import { useUpdateCompAccountChartEntries } from './hooks'

export default function Updater() {
  const [activeNetwork] = useActiveNetworkVersion()
  const updateCompAccountChartEntries = useUpdateCompAccountChartEntries()
  useEffect(() => {
    updateCompAccountChartEntries()
  }, [updateCompAccountChartEntries, activeNetwork])
  return null
}
