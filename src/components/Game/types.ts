export type GamePlayerType = "X" | "O" | "BOTH" | null;

export type GameSquareBlockProps = {
  value: GamePlayerType;
  winner: GamePlayerType;
  onClick: () => void;
};
