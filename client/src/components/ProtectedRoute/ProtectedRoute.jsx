import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { checkAuth } from '../../redux/slices/userSlice';

function ProtectedRoute({ element: Component }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ user }) => user);

  React.useEffect(() => {
    if (localStorage.getItem('userToken')) {
      dispatch(checkAuth());
    }
  }, []);

  return isAuth ? Component : <Navigate to='/login' replace />;
}

export default ProtectedRoute;