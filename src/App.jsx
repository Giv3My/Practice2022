import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Field from './components/Field/Field';
import Login from './components/Login/Login';
import './App.css';

function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/"
          element={<ProtectedRoutes element={<Home />} />}
        />
        <Route exact path="/booking"
          element={<ProtectedRoutes element={<Field />} />}
        />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
