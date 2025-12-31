"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rules_1 = __importDefault(require("./Rules"));
var Board = /** @class */ (function () {
    function Board() {
        this.rules = new Rules_1.default();
    }
    Board.prototype.getHighscore = function () {
        return this.highscore;
    };
    Board.prototype.updateHighscore = function (value) {
        this.highscore = this.highscore + value;
    };
    Board.prototype.init = function (rows, cols) {
        this.dimensions = [];
        for (var i = 0; i < rows; i++) {
            this.dimensions[i] = [0, 0, 0, 0];
        }
        this.dimensions[0][0] = 4;
        this.dimensions[0][2] = 4;
        console.log("Board is initizialzed is running");
    };
    Board.prototype.placeNewNumber = function () {
        while (true) {
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
    Board.prototype.getValue = function (row, col) {
        return this.dimensions[row][col];
    };
    Board.prototype.updateBoard = function (row, col, value) {
        this.dimensions[row][col] = value;
    };
    Board.prototype.getRandomNumber = function (min, max) {
        var minCeiled = Math.ceil(min);
        var maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    };
    Board.prototype.moveUp = function () {
        this.updateRowUp(0);
        this.updateRowUp(1);
        this.updateRowUp(2);
        this.updateRowUp(3);
    };
    Board.prototype.moveDown = function () {
        this.updateColDown(0);
        this.updateColDown(1);
        this.updateColDown(2);
        this.updateColDown(3);
    };
    Board.prototype.moveLeft = function () {
        this.updateRowLeft(0);
        this.updateRowLeft(1);
        this.updateRowLeft(2);
        this.updateRowLeft(3);
    };
    Board.prototype.moveRight = function () {
        this.updateRowRight(0);
        this.updateRowRight(1);
        this.updateRowRight(2);
        this.updateRowRight(3);
    };
    Board.prototype.updateUp = function (colArray) {
        return this.updateLeft(colArray);
    };
    Board.prototype.updateDown = function (colArray) {
        return this.updateRight(colArray);
    };
    Board.prototype.updateLeft = function (rowArray) {
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
    Board.prototype.getDistance = function (currentElementPosition, maxLength) {
        return maxLength - currentElementPosition;
    };
    Board.prototype.updateRight = function (rowArray) {
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
    Board.prototype.calculateNewValue = function (movedElement, collisionElement) {
        var newValue = this.rules.apply(movedElement, collisionElement);
        this.updateHighscore(newValue);
        return newValue;
    };
    Board.prototype.updateRowUp = function (col) {
        var colArray = this.getCol(col);
        var newCol = this.updateUp(colArray);
        this.dimensions = this.dimensions.map(function (row, rowIndex) {
            return row.map(function (cell, colIndex) {
                return colIndex === col ? newCol[rowIndex] : cell;
            });
        });
    };
    Board.prototype.updateColDown = function (col) {
        var colArray = this.getCol(col);
        var newCol = this.updateDown(colArray);
        this.dimensions = this.dimensions.map(function (row, rowIndex) {
            return row.map(function (cell, colIndex) {
                return colIndex === col ? newCol[rowIndex] : cell;
            });
        });
    };
    Board.prototype.updateRowLeft = function (row) {
        var rowArray = this.getRow(row);
        var newRow = this.updateLeft(rowArray);
        this.dimensions[row] = newRow;
    };
    Board.prototype.updateRowRight = function (row) {
        var rowArray = this.getRow(row);
        var newRow = this.updateRight(rowArray);
        this.dimensions[row] = newRow;
    };
    Board.prototype.getCol = function (col) {
        return this.dimensions.map(function (zeile) { return zeile[col]; });
    };
    Board.prototype.getRow = function (row) {
        return this.dimensions[row];
    };
    Board.prototype.getBoard = function () {
        return this.dimensions;
    };
    return Board;
}());
exports.default = Board;
//# sourceMappingURL=Board.js.map