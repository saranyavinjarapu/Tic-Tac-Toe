import { Header } from "../components/Header/Header";
import { GameContainer } from "../components/Game/GameContainer";
import styles from "../styles/HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={styles.main}>
      <Header></Header>
      <GameContainer></GameContainer>
    </div>
  );
};
