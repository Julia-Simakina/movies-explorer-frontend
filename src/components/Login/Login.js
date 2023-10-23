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
            placeholder='Введите E-mail'
            required
          />
          <span></span>
        </div>
        <div className='auth__form-container'>
          <label htmlFor='name' className='auth__form-label'>
            Пароль
          </label>
          <input
            type='text'
            id='name'
            className='auth__form-input '
            placeholder='Введите пароль'
            minlength='5'
            maxlength='30'
            required
          />
          <span></span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Login;
