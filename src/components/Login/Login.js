import './Login.css';
import { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInputEmail = e => {
    setEmail(e.target.value);
  };
  const handleInputPassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmitLogin = e => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <main className='login'>
      <AuthForm title='Рады видеть!' onSubmit={handleSubmitLogin}>
        <div className='auth__form-container'>
          <label htmlFor='email' className='auth__form-label'>
            E-mail
          </label>
          <input
            onChange={handleInputEmail}
            type='text'
            id='email'
            className='auth__form-input'
            placeholder='Введите E-mail'
            required
          />
          <span className='form-error'></span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='password' className='auth__form-label'>
            Пароль
          </label>
          <input
            onChange={handleInputPassword}
            type='password'
            id='password'
            className='auth__form-input '
            placeholder='Введите пароль'
            minLength='5'
            maxLength='30'
            required
          />
          <span className='form-error'></span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Login;
