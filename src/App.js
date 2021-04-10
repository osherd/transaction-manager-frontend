import "./App.css";
import Paying from "./Paying";
import Recieving from "./Recieving";

const App = () => {
  return (
    <div className="App">
      <h1>Home Assignment</h1>
      <div className="paying-container">
        <Paying />
        <Recieving />
      </div>
      <button onClick>Add new Transaction</button>
      <button onClick>Compress Transactions </button>
    </div>
  );
};

export default App;
