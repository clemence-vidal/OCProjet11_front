import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/argentBankLogo.png"
import "../../utils/styles/index.css";
import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import { fetchUserData } from "../../app/api";
// import { userDataAsync } from "../../app/api";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/authSlice";
import { userDataAsync } from "../../app/api";
// import { logout } from "../../app/authSlice";


function Header() {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  // console.log(user);
  const [userName, setUserName] = useState();
  // const userName = useSelector((state) => state.user.userName); 
  // console.log(user);
  // setUserName(user);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  // const userName = useSelector((state) => state.auth.user.userName);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     const fetchUserName = async () => {
  //       const userData = await fetchUserData();
  //       if (userData) {
  //         setUserName(userData.userName);
  //       }
  //     };
  //     fetchUserName();

  //   }
  // }, [isAuthenticated, user, userName]);

  useEffect(() => {
    const fetchProfileData = async () => {
        const userData = await dispatch(userDataAsync());
        console.log("userdata : ", userData);
        try {
          if (userData) {
            dispatch(userDataAsync())
            setUserName(userData.payload.body.userName);
          }
        } catch (error) {                
            console.error("Error fetching profile data:", error);
        }
    };
    if (isAuthenticated) {
        fetchProfileData();
    }
  }, [isAuthenticated, dispatch]);

  const handleSignOut = () => {
    console.log('handleSignOut function called');
    dispatch(logout());
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/"); 
  }
  //

  return (
    <nav className="main-nav">
      <div>
        <img className='main-nav-logo-image' src={logo} alt="logo-site" />
      </div>
      <div>        
        {/* tentative pour le signout */}
        {isAuthenticated ? (
          <div>            
            <FontAwesomeIcon icon={faCircleUser} />
            <Link className='main-nav-item' to="/profile">
                {userName}
            </Link>            
            <FontAwesomeIcon icon={faRightFromBracket} />
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <Link className='main-nav-item' to="/login">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Header;
