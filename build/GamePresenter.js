"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamePresenter = void 0;
var GamePresenter = /** @class */ (function () {
    function GamePresenter() {
    }
    GamePresenter.displayGame = function (game) {
        var boardDimensions = game.getDimensions();
        console.log(boardDimensions[0]);
        console.log(boardDimensions[1]);
        console.log(boardDimensions[2]);
        console.log(boardDimensions[3]);
        var highScore = game.getHighScore();
        console.log("Your Highscore: " + highScore);
    };
    return GamePresenter;
}());
exports.GamePresenter = GamePresenter;
