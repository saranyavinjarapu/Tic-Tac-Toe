import { useState, useEffect, FC } from "react";
import CustomComboBox from "../CustomComboBox/CustomComboBox";
import GameWinnerInfo from "./GameWinnerInfo";
import GameSquareBlock from "./GameSquareBlock";
import { GamePlayerType } from "./types";
import calculateWinner from "./helpers";
import { getGameDataLocalStorage } from "../../utils";
import gridSizeOptions from "../../data";
import styles from "./Game.module.css";

const GameContainer: FC = () => {
  const [gridSize, setGridSize] = useState<number>(3);

  const gameData = getGameDataLocalStorage();

  const [gameSquares, setGameSquares] = useState(
    Array(gridSize * gridSize).fill(null)
  );
  const [winner, setWinner] = useState<GamePlayerType>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );

  const resetGame = () => {
    setGameSquares(Array(gridSize * gridSize).fill(null));
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

  const handleGridSizeSelect = (gridSizeValue: number) => {
    setGridSize(gridSizeValue);
    setGameSquares(Array(gridSizeValue * gridSizeValue).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  };

  useEffect(() => {
    const winnerValue = calculateWinner(gameSquares, gridSize);
    if (winnerValue) {
      setWinner(winnerValue);
    }
  }, [gameSquares, gridSize, setWinner]);

  return (
    <div className={styles.gameMain}>
      <div className={styles.gameInformationSection}>
        <div>
          <h1>Tic Tac Toe</h1>
        </div>
        <CustomComboBox
          comboOptions={gridSizeOptions}
          comboName="Grid Size"
          defaultOption="3 X 3"
          onComboSelect={handleGridSizeSelect}
        />
        <div className={styles.gameData}>
          <b style={{ border: "none", transform: "scaleY(1.3)" }}>WINS :</b>
          <b> X = {gameData.X}</b>
          <b> O = {gameData.O}</b>
          <b>TIE = {gameData.BOTH}</b>
        </div>
        <button
          type="button"
          className={styles.resetButton}
          onClick={resetGame}
        >
          Reset
        </button>
      </div>

      <div className={styles.gamePlaySection}>
        {!winner ? (
          <p className={styles.showPlayerTurn}>
            Hey {currentPlayer}, it is your turn
          </p>
        ) : (
          <GameWinnerInfo winner={winner} />
        )}

        <div
          className={styles.gameGrid}
          style={{
            gridTemplateColumns: `repeat(${gridSize},1fr`
          }}
        >
          {Array(gridSize * gridSize)
            .fill(null)
            .map((_, i) => (
              <GameSquareBlock
                winner={winner}
                key={i} // eslint-disable-line
                onClick={() => handleGameSquareInput(i)}
                value={gameSquares[i]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
