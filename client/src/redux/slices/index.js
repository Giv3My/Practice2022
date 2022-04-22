import { combineReducers } from 'redux';

import boxesReducer from './boxesSlice';
import userReducer from './userSlice';
import authSlice from './authSlice';
import modalSlice from './modalSlice';

const reducers = combineReducers({
  user: userReducer,
  auth: authSlice,
  box: boxesReducer,
  modal: modalSlice
});

export default reducers;