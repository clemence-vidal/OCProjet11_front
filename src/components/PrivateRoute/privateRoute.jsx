import { Navigate } from 'react-router-dom';
import Profile from '../../pages/Profile/profile';
import { useSelector } from 'react-redux';

function PrivateRoute() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    return isAuthenticated ? <Profile /> : <Navigate to="/login" />;
}




// function PrivateRoute() {
//     const tokenLocalStorage = localStorage.getItem("token");
//     const tokenSessionStorage = sessionStorage.getItem("token");
//     const isAuthenticated = tokenLocalStorage || tokenSessionStorage;

//     return (
//         isAuthenticated ? <Profile /> : <Navigate to="/login" />
//     )
// };

export default PrivateRoute;
