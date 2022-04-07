import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setAuth } from '../../redux/slices/userSlice';

import { LoginForm } from '../../components';

import './Login.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector(({ user }) => user);

  React.useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleLoginFormSubmit = async (formValues) => {
    const { headers } = await axios.post('http://localhost:3001/login', formValues);

    localStorage.setItem('userToken', headers.authorization);
    dispatch(setAuth(true));
    navigate('/', { replace: true });
  };

  return (
    <LoginForm onFormSubmit={handleLoginFormSubmit} />
  )
};

export default Login;