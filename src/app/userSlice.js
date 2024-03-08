import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");      

export const UpdateUsernameAsync = createAsyncThunk("user/updateUsername", async ({ newUserName }) => { 
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

const updateUserSlice = createSlice({
    name: "user",
    initialState: {
        userName: "",
        status: "idle",
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
            })
            .addCase(UpdateUsernameAsync.rejected, (state, action) => {console.error("Update username rejected:", action.error.message);
                state.status = "failed";            
            });
    },
});

export default updateUserSlice.reducer;