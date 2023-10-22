import './Header.css';
import logo from '../../images/logo.png';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Header({ name, toggleSidebar }) {
  const { pathname } = useLocation();

  return name === 'logged' ? (
    <header className={`header ${pathname === '/' && 'header_background_pink'}`}>
      <div className='header__content'>
        <Link to='/'>
          <img src={logo} alt='Логотип' className='header__logo' />
        </Link>
        <button className='header__burger' type='button' onClick={toggleSidebar}>
          <span className='header__burger-span'></span>
        </button>
        <Navigation />
      </div>
    </header>
  ) : (
    <header className={`header ${pathname === '/' && 'header_background_pink'}`}>
      <div className='header__content'>
        <Link to='/'>
          <img src={logo} alt='Логотип' className='header__logo' />
        </Link>
        <div className='header__auth-bar'>
          <Link to='/signup' className='header__auth-link'>
            Регистрация
          </Link>
          <Link to='/signin' className='header__auth-link header__auth-link_type_signin'>
            Войти
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
