class AppState{
    constructor(){
        this.listeners = {}
        this.data = {
            balance: 1500.00,
            tasks: []
        }
    }

    get(key){
        return this.data[key]
    }

    set(key, value){
        this.data[key] = value
        this.notify(key, value)
    }

    notify(key, value){
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => callback(value))
        }
    }

    on(key, callback){
        if (!this.listeners[key]) {
            this.listeners[key] = []
        }
        this.listeners[key].push(callback)
    }

    off(key, callback) {
        if (this.listeners[key]) {
            this. listeners[key] = this.listeners[key].filter(cb => cb !== callback)
        }
    }
} 

export const appState = new AppState()