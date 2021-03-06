import React from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
            <Route path='/lists' element={<List/>}/>
          </Routes>
        </div>

      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
