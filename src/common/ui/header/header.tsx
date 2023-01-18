import './header.css'
import { Show } from 'solid-js'
import { parseToken, setTokenData, TokenData, tokenData } from '../../../token/data'
import { TokenModal } from '../../../token/ui'
import { XIcon } from '../icons'
import { LocalStorageAccess } from '../../infra/storage'

export function Header() {
  let tokenModalRef!: HTMLDialogElement
  
  function openTokenModal(event: Event) {
    if (event.target !== event.currentTarget) return
    tokenModalRef.show()
  }

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
          <div class="token-data-display" onClick={openTokenModal}>
            {tokenData()?.environment}: 
            {tokenData()?.organizationSlug} / 
            {tokenData()?.enterpriseSlug}
            
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
        onFinish={({ environment, token, saveInStorage }) => {
          const tokenData = {
            environment,
            ...parseToken(token)
          }
          setTokenData(tokenData)
          LocalStorageAccess.set('current-token', tokenData)

          if (!saveInStorage) return

          const tokens = LocalStorageAccess.get<TokenData[]>('tokens')
          const alreadyExists = tokens?.find(
            token => token.enterpriseId === tokenData.enterpriseId
          )

          if (alreadyExists) return

          LocalStorageAccess.addIn('tokens', tokenData)
        }}
      />
    </>
  )
}
