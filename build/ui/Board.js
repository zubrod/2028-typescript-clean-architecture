"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Board;
var react_1 = __importDefault(require("react"));
var TILE_COLORS = {
    0: { bg: '#cdc1b4', fg: '#776e65' },
    2: { bg: '#eee4da', fg: '#776e65' },
    4: { bg: '#ede0c8', fg: '#776e65' },
    8: { bg: '#f2b179', fg: '#f9f6f2' },
    16: { bg: '#f59563', fg: '#f9f6f2' },
    32: { bg: '#f67c5f', fg: '#f9f6f2' },
    64: { bg: '#f65e3b', fg: '#f9f6f2' },
    128: { bg: '#edcf72', fg: '#f9f6f2' },
    256: { bg: '#edcc61', fg: '#f9f6f2' },
    512: { bg: '#edc850', fg: '#f9f6f2' },
    1024: { bg: '#edc53f', fg: '#f9f6f2' },
    2048: { bg: '#edc22e', fg: '#f9f6f2' },
};
function Board(_a) {
    var board = _a.board;
    return (<div style={gridStyle}>
            {board.map(function (row, rowIdx) {
            return row.map(function (value, colIdx) {
                var _a;
                var colors = (_a = TILE_COLORS[value]) !== null && _a !== void 0 ? _a : { bg: '#3c3a32', fg: '#f9f6f2' };
                return (<div key={"".concat(rowIdx, "-").concat(colIdx)} style={__assign(__assign({}, tileStyle), { background: colors.bg, color: colors.fg })}>
                            {value !== 0 ? value : ''}
                        </div>);
            });
        })}
        </div>);
}
var gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 80px)',
    gridTemplateRows: 'repeat(4, 80px)',
    gap: 8,
    background: '#bbada0',
    borderRadius: 6,
    padding: 8,
};
var tileStyle = {
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    fontSize: 24,
    fontWeight: 'bold',
};
