'use client';

import { ChangeEvent, FormEvent, useState, FocusEvent } from 'react';

interface FormState<T> {
    [key: string]: T;
}

type TForm = "login" | "register";

interface Form<T> {
    formData: T;
    errors: FormState<string>;
    isValid: boolean;
    handleChange: (name: string, event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleBlur: (name: string, event: FocusEvent<HTMLInputElement>) => void;
}

const validateForm = (formData: FormState<string>, formType: TForm) => {
    const errors: FormState<string> = {};

    if (formType === "register" && !formData.name) {
        errors.name = "Name is required";
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!formData.email) {
        errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
        errors.email = "Invalid email address";
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d{2,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!formData.password) {
        errors.password = "Password is required";
    } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    } else if (!passwordRegex.test(formData.password)) {
        errors.password = "Password must contain at least 2 numbers and a special character";
    }

    if (formType === "register" && !formData.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    } else if (formType === "register" && formData.confirmPassword !== formData.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};
const useForm = <T>(
    initialValues: T,
    submitCallback: (formData: T) => void,
    formType: TForm = "register",
    skipValidation: boolean = false, // Add a new parameter to skip validation
): Form<T> => {
    const [formData, setFormData] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormState<string>>({});
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleChange = (name: string, e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleBlur = (name: string, e: FocusEvent<HTMLInputElement>) => {
        // Validate the specific field onBlur, but only if skipValidation is false
        if (!skipValidation) {
            const fieldValue = formData[name as keyof T];
            const validationErrors = validateForm({ ...formData, [name]: fieldValue } as FormState<string>, formType);
            setErrors(validationErrors);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate the entire form before submission, but only if skipValidation is false
        const validationErrors = validateForm(formData as FormState<string>, formType);
        setErrors(validationErrors);
        setIsValid(Object.keys(validationErrors).length === 0);

        // If the form is valid or skipValidation is true, call the submitCallback
        if (isValid || skipValidation) {
            submitCallback(formData);
        }
    };

    return {
        formData,
        errors,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};

export default useForm;