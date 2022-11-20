import { useState, useEffect, FC } from "react";
import { CustomComboBox } from "../CustomComboBox/CustomComboBox";
import { GameWinnerInfo } from "./GameWinnerInfo";
import { GameSquareBlock } from "./GameSquareBlock";
import { GamePlayerType } from "./types";
import { calculateWinner } from "./helpers";
import styles from "./Game.module.css";

export const GameContainer: FC = () => {
  const [gridSize, setGridSize] = useState<number>(3);

  const [gameSquares, setGameSquares] = useState(
    Array(gridSize * gridSize).fill(null)
  );
  const [winner, setWinner] = useState<GamePlayerType>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const gridSizeOptions: number[] = [3, 4, 5, 6];

  const resetGame = (e?: React.MouseEvent<HTMLButtonElement>) => {
    setGameSquares(Array(gridSize * gridSize).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  const handleGameSquareInput = (index: number) => {
    const updatedGameSquares = gameSquares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });
    setGameSquares(updatedGameSquares);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleGridSizeSelect = (gridSize: number) => {
    setGridSize(gridSize);
    setGameSquares(Array(gridSize * gridSize).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  useEffect(() => {
    const winnerValue = calculateWinner(gameSquares, gridSize);
    if (winnerValue) {
      setWinner(winnerValue);
    }

    if (!winnerValue && !gameSquares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  }, [gameSquares, gridSize, setWinner]);

  return (
    <div className={styles.gameMain}>
      <div className={styles.gameInformationSection}>
        <div>
          <h1>Tic Tac Toe</h1>
        </div>
        <CustomComboBox
          comboOptions={gridSizeOptions}
          comboName="Grid Size : 3 X 3"
          onComboSelect={handleGridSizeSelect}
        ></CustomComboBox>
        <button className={styles.resetButton} onClick={resetGame}>
          Reset
        </button>
      </div>

      <div className={styles.gamePlaySection}>
        {!winner ? (
          <p className={styles.showPlayerTurn}>
            Hey {currentPlayer}, it's your turn
          </p>
        ) : (
          <GameWinnerInfo winner={winner}></GameWinnerInfo>
        )}

        <div
          className={styles.gameGrid}
          style={{
            gridTemplateColumns: `repeat(${gridSize},1fr`,
          }}
        >
          {Array(gridSize * gridSize)
            .fill(null)
            .map((_, i) => {
              return (
                <GameSquareBlock
                  winner={winner}
                  key={i}
                  onClick={() => handleGameSquareInput(i)}
                  value={gameSquares[i]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
