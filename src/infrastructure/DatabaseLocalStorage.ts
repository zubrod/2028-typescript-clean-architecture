import { Database } from "./Database.interface"

export class DatabaseLocalStorage implements Database {
    private key = 'game2048_state'

    load(): number[][] | null {
        const data = localStorage.getItem(this.key)
        if (data) {
            return JSON.parse(data)
        }
        return null
    }

    save(dimensions: number[][]): void {
        localStorage.setItem(this.key, JSON.stringify(dimensions))
    }

    reset(): void {
        localStorage.removeItem(this.key)
    }
}
