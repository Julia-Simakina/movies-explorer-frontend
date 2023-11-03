import { React, useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import mainApi from '../../../utils/MainApi';

function convertTime(duration) {
  const minutes = duration % 60;
  const hours = Math.floor(duration / 60);
  return hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч ${minutes}м`;
}

function MoviesCard({ data }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  function handleLikeClick() {
    mainApi
      .addMovie(data, localStorage.jwt)
      .then(res => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch(err => console.error(`Ошибка при установке лайка ${err}`));
  }

  return (
    <li className='card-movie'>
      <div className='card-movie__container'>
        <Link to={data.trailerLink} target='_blank'>
          <img
            src={
              pathname === '/movies' ? `https://api.nomoreparties.co${data.image.url}` : data.image
            }
            alt={data.name}
            className='card-movie__img'
          />
        </Link>
        {/* {savedMovies && (
          <button className='card-movie__btn  card-movie__btn_type_delete' type='button' />
        )}
        {!savedMovies && card.saved && (
          <div className='card-movie__btn card-movie__btn_type_saved'></div>
        )} */}
        {/* {!savedMovies &&  */}
        !card.saved && (
        <button
          className='card-movie__btn card-movie__btn_type_save'
          type='button'
          onClick={handleLikeClick}
        >
          Сохранить
        </button>
        ){/* } */}
      </div>
      <div className='card-movie__data'>
        <h2 className='card-movie__name'>{data.nameRU}</h2>
        <p className='card-movie__duration'>{convertTime(data.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
