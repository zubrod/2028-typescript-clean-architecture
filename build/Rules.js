"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rules = /** @class */ (function () {
    function Rules() {
    }
    Rules.prototype.apply = function (a, b) {
        var newValue = this.calculateNewValue(a, b);
        return newValue;
    };
    Rules.prototype.calculateNewValue = function (a, b) {
        if (a === b) {
            return a + b;
        }
        else {
            return 0;
        }
    };
    return Rules;
}());
exports.default = Rules;
//# sourceMappingURL=Rules.js.map