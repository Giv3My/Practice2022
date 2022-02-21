import { createSlice } from '@reduxjs/toolkit';

export const boxesSlice = createSlice({
    name: 'boxes',
    initialState: {
        // color: "#1eeb77",
        squares: [
            {
                id: 1,
                stage: "init",
            },
            {
                id: 2,
                stage: "init",
            },
            {
                id: 3,
                stage: "init",
            },
            {
                id: 4,
                stage: "init",
            },
            {
                id: 5,
                stage: "init",
            },
            {
                id: 6,
                stage: "init",
            },
            {
                id: 7,
                stage: "init",
            },
            {
                id: 8,
                stage: "init",
            },
            {
                id: 9,
                stage: "init",
            },
        ]
    },
    reducers: {
        changeStage: state => {
            state.squares.stage = "waiting";
        },

        // increment: state => {
        //   state.value += 1
        // },
        // decrement: state => {
        //   state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //   state.value += action.payload
        // }
    }
})

// Action creators are generated for each case reducer function
export const { changeStage } = boxesSlice.actions;

export default boxesSlice.reducer;