export function parseToken(token: string) {
  const [, payload = ''] = token.split('.')
  const payloadJson = atob(payload)

  const data = JSON.parse(payloadJson || 'null')
  return data
}
