import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setAuth } from '../../redux/slices/userSlice';

import { Navbar } from '../../components';
import Button from '@mui/material/Button';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAuth = async () => {
    dispatch(setAuth());
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