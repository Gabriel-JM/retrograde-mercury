import { Routes, Route } from '@solidjs/router'
import { Home } from '../../../home/ui'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" component={Home} />
    </Routes>
  )
}
