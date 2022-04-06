import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import boxesReducer from './slices/boxesSlice';
import userReducer from './slices/userSlice';

const reducers = combineReducers({
  box: boxesReducer,
  user: userReducer
});

const persistConfig = {
  key: 'root',
  persist: true,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;