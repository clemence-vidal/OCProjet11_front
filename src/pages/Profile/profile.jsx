import React, { useState, useEffect } from "react";
import "./profile.css";
import AccountContent from "../../components/AccountContent/accountContent";
import useAuth from "../../app/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUsernameAsync, userDataAsync } from "../../app/userSlice";

function User(isLoggedIn) {
    useAuth(isLoggedIn);
    const [showForm, setShowForm] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const userName = useSelector((state) => state.user.userName);
    const firstName = useSelector((state) => state.user.firstName);
    const lastName = useSelector((state) => state.user.lastName);
    const [newUserName, setNewUsername] = useState("");
    const dispatch = useDispatch();

    const showUserForm = () => {
        setShowForm(!showForm);
    }

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newUserName);
        if (newUserName === userName) {
            alert("Please choose a new username.")
        } else if (window.confirm('Do you really want to change your username?')) {
            try {
                dispatch(UpdateUsernameAsync({ newUserName, token }));
                alert("Username was successfully updated.");
            } catch (error) {
                console.error("Error updating username:", error);
            }
        } 
    }

    useEffect(() => {
        setToken(localStorage.getItem("token") || sessionStorage.getItem("token"));
        if (token) {
            dispatch(userDataAsync(token));
        }
    }, [token, dispatch]);


    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back<br/>
                    {userName}!
                </h1>
                <button 
                className="edit-button"
                onClick={showUserForm}
                >
                    Edit Name
                </button>
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">User name :</label>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                onChange={handleUsernameChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="username">First name :</label>
                            <input 
                                className="names"
                                type="text" 
                                name="firstname" 
                                id="firstname" 
                                value={firstName}
                                readOnly
                            />
                        </div><div>
                            <label htmlFor="username">Last name :</label>
                            <input 
                                className="names"
                                type="text" 
                                name="lastname" 
                                id="lastname"     
                                value={lastName}                           
                                readOnly
                            />
                        </div>
                        <div>
                            <input 
                                type="submit" 
                                value="Submit" 
                                className="submit" 
                            />
                        </div>
                    </form>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <AccountContent
                title={"Argent Bank Checking (x8349)"}
                amount={"$2,082.79"}
                description={"Available Balance"}
            />    
            <AccountContent
                title={"Argent Bank Savings (x6712)"}
                amount={"$10,928.42"}
                description={"Available Balance"}
            />   
            <AccountContent
                title={"Argent Bank Checking (x8349)"}
                amount={"$184.30"}
                description={"Available Balance"}
            />
        </main>
    );
}

export default User;