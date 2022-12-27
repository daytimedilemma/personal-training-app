import axios from "axios";
function App() {

  function getTest(){
    axios.get("/api/client/")
  }
  return (
    <div>
      <h1>Testing</h1>
    </div>
  );
}

export default App;
