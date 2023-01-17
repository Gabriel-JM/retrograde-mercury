import './header.css'
import { Show } from 'solid-js'
import { parseToken, setTokenData, tokenData } from '../../token/data'
import { TokenModal } from '../../token/ui'
import { XIcon } from './icons'

export function Header() {
  let tokenModalRef!: HTMLDialogElement
  const openTokenModal = () => tokenModalRef.show()
  const removeTokenData = () => setTokenData()

  const changeTokenButton = <button onClick={openTokenModal}>
    Set Token
  </button>

  return (
    <>
      <header class="header">
        <h1>Retrograde Mercury</h1>
        <Show when={tokenData()} fallback={changeTokenButton}>
          <div class="token-data-display">
            <span onClick={openTokenModal}>
              {tokenData()?.organizationSlug} / {tokenData()?.enterpriseSlug}
            </span>
            <span
              class="remove-token-btn"
              onClick={removeTokenData}
            >
              <XIcon />
            </span>
          </div>
        </Show>
      </header>

      <TokenModal
        ref={tokenModalRef}
        onFinish={({ token }) => setTokenData(parseToken(token))}
      />
    </>
  )
}
