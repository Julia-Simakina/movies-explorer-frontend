import './Login.css';
import { useState, useEffect, useContext } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import useFormValidation from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Login({ onLogin, errorText }) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleInputEmail = e => {
  //   setEmail(e.target.value);
  // };
  // const handleInputPassword = e => {
  //   setPassword(e.target.value);
  // };

  const {
    formValues,
    formErrors,
    handleChange,
    setFormValues,
    formIsValid,
    setFormIsValid,
    resetForm
  } = useFormValidation();

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
            // onChange={handleInputEmail}
            type='email'
            name='email'
            id='email'
            onChange={handleChange}
            className={`auth__form-input ${!formIsValid && 'auth__form-input_error_active'} `}
            placeholder='Введите E-mail'
            required
          />
          <span className='form-error'>{formErrors.email}</span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='password' className='auth__form-label'>
            Пароль
          </label>
          <input
            // onChange={handleInputPassword}
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
