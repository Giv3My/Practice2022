import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './components';
import { Home, Login, Field } from './pages';

import './App.css';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<ProtectedRoute element={<Home />} />} />
      <Route exact path='/booking' element={<ProtectedRoute element={<Field />} />} />
      <Route exact path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
