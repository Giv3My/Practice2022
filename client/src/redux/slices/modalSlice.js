import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalOpen: false,
  modalType: 'signUp'
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalOpen: (state, { payload }) => {
      state.modalOpen = payload;

      if (payload === false) {
        state.modalType = 'signUp';
      }
    },
    setModalType: (state, { payload }) => {
      state.modalType = payload;
    }
  },
});

export const { setModalOpen, setModalType } = modalSlice.actions;

export default modalSlice.reducer;
