import { React, useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
//import { movies } from '../../../utils/constants';

function MoviesCardList({ movies, serverError, savedMovies, setSavedMovies }) {
  const { pathname } = useLocation();
  const [count, setCount] = useState('');
  const visibleCards = movies.slice(0, count);

  function addCards() {
    const counter = { init: 12, step: 3 };
    if (window.innerWidth < 1280) {
      counter.init = 8;
      counter.step = 2;
    }
    if (window.innerWidth < 768) {
      counter.init = 5;
      counter.step = 2;
    }
    return counter;
  }

  useEffect(() => {
    if (pathname === '/movies') {
      setCount(addCards().init);
      function printCardsForResize() {
        if (window.innerWidth >= 1280) {
          setCount(addCards().init);
        }
        if (window.innerWidth < 1280) {
          setCount(addCards().init);
        }
        if (window.innerWidth < 768) {
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

      {movies.length === 0 && pathname === '/movies' && !localStorage.allMovies && (
        <div className='movies-list__error-message'>
          Чтобы увидеть список фильмов, выполните поиск.
        </div>
      )}
      {(movies.length === 0 || (movies.length === 0 && savedMovies.length !== 0)) && (
        <div className='movies-list__error-message'>Ничего не найдено.</div>
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
