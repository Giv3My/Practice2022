import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const setAuth = createAsyncThunk('user/setAuth',
  async () => {
    const accessToken = localStorage.getItem('userToken');

    try {
      await axios.get('http://localhost:3001/accessToken', {
        headers: {
          Authorization: accessToken
        }
      });

      return true;
    } catch (error) {
      try {
        const { headers } = await axios.get('http://localhost:3001/refreshToken');

        localStorage.setItem('userToken', headers.authorization);
        return true;
      } catch (err) {
        localStorage.removeItem('userToken');
        return false;
      }
    }
  }
);

const initialState = {
  isAuth: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [setAuth.fulfilled]: (state, { payload }) => {
      state.isAuth = payload;
    }
  }
});

export { setAuth };

export default userSlice.reducer;
