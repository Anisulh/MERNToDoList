import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className='container'>
        <Hero />
        <img src='images\miniwindow.svg' alt='preview'/>
      </div>
    </div>
  );
}

export default App;
