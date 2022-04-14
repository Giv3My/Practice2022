import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthService from '../../services/AuthService';
import { setAuth } from '../../redux/slices/userSlice';

import { Navbar } from '../../components';
import Button from '@mui/material/Button';

import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(({ user }) => user);

  const handleTestButton = async () => {
    try {
      await AuthService.accessToken();
    } catch (err) {
      dispatch(setAuth(false));
      localStorage.removeItem('userToken');
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-wrapper">
          <h1 className="home-title">Home page</h1>
          <div className="user-info">
            <p className="user-info-item">Username: {userInfo.username}</p>
            <p className="user-info-item">Email: {userInfo.email}</p>
            <p className="user-info-item">Role: {userInfo.role}</p>
          </div>
        </div>
        <Button
          className="test-button"
          type="button"
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleTestButton}
        >
          Check Auth
        </Button>
      </div>
    </>
  )
};

export default Home;