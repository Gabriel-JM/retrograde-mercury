import { Header } from '../../common/ui'
import { checkCurrentToken } from '../../token/data/check-current-token'
import './App.css'

function App() {
  checkCurrentToken()

  return (
    <Header />
  )
}

export default App
