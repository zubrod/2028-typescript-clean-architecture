import Rules from "../src/BasicRules"

describe("test multiply rule", () => {
    test("numbers should multiply when they are equal", () => {
        const rules = new Rules()
        expect(rules.apply(2, 2)).toBe(4)
    });

    test("numbers should return 0 if not equal", () => {
        const rules = new Rules()
        expect(rules.apply(6, 2)).toBe(0)
    });

    test("Check if game over when no empty cells exist", () => {

        //arrange
        const rules = new Rules()
        const dimensions = [[0, 2, 3, 4], [1, 2, 3, 4]]



        //act
        const isGameOver = rules.isGameOver(dimensions)

        //assert
        expect(isGameOver).toBeFalsy()
    });

    test("Should be game over with no empty cells", () => {
        //arrange
        const rules = new Rules()
        const dimensions = [[1, 2, 3, 4], [1, 2, 3, 4]]


        //act
        const isGameOver = rules.isGameOver(dimensions)

        //asser
        expect(isGameOver).toBeTruthy()
    });

});