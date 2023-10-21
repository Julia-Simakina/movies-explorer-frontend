import './AuthForm.css';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';

function AuthForm({ children, title, logged }) {
  const { pathname } = useLocation();

  const isSignUp = pathname === '/signup';

  const buttonText = isSignUp ? 'Зарегистрироваться' : 'Войти';
  const questionText = isSignUp ? 'Уже зарегистрированы?' : 'Ещё не зарегистрированы?';
  const buttonQuestionText = isSignUp ? 'Войти' : 'Зарегистрироваться';
  const questionRedirectPath = isSignUp ? '/signin' : '/signup';

  return (
    <section className='auth'>
      <Link href='/'>
        <img src={logo} alt='Логотип' className='auth__logo' />
      </Link>
      <h2 className='auth__title'>{title}</h2>
      <form className={`auth__form ${logged ? 'login__form' : ''}`}>
        <fieldset className='auth__form-element'>{children}</fieldset>
        {!isSignUp && <span className='auth__empty-separator '></span>}
        <button type='submit' className='auth__submit-btn'>
          {buttonText}
        </button>
      </form>
      <div className='auth__to-signin'>
        <p className='auth__text'>{questionText}</p>
        <Link to={questionRedirectPath} className='auth__redirect-btn'>
          {buttonQuestionText}
        </Link>
      </div>
    </section>
  );
}

export default AuthForm;
