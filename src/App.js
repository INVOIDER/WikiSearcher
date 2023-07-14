import Header from "./Components/header/header";
import WikiSearcher from "./Components/WikiSearcher/WikiSearcher";
import "./styles/App.css"
function App() {
  return (
    <div className="App">
      <Header/>
        <div className="content-wrapper">
            <WikiSearcher/>
        </div>
    </div>
  );
}

export default App;
