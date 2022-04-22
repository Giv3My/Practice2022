import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { registration } from '../../redux/slices/authSlice';
import { setModalOpen, setModalType } from '../../redux/slices/modalSlice';

import { FORM_ERROR } from 'final-form';
import { Modal, Box, Typography } from '@mui/material';
import { SignUpModalForm, ResultModalForm } from '../../components';

import { style } from './styles';

function SignUpModal() {
  const dispatch = useDispatch();
  const { modalOpen, modalType } = useSelector(({ modal }) => modal);

  const [signUpResult, setSignUpResult] = React.useState(null);

  const handleSignUpFormSubmit = async (formValues) => {
    try {
      const data = await dispatch(registration(formValues)).unwrap();

      setSignUpResult(data);
      dispatch(setModalType('result'));
    } catch (err) {
      return { [FORM_ERROR]: err }
    }
  };

  const handleModalClose = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style.modalStyle}>
        {modalType === 'signUp' ? (
          <>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={style.modalTitle}>Sign Up</Typography>
            <SignUpModalForm
              onFormSubmit={handleSignUpFormSubmit}
              onModalClose={handleModalClose}
            />
          </>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={style.modalTitle}>Your account info</Typography>
            <ResultModalForm userData={signUpResult} />
          </>
        )}
      </Box>
    </Modal>
  )
};

export default SignUpModal;