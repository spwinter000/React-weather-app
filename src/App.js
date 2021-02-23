import React from 'react';
import Forecast from './components/Forecast/Forecast';
import Logo from './components/Logo/Logo';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      {/* <h1>React Weather App</h1> */}
      {/* <Logo /> */}
      {/* </header> */}
      <main>
        <Forecast />
      </main>
      <footer>
        Page created by Scott Winter
      </footer>
    </div>
  );
}

export default App;
