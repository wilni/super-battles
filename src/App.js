import logo from './logo.svg';
import axios from 'axios';
import './App.css';



// async function loadHeros() {
//   let hero = await axios.get(`https://localhost:8080/heros`)
//   // console.log(hero[0]);
// }

// loadHeros();



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
