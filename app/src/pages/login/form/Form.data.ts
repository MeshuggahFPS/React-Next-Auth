import * as Yup from 'yup';
import { ILoginCredentials, IValidationSchema } from './Form.types';

export const ValidationSchema: IValidationSchema = {
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
};

export const InitalState: ILoginCredentials = {  
    email: '',
    password: '',
};