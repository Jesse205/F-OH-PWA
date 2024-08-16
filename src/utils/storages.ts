const localStorageTs = {
  getItem<T>(key: string, defaultValue: T) {
    const value = localStorage.getItem(key)
    return value !== null ? (JSON.parse(value) as T) : defaultValue
  },
}
