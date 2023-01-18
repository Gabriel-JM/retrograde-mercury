import './token-modal.css'
import { createEffect, createSignal, For, Show } from 'solid-js'
import { LocalStorageAccess } from '../../common/infra/storage'
import { setTokenData, tokenData, TokenData } from '../data'

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
    return (
      token.enterpriseId !== tokenData()?.enterpriseId ||
      token.environment !== tokenData()?.environment
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

  createEffect(() => {
    setTokens(
      LocalStorageAccess.get('tokens')
    )
  })
  
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
            <input type="checkbox" name="saveStorage" />
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

      <Show when={tokens}>
        <div class="token-modal-list-container">
          <h4>Token in use</h4>
          <Show when={tokenData()} fallback={<p>No token in use</p>} keyed>
            {token => (
              <>
                <span>Environment: {token.environment}</span>
                <span>Organization: {token.organizationSlug}</span>
                <span>Enterprise: {token.enterpriseSlug}</span>
                <span>Enterprise Id: {token.enterpriseId}</span>
              </>
            )}
          </Show>

          <br />

          <h4>Tokens in Storage</h4>
          <ul>
            <For
              each={tokensInStorage()}
              fallback={<p>No more tokens in storage</p>}
            >
              {token => (
                <li onClick={() => {
                  setTokenData(token)
                  closeModal()
                }}>
                  {token.environment}: {token.organizationSlug} / {token.enterpriseSlug}
                </li>
              )}
            </For>
          </ul>
        </div>
      </Show>
    </dialog>
  )
}
