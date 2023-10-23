import './Profile.css';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';

function Profile({ toggleSidebar }) {
  return (
    <>
      <Header name='logged' toggleSidebar={toggleSidebar} />
      <main className='profile'>
        <section className='profile__content'>
          <form className='form'>
            <h1 className='profile__title'>Привет, пользователь! </h1>
            <fieldset className='form__container'>
              <div className='form__element'>
                <label htmlFor='' className='form__label'>
                  Имя
                </label>
                <input type='text' className='form__input' placeholder='пользователь' />
              </div>
              <div className='form__element'>
                <label htmlFor='' className='form__label'>
                  E-mail
                </label>
                <input type='text' className='form__input' placeholder='pochta@yandex.ru' />
              </div>
            </fieldset>
          </form>
          <div className='profile__edit'>
            <button className='profile__edit-btn' type='submit'>
              Редактировать
            </button>
            <Link to='/' className='profile__exit'>
              Выйти из аккаунта
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
