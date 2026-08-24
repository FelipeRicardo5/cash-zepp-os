class AppState {
  constructor() {
    this.listeners = {}
    this.data = {}
  }

  get(key) {
    return this.data[key]
  }

  set(key, value) {
    this.data[key] = value
    this.notify(key, value)
  }

  notify(key, value) {
    const listeners = this.listeners[key] || []
    listeners.forEach((callback) => callback(value))
  }

  on(key, callback) {
    if (!this.listeners[key]) {
      this.listeners[key] = []
    }
    this.listeners[key].push(callback)
  }

  off(key, callback) {
    if (this.listeners[key]) {
      this.listeners[key] = this.listeners[key].filter((cb) => cb !== callback)
    }
  }
}

export const appState = new AppState()
