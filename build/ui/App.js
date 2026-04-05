"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var react_1 = __importStar(require("react"));
var Game_1 = __importDefault(require("../application/Game"));
var DatabaseLocalStorage_1 = require("../infrastructure/DatabaseLocalStorage");
var Board_1 = __importDefault(require("./Board"));
var ScoreBoard_1 = __importDefault(require("./ScoreBoard"));
var db = new DatabaseLocalStorage_1.DatabaseLocalStorage();
var game = new Game_1.default(0, db);
function App() {
    var _a = (0, react_1.useState)(function () { return game.getBoard().map(function (row) { return __spreadArray([], row, true); }); }), board = _a[0], setBoard = _a[1];
    var _b = (0, react_1.useState)(function () { return game.getCurrentScore(); }), score = _b[0], setScore = _b[1];
    var _c = (0, react_1.useState)(function () { return game.getHighScore(); }), highScore = _c[0], setHighScore = _c[1];
    var _d = (0, react_1.useState)(false), gameOver = _d[0], setGameOver = _d[1];
    var _e = (0, react_1.useState)(false), gameWon = _e[0], setGameWon = _e[1];
    var updateState = (0, react_1.useCallback)(function () {
        setBoard(game.getBoard().map(function (row) { return __spreadArray([], row, true); }));
        setScore(game.getCurrentScore());
        setHighScore(game.getHighScore());
        var over = game.isGameOver();
        setGameOver(over);
        var won = game.isGameWon();
        setGameWon(won);
        if (!over)
            game.save();
    }, []);
    (0, react_1.useEffect)(function () {
        var handleKeyDown = function (e) {
            if (gameWon) {
                return;
            }
            if (gameOver) {
                return;
            }
            switch (e.key) {
                case 'ArrowUp':
                    game.moveUp();
                    break;
                case 'ArrowDown':
                    game.moveDown();
                    break;
                case 'ArrowLeft':
                    game.moveLeft();
                    break;
                case 'ArrowRight':
                    game.moveRight();
                    break;
                default: return;
            }
            e.preventDefault();
            updateState();
        };
        window.addEventListener('keydown', handleKeyDown);
        return function () { return window.removeEventListener('keydown', handleKeyDown); };
    }, [gameOver, updateState, gameWon]);
    var handleNewGame = function () {
        db.reset();
        game.init(4, 4);
        game.currentScore = 0;
        setGameOver(false);
        updateState();
    };
    return (<div style={containerStyle}>
            <h1 style={titleStyle}>2048</h1>
            <ScoreBoard_1.default score={score} highScore={highScore}/>
            <Board_1.default board={board}/>
            {gameOver && <div style={gameOverStyle}>Game Over!</div>}
            {gameWon && <div style={gameOverStyle}>Game Won!</div>}
            <button onClick={handleNewGame} style={buttonStyle}>New Game</button>
            <p style={hintStyle}>Pfeiltasten zum Spielen</p>
        </div>);
}
var containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: 20,
    background: '#faf8ef',
    minHeight: '100vh',
};
var titleStyle = {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#776e65',
    margin: '0 0 16px',
};
var gameOverStyle = {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f65e3b',
};
var buttonStyle = {
    marginTop: 16,
    padding: '10px 24px',
    fontSize: 16,
    background: '#8f7a66',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
};
var hintStyle = {
    marginTop: 12,
    color: '#bbada0',
    fontSize: 14,
};
