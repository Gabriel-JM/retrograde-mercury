const prefix = '@retrograde-mercury:'

export class LocalStorageAccess {
  static get<T>(key: string) {
    if (typeof window === 'undefined') return null

    const item = localStorage.getItem(prefix + key)

    if (item) {
      return JSON.parse(item) as T
    }

    return null
  }

  static set(key: string, data: object) {
    if (typeof window === 'undefined') return null

    localStorage.setItem(prefix + key, JSON.stringify(data))
  }

  static addIn(key: string, data: object) {
    if (typeof window === 'undefined') return null

    const items = LocalStorageAccess.get<any[]>(key)

    LocalStorageAccess.set(key, [...items ?? [], data])
  }

  static removeFrom<T = any[]>(key: string, findFn: Function) {
    if (typeof window === 'undefined') return null

    const items = LocalStorageAccess.get<T>(key)

    if (Array.isArray(items)) {
      LocalStorageAccess.set(key, items.filter(item => !findFn(item)))
    }
  }

  static delete(key: string) {
    localStorage.removeItem(prefix + key)
  }
}
