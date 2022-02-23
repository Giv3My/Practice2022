import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

function Home() {
    // useEffect(() => {
    //     axios.get("localhost:3001/auth").then((data) => console.log(data));
    // }, [])

    return (
        <>
            <Navbar />
            <div>Home</div>
        </>
    )
}

export default Home