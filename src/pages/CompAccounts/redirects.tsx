import { Redirect, RouteComponentProps } from 'react-router-dom'

// Redirects to collaterals but only replace the pathname
export function RedirectPathToCollateralsOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/collaterals' }} />
}
