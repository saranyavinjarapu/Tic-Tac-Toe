export type GamePlayerType = "X" | "O" | "BOTH" | null;

export type GameSquareBlockProps = {
  value: GamePlayerType;
  winner: GamePlayerType;
  onClick: () => void;
};

export type GameWinnerInfoProps = {
  winner: GamePlayerType;
};
