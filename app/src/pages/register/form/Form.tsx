import React, { useContext } from 'react';
import { Input } from '@/src/components/input/input';
import { initalState } from './Form.data';
import { AuthContext } from '@/src/context/authentication/Provider';
import useForm from '@/src/helpers/useForm';
import Button from '@/src/components/button/Button';
import { IRegisterCredentials } from './Form.types';
import { TInput } from "@/src/components/input/input.types";

export const RegisterForm = () => {
    const { register } = useContext(AuthContext);

    const {
        formData,
        errors,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm<IRegisterCredentials>(initalState, register);

    // Function to handle input fields
    const renderInputField = (
        label: string,
        name: keyof IRegisterCredentials,
        type?: TInput,
        required: boolean = false
    ) => (
        <Input<IRegisterCredentials>
            label={label}
            name={name}
            value={formData[name]}
            error={errors[name]}
            controller={(field, value) => handleChange(field, value)}
            handleBlur={handleBlur}
            required={required}
            as={type}
        />
    );

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border border-2 border-black-200 rounded-md px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
                    {renderInputField('Name', 'name', 'text', true)}
                    {renderInputField('Email', 'email', 'email', true)}
                    {renderInputField('Password', 'password', 'password', true)}
                    {renderInputField('Confirm Password', 'confirmPassword', 'password', true)}
                     <Button type={"submit"} label={"Register"} style={"submit"} disabled={!isValid} />
                     <Button type="button" navigate="/login" label="Login" style="secondary" />
                </form>
            </div>
        </div>
    );
};
