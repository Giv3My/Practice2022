import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../../redux/slices/authSlice';

import { FORM_ERROR } from 'final-form';
import { LoginForm } from '../../components';

import './Login.css';

function Login({ isAuth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  React.useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true });
    }
  }, []);

  const handleLoginFormSubmit = async (formValues) => {
    setEmailError(false);
    setPasswordError(false);

    try {
      await dispatch(login(formValues)).unwrap();

      navigate('/', { replace: true });
    } catch (err) {
      switch (err) {
        case 'Incorrect email':
          setEmailError(true);
          return { [FORM_ERROR]: 'Incorrect email' }
        case 'Incorrect password':
          setPasswordError(true);
          return { [FORM_ERROR]: 'Incorrect password' }
        default:
          break;
      };
    }
  };

  return (
    <LoginForm
      onFormSubmit={handleLoginFormSubmit}
      emailError={emailError}
      passwordError={passwordError}
    />
  )
};

export default Login;