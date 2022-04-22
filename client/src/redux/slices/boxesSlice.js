import { createSlice } from '@reduxjs/toolkit';

import { STAGES } from '../../common/constants/squareConstants';

const initialState = {
  squares: [
    {
      id: 0,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    },
    {
      id: 1,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    },
    {
      id: 2,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    },
    {
      id: 3,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    },
    {
      id: 4,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    },
    {
      id: 5,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    },
    {
      id: 6,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    },
    {
      id: 7,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    },
    {
      id: 8,
      stage: STAGES.INIT,
      timer: null,
      userId: ''
    }
  ]
};

export const boxesSlice = createSlice({
  name: 'boxes',
  initialState,
  reducers: {
    resetStage: (state, { payload }) => {
      state.squares[payload].stage = STAGES.INIT;
      state.squares[payload].timer = null;
    },
    updateTime: (state, { payload }) => {
      state.squares[payload.id].timer = payload.time;
    },
    changeStageReserved: (state, { payload }) => {
      state.squares[payload.id].stage = STAGES.RESERVED;
      state.squares[payload.id].userId = payload.userId;
    },
    changeStageBought: (state, { payload }) => {
      const reservedSquares = state.squares.filter(square => square.stage === STAGES.RESERVED);

      reservedSquares.map(square => square.timer = null);

      if (payload === true) {
        reservedSquares.map(square => square.stage = STAGES.BOUGHT);
      } else {
        reservedSquares.map(square => {
          square.stage = STAGES.INIT;
          square.userId = '';
        });
      }
    },
    resetReservedSquares: (state) => {
      const reservedSquares = state.squares.filter(square => square.stage === STAGES.RESERVED);

      reservedSquares.map(square => {
        square.stage = STAGES.INIT;
        square.timer = null;
        square.userId = '';
      });
    },
    resetSquares: (state) => {
      state.squares = initialState.squares;
    }
  }
});

export const { resetStage, updateTime, changeStageReserved, changeStageBought, resetReservedSquares, resetSquares } = boxesSlice.actions;

export default boxesSlice.reducer;