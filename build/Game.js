"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BasicRules_1 = __importDefault(require("./BasicRules"));
var Game2048 = /** @class */ (function () {
    function Game2048(highscore) {
        this.rules = new BasicRules_1.default();
        this.currentScore = 0;
        this.highscore = highscore;
        this.init(4, 4);
    }
    Game2048.prototype.getDimensions = function () {
        return this.dimensions;
    };
    Game2048.prototype.processUserAction = function (input) {
        if (input === "d") {
            this.moveRight();
        }
        if (input === "a") {
            this.moveLeft();
        }
        if (input === "w") {
            this.moveUp();
        }
        if (input === "s") {
            this.moveDown();
        }
        if (input === "c") {
            return false;
        }
        this.placeNewNumber();
    };
    Game2048.prototype.displayGame = function () {
        var boardDimensions = this.getDimensions();
        console.log(boardDimensions[0]);
        console.log(boardDimensions[1]);
        console.log(boardDimensions[2]);
        console.log(boardDimensions[3]);
        var highScore = this.getHighScore();
        console.log("Your Highscore: " + highScore);
    };
    Game2048.prototype.getHighScore = function () {
        return this.highscore;
    };
    Game2048.prototype.getCurrentScore = function () {
        return this.currentScore;
    };
    Game2048.prototype.setDimensions = function (dimensions) {
        this.dimensions = dimensions;
    };
    Game2048.prototype.updateHighscore = function (value) {
        this.currentScore = this.currentScore + value;
        if (this.rules.isNewHighScore(this.currentScore, this.highscore)) {
            this.highscore = this.currentScore;
        }
    };
    Game2048.prototype.init = function (rows, cols) {
        this.dimensions = [];
        for (var i = 0; i < rows; i++) {
            var initialCol = [];
            for (var i_1 = 0; i_1 < cols; ++i_1) {
                initialCol.push(0);
            }
            this.dimensions[i] = initialCol;
        }
        this.dimensions[0][0] = 4;
        this.dimensions[0][2] = 4;
        console.log("Board is initizialzed is running");
    };
    Game2048.prototype.placeNewNumber = function () {
        while (!this.isGameOver()) {
            var min = this.dimensions.length - 1;
            var max = this.dimensions[0].length - 1;
            var indexRow = this.getRandomNumber(0, max);
            var indexCol = this.getRandomNumber(0, max);
            var possibleValues = [2, 4];
            var indexPossibleValue = this.getRandomNumber(0, 1);
            var newValue = possibleValues[indexPossibleValue];
            var currentValue = this.getValue(indexRow, indexCol);
            if (currentValue === 0) {
                this.updateBoard(indexRow, indexCol, newValue);
                break;
            }
        }
        return true;
    };
    Game2048.prototype.isGameOver = function () {
        return this.rules.isGameOver(this.dimensions);
    };
    Game2048.prototype.getValue = function (row, col) {
        return this.dimensions[row][col];
    };
    Game2048.prototype.updateBoard = function (row, col, value) {
        this.dimensions[row][col] = value;
    };
    Game2048.prototype.getRandomNumber = function (min, max) {
        var minCeiled = Math.ceil(min);
        var maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    };
    Game2048.prototype.moveUp = function () {
        this.updateRowUp(0);
        this.updateRowUp(1);
        this.updateRowUp(2);
        this.updateRowUp(3);
        this.placeNewNumber();
    };
    Game2048.prototype.moveDown = function () {
        this.updateColDown(0);
        this.updateColDown(1);
        this.updateColDown(2);
        this.updateColDown(3);
        this.placeNewNumber();
    };
    Game2048.prototype.moveLeft = function () {
        this.updateRowLeft(0);
        this.updateRowLeft(1);
        this.updateRowLeft(2);
        this.updateRowLeft(3);
        this.placeNewNumber();
    };
    Game2048.prototype.moveRight = function () {
        this.updateRowRight(0);
        this.updateRowRight(1);
        this.updateRowRight(2);
        this.updateRowRight(3);
        this.placeNewNumber();
    };
    Game2048.prototype.updateUp = function (colArray) {
        return this.updateLeft(colArray);
    };
    Game2048.prototype.updateDown = function (colArray) {
        return this.updateRight(colArray);
    };
    Game2048.prototype.updateLeft = function (rowArray) {
        var length = rowArray.length;
        var newRow = rowArray;
        for (var i = 1; i < length; i++) {
            var currentElement = rowArray[i];
            if (currentElement === 0) {
                continue;
            }
            var distance = this.getDistance(0, i);
            for (var d = 1; d <= distance; d++) {
                var leftElement = rowArray[i - d];
                if (leftElement !== 0) {
                    var newValue = this.calculateNewValue(currentElement, leftElement);
                    if (newValue !== 0) {
                        newRow[i - d] = newValue;
                        newRow[i - d + 1] = 0;
                    }
                    break;
                }
                else {
                    newRow[i - d] = currentElement;
                    newRow[i - d + 1] = 0;
                }
            }
        }
        return newRow;
    };
    Game2048.prototype.getDistance = function (currentElementPosition, maxLength) {
        return maxLength - currentElementPosition;
    };
    Game2048.prototype.updateRight = function (rowArray) {
        var length = rowArray.length;
        var newRow = rowArray;
        for (var i = length - 2; i >= 0; i--) {
            var lastElement = rowArray[i];
            if (lastElement === 0) {
                continue;
            }
            var distance = this.getDistance(i, length - 1);
            for (var d = 1; d <= distance; d++) {
                var rightElement = rowArray[i + d];
                if (rightElement !== 0) {
                    var newValue = this.calculateNewValue(lastElement, rightElement);
                    if (newValue !== 0) {
                        newRow[i + d] = newValue;
                        newRow[i + d - 1] = 0;
                        ;
                    }
                    break;
                }
                else {
                    newRow[i + d] = lastElement;
                    newRow[i + d - 1] = 0;
                }
            }
        }
        return newRow;
    };
    Game2048.prototype.calculateNewValue = function (movedElement, collisionElement) {
        var newValue = this.rules.apply(movedElement, collisionElement);
        this.updateHighscore(newValue);
        return newValue;
    };
    Game2048.prototype.updateRowUp = function (col) {
        var colArray = this.getCol(col);
        var newCol = this.updateUp(colArray);
        this.dimensions = this.dimensions.map(function (row, rowIndex) {
            return row.map(function (cell, colIndex) {
                return colIndex === col ? newCol[rowIndex] : cell;
            });
        });
    };
    Game2048.prototype.updateColDown = function (col) {
        var colArray = this.getCol(col);
        var newCol = this.updateDown(colArray);
        this.dimensions = this.dimensions.map(function (row, rowIndex) {
            return row.map(function (cell, colIndex) {
                return colIndex === col ? newCol[rowIndex] : cell;
            });
        });
    };
    Game2048.prototype.updateRowLeft = function (row) {
        var rowArray = this.getRow(row);
        var newRow = this.updateLeft(rowArray);
        this.dimensions[row] = newRow;
    };
    Game2048.prototype.updateRowRight = function (row) {
        var rowArray = this.getRow(row);
        var newRow = this.updateRight(rowArray);
        this.dimensions[row] = newRow;
    };
    Game2048.prototype.getCol = function (col) {
        return this.dimensions.map(function (zeile) { return zeile[col]; });
    };
    Game2048.prototype.getRow = function (row) {
        return this.dimensions[row];
    };
    Game2048.prototype.getBoard = function () {
        return this.dimensions;
    };
    return Game2048;
}());
exports.default = Game2048;
