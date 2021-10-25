import { DarkGreyCard } from 'components/Card'
import CompAccountsTable from 'components/collaterals/CompAccountsTable'
import { AutoColumn } from 'components/Column'
import { useEffect } from 'react'
import { useCompAccountChartEntries } from 'state/collaterals/hooks'
import { CompAccountChartEntry } from 'state/collaterals/reducer'
import { TYPE } from 'theme'

import { PageWrapper } from './styled'

export default function CompoundOverview() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const accounts = useCompAccountChartEntries()
  const loggedInCompAccount: CompAccountChartEntry[] = [] // TODO fetch logged in comp account

  return (
    <PageWrapper>
      <AutoColumn gap="lg">
        <TYPE.main>Your Collaterals</TYPE.main>
        {loggedInCompAccount.length > 0 ? (
          <CompAccountsTable accounts={loggedInCompAccount} />
        ) : (
          <DarkGreyCard>
            <TYPE.main>Your collaterals will appear here</TYPE.main>
          </DarkGreyCard>
        )}
        <TYPE.main>Accounts In Danger</TYPE.main>
        <CompAccountsTable accounts={accounts} />
      </AutoColumn>
    </PageWrapper>
  )
}
