import './App.css'
import { onMount } from 'solid-js'
import { Header } from '../../common/ui'
import { checkCurrentToken } from '../../token/data/check-current-token'
import { AppRoutes } from './routes'
import { Router } from '@solidjs/router'

function App() {
  onMount(() => checkCurrentToken())

  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  )
}

export default App
