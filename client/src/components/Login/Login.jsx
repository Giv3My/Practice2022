import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { isEmail } from 'validator';
import md5 from 'md5';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        setLoginError("");
    }, [email, password])

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onLoginClick = async () => {
        try {
            const { data } = await axios.post("http://localhost:3001/login", {
                userEmail: email,
                userPassword: password
            });
            localStorage.setItem("userToken", data);

            navigate("/", { replace: true });
        } catch (err) {
            if (err.response.status === 401)
                setLoginError('Invalid email or password');
            else if (err.response.status === 402)
                setLoginError('Invalid email');
            // console.log(err.response.status);
        }

        // await console.log(data.status);

        // if (email && password) {
        //     if (isEmail(email)) {
        //         localStorage.setItem("userToken", md5(email));
        //         navigate("/", { replace: true });
        //     } else {
        //         setLoginError('Invalid email');
        //     }
        // } else setLoginError('Invalid email or password');
    }

    return (
        <div className="wrapper login-wrapper">
            <h1 className="login-title">Login</h1>
            {loginError && <p className='login-error'>{loginError}</p>}
            <TextField
                value={email}
                onChange={onEmailChange}
                margin="normal"
                required
                id="email"
                label="Email Address"
                name="email"
                autoFocus
            />
            <TextField
                value={password}
                onChange={onPasswordChange}
                margin="normal"
                required
                name="password"
                label="Password"
                type="password"
                id="password"
            />
            <Button
                onClick={onLoginClick}
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
            >
                Sign In
            </Button>
        </div>
    )
}

export default Login