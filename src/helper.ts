import { TSquare } from "./types";

export const createBoard = (rows: number, columns: number): TSquare[][] => {
  return new Array(rows).fill(null).map(() =>
    new Array(columns).fill(null).map(() => ({
      isRevealed: false,
      isFlagged: false,
      hasBomb: false,
      neighborBombs: 0,
    }))
  );
};

export const randomizeMines = (squares: TSquare[][], mines: number) => {
  const rows = squares.length;
  const columns = squares[0].length;

  let distinctNumbers = new Set<number>();

  while (distinctNumbers.size < mines) {
    let number = Math.floor(Math.random() * rows * columns);
    distinctNumbers.add(number);
  }

  Array.from(distinctNumbers).forEach((num) => {
    const row = Math.floor(num / rows);
    const col = Math.floor(num % columns);
    squares[row][col].hasBomb = true;
  });

  return squares;
};

export const getMinesAround = (squares: TSquare[][]) => {
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares[0].length; j++) {
      if (squares[i][j].hasBomb) continue;
      let mines = 0;
      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++)
          if (squares?.[k]?.[l]?.hasBomb) {
            mines++;
          }
      }
      squares[i][j].neighborBombs = mines;
    }
  }
  return squares;
};
