import './SavedMovies.css';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import { useState, useEffect } from 'react';

function SavedMovies({ toggleSidebar }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const token = localStorage.getItem('jwt');
  const [searchInputString, setSearchInputString] = useState(
    localStorage.getItem('savedSearchInputString') || ''
  );
  const [isValid, setIsValid] = useState(true);
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem('savedIsShort') || false));

  useEffect(() => {
    mainApi.getSavedMovies(token).then(res => {
      setSavedMovies(res.reverse());
    });
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    searchMovies(search);
  };

  function search(e) {
    const value = e.target.value;
    setSearchInputString(value);
    localStorage.setItem('savedSearchInputString', value);
  }

  function searchMovies() {
    if (!searchInputString) {
      setIsValid(false);
    } else if (searchInputString) {
      setIsValid(true);
      handleSubmitSearch();
    }
  }

  function handleSubmitSearch() {
    const filtredMovies = savedMovies.filter(movie =>
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
  }, [savedMovies]);

  function checkShort(e) {
    const value = e.target.checked;
    setIsShort(value);
    localStorage.setItem('savedIsShort', value);
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main className='saved-movies'>
        <SearchForm
          value={searchInputString}
          onChange={search}
          onSubmit={handleSearch}
          checked={isShort}
          isValid={isValid}
          handleChange={checkShort}
        />
        <MoviesCardList
          movies={filtredMovies}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
