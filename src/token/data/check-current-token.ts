import { LocalStorageAccess } from '../../common/infra/storage'
import { setCurrentToken, TokenData } from './token-data-store'

export function checkCurrentToken() {
  const savedToken = LocalStorageAccess.get<TokenData>('current-token')

  if (savedToken) {
    setCurrentToken(savedToken)
  }
}
