import React from 'react'

interface Props {
    score: number
    highScore: number
}

export default function ScoreBoard({ score, highScore }: Props) {
    return (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={boxStyle}>
                <div style={labelStyle}>SCORE</div>
                <div style={valueStyle}>{score}</div>
            </div>
            <div style={boxStyle}>
                <div style={labelStyle}>BEST</div>
                <div style={valueStyle}>{highScore}</div>
            </div>
        </div>
    )
}

const boxStyle: React.CSSProperties = {
    background: '#bbada0',
    borderRadius: 4,
    padding: '8px 20px',
    textAlign: 'center',
    color: 'white',
    minWidth: 80,
}

const labelStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 'bold',
}

const valueStyle: React.CSSProperties = {
    fontSize: 20,
    fontWeight: 'bold',
}
