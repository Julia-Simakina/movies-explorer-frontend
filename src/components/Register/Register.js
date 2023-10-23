import './Register.css';

import AuthForm from '../AuthForm/AuthForm';

function Register() {
  return (
    <main className='register'>
      <AuthForm title='Добро пожаловать!'>
        <div className='auth__form-container'>
          <label htmlFor='name' className='auth__form-label'>
            Имя
          </label>
          <input
            type='text'
            id='name'
            className='auth__form-input'
            placeholder='Введите имя'
            minlength='2'
            maxlength='30'
            required
          />
          <span className='auth__form-input-err-text'></span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='name' className='auth__form-label'>
            E-mail
          </label>
          <input
            type='text'
            id='name'
            className='auth__form-input'
            placeholder='Введите E-mail'
            required
          />
          <span className='auth__form-input-err-text'></span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='name' className='auth__form-label'>
            Пароль
          </label>
          <input
            type='text'
            id='name'
            className='auth__form-input auth__form-input_error_active '
            placeholder='Введите пароль'
            minlength='5'
            maxlength='30'
            required
          />
          <span className='auth__form-input-err-text'>Что-то пошло не так...</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Register;
