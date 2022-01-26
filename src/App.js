import "./App.css";
import Sections from "./components/Sections/Sections";
import Game from "./components/Game/Game";

//data:
import data from "./data/data.json";

function App() {
  return (
    <div className="App">
      <Sections contents={data} />
      <Game />
    </div>
  );
}

export default App;
