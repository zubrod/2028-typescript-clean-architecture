import React, { useState, useEffect, useCallback } from 'react'
import Game2048 from '../application/Game'
import { DatabaseLocalStorage } from '../infrastructure/DatabaseLocalStorage'
import Board from './Board'
import ScoreBoard from './ScoreBoard'

const db = new DatabaseLocalStorage()
const game = new Game2048(0, db)

export default function App() {
    const [board, setBoard] = useState<number[][]>(() => game.getBoard().map(row => [...row]))
    const [score, setScore] = useState(() => game.getCurrentScore())
    const [highScore, setHighScore] = useState(() => game.getHighScore())
    const [gameOver, setGameOver] = useState(false)
    const [gameWon, setGameWon] = useState(false)

    const updateState = useCallback(() => {
        setBoard(game.getBoard().map(row => [...row]))
        setScore(game.getCurrentScore())
        setHighScore(game.getHighScore())
        const over = game.isGameOver()
        setGameOver(over)
        const won = game.isGameWon()
        setGameWon(won)
        if (!over) game.save()
    }, [])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {

            if (gameWon) {
                return;
            }

            if (gameOver) {
                return
            }
            switch (e.key) {
                case 'ArrowUp': game.moveUp(); break
                case 'ArrowDown': game.moveDown(); break
                case 'ArrowLeft': game.moveLeft(); break
                case 'ArrowRight': game.moveRight(); break
                default: return
            }
            e.preventDefault()
            updateState()
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [gameOver, updateState, gameWon])

    const handleNewGame = () => {
        db.reset()
        game.init(4, 4)
        game.currentScore = 0
        setGameOver(false)
        updateState()
    }

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>2048</h1>
            <ScoreBoard score={score} highScore={highScore} />
            <Board board={board} />
            {gameOver && <div style={gameOverStyle}>Game Over!</div>}
            {gameWon && <div style={gameOverStyle}>Game Won!</div>}
            <button onClick={handleNewGame} style={buttonStyle}>New Game</button>
            <p style={hintStyle}>Pfeiltasten zum Spielen</p>
        </div>
    )
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: 20,
    background: '#faf8ef',
    minHeight: '100vh',
}

const titleStyle: React.CSSProperties = {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#776e65',
    margin: '0 0 16px',
}

const gameOverStyle: React.CSSProperties = {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f65e3b',
}

const buttonStyle: React.CSSProperties = {
    marginTop: 16,
    padding: '10px 24px',
    fontSize: 16,
    background: '#8f7a66',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
}

const hintStyle: React.CSSProperties = {
    marginTop: 12,
    color: '#bbada0',
    fontSize: 14,
}
