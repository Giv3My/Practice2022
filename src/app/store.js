import { configureStore } from '@reduxjs/toolkit';
import boxesReducer from '../features/boxes/boxesSlice';

export const store = configureStore({
    reducer: {
        box: boxesReducer,
    },
})