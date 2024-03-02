import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: { userData: null, loggedIn: false },
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },

    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { addUserData, login, logout } = userSlice.actions;
export default userSlice.reducer;
