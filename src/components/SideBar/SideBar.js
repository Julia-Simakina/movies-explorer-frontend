import './SideBar.css';
import { NavLink, Link } from 'react-router-dom';

function SideBar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'sidebar__opened' : ''}`}>
      <div className='sidebar__container'>
        <button type='button' className='sidebar__button' onClick={toggleSidebar}></button>
        <nav className='nav'>
          <ul className='nav__links nav__links_type_sidebar'>
            <li>
              <NavLink to='/' className='nav__link nav__link_type_sidebar'>
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/movies'
                className='nav__link  nav__link_type_sidebar sidebar__link_type_active-underline'
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to='/saved-movies' className='nav__link nav__link_type_sidebar'>
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className='profile'>
          <Link className='profile__btn' to='/profile'>
            Аккаунт
            <div className='profile__logo'></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
