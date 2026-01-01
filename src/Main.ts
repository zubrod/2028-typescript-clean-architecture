import { Game } from "./Game.interface"
import Game2048 from "./Game";
import Control from "./Control";
import { KeyMapper } from "./KeyMapper";

export default class Main {
    x: string
    game: Game
    control: Control
    keyMapper: KeyMapper

    constructor() {
        this.game = new Game2048(50)
        this.control = new Control()
        this.keyMapper = new KeyMapper(this.game)

    }

    async run() {

        while (await this.processUserInput()) {

        }

        return false


    }

    async processUserInput() {


        if (this.game.isGameOver()) {
            console.log("GameOver");
            console.log("Your score: " + this.game.getHighScore())
            return false;
        }

        const input = await this.control.waitForInput()

        this.keyMapper.processInput(input)

        this.game.displayGame()


        return true

    }


}


const game = new Main();
game.run()