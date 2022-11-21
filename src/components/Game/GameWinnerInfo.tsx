import { FC } from "react";
import Confetti from "react-confetti";
import { GameWinnerInfoProps } from "./types";
import styles from "./Game.module.css";

const GameWinnerInfo: FC<GameWinnerInfoProps> = (props) => {
  const { winner } = props;
  return (
    <>
      {winner && winner !== "BOTH" && (
        <>
          <p className={styles.gameWinner}>
            Congratulations
            <span>{winner}</span>
          </p>
          <Confetti numberOfPieces={300} recycle={false} tweenDuration={5000} />
        </>
      )}
      {winner && winner === "BOTH" && (
        <>
          <p className={styles.gameWinner}>
            Congratulations you are both winners
          </p>
          <Confetti numberOfPieces={300} recycle={false} tweenDuration={5000} />
        </>
      )}
    </>
  );
};
export default GameWinnerInfo;
