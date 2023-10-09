import React, { useContext } from 'react';
import { Input } from '@/src/components/input/input';
import { initialState } from './Form.data';
import { ILoginCredentials } from './Form.types';
import Button from '@/src/components/button/Button';
import useForm from '@/src/helpers/useForm';
import { AuthContext } from '@/src/context/authentication/Provider';
import { TInput } from '@/src/components/input/input.types';

export const LoginForm = () => {
  const { login, reset } = useContext(AuthContext);

  const {
    formData,
    errors,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useForm<ILoginCredentials>(initialState, login, true); // Pass true to skip validation

  const renderInputField = (
    label: string,
    name: keyof ILoginCredentials,
    type?: TInput,
    required: boolean = false
  ) => (
    <Input<ILoginCredentials>
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
          {renderInputField('Email', 'email', 'email', true)}
          {renderInputField('Password', 'password', 'password', true)}
          <Button type={"submit"} label={"Login"} disabled={isValid} style={"primary"} />
          <div className="flex justify-between gap-20">
            <Button type="button" navigate="/register" label="Register" style="secondary" />
            <Button type={"button"} label={"Reset"} style={"submit"} onClick={reset} />
          </div>
        </form>
      </div>
    </div>
  );
};
