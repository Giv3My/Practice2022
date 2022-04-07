import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setAuth } from '../../redux/slices/userSlice';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import './Navbar.css';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    await axios.post('http://localhost:3001/logout');

    navigate('/login', { replace: true })
    dispatch(setAuth(false));
    localStorage.removeItem('userToken');
  };

  return (
    <div className="navbar">
      <ButtonGroup variant="outlined" aria-label="outlined primary button group">
        <Link to='/'>
          <Button>Home</Button>
        </Link>
        <Link to='/booking'>
          <Button>Booking</Button>
        </Link>
        <Link to='/login'>
          <Button
            variant="contained"
            onClick={onLogoutClick}
          >
            Logout
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  )
};

export default Navbar;