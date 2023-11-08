import { useState, useCallback } from 'react';

function useFormValidation() {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setformErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  const handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormValues({ ...formValues, [name]: value });
    setformErrors({ ...formErrors, [name]: target.validationMessage });
    setFormIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValues(newValues);
      setformErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setFormValues, setformErrors, setFormIsValid]
  );

  return {
    formValues,
    formErrors,
    handleChange,
    setFormValues,
    formIsValid,
    setFormIsValid,
    resetForm
  };
}

export default useFormValidation;
