import { ChangeEvent, FocusEvent } from "react";

export type TInput = "text" | "textarea" | "select" | "password" | "newPassword" | "date" | "email";

interface IInputProps<T> {
    label: string;
    name: keyof T; 
    value: string;
    error?: string
    controller: (key: keyof T, value: ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (name: string, event: FocusEvent<HTMLInputElement>) => void;
    required?: boolean
    as?: TInput;
}

export default IInputProps;
