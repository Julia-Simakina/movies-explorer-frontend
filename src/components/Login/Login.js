import './Login.css';
import AuthForm from '../AuthForm/AuthForm';

function Login() {
  return (
    <main className='login'>
      <AuthForm title='Рады видеть!'>
        <div className='auth__form-container'>
          <label htmlFor='name' className='auth__form-label'>
            E-mail
          </label>
          <input
            type='text'
            id='name'
            className='auth__form-input'
            placeholder='pochta@yandex.ru|'
          />
          <span></span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='name' className='auth__form-label'>
            Пароль
          </label>
          <input type='text' id='name' className='auth__form-input ' placeholder='' />
          <span></span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Login;
