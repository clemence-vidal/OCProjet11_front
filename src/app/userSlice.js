import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const UpdateUsernameAsync = createAsyncThunk("user/updateUsername", async ({ newUserName, token }) => { 
    try {     
        console.log(newUserName);
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ userName: newUserName }),
            });
            
            if (!response.ok) {
                throw new Error("failed to update username");
            }
            const data = await response.json();
            console.log(data);
            return data; //data.body.username
        } catch (error) {            
            // throw new Error("error");
            console.error("Error updating username:", error);

    }
})

export const userDataAsync = createAsyncThunk("user/userData", async (token) => {
    try {        
      if (!token) {
        throw new Error("No token found.");
      }
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
      }}); 
      if (!response.ok) {        
        throw new Error("failed");        
      } else {
        const userData = await response.json();
        console.log("api userdate:", userData);
        return userData;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  })


const updateUserSlice = createSlice({
    name: "user",
    initialState: {
        userName: "",
        status: "idle",
        firstName: "",
        lastName: "",
        error: null,
        isAuthenticated: !!localStorage.getItem("token") || !!sessionStorage.getItem("token"),
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UpdateUsernameAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(UpdateUsernameAsync.fulfilled, (state, action) => {
                state.status = "onSuccess";
                state.userName = action.payload.userName;
                console.log(action.payload.body.userName);
                console.log(action.payload.body.userName);
            })
            .addCase(UpdateUsernameAsync.rejected, (state, action) => {console.error("Update username rejected:", action.error.message);
                state.status = "failed";            
            })
            .addCase(userDataAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(userDataAsync.fulfilled, (state, action) => {
                state.status = "onSuccess";
                if (action.payload && action.payload.body) {
                    state.userName = action.payload?.body.userName;
                    state.firstName = action.payload?.body.firstName;
                    state.lastName = action.payload?.body.lastName;
                }
            })
            .addCase(userDataAsync.rejected, (state) => {
                state.status = "failed";
            })
            .addCase("auth/logout", (state) => {
                state.isAuthenticated = false;
                state.userName = "";
                state.firstName = "";
                state.lastName = "";
                state.status = "idle";
                state.error = null;
            });
    },
});

export default updateUserSlice.reducer;