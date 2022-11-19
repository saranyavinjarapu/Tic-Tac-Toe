import { useState, useEffect, FC } from "react";
import Confetti from "react-confetti";
import { ComboBox } from "../ComboBox/ComboBox";
import { GameSquareBlock } from "./GameSquareBlock";
import { GamePlayerType } from "./types";
import { calculateWinner } from "./helpers";
import styles from "./Game.module.css";

type GridSizeProps = {
  gridSizeSquaresFill: number;
  gridSizeValue: number;
};

export const GameContainer: FC = () => {
  const [gridSize, setGridSize] = useState<GridSizeProps>({
    gridSizeSquaresFill: 9,
    gridSizeValue: 3,
  });

  const [gameSquares, setGameSquares] = useState(
    Array(gridSize.gridSizeSquaresFill).fill(null)
  );
  const [winner, setWinner] = useState<GamePlayerType>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const gridSizeOptions: number[] = [3, 4, 5, 6];

  const resetGame = (e?: React.MouseEvent<HTMLButtonElement>) => {
    setGameSquares(Array(gridSize.gridSizeSquaresFill).fill(null));
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
    setGridSize({
      gridSizeSquaresFill: gridSize * gridSize,
      gridSizeValue: gridSize,
    });
    setGameSquares(Array(gridSize * gridSize).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  useEffect(() => {
    const winnerValue = calculateWinner(gameSquares, gridSize.gridSizeValue);
    if (winnerValue) {
      setWinner(winnerValue);
    }

    if (!winnerValue && !gameSquares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  }, [gameSquares, gridSize.gridSizeValue, setWinner]);

  return (
    <div className={styles.gameMain}>
      <div className={styles.gameInformation}>
        <h1>Tic Tac Toe</h1>
        <ComboBox
          comboOptions={gridSizeOptions}
          comboName="Grid Size : 3 X 3"
          onComboSelect={handleGridSizeSelect}
        ></ComboBox>
        {winner && winner !== "BOTH" && (
          <>
            <p className={styles.gameWinner}>Congratulations {winner}</p>
            <Confetti
              numberOfPieces={300}
              recycle={false}
              tweenDuration={5000}
            />
          </>
        )}
        {winner && winner === "BOTH" && (
          <>
            <p className={styles.gameWinner}>
              Congratulations you're both winners
            </p>
            <Confetti
              numberOfPieces={300}
              recycle={false}
              tweenDuration={5000}
            />
          </>
        )}
        <button className={styles.resetButton} onClick={resetGame}>
          Reset
        </button>
      </div>

      <div className={styles.gameContainer}>
        {!winner && (
          <p className={styles.showPlayerTurn}>
            Hey {currentPlayer}, it's your turn
          </p>
        )}

        <div
          className={styles.gameGrid}
          style={{
            gridTemplateColumns: `repeat(${gridSize.gridSizeValue},1fr`,
          }}
        >
          {Array(gridSize.gridSizeSquaresFill)
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
