import './Register.css';
import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Register({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputName = e => {
    setName(e.target.value);
  };
  const handleInputEmail = e => {
    setEmail(e.target.value);
  };
  const handleInputPassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmitRegister = e => {
    e.preventDefault();
    onRegister(name, email, password);
  };

  return (
    <main className='register'>
      <AuthForm title='Добро пожаловать!' onSubmit={handleSubmitRegister}>
        <div className='auth__form-container'>
          <label htmlFor='name' className='auth__form-label'>
            Имя
          </label>
          <input
            value={name}
            onChange={handleInputName}
            type='text'
            id='name'
            className='auth__form-input'
            placeholder='Введите имя'
            minLength='2'
            maxLength='30'
            required
          />
          <span className='form-error'></span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='email' className='auth__form-label'>
            E-mail
          </label>
          <input
            type='text'
            id='email'
            className='auth__form-input'
            placeholder='Введите E-mail'
            value={email}
            onChange={handleInputEmail}
            required
          />
          <span className='form-error'>Что-то пошло не так...</span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='password' className='auth__form-label'>
            Пароль
          </label>
          <input
            value={password}
            onChange={handleInputPassword}
            type='password'
            id='password'
            className='auth__form-input auth__form-input_error_active '
            placeholder='Введите пароль'
            minLength='5'
            maxLength='30'
            required
          />
          <span className='form-error'>Что-то пошло не так...</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Register;
