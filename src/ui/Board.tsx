import React from 'react'

interface Props {
    board: number[][]
}

const TILE_COLORS: Record<number, { bg: string; fg: string }> = {
    0:    { bg: '#cdc1b4', fg: '#776e65' },
    2:    { bg: '#eee4da', fg: '#776e65' },
    4:    { bg: '#ede0c8', fg: '#776e65' },
    8:    { bg: '#f2b179', fg: '#f9f6f2' },
    16:   { bg: '#f59563', fg: '#f9f6f2' },
    32:   { bg: '#f67c5f', fg: '#f9f6f2' },
    64:   { bg: '#f65e3b', fg: '#f9f6f2' },
    128:  { bg: '#edcf72', fg: '#f9f6f2' },
    256:  { bg: '#edcc61', fg: '#f9f6f2' },
    512:  { bg: '#edc850', fg: '#f9f6f2' },
    1024: { bg: '#edc53f', fg: '#f9f6f2' },
    2048: { bg: '#edc22e', fg: '#f9f6f2' },
}

export default function Board({ board }: Props) {
    return (
        <div style={gridStyle}>
            {board.map((row, rowIdx) =>
                row.map((value, colIdx) => {
                    const colors = TILE_COLORS[value] ?? { bg: '#3c3a32', fg: '#f9f6f2' }
                    return (
                        <div key={`${rowIdx}-${colIdx}`} style={{ ...tileStyle, background: colors.bg, color: colors.fg }}>
                            {value !== 0 ? value : ''}
                        </div>
                    )
                })
            )}
        </div>
    )
}

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 80px)',
    gridTemplateRows: 'repeat(4, 80px)',
    gap: 8,
    background: '#bbada0',
    borderRadius: 6,
    padding: 8,
}

const tileStyle: React.CSSProperties = {
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    fontSize: 24,
    fontWeight: 'bold',
}
