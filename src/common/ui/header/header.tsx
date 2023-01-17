import './header.css'
import { Show } from 'solid-js'
import { parseToken, setTokenData, TokenData, tokenData } from '../../../token/data'
import { TokenModal } from '../../../token/ui'
import { XIcon } from '../icons'
import { LocalStorageAccess } from '../../infra/storage'

export function Header() {
  let tokenModalRef!: HTMLDialogElement
  const openTokenModal = () => tokenModalRef.show()
  function removeTokenData() {
    setTokenData()
    LocalStorageAccess.delete('current-token')
  }

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
        onFinish={({ token, saveInStorage }) => {
          const tokenData = parseToken(token)
          setTokenData(tokenData)
          LocalStorageAccess.set('current-token', tokenData)

          if (!saveInStorage) return

          const tokens = LocalStorageAccess.get<TokenData[]>('tokens')
          const alreadyExists = tokens?.find(
            token => token.enterpriseId === tokenData.enterpriseId
          )

          console.log({ alreadyExists })

          if (alreadyExists) return

          LocalStorageAccess.addIn('tokens', tokenData)
        }}
      />
    </>
  )
}
