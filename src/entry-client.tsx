/* @refresh reload */
import { hydrate } from 'solid-js/web'
import App from './main/App'

hydrate(() => <App />, document.getElementById('root') as HTMLElement)
