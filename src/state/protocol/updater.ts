import { useFetchGlobalChartData } from 'data/protocol/chart'
import { useFetchProtocolData } from 'data/protocol/overview'
import { fetchTopTransactions } from 'data/protocol/transactions'
import { useEffect } from 'react'
import { useClients } from 'state/application/hooks'

import { useProtocolChartData, useProtocolData, useProtocolTransactions } from './hooks'

export default function Updater(): null {
  // client for data fetching
  const { dataClient } = useClients()

  const [protocolData, updateProtocolData] = useProtocolData()
  const { data: fetchedProtocolData, error, loading } = useFetchProtocolData()

  const [chartData, updateChartData] = useProtocolChartData()
  const { data: fetchedChartData, error: chartError } = useFetchGlobalChartData()

  const [transactions, updateTransactions] = useProtocolTransactions()

  // update overview data if available and not set
  useEffect(() => {
    if (protocolData === undefined && fetchedProtocolData && !loading && !error) {
      updateProtocolData(fetchedProtocolData)
    }
  }, [error, fetchedProtocolData, loading, protocolData, updateProtocolData])

  // update global chart data if available and not set
  useEffect(() => {
    if (chartData === undefined && fetchedChartData && !chartError) {
      updateChartData(fetchedChartData)
    }
  }, [chartData, chartError, fetchedChartData, updateChartData])

  useEffect(() => {
    async function fetch() {
      const data = await fetchTopTransactions(dataClient)
      if (data) {
        updateTransactions(data)
      }
    }
    if (!transactions) {
      fetch()
    }
  }, [transactions, updateTransactions, dataClient])

  return null
}
