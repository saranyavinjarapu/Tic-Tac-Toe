import { GamePlayerType } from "./types";
import { getGameDataLocalStorage, setGameDataLocalStorage } from "../../utils";

function generateWinningConditions(size: number) {
  const totalSquares: number = size * size;
  const winningSquares: any = new Array(size * 2);

  let diagonalOneCheck: string = "";
  let diagonalTwoCheck: string = "";
  let diagonalOneCheckArray: string[] = [];
  let diagonalTwoCheckArray: string[] = [];

  let i: number;
  let j: number;
  let k: number;
  let horizontalMoves: string[];
  let verticalMoves: string[];

  for (i = 0; i < size; i += 1) {
    let horizontalCheck: string = "";
    let verticalCheck: string = "";
    for (j = 0; j < totalSquares; j += 1) {
      if (j / size === i) {
        horizontalCheck += `${j},`;
        for (k = 1; k < size; k += 1) {
          horizontalCheck += `${j + k},`;
        }
      }
      if (j % size === i) {
        verticalCheck += `${j},`;
      }
    }
    horizontalCheck = horizontalCheck.substring(0, horizontalCheck.length - 1);
    verticalCheck = verticalCheck.substring(0, verticalCheck.length - 1);
    horizontalMoves = horizontalCheck.split(",");
    verticalMoves = verticalCheck.split(",");

    winningSquares[i] = verticalMoves;
    winningSquares[i + size] = horizontalMoves;

    diagonalOneCheck += `${i * (size + 1)},`;
    diagonalTwoCheck += `${(i + 1) * (size - 1)},`;
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
const calculateWinner = (squares: GamePlayerType[], gridSize: number) => {
  let i: number;
  let j: number;
  const winningConditions: number[][] = generateWinningConditions(gridSize);
  const newGameData = getGameDataLocalStorage();
  for (i = 0; i < winningConditions.length; i += 1) {
    for (j = 0; j < winningConditions[i].length; j += 1) {
      if (
        squares[winningConditions[i][j]] &&
        squares[winningConditions[i][j]]
      ) {
        if (
          winningConditions[i].every(
            (val, index, arr) => squares[val] === squares[arr[0]]
          )
        ) {
          if (squares[winningConditions[i][j]] === "X") newGameData.X += 1;
          else if (squares[winningConditions[i][j]] === "O") newGameData.O += 1;

          setGameDataLocalStorage(newGameData);
          return squares[winningConditions[i][j]];
        }
      }
    }
  }
  const newSquares = squares.filter(Boolean);
  if (newSquares.length === squares.length) {
    newGameData.BOTH += 1;
    setGameDataLocalStorage(newGameData);
    return "BOTH";
  }
  return null;
};

export default calculateWinner;
