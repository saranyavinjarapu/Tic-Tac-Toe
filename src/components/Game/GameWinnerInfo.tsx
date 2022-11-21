import { FC } from "react";
import { GameWinnerInfoProps } from "./types";
import Confetti from "react-confetti";
import styles from "./Game.module.css";

export const GameWinnerInfo: FC<GameWinnerInfoProps> = (props) => {
  const { winner } = props;
  return (
    <>
      {winner && winner !== "BOTH" && (
        <>
          <p className={styles.gameWinner}>
            Congratulations <span>{winner}</span>
          </p>
          <Confetti numberOfPieces={300} recycle={false} tweenDuration={5000} />
        </>
      )}
      {winner && winner === "BOTH" && (
        <>
          <p className={styles.gameWinner}>
            Congratulations you're both winners
          </p>
          <Confetti numberOfPieces={300} recycle={false} tweenDuration={5000} />
        </>
      )}
    </>
  );
};
