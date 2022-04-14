import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup.string().required('Email is a required field').email('Enter a valid email'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(6)
    .matches(
      /^[a-zA-Z0-9]+$/ && /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/,
      'Password should contain A-Z, 0-9 and 2 special symbols'
    )
});

export default validationSchema;