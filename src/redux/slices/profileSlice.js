// store/slices/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profilePictureUrl: null,
  },
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePictureUrl = action.payload;
    },
    clearProfilePicture: (state) => {
      state.profilePictureUrl = null;
    },
  },
});

export const { setProfilePicture, clearProfilePicture } = profileSlice.actions;
export default profileSlice.reducer;
