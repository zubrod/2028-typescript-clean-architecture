"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyMapper = void 0;
var KeyMapper = /** @class */ (function () {
    function KeyMapper(game) {
        this.game = game;
    }
    KeyMapper.prototype.processInput = function (input) {
        if (input === "d") {
            this.game.moveRight();
        }
        if (input === "a") {
            this.game.moveLeft();
        }
        if (input === "w") {
            this.game.moveUp();
        }
        if (input === "s") {
            this.game.moveDown();
        }
        if (input === "c") {
            this.game.save();
            return false;
        }
        return true;
    };
    return KeyMapper;
}());
exports.KeyMapper = KeyMapper;
