import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Edit from './views/Edit';
import Create from './views/Create';
import injectContext from './/store/appContext'; 
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/create' element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default injectContext(App); 
