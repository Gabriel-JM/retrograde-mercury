import { createSignal, For, onMount } from 'solid-js'
import { currentToken } from '../../../token/data'

export default function ListCustomers() {
  const [customers, setCustomers] = createSignal([])

  onMount(async () => {
    const response = await fetch('/api/customers', {
      headers: {
        authorization: currentToken()?.raw ?? ''
      }
    })

    const data = await response.json()

    if (response.ok) {
      setCustomers(data)
      return
    }

    console.error(data)
  })

  return (
    <div>
      <For each={customers()}>
        {customer => JSON.stringify(customer)}
      </For>
    </div>
  )
}
