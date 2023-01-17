import { createSignal, Show } from 'solid-js'
import { parseToken } from '../../token/data'
import { TokenModal } from '../../token/ui'
import './App.css'

interface TokenData {
  organizationSlug: string
  enterpriseSlug: string
  enterpriseId: string
}

function App() {
  let tokenModalRef!: HTMLDialogElement
  const [orgData, setOrgData] = createSignal<TokenData>()

  return (
    <div class="app">
      <TokenModal
        ref={tokenModalRef}
        onFinish={({ token }) => setOrgData(parseToken(token))}
      />

      <button onClick={() => tokenModalRef.show()}>Change token</button>

      <Show when={orgData()} fallback={<p>No token being used</p>}>
        <table>
          <caption>Token Data</caption>
          <thead>
            <tr>
              <th>Organization</th>
              <th>Enterprise</th>
              <th>Enterprise Id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orgData()?.organizationSlug}</td>
              <td>{orgData()?.enterpriseSlug}</td>
              <td>{orgData()?.enterpriseId}</td>
            </tr>
          </tbody>
        </table>
      </Show>
    </div>
  )
}

export default App
