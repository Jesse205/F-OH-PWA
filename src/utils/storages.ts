const localStorageHelper = {
  getItemObject<T>(key: string, defaultValue: T): T {
    const value = localStorage.getItem(key)
    return value !== null ? (JSON.parse(value) as T) : defaultValue
  },
}
