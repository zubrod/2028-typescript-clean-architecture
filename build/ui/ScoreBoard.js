"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScoreBoard;
var react_1 = __importDefault(require("react"));
function ScoreBoard(_a) {
    var score = _a.score, highScore = _a.highScore;
    return (<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={boxStyle}>
                <div style={labelStyle}>SCORE</div>
                <div style={valueStyle}>{score}</div>
            </div>
            <div style={boxStyle}>
                <div style={labelStyle}>BEST</div>
                <div style={valueStyle}>{highScore}</div>
            </div>
        </div>);
}
var boxStyle = {
    background: '#bbada0',
    borderRadius: 4,
    padding: '8px 20px',
    textAlign: 'center',
    color: 'white',
    minWidth: 80,
};
var labelStyle = {
    fontSize: 12,
    fontWeight: 'bold',
};
var valueStyle = {
    fontSize: 20,
    fontWeight: 'bold',
};
