"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rules_1 = __importDefault(require("../src/Rules"));
describe("test multiply rule", function () {
    test("numbers should multiply when they are equal", function () {
        var rules = new Rules_1.default();
        expect(rules.apply(2, 2)).toBe(4);
    });
    test("numbers should return 0 if not equal", function () {
        var rules = new Rules_1.default();
        expect(rules.apply(6, 2)).toBe(0);
    });
});
//# sourceMappingURL=Rules.test.js.map