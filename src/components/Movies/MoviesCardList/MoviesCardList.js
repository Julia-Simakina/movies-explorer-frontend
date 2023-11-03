import { React, useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
//import { movies } from '../../../utils/constants';

function MoviesCardList({ movies, serverError }) {
  const pathname = useLocation();
  //const [cards, setCards] = useState(movies);
  // useEffect(() => {
  //   if (savedMovies) {
  //     setCards(cards => cards.filter(card => card.saved));
  //   }
  // }, [savedMovies]);

  return (
    <section className='movies-list'>
      <ul className='movies-list__container'>
        {pathname === '/movie'
          ? movies.map(data => (
              <MoviesCard
                data={data}
                key={data.id}
                // savedMovies={savedMovies}
              />
            ))
          : movies.map(data => (
              <MoviesCard
                data={data}
                key={data.id ? data.id : data._id}
                // savedMovies={savedMovies}
              />
            ))}
      </ul>
      {serverError && (
        <div className='movies-list__error-message'>
          Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.
        </div>
      )}
      <button className='movies-list__button movies-list__button_type_unactive' type='button'>
        Ещё
      </button>
      {/* )} */}
    </section>
  );
}

export default MoviesCardList;
