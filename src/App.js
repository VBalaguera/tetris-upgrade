import "./App.css";
import Sections from "./components/Sections/Sections";

//data:
import data from "./data/data.json";

function App() {
  return (
    <div className="App">
      <Sections contents={data} />
    </div>
  );
}

export default App;
