import { DarkGreyCard, GreyBadge } from 'components/Card'
import { AutoColumn } from 'components/Column'
import Loader, { LoadingRows } from 'components/Loader'
import { RowFixed } from 'components/Row'
import { Arrow, Break, PageButtons } from 'components/shared'
import { ClickableText, Label } from 'components/Text'
import useTheme from 'hooks/useTheme'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CompAccountChartEntry } from 'state/collaterals/reducer'
import { formatCValue } from 'state/collaterals/utils'
import styled from 'styled-components/macro'
import { TYPE } from 'theme'

const Wrapper = styled(DarkGreyCard)`
  width: 100%;
`

const ResponsiveGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;

  grid-template-columns: 20px 3.5fr repeat(3, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 1.5fr repeat(2, 1fr);
    & :nth-child(3) {
      display: none;
    }
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: 20px 1.5fr repeat(1, 1fr);
    & :nth-child(5) {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 2.5fr repeat(1, 1fr);
    > *:nth-child(1) {
      display: none;
    }
  }
`

const LinkWrapper = styled(Link)`
  text-decoration: none;
  :hover {
    cursor: pointer;
    opacity: 0.7;
  }
`

const DataRow = ({ account, index }: { account: CompAccountChartEntry; index: number }) => {
  return (
    <LinkWrapper to={'collaterals/' + account.data.address}>
      <ResponsiveGrid>
        <Label fontWeight={400}>{index + 1}</Label>
        <Label fontWeight={400}>
          <RowFixed>
            <TYPE.label ml="8px">{account.data.address}</TYPE.label>
            <GreyBadge ml="10px" fontSize="14px">
              {account.data.health ? formatCValue(account.data.health) : 'NaN'}
            </GreyBadge>
          </RowFixed>
        </Label>
        <Label end={1} fontWeight={400}>
          {formatCValue(account.data.total_borrow_value_in_eth)}
        </Label>
        <Label end={1} fontWeight={400}>
          {formatCValue(account.data.total_collateral_value_in_eth)}
        </Label>
      </ResponsiveGrid>
    </LinkWrapper>
  )
}

const MAX_ITEMS = 10

export default function CompAccountsTable({
  accounts,
  maxItems = MAX_ITEMS,
}: {
  accounts: CompAccountChartEntry[]
  maxItems?: number
}) {
  // theming
  const theme = useTheme()
  // pagination
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  useEffect(() => {
    let extraPages = 1
    if (accounts.length % maxItems === 0) {
      extraPages = 0
    }
    setMaxPage(Math.floor(accounts.length / maxItems) + extraPages)
  }, [maxItems, accounts])

  if (!accounts) {
    return <Loader />
  }

  const pageAccounts = accounts.slice(page - 1, page + MAX_ITEMS - 1)

  return (
    <Wrapper>
      {pageAccounts.length > 0 ? (
        <AutoColumn gap="16px">
          <ResponsiveGrid>
            <Label color={theme.text2}>#</Label>
            <ClickableText color={theme.text2}>Address</ClickableText>
            {/* <ClickableText color={theme.text2}>Tokens</ClickableText> */}
            <ClickableText color={theme.text2}>Total Borrowed (ETH)</ClickableText>
            <ClickableText color={theme.text2}>Total Collateral (ETH)</ClickableText>
          </ResponsiveGrid>
          <Break />
          {pageAccounts.map((account, i) => {
            if (account) {
              return (
                <React.Fragment key={i}>
                  <DataRow index={(page - 1) * MAX_ITEMS + i} account={account} />
                  <Break />
                </React.Fragment>
              )
            }
            return null
          })}
          <PageButtons>
            <div
              onClick={() => {
                setPage(page === 1 ? page : page - 1)
              }}
            >
              <Arrow faded={page === 1 ? true : false}>←</Arrow>
            </div>
            <TYPE.body>{'Page ' + page + ' of ' + maxPage}</TYPE.body>
            <div
              onClick={() => {
                setPage(page === maxPage ? page : page + 1)
              }}
            >
              <Arrow faded={page === maxPage ? true : false}>→</Arrow>
            </div>
          </PageButtons>
        </AutoColumn>
      ) : (
        <LoadingRows>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </LoadingRows>
      )}
    </Wrapper>
  )
}
