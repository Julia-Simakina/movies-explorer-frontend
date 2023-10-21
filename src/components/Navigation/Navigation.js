import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navigation() {
  const { pathname } = useLocation();
  return (
    <div className='header__nav-bar'>
      <nav className='nav'>
        <ul className='nav__links'>
          <li>
            <NavLink to='/movies' className='nav__link nav__link_type_active'>
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink to='/saved-movies' className='nav__link'>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className='profile'>
        <Link className='profile__btn'>
          Аккаунт
          <div className={`profile__logo ${pathname === '/' && 'profile__logo_type_pink'}`}></div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
