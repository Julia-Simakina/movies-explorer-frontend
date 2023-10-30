import './SideBar.css';
import { NavLink, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function SideBar({ isOpen, toggleSidebar, onClick }) {
  const { pathname } = useLocation();
  return (
    <div className={`sidebar ${isOpen ? 'sidebar__opened' : ''}`}>
      <div className='sidebar__container'>
        <button type='button' className='sidebar__button' onClick={toggleSidebar}></button>
        <nav className='nav'>
          <ul className='nav__links nav__links_type_sidebar'>
            <li>
              <NavLink
                to='/'
                className={`nav__link nav__link_type_sidebar  ${
                  pathname === '/' && 'nav__link_type_active-underline'
                }`}
                onClick={onClick}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/movies'
                className={`nav__link nav__link_type_sidebar  ${
                  pathname === '/movies' && 'nav__link_type_active-underline'
                }`}
                onClick={onClick}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/saved-movies'
                className={`nav__link nav__link_type_sidebar  ${
                  pathname === '/saved-movies' && 'nav__link_type_active-underline'
                }`}
                onClick={onClick}
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='profile'>
          <Link className='profile__btn' to='/profile' onClick={onClick}>
            Аккаунт
            <div className='profile__logo'></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
