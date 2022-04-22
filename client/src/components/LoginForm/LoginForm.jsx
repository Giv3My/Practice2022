import React from 'react';

import { validationLoginSchema } from '../../common/constants/validation/schemas';
import validateFormValues from '../../common/helpers/validateForm';

import { Form, Field } from 'react-final-form';
import { TextField, Button } from '@mui/material';

function LoginForm({ onFormSubmit, emailError, passwordError }) {
	const validate = validateFormValues(validationLoginSchema);

	return (
		<Form
			onSubmit={onFormSubmit}
			validate={validate}
		>
			{({ handleSubmit, submitError }) => (
				<form onSubmit={handleSubmit} className="login-container">
					<h1 className="login-title">Login</h1>
					<Field name="email">
						{({ input, meta }) => (
							<TextField
								label="Email"
								{...input}
								helperText={(meta.touched && meta.error) || (!meta.modifiedSinceLastSubmit && emailError && submitError)}
								error={(meta.error && meta.touched) || (!meta.modifiedSinceLastSubmit && emailError)}
								margin="normal"
								fullWidth
							/>
						)}
					</Field>
					<Field name="password">
						{({ input, meta }) => (
							<TextField
								label="Password"
								{...input}
								helperText={(meta.touched && meta.error) || (!meta.modifiedSinceLastSubmit && passwordError && submitError)}
								error={(meta.error && meta.touched) || (!meta.modifiedSinceLastSubmit && passwordError)}
								type="password"
								margin="normal"
								fullWidth
							/>
						)}
					</Field>
					<Button
						type="submit"
						variant="contained"
						sx={{ mt: 3 }}
						fullWidth
					>
						Sign In
					</Button>
				</form>
			)}
		</Form>
	)
};

export default LoginForm;