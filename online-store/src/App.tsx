import './App.css';
import logo from './logo.svg';
import SVG from 'react-inlinesvg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SVG src={logo} className="App-logo"/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
