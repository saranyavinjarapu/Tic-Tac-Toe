import { Header } from "../components/Header/Header";
import { GameContainer } from "../components/Game/GameContainer";
import "../styles/Globals.css";

function App() {
  return (
    <div className="main">
      <Header></Header>
      <GameContainer></GameContainer>
    </div>
  );
}

export default App;
