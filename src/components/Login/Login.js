import './Login.css';
import { useEffect, useContext } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useFormValidation from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { emailRegex } from '../../utils/constants';

function Login({ onLogin, errorText }) {
  const { formValues, formErrors, handleChange, setFormValues, formIsValid, resetForm } =
    useFormValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm();
    setFormValues({
      password: currentUser.password,
      email: currentUser.email
    });
  }, [resetForm, setFormValues, currentUser]);

  const handleSubmitLogin = e => {
    e.preventDefault();
    onLogin({ email: formValues.email, password: formValues.password });
  };

  return (
    <main className='login'>
      <AuthForm
        title='Рады видеть!'
        onSubmit={handleSubmitLogin}
        errorText={errorText}
        disabledBtn={!formIsValid}
      >
        <div className='auth__form-container'>
          <label htmlFor='email' className='auth__form-label'>
            E-mail
          </label>
          <input
            type='email'
            name='email'
            id='email'
            onChange={handleChange}
            className={`auth__form-input ${!formIsValid && 'auth__form-input_error_active'} `}
            placeholder='Введите E-mail'
            pattern={emailRegex}
            required
          />
          <span className='form-error'>{formErrors.email}</span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='password' className='auth__form-label'>
            Пароль
          </label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={handleChange}
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

export default Login;
