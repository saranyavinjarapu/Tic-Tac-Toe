import { FC } from "react";
import styles from "./Header.module.css";
import gamesLogo from "../../icons/games.svg";

const Header: FC = () => (
  <div className={styles.Header}>
    <img src={gamesLogo} alt="Games Logo" />
    <h2>Team Building Games</h2>
    <h2>
      <a href="https://www.thesprucecrafts.com/tic-tac-toe-game-rules-412170">
        Game Manual
      </a>
    </h2>
  </div>
);

export default Header;
