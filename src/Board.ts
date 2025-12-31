import { getRandomValues } from "node:crypto";
import Rules from "./Rules"

export default class Board {

    dimensions: number[][]
    rules: Rules

    constructor() {
        this.rules = new Rules()
    }

    init(rows: number, cols: number) {
        this.dimensions = [];

        for (let i = 0; i < rows; i++) {
            this.dimensions[i] = [0, 0, 0, 0];
        }

        this.dimensions[0][0] = 4;
        this.dimensions[0][2] = 4;

        console.log("Board is initizialzed is running")
    }

    placeNewNumber() {


        while (true) {

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

    getValue(row: number, col: number) {
        return this.dimensions[row][col];
    }

    updateBoard(row: number, col: number, value: number) {
        this.dimensions[row][col] = value
    }

    getRandomNumber(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    moveUp() {
        this.updateRowUp(0)
        this.updateRowUp(1)
        this.updateRowUp(2)
        this.updateRowUp(3)

    }

    moveDown() {
        this.updateColDown(0)
        this.updateColDown(1)
        this.updateColDown(2)
        this.updateColDown(3)

    }

    moveLeft() {
        this.updateRowLeft(0)
        this.updateRowLeft(1)
        this.updateRowLeft(2)
        this.updateRowLeft(3)

    }

    moveRight() {
        this.updateRowRight(0)
        this.updateRowRight(1)
        this.updateRowRight(2)
        this.updateRowRight(3)
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

                    const newValue = this.rules.apply(currentElement, leftElement);

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

                    const newValue = this.rules.apply(lastElement, rightElement)

                    if (newValue !== 0) {
                        newRow[i + d] = this.rules.apply(lastElement, rightElement)
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
