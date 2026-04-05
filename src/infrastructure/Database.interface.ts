export interface Database {
    load(): number[][] | null
    save(dimensions: number[][]): void
    reset(): void
}
