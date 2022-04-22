import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import { role, allRoles } from './common/constants/roles';

import { Navbar, ProtectedRoute, SignUpModal } from './components';
import { Home, Login, Field, Admin } from './pages';

import './App.css';

function App() {
  const { pathname } = useLocation();
  const { isAuth } = useSelector(({ auth }) => auth);
  const { userInfo } = useSelector(({ user }) => user);

  const [isAdmin, setIsAdmin] = React.useState(false);
  const [userRole, setUserRole] = React.useState(userInfo?.role || role.phantom);

  React.useEffect(() => {
    if (isAuth) {
      setUserRole(userInfo.role);
      setIsAdmin(userInfo.role === role.admin);
    } else {
      setIsAdmin(false);
      setUserRole(role.phantom);
    }
  }, [isAuth]);
  return (
    <>
      {(pathname !== '/login') && (
        <Navbar isAuth={isAuth} isAdmin={isAdmin} />
      )}
      <div className={pathname !== '/login' ? "app-container" : ''}>
        <Routes>
          <Route element={<ProtectedRoute isAuth={isAuth} allowedRoles={allRoles} userRole={userRole} />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/booking' element={<Field isAuth={isAuth} currentUserId={userInfo?.id} />} />
          </Route>
          <Route element={<ProtectedRoute isAuth={isAuth} allowedRoles={[role.admin]} userRole={userRole} />}>
            <Route exact path='/admin' element={<Admin />} />
          </Route>
          <Route exact path='/login' element={<Login isAuth={isAuth} />} />
        </Routes>
      </div>
      <SignUpModal />
    </>
  );
};

export default App;