import { getRandomValues } from "node:crypto";
import Rules from "./BasicRules"
import { Game } from "./Game.interface"
import { DatabaseSQLite } from "./DatabaseSQLite";

export default class Game2048 implements Game {

    dimensions: number[][]
    rules: Rules
    currentScore: number
    highscore: number
    db: DatabaseSQLite

    constructor(highscore: number, db: DatabaseSQLite) {
        this.rules = new Rules()
        this.currentScore = 0
        this.highscore = highscore

        this.db = db

        //  this.init(4, 4)
        this.load()

    }

    load() {
        const dimensions = this.db.load()

        if (!dimensions) {
            this.init(4, 4)
        } else {
            this.setDimensions(dimensions)
        }
    }

    save() {
        const dimension = this.getDimensions();
        this.db.save(dimension)
    }

    getDimensions(): number[][] {
        return this.dimensions
    }

    processUserAction(input: string) {
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

        this.placeNewNumber()


    }

    getHighScore(): number {
        return this.highscore;
    }
    getCurrentScore(): number {
        return this.currentScore
    }

    setDimensions(dimensions: number[][]) {
        this.dimensions = dimensions
    }



    updateHighscore(value: number) {
        this.currentScore = this.currentScore + value
        if (this.rules.isNewHighScore(this.currentScore, this.highscore)) {
            this.highscore = this.currentScore
        }
    }

    init(rows: number, cols: number) {
        this.dimensions = [];



        for (let i = 0; i < rows; i++) {

            const initialCol = []
            for (let i = 0; i < cols; ++i) {
                initialCol.push(0)
            }


            this.dimensions[i] = initialCol
        }

        this.dimensions[0][0] = 4;
        this.dimensions[0][2] = 4;

        console.log("Board is initizialzed is running")
    }

    placeNewNumber() {


        while (!this.isGameOver()) {

            let min = this.dimensions.length - 1
            let max = this.dimensions[0].length - 1

            let indexRow = this.getRandomNumber(0, max);
            let indexCol = this.getRandomNumber(0, max);

            let possibleValues = [2, 4]

            let indexPossibleValue = this.getRandomNumber(0, 1)

            let newValue = possibleValues[indexPossibleValue]

            const currentValue = this.getValue(indexRow, indexCol);

            if (currentValue === 0) {
                this.updateBoard(indexRow, indexCol, newValue);
                break;
            }

        }

        return true

    }

    isGameOver(): boolean {
        if (this.rules.isGameOver(this.dimensions)) {
            this.db.reset()
            return true;
        }

        return false;
    }

    getValue(row: number, col: number) {
        return this.dimensions[row][col];
    }

    updateBoard(row: number, col: number, value: number) {
        this.dimensions[row][col] = value
    }

    getRandomNumber(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

    moveUp() {
        this.updateRowUp(0)
        this.updateRowUp(1)
        this.updateRowUp(2)
        this.updateRowUp(3)

        this.placeNewNumber()

    }

    moveDown() {
        this.updateColDown(0)
        this.updateColDown(1)
        this.updateColDown(2)
        this.updateColDown(3)

        this.placeNewNumber()

    }

    moveLeft() {
        this.updateRowLeft(0)
        this.updateRowLeft(1)
        this.updateRowLeft(2)
        this.updateRowLeft(3)

        this.placeNewNumber()

    }

    moveRight() {
        this.updateRowRight(0)
        this.updateRowRight(1)
        this.updateRowRight(2)
        this.updateRowRight(3)

        this.placeNewNumber()
    }


    updateUp(colArray: number[]) {
        return this.updateLeft(colArray)
    }

    updateDown(colArray: number[]) {
        return this.updateRight(colArray)
    }

    updateLeft(rowArray: number[]): number[] {
        const length = rowArray.length;
        const newRow = rowArray;

        for (let i = 1; i < length; i++) {

            const currentElement = rowArray[i];

            if (currentElement === 0) {
                continue;
            }

            const distance = this.getDistance(0, i);

            for (let d = 1; d <= distance; d++) {

                const leftElement = rowArray[i - d];

                if (leftElement !== 0) {

                    const newValue = this.calculateNewValue(currentElement, leftElement);

                    if (newValue !== 0) {

                        newRow[i - d] = newValue;
                        newRow[i - d + 1] = 0;
                    }
                    break;

                } else {
                    newRow[i - d] = currentElement;
                    newRow[i - d + 1] = 0;
                }
            }
        }

        return newRow;
    }

    getDistance(currentElementPosition: number, maxLength: number) {
        return maxLength - currentElementPosition
    }

    updateRight(rowArray: number[]): number[] {
        const length = rowArray.length

        const newRow = rowArray


        for (let i = length - 2; i >= 0; i--) {

            const lastElement = rowArray[i]

            if (lastElement === 0) {
                continue;
            }

            const distance = this.getDistance(i, length - 1);

            for (let d = 1; d <= distance; d++) {

                const rightElement = rowArray[i + d]

                if (rightElement !== 0) {

                    const newValue = this.calculateNewValue(lastElement, rightElement)

                    if (newValue !== 0) {
                        newRow[i + d] = newValue
                        newRow[i + d - 1] = 0;
                        ;
                    }
                    break;
                } else {
                    newRow[i + d] = lastElement
                    newRow[i + d - 1] = 0;
                }
            }
        }

        return newRow
    }

    calculateNewValue(movedElement: number, collisionElement: number) {
        const newValue = this.rules.apply(movedElement, collisionElement)
        this.updateHighscore(newValue)
        return newValue
    }




    updateRowUp(col: number) {
        const colArray = this.getCol(col)
        const newCol = this.updateUp(colArray)

        this.dimensions = this.dimensions.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
                colIndex === col ? newCol[rowIndex] : cell
            )
        );



    }

    updateColDown(col: number) {
        const colArray = this.getCol(col)
        const newCol = this.updateDown(colArray)

        this.dimensions = this.dimensions.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
                colIndex === col ? newCol[rowIndex] : cell
            )
        );
    }


    updateRowLeft(row: number) {
        const rowArray = this.getRow(row)
        const newRow = this.updateLeft(rowArray)

        this.dimensions[row] = newRow;
    }

    updateRowRight(row: number) {
        const rowArray = this.getRow(row)
        const newRow = this.updateRight(rowArray)

        this.dimensions[row] = newRow;
    }



    getCol(col: number) {
        return this.dimensions.map(zeile => zeile[col]);
    }

    getRow(row: number) {
        return this.dimensions[row]
    }

    getBoard() {
        return this.dimensions
    }
}
