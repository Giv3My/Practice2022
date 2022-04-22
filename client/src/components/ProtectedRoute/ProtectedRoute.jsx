import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { checkAuth } from '../../redux/slices/authSlice';

function ProtectedRoute({ isAuth, allowedRoles, userRole }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('userToken')) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    allowedRoles.includes(userRole) ?
      <Outlet /> :
      isAuth ?
        <Navigate to='/' replace /> :
        <Navigate to='/login' replace />
  )
};

export default ProtectedRoute;