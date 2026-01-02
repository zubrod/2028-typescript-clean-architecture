import { Rules } from "./Rules.interface"

export default class BasicRules implements Rules {

    isGameOver(dimensions: number[][]): boolean {
        for (const row of dimensions) {
            for (const value of row) {
                if (value === 0) {
                    return false;
                }
            }
        }

        return true

    }

    isNewHighScore(currentScore: number, highscore: number): boolean {
        return currentScore > highscore
    };

    apply(a: number, b: number): number {
        const newValue = this.calculateNewValue(a, b)
        return newValue
    };

    calculateNewValue(a: number, b: number) {
        if (a === b) {
            return a + b
        } else {
            return 0
        }
    };





}