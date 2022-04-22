import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './slices';

const persistConfig = {
  key: 'root',
  persist: true,
  storage,
  blacklist: ['modal']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export default store;