import { createAction } from '@reduxjs/toolkit'
import { SupportedNetwork } from 'constants/networks'
import { ChartDayData, Transaction } from 'types'

import { ProtocolData } from './reducer'

// protocol wide info
export const updateProtocolData =
  createAction<{ protocolData: ProtocolData; networkId: SupportedNetwork }>('protocol/updateProtocolData')
export const updateChartData =
  createAction<{ chartData: ChartDayData[]; networkId: SupportedNetwork }>('protocol/updateChartData')
export const updateTransactions =
  createAction<{ transactions: Transaction[]; networkId: SupportedNetwork }>('protocol/updateTransactions')
