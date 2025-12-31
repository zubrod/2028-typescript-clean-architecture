import Rules from "../src/Rules"

describe("test multiply rule", () => {
    test("numbers should multiply when they are equal", () => {
        const rules = new Rules()
        expect(rules.apply(2, 2)).toBe(4)
    });

    test("numbers should return 0 if not equal", () => {
        const rules = new Rules()
        expect(rules.apply(6, 2)).toBe(0)
    });

});