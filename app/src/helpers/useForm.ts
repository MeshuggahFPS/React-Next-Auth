'use client';

import { ChangeEvent, FormEvent, useState, FocusEvent } from 'react';
import * as Yup from 'yup';

interface ValidationSchema {
    [key: string]: Yup.Schema<any>;
}

interface FormState<T> {
    [key: string]: T;
}

interface Form<T> {
    formData: T;
    errors: FormState<string>; // Update the error type to string
    isValid: boolean;
    handleChange: (name: string, event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleBlur: (name: string, event: FocusEvent<HTMLInputElement>)=> void;
}

const useForm = <T>(
    validationSchema: ValidationSchema,
    initialValues: T,
    submitCallback: (formData: T) => void,
): Form<T> => {
    const [formData, setFormData] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormState<string>>({});
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleChange = (name: string, e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const schema = Yup.object().shape(validationSchema);

        schema
            .validate(formData, { abortEarly: false })
            .then(() => {
                setIsValid(true);
                submitCallback(formData);
            })
            .catch((validationErrors: Yup.ValidationError) => {
                const newErrors: FormState<string> = {};

                validationErrors.inner.forEach((error) => {
                    if (error.path) {
                        newErrors[error.path] = error.message;
                    }
                });

                setErrors(newErrors);
                setIsValid(false);
            });
    };

    const handleBlur = async (name: string, event: FocusEvent<HTMLInputElement>) => {
        try {
          const fieldSchema = validationSchema[name];
          await fieldSchema.validate(event.target.value);
          setErrors({ ...errors, [name]: '' });
      
          const updatedFormData = { ...formData, [name]: event.target.value };
      
          const schema = Yup.object().shape(validationSchema);
          await schema.validate(updatedFormData, { abortEarly: false });
      
          setIsValid(true);
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            setErrors({ ...errors, [name]: error.message });
            setIsValid(false);
          }
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
