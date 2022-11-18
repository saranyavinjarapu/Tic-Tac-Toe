import { useState, useEffect, FC } from "react";
import Confetti from "react-confetti";
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
  }, [gameSquares, setWinner]);

  return (
    <div className={styles.gameMain}>
      <div>
        <h1>Tic Tac Toe</h1>
        {!winner && (
          <p className={styles.showPlayerTurn}>
            Hey {currentPlayer}, it's your turn
          </p>
        )}
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
    </div>
  );
};
