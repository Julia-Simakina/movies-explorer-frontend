import React from 'react';
import './MoviesCard.css';

function MoviesCard({ card, savedMovies }) {
  return (
    <li className='card-movie'>
      <div className='card-movie__container'>
        <img src={card.image} alt={card.title} className='card-movie__img' />
        {savedMovies && (
          <button className='card-movie__btn  card-movie__btn_type_delete' type='button' />
        )}
        {!savedMovies && card.saved && (
          <div className='card-movie__btn card-movie__btn_type_saved'></div>
        )}
        {!savedMovies && !card.saved && (
          <button className='card-movie__btn card-movie__btn_type_save' type='button'>
            Сохранить
          </button>
        )}
      </div>
      <div className='card-movie__data'>
        <h2 className='card-movie__name'>{card.title}</h2>
        <p className='card-movie__duration'>{card.time}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
