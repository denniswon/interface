import { GreyBadge, GreyCard, ScrollableX } from 'components/Card'
import { AutoColumn } from 'components/Column'
import DoubleCurrencyAddressLogo from 'components/DoubleCurrencyAddressLogo'
import HoverInlineText from 'components/HoverInlineText'
import Loader from 'components/Loader'
import Percent from 'components/Percent'
import { RowFixed } from 'components/Row'
import { useMemo } from 'react'
import { useAllPoolData } from 'state/pools/hooks'
import { PoolData } from 'state/pools/reducer'
import styled from 'styled-components/macro'
import { StyledInternalLink, TYPE } from 'theme'
import { feeTierPercent } from 'utils'
import { formatDollarAmount } from 'utils/numbers'

const Container = styled(StyledInternalLink)`
  min-width: 210px;
  margin-right: 16px;

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const Wrapper = styled(GreyCard)`
  padding: 12px;
`

const DataCard = ({ poolData }: { poolData: PoolData }) => {
  return (
    <Container to={'pools/' + poolData.address}>
      <Wrapper>
        <AutoColumn gap="sm">
          <RowFixed>
            <DoubleCurrencyAddressLogo address0={poolData.token0.address} address1={poolData.token1.address} size={16} />
            <TYPE.label ml="8px">
              <HoverInlineText maxCharacters={10} text={`${poolData.token0.symbol}/${poolData.token1.symbol}`} />
            </TYPE.label>
            <GreyBadge ml="10px" fontSize="12px">
              {feeTierPercent(poolData.feeTier)}
            </GreyBadge>
          </RowFixed>
          <RowFixed>
            <TYPE.label mr="6px">{formatDollarAmount(poolData.volumeUSD)}</TYPE.label>
            <Percent fontSize="14px" value={poolData.volumeUSDChange} />
          </RowFixed>
        </AutoColumn>
      </Wrapper>
    </Container>
  )
}

export default function TopPoolMovers() {
  const allPools = useAllPoolData()

  const topVolume = useMemo(() => {
    return Object.values(allPools)
      .sort(({ data: a }, { data: b }) => {
        return a && b ? (a?.volumeUSDChange > b?.volumeUSDChange ? -1 : 1) : -1
      })
      .slice(0, Math.min(20, Object.values(allPools).length))
  }, [allPools])

  if (Object.keys(allPools).length === 0) {
    return <Loader />
  }

  return (
    <ScrollableX>
      {topVolume.map((entry) =>
        entry.data ? <DataCard key={'top-card-pool-' + entry.data.address} poolData={entry.data} /> : null
      )}
    </ScrollableX>
  )
}
