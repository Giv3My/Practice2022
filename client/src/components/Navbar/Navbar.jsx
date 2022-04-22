import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../../redux/slices/authSlice';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import './Navbar.css';

const navbarItemsStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between'
};

function Navbar({ isAuth, isAdmin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate('/login', { replace: true });
  };

  const onLogoutClick = async () => {
    await dispatch(logout()).unwrap();
    navigate('/', { replace: true });
  };

  return (
    <div className="navbar">
      <ButtonGroup
        sx={navbarItemsStyle}
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Link to='/' className='nav-link' >
          <Button>Home</Button>
        </Link>
        <Link to='/booking' className='nav-link'>
          <Button>Booking</Button>
        </Link>
        {isAdmin && (
          <Link to='/admin' className='nav-link'>
            <Button>Admin</Button>
          </Link>
        )}
        <Button
          className='nav-link'
          variant="contained"
          onClick={isAuth ? onLogoutClick : onLoginClick}
        >
          {isAuth ? 'Logout' : 'Login'}
        </Button>
      </ButtonGroup>
    </div>
  )
};

export default Navbar;