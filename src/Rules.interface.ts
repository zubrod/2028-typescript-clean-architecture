export interface Rules {
    apply(a: number, b: number): number;
    isNewHighScore(currentScore: number, highscore: number): boolean;
    isGameOver(dimensions: number[][]): boolean
}