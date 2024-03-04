import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk("auth/login", async ({ credentials, rememberMe }) => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            if (!response.ok) {
                throw new Error("failed");
            }

            const data = await response.json();
            const token = data.body.token;
            
            if (rememberMe) {
                localStorage.setItem("token", token);
            } else {
                sessionStorage.setItem("token", token);
            }
            return data;
        } catch (error) {            
            throw new Error("error");
    }
})

export const logout = () => {
    console.log("logout dispatched");
    return { type: "auth/logout" };
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "idle",
        error: null,
        isAuthenticated: !!localStorage.getItem("token") || !!sessionStorage.getItem("token"),
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                console.log("Login pending");
                state.status = "pending";
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                console.log("Login fulfilled");
                state.status = "onSuccess";
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                console.log("Login rejected", action.error.message);
                state.status = "onError";
                state.error = action.error.message;
                state.user = null;
            })
            .addCase("auth/logout", (state) => {
                state.isAuthenticated = false;
            });
    },
});

export default authSlice.reducer;