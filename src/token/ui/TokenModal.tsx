import './token-modal.css'
import { createSignal, For, onMount, Show } from 'solid-js'
import { LocalStorageAccess } from '../../common/infra/storage'
import { setCurrentToken, currentToken, TokenData } from '../data'
import { TrashIcon } from '../../common/ui'

interface TokenModalProps {
  ref: HTMLDialogElement
  onFinish: (data: {
    environment: string,
    token: string,
    saveInStorage: boolean
  }) => void
}

export function TokenModal(props: TokenModalProps) {
  let formRef: HTMLFormElement
  const [error, setError] = createSignal('')
  const [tokens, setTokens] = createSignal<TokenData[] | null>(null)

  const tokensInStorage = () => tokens()?.filter(token => {
    return !(
      token.enterpriseId === currentToken()?.enterpriseId &&
      token.environment === currentToken()?.environment
    )
  })

  function closeModal() {
    formRef.reset()
    document.querySelector<HTMLDialogElement>('[token-modal]')?.close()
  }

  function handleSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const environment = form.environment.value?.trim()
    const token = form.token.value?.trim()
    const saveInStorage = form.saveStorage.checked

    if (token) {
      props.onFinish({ environment, token, saveInStorage })
      setError('')
      closeModal()
      return
    }
      
    setError('Empty field')
    form.reset()
  }

  function deleteToken(token: TokenData) {
    const filterFunction = (storageToken: TokenData) => {
      return storageToken.enterpriseId === token.enterpriseId
        && storageToken.environment === token.environment
    }
    LocalStorageAccess.removeFrom('tokens', filterFunction)
    setTokens(tokens => tokens?.filter(token => !filterFunction(token)) ?? null)
  }

  const loadTokens = () => setTokens(
    LocalStorageAccess.get('tokens')
  )

  onMount(loadTokens)
  
  return (
    <dialog token-modal ref={props.ref}>
      <form ref={formRef!} onSubmit={handleSubmit}>
        <h3>Add new token</h3>

        <label>
          Environment
          <input name="environment" />
        </label>

        <label>
          Token
          <input name="token" />
          <Show when={error}>
            <small>{error()}</small>
          </Show>
        </label>

        <fieldset>
          <label>
            <input type="checkbox" name="saveStorage" checked />
            Save in local storage
          </label>
        </fieldset>

        <button>Send</button>
        <button
          class="secondary"
          type="button"
          onClick={closeModal}
        >
          Cancel
        </button>
      </form>

      <div class="token-modal-list-container">
        <div class="token-in-use-container">
          <h4>Token in use</h4>
          <Show when={currentToken()} fallback={<p>No token in use</p>} keyed>
            {token => (
              <>
                <p>
                  Environment: {token.environment} <br />
                  Organization: {token.organizationSlug} <br />
                  Enterprise: {token.enterpriseSlug} <br />
                  Enterprise Id: {token.enterpriseId}
                </p>
                <button class="secondary" onClick={() => {
                  deleteToken(currentToken() as TokenData)
                  setCurrentToken()
                }}>
                  <TrashIcon width="20" /> Delete
                </button>
              </>
            )}
          </Show>
        </div>

        <h4>Tokens in Storage</h4>
        <ul>
          <For
            each={tokensInStorage()}
            fallback={<p>No more tokens in storage</p>}
          >
            {token => (
              <li onClick={(event: Event) => {
                if (event.target !== event.currentTarget) return

                setCurrentToken(token)
                closeModal()
              }}>
                {token.environment}: {token.organizationSlug} / {token.enterpriseSlug}

                <TrashIcon
                  class="delete-token-btn"
                  width="18"
                  onClick={() => deleteToken(token)}
                />
              </li>
            )}
          </For>
        </ul>
      </div>
    </dialog>
  )
}
