import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from './../../common/api/index';

import AuthService from './../../services/AuthService';

export const login = createAsyncThunk('user/userLogin',
  async (formValues, { rejectWithValue }) => {
    try {
      const { data, headers } = await AuthService.login(formValues);

      localStorage.setItem('userToken', headers.authorization);
      return data.user;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('user/userLogout',
  async () => {
    try {
      await AuthService.logout();

      localStorage.removeItem('userToken');
      return null;
    } catch (err) {
      console.log(err);
    }
  }
);

export const checkAuth = createAsyncThunk('user/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const { headers } = await axios.get(`${API_URL}/refreshToken`);

      localStorage.setItem('userToken', headers.authorization);
      return true;
    } catch (err) {
      localStorage.removeItem('userToken');
      return rejectWithValue(false);
    }
  }
);

const initialState = {
  userInfo: null,
  isAuth: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.isAuth = payload;
      state.userInfo = null;
    }
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.isAuth = true;
      state.userInfo = { ...payload };
    },
    [login.rejected]: (state) => {
      state.isAuth = false;
      state.userInfo = null;
    },
    [logout.pending]: (state) => {
      state.isAuth = false;
      state.userInfo = null;
    },
    [checkAuth.fulfilled]: (state, { payload }) => {
      state.isAuth = payload;
    },
    [checkAuth.rejected]: (state, { payload }) => {
      state.isAuth = payload;
      state.userInfo = null;
    }
  }
});

export const { setAuth } = userSlice.actions;

export default userSlice.reducer;