"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BasicRules = /** @class */ (function () {
    function BasicRules() {
    }
    BasicRules.prototype.isGameWon = function (dimensions, goalValue) {
        for (var _i = 0, dimensions_1 = dimensions; _i < dimensions_1.length; _i++) {
            var row = dimensions_1[_i];
            for (var _a = 0, row_1 = row; _a < row_1.length; _a++) {
                var value = row_1[_a];
                if (value >= goalValue) {
                    return true;
                }
            }
        }
        return false;
    };
    BasicRules.prototype.isGameOver = function (dimensions) {
        for (var _i = 0, dimensions_2 = dimensions; _i < dimensions_2.length; _i++) {
            var row = dimensions_2[_i];
            for (var _a = 0, row_2 = row; _a < row_2.length; _a++) {
                var value = row_2[_a];
                if (value === 0) {
                    return false;
                }
            }
        }
        return true;
    };
    BasicRules.prototype.isNewHighScore = function (currentScore, highscore) {
        return currentScore > highscore;
    };
    ;
    BasicRules.prototype.apply = function (a, b) {
        var newValue = this.calculateNewValue(a, b);
        return newValue;
    };
    ;
    BasicRules.prototype.calculateNewValue = function (a, b) {
        if (a === b) {
            return a * b;
        }
        else {
            return 0;
        }
    };
    ;
    return BasicRules;
}());
exports.default = BasicRules;
