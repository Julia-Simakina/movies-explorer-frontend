import './Register.css';
import { useContext, useEffect } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useFormValidation from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { emailRegex } from '../../utils/constants';

function Register({ onRegister, errorText }) {
  const { formValues, formErrors, handleChange, setFormValues, formIsValid, resetForm } =
    useFormValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm();
    setFormValues({
      name: currentUser.name,
      password: currentUser.password,
      email: currentUser.email
    });
  }, [resetForm, setFormValues, currentUser]);

  const handleSubmitRegister = e => {
    e.preventDefault();
    onRegister({ name: formValues.name, email: formValues.email, password: formValues.password });
  };

  return (
    <main className='register'>
      <AuthForm
        title='Добро пожаловать!'
        onSubmit={handleSubmitRegister}
        errorText={errorText}
        disabledBtn={!formIsValid}
      >
        <div className='auth__form-container'>
          <label htmlFor='name' className='auth__form-label'>
            Имя
          </label>
          <input
            name='name'
            onChange={handleChange}
            type='text'
            id='name'
            className={`auth__form-input ${!formIsValid && 'auth__form-input_error_active'} `}
            placeholder='Введите имя'
            minLength='2'
            maxLength='30'
            required
          />
          <span className='form-error'>{formErrors.name}</span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='email' className='auth__form-label'>
            E-mail
          </label>
          <input
            pattern={emailRegex}
            name='email'
            type='email'
            id='email'
            className={`auth__form-input ${!formIsValid && 'auth__form-input_error_active'} `}
            placeholder='Введите E-mail'
            onChange={handleChange}
            required
          />
          <span className='form-error'>{formErrors.email}</span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='password' className='auth__form-label'>
            Пароль
          </label>
          <input
            name='password'
            onChange={handleChange}
            type='password'
            id='password'
            className={`auth__form-input ${!formIsValid && 'auth__form-input_error_active'} `}
            placeholder='Введите пароль'
            minLength='5'
            maxLength='30'
            required
          />
          <span className='form-error'>{formErrors.password}</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Register;
