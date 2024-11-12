import React, { useEffect, useState } from "react";
import "./App.css";
import { TSquare } from "./types";
import { createBoard, randomizeMines, getMinesAround } from "./helper";

const ROWS = 10;
const COLS = 10;
const MINES = 10;

function App() {
  const init = () => {
    let squares = createBoard(ROWS, COLS);
    squares = randomizeMines(squares, MINES);
    squares = getMinesAround(squares);

    return squares;
  };
  const [squares, setSquares] = useState<TSquare[][]>(init());

  const reveal = (rowIdx: number, colIdx: number) => {
    if (squares[rowIdx][colIdx].isRevealed || squares[rowIdx][colIdx].isFlagged)
      return;

    if (squares[rowIdx][colIdx].hasBomb) {
      alert("Game Over!");
      setSquares(init());
      return;
    }

    const stack = [{ rowIdx, colIdx }];

    while (stack.length > 0) {
      const { rowIdx, colIdx } = stack.pop()!;

      const currentCell = squares[rowIdx][colIdx];

      if (!currentCell.isRevealed) {
        currentCell.isRevealed = true;

        if (!currentCell.hasBomb && currentCell.neighborBombs === 0) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = rowIdx + i;
              const newCol = colIdx + j;
              if (
                newRow >= 0 &&
                newRow < ROWS &&
                newCol >= 0 &&
                newCol < COLS &&
                !squares[newRow][newCol].hasBomb &&
                !squares[newRow][newCol].isRevealed
              ) {
                stack.push({ rowIdx: newRow, colIdx: newCol });
              }
            }
          }
        }
      }
    }

    setSquares([...squares]);
  };

  const setFlag = (
    e: React.MouseEvent<HTMLDivElement>,
    rowIdx: number,
    colIdx: number
  ) => {
    e.preventDefault();
    if (squares[rowIdx][colIdx].isRevealed) return;

    const newSquares = [...squares];
    newSquares[rowIdx][colIdx].isFlagged =
      !newSquares[rowIdx][colIdx].isFlagged;

    setSquares(newSquares);
  };

  useEffect(() => {
    const revealed = squares.reduce((acc, row) => {
      acc += row.reduce((acc2, sq) => {
        acc2 += sq.isRevealed ? 1 : 0;
        return acc2;
      }, 0);
      return acc;
    }, 0);

    if (revealed === ROWS * COLS - MINES) {
      alert("You won!");
      setSquares(init());
      return;
    }
  }, [squares]);

  return (
    <div className="App">
      {squares.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((square, colIdx) => (
            <div
              key={colIdx}
              className={`square square--${square.isRevealed && "revealed"}`}
              data-value={square.neighborBombs}
              onClick={() => reveal(rowIdx, colIdx)}
              onContextMenu={(e) => setFlag(e, rowIdx, colIdx)}
            >
              {square.isRevealed && square.neighborBombs !== 0
                ? square.neighborBombs
                : ""}

              {square.isFlagged ? "🚩" : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
