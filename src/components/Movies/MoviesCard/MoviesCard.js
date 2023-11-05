import { React, useEffect } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import mainApi from '../../../utils/MainApi';
import { useState } from 'react';

function convertTime(duration) {
  const minutes = duration % 60;
  const hours = Math.floor(duration / 60);
  return hours === 0 ? `${minutes}м` : minutes === 0 ? `${hours}ч` : `${hours}ч ${minutes}м`;
}

function MoviesCard({ data, savedMovies, setSavedMovies }) {
  const { pathname } = useLocation();

  const [isLike, setIsLike] = useState(false);

  const token = localStorage.getItem('jwt');

  useEffect(() => {
    if (pathname === '/movies' && savedMovies) {
      setIsLike(savedMovies.some(item => data.id === item.movieId));
    } else if (pathname === '/saved-movies') setIsLike(true);
  }, [savedMovies]);

  function fetchSavedMovies() {
    mainApi
      .getSavedMovies(token)
      .then(res => setSavedMovies(res))
      .catch(err => console.error(`Ошибка при загрузке сохраненных фильмов ${err}`));
  }

  function handleLikeClick() {
    mainApi
      .addMovie(data, localStorage.jwt)
      .then(() => {
        setIsLike(true);
        fetchSavedMovies();
        // setSavedMovies([...savedMovies, data]);
      })
      .catch(err => console.error(`Ошибка при установке лайка ${err}`));
  }

  function onClick() {
    const movieId = savedMovies.find(item => item.movieId === data.id)._id;
    onDelete(movieId);
  }

  function onDelete(deleteMovieId) {
    mainApi
      .deleteMovie(deleteMovieId, localStorage.jwt)
      .then(() => {
        setIsLike(false);
        fetchSavedMovies();
      })
      .catch(err => console.error(`Ошибка при удалении фильма ${err}`));
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

        {pathname === '/saved-movies' && (
          <button
            className='card-movie__btn  card-movie__btn_type_delete'
            type='button'
            onClick={() => onDelete(data._id)}
          />
        )}

        {isLike && pathname === '/movies' && (
          <button
            className='card-movie__btn card-movie__btn_type_saved'
            onClick={onClick}
            type='button'
          ></button>
        )}

        {!isLike && pathname === '/movies' && (
          <button
            className='card-movie__btn card-movie__btn_type_save'
            type='button'
            onClick={handleLikeClick}
          >
            Сохранить
          </button>
        )}
      </div>
      <div className='card-movie__data'>
        <h2 className='card-movie__name'>{data.nameRU}</h2>
        <p className='card-movie__duration'>{convertTime(data.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
