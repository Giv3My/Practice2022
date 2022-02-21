import { createSlice } from '@reduxjs/toolkit';
import { STAGES } from '../constants';

const initialState = {
    squares: [
        {
            id: 0,
            stage: STAGES.INIT,
        },
        {
            id: 1,
            stage: STAGES.INIT,
        },
        {
            id: 2,
            stage: STAGES.INIT,
        },
        {
            id: 3,
            stage: STAGES.INIT,
        },
        {
            id: 4,
            stage: STAGES.INIT,
        },
        {
            id: 5,
            stage: STAGES.INIT,
        },
        {
            id: 6,
            stage: STAGES.INIT,
        },
        {
            id: 7,
            stage: STAGES.INIT,
        },
        {
            id: 8,
            stage: STAGES.INIT,
        }
    ],
    buyError: false
};

export const boxesSlice = createSlice({
    name: 'boxes',
    initialState,
    reducers: {
        changeStageReserved: (state, action) => {
            state.squares[action.payload].stage = STAGES.RESERVED;
        },
        changeStageBought: (state, action) => {
            const reservedSquares = state.squares.filter(square => square.stage === STAGES.RESERVED);

            if (action.payload === true)
                reservedSquares.map(square => {
                    square.stage = STAGES.BOUGHT;
                });
            else {
                reservedSquares.map(square => {
                    square.stage = STAGES.INIT;
                });

                state.buyError = true;
            }
        },
    }
})

export const { changeStageReserved, changeStageBought } = boxesSlice.actions;

export default boxesSlice.reducer;