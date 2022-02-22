import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                <Link to='/'>
                    <Button>Login</Button>
                </Link>
                <Link to='/'>
                    <Button>Home</Button>
                </Link>
                <Link to='/booking'>
                    <Button>Booking</Button>
                </Link>
            </ButtonGroup>
        </div>
    )
}

export default Navbar