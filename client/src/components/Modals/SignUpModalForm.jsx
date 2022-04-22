import React from 'react';
import { Link } from 'react-router-dom';

import { validationSignUpSchema } from '../../common/constants/validation/schemas';
import validateFormValues from '../../common/helpers/validateForm';

import { Form, Field } from 'react-final-form';
import { TextField, Button } from '@mui/material';

import { style } from './styles';

function SignUpModalForm({ onFormSubmit, onModalClose }) {
  const validate = validateFormValues(validationSignUpSchema);

  return (
    <Form
      onSubmit={onFormSubmit}
      validate={validate}
    >
      {({ handleSubmit, submitError }) => (
        <form onSubmit={handleSubmit}>
          <div className="modal-top" style={style.modalTop}>
            <Field name="email">
              {({ input, meta }) => (
                <TextField
                  label="Email"
                  {...input}
                  helperText={(meta.touched && meta.error) || (!meta.modifiedSinceLastSubmit && submitError)}
                  error={(meta.touched && !!meta.error) || (!meta.modifiedSinceLastSubmit && !!submitError)}
                />
              )}
            </Field>
          </div>
          <div className="modal-bottom" style={style.modalBottom}>
            <Link
              to='/login'
              style={style.link}
              onClick={onModalClose}>
              Have account ?
            </Link>
            <div className="button-block" style={style.buttonBlock}>
              <Button
                type="submit"
                variant="contained"
              >
                Sign Up
              </Button>
              <Button
                type="button"
                onClick={onModalClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      )}
    </Form>
  )
};

export default SignUpModalForm;