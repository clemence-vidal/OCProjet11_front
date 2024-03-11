import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/argentBankLogo.png"
import "../../utils/styles/index.css";
import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/authSlice";
import { userDataAsync } from "../../app/userSlice";


function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const userName = useSelector((state) => state.user.userName);

  useEffect(() => {
    setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
    if (token) {
      dispatch(userDataAsync(token));
      console.log(userName);
    }
  }, [token, userName, dispatch, setToken]);

  const handleSignOut = () => {
    console.log('handleSignOut function called');
    dispatch(logout());
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/"); 
  }

  return (
    <nav className="main-nav">
      <div>
        <img className='main-nav-logo-image' src={logo} alt="logo-site" />
      </div>
      <div>        
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
