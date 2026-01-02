import { DatabaseSQLite } from "./DatabaseSQLite"
import { Game } from "../application/Game.interface"

export class KeyMapper {

    game: Game

    constructor(game: Game) {
        this.game = game;
    }

    processInput(input: string) {
        if (input === "d") {
            this.game.moveRight()
        }

        if (input === "a") {
            this.game.moveLeft()
        }

        if (input === "w") {
            this.game.moveUp()
        }

        if (input === "s") {
            this.game.moveDown()
        }

        if (input === "c") {
            this.game.save()

            return false
        }

        return true


    }
}