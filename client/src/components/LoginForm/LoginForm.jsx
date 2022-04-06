import React from 'react';
import * as yup from 'yup';
import { setIn } from 'final-form';

import { Form, Field } from 'react-final-form';
import { TextField, Button } from '@mui/material';

function LoginForm({ onFormSubmit }) {
  const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .min(6)
      .matches(
        /^[a-zA-Z0-9]+$/ && /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/,
        'A-Z, 0-9 and 2 special symbols'
      )
  });

  const validateFormValues = (schema) => async (values) => {
    if (typeof schema === 'function') schema = schema();

    try {
      await schema.validate(values, { abortEarly: false });
    } catch (e) {
      return e.inner.reduce((errors, error) => {
        return setIn(errors, error.path, error.message);
      }, {});
    }
  };

  const validate = validateFormValues(validationSchema);

  return (
    <Form
      onSubmit={onFormSubmit}
      validate={validate}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="wrapper login-wrapper">
          <h1 className="login-title">Login</h1>
          <Field name="email">
            {({ input, meta }) => (
              <TextField
                label="Email"
                {...input}
                helperText={meta.touched && meta.error}
                error={meta.error && meta.touched}
                margin="normal"
              />
            )}
          </Field>
          <Field name="password">
            {({ input, meta }) => (
              <TextField
                label="Password"
                {...input}
                helperText={meta.touched && meta.error}
                error={meta.error && meta.touched}
                type="password"
                margin="normal"
              />
            )}
          </Field>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3 }}
          >
            Sign In
          </Button>
        </form>
      )}
    </Form>
  )
};

export default LoginForm;