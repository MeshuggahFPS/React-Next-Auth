import * as Yup from 'yup';

export interface ILoginCredentials {
    email: string;
    password: string;
};

export type IValidationSchema = {
    [K in keyof ILoginCredentials]: Yup.StringSchema<string>;
};
