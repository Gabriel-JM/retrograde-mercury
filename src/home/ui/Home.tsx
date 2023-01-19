import { A } from '@solidjs/router'

export function Home() {
  return (
    <div>
      <A href="/customers" role="button">
        Customers
      </A>
    </div>
  )
}
