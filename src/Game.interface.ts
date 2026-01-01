export interface Game {
    processUserAction(input: string): void
    getHighScore(): number
    getCurrentScore(): number
    isGameOver(): boolean
    displayGame(): void
    moveUp(): void
    moveDown(): void
    moveLeft(): void
    moveRight(): void
}