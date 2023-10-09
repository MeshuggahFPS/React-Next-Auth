import React, { ChangeEvent, useState } from "react";
import IInputProps from "./input.types";
import { Container } from "./input.styling";
import ErrorMessage from "../error/Error";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        controller(name, e);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container>
            <div className="flex flex-col">
                <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                <div className="flex flex-row shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <input
                        type={showPassword ? "text" : as}
                        name={name as string}
                        value={value}
                        onChange={handleChange}
                        onBlur={(e) => handleBlur(name as string, e)}
                        required={required}
                        id={name as string}
                        className="w-full focus:outline-none"
                    />
                    {as === "password" && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="text-gray-600 hover:text-gray-700 focus:outline-none"
                        >
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="text-base"
                            />
                        </button>
                    )}
                </div>
            </div>
            {error && <ErrorMessage message={error} />} {/* Show error only if it exists for the current input */}
        </Container>
    );
};
