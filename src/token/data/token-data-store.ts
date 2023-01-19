import { createSignal } from 'solid-js'

export interface TokenData {
  environment: string
  organizationSlug: string
  enterpriseSlug: string
  enterpriseId: string
  raw: string
}

const [currentToken, setCurrentToken] = createSignal<Partial<TokenData>>()

export { currentToken, setCurrentToken }
