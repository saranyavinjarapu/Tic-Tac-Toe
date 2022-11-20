import { FC } from "react";
import { GameSquareBlockProps } from "./types";
import styles from "./Game.module.css";

export const GameSquareBlock: FC<GameSquareBlockProps> = (props) => {
  const { value, winner, onClick } = props;
  return (
    <button
      className={styles.gameSquareBlock}
      onClick={value ? undefined : onClick}
      disabled={value ? true : Boolean(winner)}
    >
      {value && value}
    </button>
  );
};
