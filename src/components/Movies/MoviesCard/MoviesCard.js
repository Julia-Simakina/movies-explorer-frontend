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

  useEffect(() => {
    if (pathname === '/movies' && savedMovies) {
      setIsLike(savedMovies.some(item => data.id === item.movieId));
    } else if (pathname === '/saved-movies') setIsLike(true);
  }, [savedMovies]);

  //на "сохранить" на странице movies
  function handleLikeClick() {
    mainApi
      .addMovie(data, localStorage.jwt)
      .then(res => {
        setSavedMovies(savedMovies => [res, ...savedMovies]);
      })
      .catch(err => console.error(`Ошибка при установке лайка ${err}`));
  }

  //на галочку на странице movies
  function onClick() {
    const movieId = savedMovies.find(item => item.movieId === data.id)._id;

    // fetchSavedMovies();
    onDelete(movieId);
  }

  //на крестик или галочку на разных страницах
  function onDelete(deleteMovieId) {
    mainApi
      .deleteMovie(deleteMovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter(item => item._id !== deleteMovieId));
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
