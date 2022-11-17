import styles from "./Header.module.css";
import companyLogo from "../../images/grain_logo.svg";

export const Header: React.FC = () => {
  return (
    <div className={styles.Header}>
      <img src={companyLogo} alt="Grain Company Logo" />
      <h2>Team Building Games</h2>
      <h2>
        <a href="https://www.thesprucecrafts.com/tic-tac-toe-game-rules-412170">
          Game Manual
        </a>
      </h2>
    </div>
  );
};
