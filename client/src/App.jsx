import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Field from './pages/Field/Field';
import Navbar from './components/Navbar/Navbar';
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
