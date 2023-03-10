/* @refresh reload */
import { Router } from '@solidjs/router'
import { hydrate } from 'solid-js/web'
import App from './main/ui/App'

hydrate(
  () => <App />,
  document.getElementById('root') as HTMLElement
)
