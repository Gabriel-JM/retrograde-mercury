import { createSignal } from 'solid-js'

export interface TokenData {
  environment: string
  organizationSlug: string
  enterpriseSlug: string
  enterpriseId: string
}

const [tokenData, setTokenData] = createSignal<Partial<TokenData>>()

export { tokenData, setTokenData }
