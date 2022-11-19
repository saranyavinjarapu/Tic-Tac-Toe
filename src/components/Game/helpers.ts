import { GamePlayerType } from "./types";

const createBoardMatrix = (
  squaresArray: GamePlayerType[] | any,
  size: number
) => {
  var res: GamePlayerType[] = [];
  for (var i = 0; i < squaresArray.length; i = i + size)
    res.push(squaresArray.slice(i, i + size));
  return res;
};
export const calculateWinner = (squares: GamePlayerType[], size: number) => {
  createBoardMatrix(squares, size);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
