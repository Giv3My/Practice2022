import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setUserInfo } from './userSlice';
import { resetReservedSquares } from './boxesSlice';

import AuthService from '../../services/AuthService';
import { API_URL } from './../../common/api';

export const registration = createAsyncThunk('auth/registration',
  async (formValues, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const { data, headers } = await AuthService.registration(formValues);

      localStorage.setItem('userToken', headers.authorization);
      dispatch(setUserInfo(data.user));

      return fulfillWithValue(data);
    } catch (err) {
      dispatch(setUserInfo(null));

      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk('auth/login',
  async (formValues, { dispatch, rejectWithValue }) => {
    try {
      const { data, headers } = await AuthService.login(formValues);

      localStorage.setItem('userToken', headers.authorization);
      dispatch(setUserInfo(data.user));

      return true;
    } catch (err) {
      dispatch(setUserInfo(null));

      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout',
  async (_, { dispatch }) => {
    try {
      await AuthService.logout();

      localStorage.removeItem('userToken');
      dispatch(setUserInfo(null));
      dispatch(resetReservedSquares());

      return false;
    } catch (err) {
      console.log(err);
    }
  }
);

export const checkAuth = createAsyncThunk('auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { headers } = await axios.get(`${API_URL}/refreshToken`);

      localStorage.setItem('userToken', headers.authorization);
      return true;
    } catch (err) {
      localStorage.removeItem('userToken');
      dispatch(setUserInfo(null));

      return rejectWithValue(false);
    }
  }
);

const initialState = {
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registration.fulfilled]: (state, { payload }) => {
      state.isAuth = true;
    },
    [registration.rejected]: (state, { payload }) => {
      state.isAuth = false;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.isAuth = payload;
    },
    [login.rejected]: (state) => {
      state.isAuth = false;
    },
    [logout.pending]: (state) => {
      state.isAuth = false;
    },
    [checkAuth.fulfilled]: (state, { payload }) => {
      state.isAuth = payload;
    },
    [checkAuth.rejected]: (state, { payload }) => {
      state.isAuth = payload;
    }
  }
});

export default authSlice.reducer;