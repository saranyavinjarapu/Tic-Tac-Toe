import { useState, useEffect, FC } from "react";
import { GameSquareBlock } from "./GameSquareBlock";
import { GamePlayerType } from "./types";
import { calculateWinner } from "./helpers";
import styles from "./Game.module.css";

export const GameContainer: FC = () => {
  const [gameSquares, setGameSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState<GamePlayerType>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );

  const resetGame = (e: React.MouseEvent<HTMLButtonElement>) => {
    setGameSquares(Array(9).fill(null));
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

  useEffect(() => {
    const winnerValue = calculateWinner(gameSquares);
    if (winnerValue) {
      setWinner(winnerValue);
    }

    if (!winnerValue && !gameSquares.filter((square) => !square).length) {
      setWinner("BOTH");
    }
  });

  return (
    <div className={styles.gameMain}>
      <h1>Tic Tac Toe</h1>
      {!winner && <p>Hey {currentPlayer}, it's your turn</p>}
      {winner && winner !== "BOTH" && <p>Congratulations {winner}</p>}
      {winner && winner === "BOTH" && (
        <p>Congratulations you're both winners</p>
      )}
      <div className={styles.gameContainer}>
        {Array(9)
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
      <button className={styles.resetButton} onClick={resetGame}>
        Reset
      </button>
    </div>
  );
};
