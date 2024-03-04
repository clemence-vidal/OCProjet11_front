import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./login.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../app/authSlice";


function SignIn() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (auth.status === "onSuccess" && isAuthenticated) {
            navigate("/profile");         
            // window.location.reload();       
        } else if (auth.status === "onError") {    
            console.log("login failed");
        }
    }, [auth.status, navigate, isAuthenticated]); 

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Email and password fields cannot be empty.");
            return;
        }
        dispatch(loginAsync({ credentials: {email, password}, rememberMe  }));  
    }    

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faCircleUser} />
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="text" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input 
                            type="checkbox" 
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)} 
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <Link 
                        type="button"
                        className='sign-in-button' 
                        onClick={handleLogin}
                    >
                        Sign In
                    </Link>
                </form>
                {auth.status === "pending" && <p>Loading...</p>}
                {auth.status === "onError" && <p className="wrong-logs">Wrong login or password.</p>}            
            </section>
        </main>
    )    
}

export default SignIn;