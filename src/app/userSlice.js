import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const UpdateUsernameAsync = createAsyncThunk("user/updateUsername", async ({ newUsername, token }) => { 
    try {   
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ username: newUsername }),
            });
            if (!response.ok) {
                throw new Error("failed to update username");
            }

            const data = await response.json();
            return data.body; //data.body.username
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
            })
                .addCase(UpdateUsernameAsync.rejected, (state, action) => {console.error("Update username rejected:", action.error.message);
                state.status = "failed";            
            });
    },
});

export default updateUserSlice.reducer;