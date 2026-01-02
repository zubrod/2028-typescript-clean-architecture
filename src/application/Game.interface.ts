export interface Game {
    processUserAction(input: string): void
    getHighScore(): number
    getCurrentScore(): number
    isGameOver(): boolean
    getDimensions(): void
    moveUp(): void
    moveDown(): void
    moveLeft(): void
    moveRight(): void
    save(): void
}