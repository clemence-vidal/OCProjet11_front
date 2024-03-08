import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//////////////////
// export const fetchUserData = async () => {
//     try {        
//       if (!token) {
//         throw new Error("No token found.");
//       }
//       const response = await fetch('http://localhost:3001/api/v1/user/profile', {
//         method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`,
//       }}); 
//       if (!response.ok) {        
//         throw new Error("failed");        
//       } else {
//         const userData = await response.json();
//         console.log(userData);
//         return userData;
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       return null;
//     }
//   };

// export const updateUsername = async (newUsername) => {
//     try {
//         const response = await fetch("http://localhost:3001/api/v1/user/profile", {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`,
//             },
//             body: JSON.stringify({ userName: newUsername })
//         });
//         if (!response.ok) {
//             throw new Error('Failed to update username');
//         }
//         const userData = await response.json();
//         console.log(newUsername);
//         console.log("Username updated successfully:", userData);
//         return userData;
//     } catch (error) {
//         console.error("Error updating username:", error);
//         throw error;
//     }
// }
//////////////////////////

export const userDataAsync = createAsyncThunk("user/userData", async () => {
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



const userData = createSlice({
  name: "auth",
  initialState: {
      userName: "",
      status: "idle",
      error: null,
      isAuthenticated: !!localStorage.getItem("token") || !!sessionStorage.getItem("token"),
  },
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(userDataAsync.pending, (state) => {
            state.status = "loading";
            state.error = null;
          })
          .addCase(userDataAsync.fulfilled, (state, action) => {
            state.status = "onSuccess";
            state.userName = action.payload.userName;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
          })
          .addCase(userDataAsync.rejected, (state) => {
            state.status = "failed";            
          })
  },
});

export default userData.reducer;