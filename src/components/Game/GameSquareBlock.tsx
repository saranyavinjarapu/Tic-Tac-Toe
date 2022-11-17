import { FC } from "react";
import { GameSquareBlockProps } from "./types";
import styles from "./Game.module.css";

export const GameSquareBlock: FC<GameSquareBlockProps> = (props) => {
  const { value, winner, onClick } = props;

  if (!value) {
    return (
      <button
        className={styles.squareBlock}
        onClick={onClick}
        disabled={Boolean(winner)}
      />
    );
  }
  return (
    <button
      className={styles.squareBlock + " " + styles[`$squareBlockVariant`]}
      disabled
    >
      {value}
    </button>
  );
};
