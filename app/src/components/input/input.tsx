import React, { ChangeEvent } from "react";
import IInputProps from "./input.types";
import { Container } from "./input.styling";
import ErrorMessage from "../error/Error";

export const Input = <T extends {}>({
    label,
    name,
    value,
    error,
    controller,
    handleBlur,
    required = false,
    as = "text",
}: IInputProps<T>) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        controller(name, e);
    };

    return (
        <Container>
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                type={as}
                name={name as string}
                value={value}
                onChange={handleChange}
                onBlur={(e) => handleBlur(name as string, e)}
                required={required} 
                id={name as string}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {error && <ErrorMessage message={error} />}
        </Container>
    );
};
