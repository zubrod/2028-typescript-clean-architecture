"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseLocalStorage = void 0;
var DatabaseLocalStorage = /** @class */ (function () {
    function DatabaseLocalStorage() {
        this.key = 'game2048_state';
    }
    DatabaseLocalStorage.prototype.load = function () {
        var data = localStorage.getItem(this.key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    };
    DatabaseLocalStorage.prototype.save = function (dimensions) {
        localStorage.setItem(this.key, JSON.stringify(dimensions));
    };
    DatabaseLocalStorage.prototype.reset = function () {
        localStorage.removeItem(this.key);
    };
    return DatabaseLocalStorage;
}());
exports.DatabaseLocalStorage = DatabaseLocalStorage;
