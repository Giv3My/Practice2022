import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  usersWhoBooked: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload ? { ...payload } : payload;
    },
    setUsersWhoBooked: (state, { payload }) => {
      state.usersWhoBooked = payload;
    },
  }
});

export const { setUserInfo, setUsersWhoBooked } = userSlice.actions;

export default userSlice.reducer;