import * as Yup from 'yup';

export const ValidationSchema = {
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm password is required'),
};
export const InitalState = {  
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
};