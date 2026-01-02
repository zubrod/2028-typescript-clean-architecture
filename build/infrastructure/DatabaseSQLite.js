"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSQLite = void 0;
var better_sqlite3_1 = __importDefault(require("better-sqlite3"));
var DatabaseSQLite = /** @class */ (function () {
    function DatabaseSQLite() {
        this.db = new better_sqlite3_1.default('game.db');
        this.db.exec("\n  CREATE TABLE IF NOT EXISTS savefile (\n    id INTEGER PRIMARY KEY AUTOINCREMENT,\n    gamestate TEXT NOT NULL,\n    created_at TEXT DEFAULT CURRENT_TIMESTAMP\n  )\n");
    }
    DatabaseSQLite.prototype.load = function () {
        var insert = this.db.prepare('SELECT gamestate from savefile');
        var dimensionJSON = insert.get();
        if (dimensionJSON) {
            var dimension = JSON.parse(dimensionJSON.gamestate);
            return dimension;
        }
        return null;
    };
    DatabaseSQLite.prototype.reset = function () {
        var reset = this.db.prepare('DELETE FROM savefile');
        reset.run();
    };
    DatabaseSQLite.prototype.save = function (dimensions) {
        var isAlreadySaved = this.load();
        var dimensionJSON = JSON.stringify(dimensions);
        if (isAlreadySaved) {
            var update = this.db.prepare('UPDATE savefile set gamestate = @state');
            update.run({ state: dimensionJSON });
        }
        else {
            var insert = this.db.prepare('INSERT INTO savefile (gamestate) VALUES (@state)');
            insert.run({ state: dimensionJSON });
        }
    };
    return DatabaseSQLite;
}());
exports.DatabaseSQLite = DatabaseSQLite;
