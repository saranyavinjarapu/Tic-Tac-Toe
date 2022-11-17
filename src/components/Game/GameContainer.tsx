import { useState, FC } from "react";
import { GameSquareBlock } from "./GameSquareBlock";
import { GamePlayerType } from "./types";
import styles from "./Game.module.css";

export const GameContainer: FC = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState<GamePlayerType>(null);
  return (
    <div className={styles.gameMain}>
      <h1>Tic Tac Toe</h1>
      <div className={styles.gameContainer}>
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <GameSquareBlock
                winner={winner}
                key={i}
                onClick={() => alert("hey")}
                value={squares[i]}
              />
            );
          })}
      </div>
      <button className={styles.resetButton}>Reset</button>
    </div>
  );
};
