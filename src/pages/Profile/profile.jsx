import React, { useState, useEffect } from "react";
import "./profile.css";
import AccountContent from "../../components/AccountContent/accountContent";
import useAuth from "../../app/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, updateUsername } from "../../app/api";
import { UpdateUsernameAsync } from "../../app/userSlice";

function User(isLoggedIn) {
    useAuth(isLoggedIn);
    const [showForm, setShowForm] = useState(false);
    // const [username, setUsername] = useState("");
    const username = useSelector((state) => state.user.username);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);    
    const [newUsername, setNewUsername] = useState("");
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const dispatch = useDispatch();

    const showUserForm = () => {
        setShowForm(!showForm);
    }

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newUsername === username) {
            alert("Please choose a new username.")
        } else if (window.confirm('Do you really want to change your username?')) {
            try {
                await updateUsername(newUsername, token);
                // dispatch(UpdateUsernameAsync(newUsername));
                // setUsername(newUsername);
                dispatch(UpdateUsernameAsync({newUsername, token}));
                alert("Username was successfully updated.");
            } catch (error) {
                console.error("Error updating username:", error);
            }
        } 
    }

    useEffect(() => {        
        console.log("isAuthenticated changed:", isAuthenticated);
        const fetchProfileData = async () => {
          const userData = await fetchUserData();
          console.log("User data:", userData); ////
          console.log("User data body:", userData.body); ////
      
          if (userData && userData.body) {
            // setUsername(userData.body.userName);
            setFirstName(userData.body.firstName);
            setLastName(userData.body.lastName);
          }
        };
        fetchProfileData();
      }, [isAuthenticated]);

      console.log("fetchUserData:", fetchUserData);

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back<br/>
                    {username}!
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