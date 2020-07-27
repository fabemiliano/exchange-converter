import React from 'react';
import Converter from './components/Converter';
import Graph from './components/Graph';
import CurrencyProvider from './context/CurrencyContext';
import './App.css';

function App() {
  return (
    <div>
      <CurrencyProvider>
        <div className="back-color">
          <div className="front-color">
            <p>Exchange</p>
            <Converter />
            <Graph />
          </div>
        </div>
      </CurrencyProvider>
    </div>
  );
}

export default App;
