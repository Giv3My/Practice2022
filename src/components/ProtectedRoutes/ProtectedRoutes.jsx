import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ element }) {
    const isAuth = (token) => token ? true : false;

    return (
        isAuth(localStorage.getItem("userToken")) ? element : <Navigate to="/login" replace />
    )
}

export default ProtectedRoutes