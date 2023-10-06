import { Input } from "@/src/components/input/input";
import { ValidationSchema, InitalState } from "./Form.data";
import { AuthContext } from "@/src/context/authentication/Provider";
import { useContext } from "react";
import useForm from "@/src/helpers/useForm";
import Button from "@/src/components/button/Button";

interface IRegisterForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterForm = () => {
    const { register } = useContext(AuthContext);
    const {
        formData,
        errors,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm<IRegisterForm>(ValidationSchema, InitalState, register);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border border-2 border-black-200 rounded-md px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
                    <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        error={errors.name}
                        controller={(name, value) => handleChange(name, value)}
                        handleBlur={handleBlur}
                        required
                        as="text"
                    />
                    <Input
                        label="Email"
                        name="email"
                        value={formData.email}
                        error={errors.email}
                        controller={(name, value) => handleChange(name, value)}
                        handleBlur={handleBlur}
                        required
                        as="email"
                    />
                    <Input
                        label="Password"
                        name="password"
                        value={formData.password}
                        error={errors.password}
                        controller={(name, value) => handleChange(name, value)}
                        handleBlur={handleBlur}
                        required
                        as="password"
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        error={errors.confirmPassword}
                        controller={(name, value) => handleChange(name, value)}
                        handleBlur={handleBlur}
                        required
                        as="password"
                    />
                    <Button type="submit" disabled={!isValid} label="Register" style="submit" />
                    <Button type="button" navigate={"/login"} label="Login" style="secondary" />
                </form>
            </div>
        </div>
    );
};
