import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setAuth } from '../../redux/slices/userSlice';

function ProtectedRoute({ authRequired, element }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ user }) => user);
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (authRequired) {
      dispatch(setAuth());
    }
  }, [pathname, isAuth]);

  if (authRequired) {
    return isAuth ? element : <Navigate to='/login' replace />;
  } else {
    return isAuth ? <Navigate to='/' replace /> : element;
  }
};

export default ProtectedRoute;