import './header.css'
import { Show } from 'solid-js'
import { parseToken, setCurrentToken, TokenData, currentToken } from '../../../token/data'
import { TokenModal } from '../../../token/ui'
import { XIcon } from '../icons'
import { LocalStorageAccess } from '../../infra/storage'
import { useNavigate } from '@solidjs/router'

export function Header() {
  let tokenModalRef!: HTMLDialogElement
  const navigate = useNavigate()
  
  function openTokenModal(event: Event) {
    if (event.target !== event.currentTarget) return
    tokenModalRef.show()
  }

  function removeTokenData() {
    setCurrentToken()
    LocalStorageAccess.delete('current-token')
  }

  const changeTokenButton = <button onClick={openTokenModal}>
    Set Token
  </button>

  return (
    <>
      <header class="header">
        <h1 onClick={() => navigate('/')}>
          Retrograde Mercury
        </h1>
        <Show when={currentToken()} fallback={changeTokenButton}>
          <div class="token-data-display" onClick={openTokenModal}>
            {currentToken()?.environment}: 
            {currentToken()?.organizationSlug} / 
            {currentToken()?.enterpriseSlug}
            
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
          setCurrentToken(tokenData)
          LocalStorageAccess.set('current-token', tokenData)

          if (!saveInStorage) return

          const tokens = LocalStorageAccess.get<TokenData[]>('tokens')
          const alreadyExists = tokens?.find(
            token => token.enterpriseId === tokenData.enterpriseId
              && token.environment === tokenData.environment
          )

          if (alreadyExists) return

          LocalStorageAccess.addIn('tokens', tokenData)
        }}
      />
    </>
  )
}
