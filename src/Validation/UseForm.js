import React, { useCallback } from "react";

//хук управления формой и валидации формы
export function useForm() {
    const [values, setValues] = React.useState({ search: '' });

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
}

//хук управления формой и валидации формы
export function useFormWithValidation(clearFormError) {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
        clearFormError();
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: target.validationMessage
        });

        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );

    return {
        values: values,
        handleChange: handleChange,
        errors: errors,
        isValid: isValid,
        resetForm: resetForm,
        setIsValid: setIsValid,
    };
}
