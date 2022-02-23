import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Button from '@mui/material/Button';

function Home() {
    const navigate = useNavigate();

    const checkSession = async () => {
        axios.get("http://localhost:3001/token").catch(err => {
            localStorage.removeItem("userToken");
            navigate("/login", { replace: true })
        });
    }

    return (
        <>
            <Navbar />
            <div>Home page</div>
            <Button
                onClick={checkSession}
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
            >
                Test
            </Button>
        </>
    )
}

export default Home