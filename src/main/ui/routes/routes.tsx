import { Routes, Route } from '@solidjs/router'
import { lazy } from 'solid-js'
import { Home } from '../../../home/ui'

const Customers = lazy(async () => import('../../../customer/ui/list/ListCustomers'))

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/customers" component={Customers} />
      <Route path="/" component={Home} />
    </Routes>
  )
}
