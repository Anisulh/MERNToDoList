import React from 'react';

import './App.css';
import Home from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import List from './pages/List';

function App() {
  return (
    <>
      <Router>
        <div className='main-container'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/list' element={<List/>}/>
          </Routes>
        </div>

      </Router>
      
    </>
  );
}

export default App;
