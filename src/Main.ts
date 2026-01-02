import { Game } from "./application/Game.interface"
import Game2048 from "./application/Game";
import Control from "./infrastructure/Control";
import { KeyMapper } from "./infrastructure/KeyMapper";
import { DatabaseSQLite } from "./infrastructure/DatabaseSQLite";
import { GamePresenter } from "./ui/GamePresenter";

export default class Main {
    x: string
    game: Game
    control: Control
    keyMapper: KeyMapper
    db: DatabaseSQLite

    constructor() {
        this.db = new DatabaseSQLite()
        this.game = new Game2048(50, this.db)
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

        if (!this.keyMapper.processInput(input)) {
            return false
        }

        GamePresenter.displayGame(this.game)


        return true

    }


}


const game = new Main();
game.run()