interface FormState<T> {
    [key: string]: T;
}

const validateForm = (formData: FormState<string>) => {
    const errors: FormState<string> = {};

    if (!formData.name) {
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

    if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};
