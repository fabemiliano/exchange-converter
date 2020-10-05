import React, {useState} from 'react';
import Converter from './components/Converter';
import Graph from './components/Graph';
import CurrencyProvider from './context/CurrencyContext';
import './App.css';

function App() {
  return (
      <CurrencyProvider>
        <div className="back-color">
          <div className="front-color">
            <p>Exchange</p>
            <Converter />
            <Graph />
            <p className="quadrado" ></p>
          </div>
        </div>
      </CurrencyProvider>
  );
}

export default App;
