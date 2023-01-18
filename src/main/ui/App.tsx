import { createEffect } from 'solid-js'
import { Header } from '../../common/ui'
import { checkCurrentToken } from '../../token/data/check-current-token'
import './App.css'

function App() {
  createEffect(() => checkCurrentToken())

  return (
    <Header />
  )
}

export default App
