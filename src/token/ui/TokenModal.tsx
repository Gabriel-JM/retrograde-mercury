import { createSignal, Show } from 'solid-js'

interface TokenModalProps {
  ref: HTMLDialogElement
  onFinish: (data: { token: string, saveInStorage: boolean }) => void
}

export function TokenModal(props: TokenModalProps) {
  let formRef: HTMLFormElement
  const [error, setError] = createSignal('')
  
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
  
  return (
    <dialog token-modal ref={props.ref}>
      <form ref={formRef!} onSubmit={handleSubmit}>
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
    </dialog>
  )
}
