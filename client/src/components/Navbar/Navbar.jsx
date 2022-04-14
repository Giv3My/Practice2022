import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/slices/userSlice';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import './Navbar.css';

function Navbar() {
  const navbarItemsStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClick = async () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  return (
    <div className="navbar">
      <ButtonGroup sx={navbarItemsStyle} variant="outlined" aria-label="outlined primary button group">
        <Link to='/' className='nav-link' >
          <Button>Home</Button>
        </Link>
        <Link to='/booking' className='nav-link'>
          <Button>Booking</Button>
        </Link>
        <Link to='/login' className='nav-link'>
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