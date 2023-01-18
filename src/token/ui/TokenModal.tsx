import './token-modal.css'
import { createEffect, createSignal, For, Show } from 'solid-js'
import { LocalStorageAccess } from '../../common/infra/storage'
import { tokenData, TokenData } from '../data'

interface TokenModalProps {
  ref: HTMLDialogElement
  onFinish: (data: { token: string, saveInStorage: boolean }) => void
}

export function TokenModal(props: TokenModalProps) {
  let formRef: HTMLFormElement
  const [error, setError] = createSignal('')
  const [tokens, setTokens] = createSignal(null)

  function closeModal() {
    formRef.reset()
    document.querySelector<HTMLDialogElement>('[token-modal]')?.close()
  }

  function handleSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const token = form.token.value?.trim()
    const saveInStorage = form.saveStorage.checked

    if (token) {
      props.onFinish({ token, saveInStorage })
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

        <input name="token" placeholder="Token" />
        <Show when={error}>
          <span>{error()}</span>
        </Show>

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
                <span>Organization: {token.organizationSlug}</span>
                <span>Enterprise: {token.enterpriseSlug}</span>
                <span>Enterprise Id: {token.enterpriseId}</span>
              </>
            )}
          </Show>

          <br />

          <h4>Tokens in Storage</h4>
          <ul>
            <For each={tokens()} fallback={<p>No more tokens in storage</p>}>
              {token => {
                const isInUse = token.enterpriseId === tokenData()?.enterpriseId

                return (
                  !isInUse && <li>
                    {token.organizationSlug} / {token.enterpriseSlug}
                  </li>
                )
              }}
            </For>
          </ul>
        </div>
      </Show>
    </dialog>
  )
}
