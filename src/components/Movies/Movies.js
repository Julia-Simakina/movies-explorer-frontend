import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState, useContext } from 'react';
import moviesApi from '../../utils/MoviesApi';
import { LoginContext } from '../../contexts/LoginContext';

function Movies({ toggleSidebar }) {
  const { isLoggedIn } = useContext(LoginContext);
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allMovies')) || []);
  const [filtredMovies, setFiltredMovies] = useState(allMovies);
  const [searchInputString, setSearchInputString] = useState(
    localStorage.getItem('searchInputString') || ''
  );
  const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem('isShort') || false));
  const [isValid, setIsValid] = useState(true);
  const [serverError, setServerError] = useState(false);

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
      handleSubmitSearch();
      setIsValid(true);
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
  }, [allMovies]);

  function checkShort(e) {
    const value = e.target.checked;
    setIsShort(value);
    localStorage.setItem('isShort', value);
  }

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main>
        <SearchForm
          value={searchInputString}
          onChange={search}
          onSubmit={handleSearch}
          checked={isShort}
          handleChange={checkShort}
          isValid={isValid}
        />
        <MoviesCardList movies={filtredMovies} serverError={serverError} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
