import { Header } from '../../common/ui'
import { checkCurrentToken } from '../../token/data/check-current-token'
import './App.css'

function App() {
  setInterval(checkCurrentToken, 50)

  return (
    <Header />
  )
}

export default App
