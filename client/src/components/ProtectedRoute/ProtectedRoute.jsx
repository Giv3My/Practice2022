import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setAuth } from '../../redux/slices/userSlice';

function ProtectedRoute({ element }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(({ user }) => user);
  const { pathname } = useLocation();

  React.useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    const accessToken = localStorage.getItem('userToken');

    try {
      await axios.get('http://localhost:3001/accessToken', {
        headers: {
          Authorization: accessToken
        }
      });

      dispatch(setAuth(true));
    } catch (error) {
      try {
        const { headers } = await axios.get('http://localhost:3001/refreshToken');

        localStorage.setItem('userToken', headers.authorization);
      } catch (err) {
        localStorage.removeItem('userToken');
        dispatch(setAuth(false));
      }
    };
  };

  return isAuth ? element : <Navigate to='/login' replace />;
}

export default ProtectedRoute;