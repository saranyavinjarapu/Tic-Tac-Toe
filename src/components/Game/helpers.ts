import { GamePlayerType } from "./types";

function generateWinningConditions(size: number) {
  let totalSquares: number = size * size;
  let winningSquares: any = new Array(size * 2);

  let diagonalOneCheck: string = "",
    diagonalTwoCheck: string = "";
  let diagonalOneCheckArray: string[] = [],
    diagonalTwoCheckArray: string[] = [];

  let i: number, j: number, k: number;
  let horizontalMoves: string[], verticalMoves: string[];

  for (i = 0; i < size; i++) {
    let horizontalCheck: string = "";
    let verticalCheck: string = "";
    for (j = 0; j < totalSquares; j++) {
      if (j / size === i) {
        horizontalCheck += j + ",";
        for (k = 1; k < size; k++) {
          horizontalCheck += j + k + ",";
        }
      }
      if (j % size === i) {
        verticalCheck += j + ",";
      }
    }
    horizontalCheck = horizontalCheck.substring(0, horizontalCheck.length - 1);
    verticalCheck = verticalCheck.substring(0, verticalCheck.length - 1);
    horizontalMoves = horizontalCheck.split(",");
    verticalMoves = verticalCheck.split(",");

    winningSquares[i] = verticalMoves;
    winningSquares[i + size] = horizontalMoves;

    diagonalOneCheck += i * (size + 1) + ",";
    diagonalTwoCheck += (i + 1) * (size - 1) + ",";
  }
  diagonalOneCheck = diagonalOneCheck.substring(0, diagonalOneCheck.length - 1);
  diagonalOneCheckArray = diagonalOneCheck.split(",");
  winningSquares.push(diagonalOneCheckArray);

  diagonalTwoCheck = diagonalTwoCheck.substring(0, diagonalTwoCheck.length - 1);
  diagonalTwoCheckArray = diagonalTwoCheck.split(",");
  winningSquares.push(diagonalTwoCheckArray);

  const winningCondition: number[][] = winningSquares;
  return winningCondition;
}
export const calculateWinner = (
  squares: GamePlayerType[],
  gridSize: number
) => {
  let i: number, j: number;
  const winningConditions: number[][] = generateWinningConditions(gridSize);
  for (i = 0; i < winningConditions.length; i++) {
    for (j = 0; j < winningConditions[i].length; j++) {
      if (
        squares[winningConditions[i][j]] &&
        squares[winningConditions[i][j]]
      ) {
        if (
          winningConditions[i].every(
            (val, index, arr) => squares[val] === squares[arr[0]]
          )
        ) {
          return squares[winningConditions[i][j]];
        }
      }
    }
  }
  return null;
};
