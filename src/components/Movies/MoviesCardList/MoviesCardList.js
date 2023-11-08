import { React, useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import {
  MAX_WIDTH_SCREEN,
  MIN_WIDTH_SCREEN,
  INIT_CARD_MAX_SCREEN,
  INIT_CARD_MEDIUM_SCREEN,
  INIT_CARD_MIN_SCREEN,
  STEP_MAX_WIDTH_SCREEN,
  STEP_MEDIUM_AND_MIN_WIDTH_SCREEN
} from '../../../utils/constants';

function MoviesCardList({ movies, serverError, savedMovies, setSavedMovies }) {
  const { pathname } = useLocation();
  const [count, setCount] = useState('');
  const visibleCards = movies.slice(0, count);

  function addCards() {
    const counter = { init: INIT_CARD_MAX_SCREEN, step: STEP_MAX_WIDTH_SCREEN };
    if (window.innerWidth < MAX_WIDTH_SCREEN) {
      counter.init = INIT_CARD_MEDIUM_SCREEN;
      counter.step = STEP_MEDIUM_AND_MIN_WIDTH_SCREEN;
    }
    if (window.innerWidth < MIN_WIDTH_SCREEN) {
      counter.init = INIT_CARD_MIN_SCREEN;
      counter.step = STEP_MEDIUM_AND_MIN_WIDTH_SCREEN;
    }
    return counter;
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setCount(addCards().init);
      function printCardsForResize() {
        if (window.innerWidth >= MAX_WIDTH_SCREEN) {
          setCount(addCards().init);
        }
        if (window.innerWidth < MAX_WIDTH_SCREEN) {
          setCount(addCards().init);
        }
        if (window.innerWidth < MIN_WIDTH_SCREEN) {
          setCount(addCards().init);
        }
      }
      window.addEventListener('resize', printCardsForResize);
      return () => window.removeEventListener('resize', printCardsForResize);
    }
  }, [pathname, movies]);

  function clickMore() {
    setCount(count + addCards().step);
  }

  return (
    <section className='movies-list'>
      <ul className='movies-list__container'>
        {pathname === '/movies' && visibleCards.length !== 0
          ? visibleCards.map(data => (
              <MoviesCard
                data={data}
                key={data.id}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            ))
          : movies.map(data => (
              <MoviesCard
                data={data}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                key={data.id ? data.id : data._id}
              />
            ))}
      </ul>
      {serverError && (
        <div className='movies-list__error-message'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </div>
      )}

      {(movies.length === 0 || (movies.length === 0 && savedMovies.length !== 0)) && (
        <div className='movies-list__error-message'>Ничего не найдено.</div>
      )}

      {movies.length === 0 && pathname === '/movies' && !localStorage.allMovies && (
        <div className='movies-list__error-message'>
          Чтобы увидеть список фильмов, выполните поиск.
        </div>
      )}

      {savedMovies.length === 0 && pathname === '/saved-movies' && (
        <div className='movies-list__error-message'>Список сохранённых фильмов пуст.</div>
      )}
      {pathname === '/movies' && movies.length > 0 && (
        <button
          className={`movies-list__button ${
            count >= movies.length && 'movies-list__button_type_unactive'
          }`}
          type='button'
          onClick={clickMore}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
