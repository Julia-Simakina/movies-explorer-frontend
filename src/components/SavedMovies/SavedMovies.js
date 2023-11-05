import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import { useState, useEffect } from 'react';

function SavedMovies({ toggleSidebar }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    mainApi.getSavedMovies(token).then(res => {
      console.log('saved', ...res);
      setSavedMovies(res.reverse());
    });
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList movies={savedMovies} setSavedMovies={setSavedMovies} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
