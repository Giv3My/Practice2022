import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setAuth } from '../../redux/slices/userSlice';

import { Navbar } from '../../components';
import Button from '@mui/material/Button';

function Home() {
  const dispatch = useDispatch();

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

  return (
    <>
      <Navbar />
      <div>Home page</div>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
        onClick={checkAuth}
      >
        Test
      </Button>
    </>
  )
};

export default Home;