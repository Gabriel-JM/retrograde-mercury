const prefix = '@retrograde-mercury:'

export class LocalStorageAccess {
  static get<T>(key: string) {
    if (typeof window === 'undefined') return null

    const item = window.localStorage.getItem(prefix + key)

    if (item) {
      return JSON.parse(item) as T
    }

    return null
  }
}
