import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState } from 'react';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

function Movies({ toggleSidebar }) {
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
  const [filtredMovies, setFiltredMovies] = useState(allMovies);
  const [searchInputString, setSearchInputString] = useState(
    localStorage.getItem('searchInputString') || ''
  );
  const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem('isShort') || false));
  const [isValid, setIsValid] = useState(true);
  const [serverError, setServerError] = useState(false);

  const [savedMovies, setSavedMovies] = useState([]);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    mainApi.getSavedMovies(token).then(res => {
      setSavedMovies(res);
    });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    searchMovies(search);
  };

  function search(e) {
    const value = e.target.value;
    setSearchInputString(value);
    localStorage.setItem('searchInputString', value);
  }

  function searchMovies() {
    if (!searchInputString) {
      setIsValid(false);
    }
    if (allMovies.length === 0 && searchInputString) {
      moviesApi
        .getMovies()
        .then(res => {
          setIsValid(true);
          setAllMovies(res);
          setServerError(false);
          localStorage.setItem('allMovies', JSON.stringify(res));
        })
        .catch(err => {
          setServerError(true);
          console.log(`Ошибка: ${err}`);
        });
    } else if (searchInputString) {
      setIsValid(true);
      handleSubmitSearch();
    }
  }

  function handleSubmitSearch() {
    const filtredMovies = allMovies.filter(movie =>
      isShort
        ? movie.nameRU.toLowerCase().includes(searchInputString.toLowerCase()) &&
          movie.duration <= 40
        : movie.nameRU.toLowerCase().includes(searchInputString.toLowerCase())
    );

    setFiltredMovies(filtredMovies);
  }

  useEffect(() => {
    handleSubmitSearch();
    setIsValid(true);
  }, [allMovies, isShort]);

  function checkShort(e) {
    const value = e.target.checked;
    setIsShort(value);
    localStorage.setItem('isShort', value);
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main className='movies'>
        <SearchForm
          value={searchInputString}
          onChange={search}
          onSubmit={handleSearch}
          checked={isShort}
          handleChange={checkShort}
          isValid={isValid}
        />
        <MoviesCardList
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          movies={filtredMovies}
          serverError={serverError}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
