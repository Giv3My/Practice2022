import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import boxesReducer from '../features/boxes/boxesSlice';

const reducers = combineReducers({
    box: boxesReducer,
});

const persistConfig = {
    key: 'root',
    persist: true,
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})