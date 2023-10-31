import { React, useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
//import { movies } from '../../../utils/constants';

function MoviesCardList({ movies }) {
  //const [cards, setCards] = useState(movies);
  // useEffect(() => {
  //   if (savedMovies) {
  //     setCards(cards => cards.filter(card => card.saved));
  //   }
  // }, [savedMovies]);

  return (
    <section className='movies-list'>
      <ul className='movies-list__container'>
        {movies.map(data => (
          <MoviesCard
            data={data}
            key={data.id}
            // savedMovies={savedMovies}
          />
        ))}
      </ul>
      {/* {!savedMovies && ( */}
      <button className='movies-list__button movies-list__button_type_unactive' type='button'>
        Ещё
      </button>
      {/* )} */}
    </section>
  );
}

export default MoviesCardList;
