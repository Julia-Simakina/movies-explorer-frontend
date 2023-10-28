import './AuthForm.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';

function AuthForm({ children, title, logged, onSubmit }) {
  const { pathname } = useLocation();

  const isSignUp = pathname === '/signup';

  const buttonText = isSignUp ? 'Зарегистрироваться' : 'Войти';
  const questionText = isSignUp ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?';
  const buttonQuestionText = isSignUp ? 'Войти' : 'Регистрация';
  const questionRedirectPath = isSignUp ? '/signin' : '/signup';

  return (
    <section className='auth'>
      <div className='auth__container'>
        <Link to='/'>
          <img src={logo} alt='Логотип' className='auth__logo' />
        </Link>
        <h1 className='auth__title'>{title}</h1>
        <form className={`auth__form ${logged ? 'login__form' : ''}`} onSubmit={onSubmit}>
          <fieldset className='auth__form-element'>{children}</fieldset>

          <div className='auth__submit-container'>
            <button type='submit' className='auth__submit-btn'>
              {buttonText}
            </button>
            <div className='auth__to-signin'>
              <p className='auth__text'>{questionText}</p>
              <Link to={questionRedirectPath} className='auth__redirect-btn'>
                {buttonQuestionText}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
