import { renderToString } from 'solid-js/web'
import App from './main/ui/App'

export function render() {
  const html = renderToString(() => <App />)
  return { html }
}
