import { useState, useContext, useEffect } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

function Profile({ toggleSidebar, onSignOut, onUpdateUser, isLoggedIn }) {
  const {
    formValues,
    formErrors,
    handleChange,
    setFormValues,
    formIsValid,
    setFormIsValid,
    resetForm
  } = useFormValidation();

  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    resetForm();
    setFormValues({
      name: currentUser.name,
      email: currentUser.email
    });
    // setNetworkErrors("");
  }, [resetForm, setFormValues, currentUser]);

  useEffect(() => {
    if (currentUser.name === formValues.name && currentUser.email === formValues.email) {
      setFormIsValid(false);
    }
  }, [formValues]);

  const handleSubmit = evt => {
    evt.preventDefault();
    setFormIsValid(false);
    setIsEdit(false);
    setIsSuccess(true);
    onUpdateUser({
      name: formValues.name,
      email: formValues.email
    });
  };

  const handleFormEdit = e => {
    e.preventDefault();
    setIsEdit(true);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} toggleSidebar={toggleSidebar} />
      <main className='profile'>
        <section className='profile__content'>
          <form className='form' onSubmit={handleSubmit}>
            <div className='profile__form-container'>
              <h1 className='profile__title'>{`Привет, ${currentUser.name}`}</h1>
              <fieldset className='form__container'>
                <div className='form__element'>
                  <label htmlFor='' className='form__label'>
                    Имя
                  </label>
                  <input
                    name='name'
                    type='text'
                    className='form__input'
                    placeholder='Введите имя'
                    minLength='2'
                    maxLength='30'
                    onChange={handleChange}
                    value={formValues.name || ''}
                    disabled={!isEdit}
                    // value={isEdit ? formValues['name'] : currentUser.name}
                  />
                </div>
                <span>{formErrors.name}</span>
                <div className='form__element'>
                  <label htmlFor='' className='form__label'>
                    E-mail
                  </label>
                  <input
                    name='email'
                    type='text'
                    className='form__input'
                    placeholder='pochta@yandex.ru'
                    onChange={handleChange}
                    value={formValues.email || ''}
                    disabled={!isEdit}
                  />
                </div>
                <span>{formErrors.name}</span>
              </fieldset>
            </div>

            <div className='profile__edit'>
              {isEdit ? (
                <button
                  type='submit'
                  className={`profile__save-btn ${isEdit && 'profile__save-btn_type_unactive'}`}
                  disabled={!formIsValid}
                >
                  Сохранить
                </button>
              ) : (
                <>
                  <span className='profile__success-edit'>
                    {isSuccess ? 'Данные профиля изменены.' : ''}
                  </span>
                  <button className='profile__edit-btn' onClick={handleFormEdit}>
                    Редактировать
                  </button>
                </>
              )}

              <Link className='profile__exit' onClick={onSignOut}>
                Выйти из аккаунта
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
