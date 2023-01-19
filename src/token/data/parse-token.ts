import { setCurrentToken } from './token-data-store'

export function parseToken(token: string) {
  const [, payload = ''] = token.split('.')
  const payloadJson = atob(payload)

  const data = JSON.parse(payloadJson || 'null')
  setCurrentToken(data)

  return data
}
