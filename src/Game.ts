import Board from "./Board";
import Control from "./Control";

export default class Game {
    x: string
    board: Board
    control: Control

    constructor() {
        this.board = new Board()
        this.control = new Control()

        this.board.init(4, 4)

    }

    async run() {

        let boardDimensions = this.board.getBoard()
        console.log(boardDimensions)

        while (await this.processUserInput()) {

        }


    }

    async processUserInput() {
        const input = await this.control.waitForInput()

        if (input === "d") {
            this.moveRight()
        }

        if (input === "a") {
            this.moveLeft()
        }

        if (input === "w") {
            this.moveUp()
        }

        if (input === "s") {
            this.moveDown()
        }

        if (input === "c") {
            return false
        }

        this.board.placeNewNumber()

        let boardDimensions = this.board.getBoard()
        console.log(boardDimensions[0])
        console.log(boardDimensions[1])
        console.log(boardDimensions[2])
        console.log(boardDimensions[3])


        return true

    }

    moveUp() {

        this.board.moveUp()

    }

    moveDown() {

        this.board.moveDown()

    }

    moveRight() {

        this.board.moveRight()

    }

    moveLeft() {

        this.board.moveLeft()

    }


    getCol(array: number[][], col: number) {
        return array.map(zeile => zeile[col]);
    }

    getRow(array: number[][], row: number) {
        return array[row]
    }
}


const game = new Game();
game.run()