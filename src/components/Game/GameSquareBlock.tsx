import { FC } from "react";
import { GameSquareBlockProps } from "./types";
import styles from "./Game.module.css";

const GameSquareBlock: FC<GameSquareBlockProps> = (props) => {
  const { value, winner, onClick } = props;
  return (
    <button
      type="button"
      className={styles.gameSquareBlock}
      onClick={value ? undefined : onClick}
      disabled={value ? true : Boolean(winner)}
    >
      {value && value}
    </button>
  );
};

export default GameSquareBlock;
