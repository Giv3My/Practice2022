import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './components';
import { Home, Login, Field } from './pages';

import './App.css';

function App() {
  return (
    <Routes>
      <Route
        exact
        path='/'
        element={<ProtectedRoute authRequired={true} element={<Home />} />}
      />
      <Route
        exact
        path='/booking'
        element={<ProtectedRoute authRequired={true} element={<Field />} />}
      />
      <Route
        exact
        path='/login'
        element={<ProtectedRoute authRequired={false} element={<Login />} />}
      />
    </Routes>
  );
}

export default App;
