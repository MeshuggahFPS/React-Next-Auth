'use client';

import { Input } from "@/src/components/input/input";
import { InitalState, ValidationSchema } from "./Form.data";
import { ILoginCredentials } from "./Form.types";
import Button from "@/src/components/button/Button";
import useForm from "@/src/helpers/useForm";
import { AuthContext } from "@/src/context/authentication/Provider";
import { useContext } from "react";

export const LoginForm = () => {
    const { login, reset } = useContext(AuthContext);
    const {
        formData,
        errors,
        isValid,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useForm<ILoginCredentials>(ValidationSchema, InitalState, login);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border border-2 border-black-200 rounded-md px-8 pt-6 pb-8 mb-4 max-w-md w-full">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
                <Input<ILoginCredentials>
                    label="Email"
                    name="email"
                    value={formData.email}
                    error={errors.email}
                    controller={(name, value) => handleChange(name, value)}
                    handleBlur={handleBlur}
                    required
                    as="email"
                />
                <Input<ILoginCredentials>
                    label="Password"
                    name="password"
                    value={formData.password}
                    error={errors.password}
                    controller={(name, value) => handleChange(name, value)}
                    handleBlur={handleBlur}
                    required
                    as="password"
                />
                <Button type="submit" disabled={!isValid} label="Login" style="submit" />
                <div className="flex justify-between gap-20">
                        <Button type="button" navigate={"/register"} label="Register" style="secondary" />
                        <Button type="button" onClick={reset} label="Reset" style="submit" />
                    </div>
            </form>
            </div>
        </div>
    );
};
