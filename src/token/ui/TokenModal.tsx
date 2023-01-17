import { createSignal, Show } from 'solid-js'

interface TokenModalProps {
  ref: HTMLDialogElement
  onFinish: (data: Record<'token', string>) => void
}

export function TokenModal(props: TokenModalProps) {
  const [error, setError] = createSignal('')
  
  function closeModal() {
    document.querySelector<HTMLDialogElement>('[token-modal]')?.close()
  }

  function handleSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const token = form.token.value?.trim()

    if (token) {
      props.onFinish({ token })
      setError('')
    } else {
      setError('Empty field')
    }

    form.reset()
    closeModal()
  }
  
  return (
    <dialog token-modal ref={props.ref}>
      <form onSubmit={handleSubmit}>
        <input name="token" placeholder="Token" />
        <Show when={error}>
          <span>{error()}</span>
        </Show>
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
