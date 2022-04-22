import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthService from '../../services/AuthService';

import { logout } from '../../redux/slices/authSlice';

import Button from '@mui/material/Button';

import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(({ user }) => user);

  const handleTestButton = async () => {
    try {
      await AuthService.accessToken();
    } catch (err) {
      dispatch(logout());

      localStorage.removeItem('userToken');
    }
  };

  return (
    <div className="home-container">
      <div className="home-wrapper">
        <h1 className="home-title">Home page</h1>
        <div className="user-info">
          {userInfo ? (
            <>
              <p className="user-info-item">Username: {userInfo.username}</p>
              <p className="user-info-item">Email: {userInfo.email}</p>
              <p className="user-info-item">Role: {userInfo.role}</p>
            </>
          ) : (
            <p
              className="user-info-item"
              style={{ textAlign: 'center' }}
            >
              You are Phantom user.
              <br />
              <b>Sign in to be able to make your reservations.</b>
            </p>
          )}
        </div>
      </div>
      {userInfo && (
        <Button
          className="test-button"
          type="button"
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleTestButton}
        >
          Check Auth
        </Button>
      )}
    </div>
  )
};

export default Home;