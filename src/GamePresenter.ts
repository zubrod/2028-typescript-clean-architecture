import { Game } from "./Game.interface";

export class GamePresenter {
    static displayGame(game: Game) {
        let boardDimensions = game.getDimensions()
        console.log(boardDimensions[0])
        console.log(boardDimensions[1])
        console.log(boardDimensions[2])
        console.log(boardDimensions[3])

        let highScore = game.getHighScore()

        console.log("Your Highscore: " + highScore)
    }
}