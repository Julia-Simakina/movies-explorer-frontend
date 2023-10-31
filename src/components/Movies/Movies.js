import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useEffect, useState, useContext } from 'react';
import moviesApi from '../../utils/MoviesApi';
import { LoginContext } from '../../contexts/LoginContext';

function Movies({ toggleSidebar }) {
  const { isLoggedIn } = useContext(LoginContext);
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem('allmovies')) || []);
  const [filtredMovies, setFiltredMovies] = useState(allMovies);
  const [searchInputString, setSearchInputString] = useState(
    localStorage.getItem('searchInputString') || ''
  );

  function search(e) {
    const value = e.target.value;
    setSearchInputString(value);
    localStorage.setItem('searchInputString', value);
  }

  useEffect(() => {
    if (isLoggedIn) {
      moviesApi
        .getMovies()
        .then(data => {
          if (allMovies.length === 0) {
            setAllMovies(data);
          }
          localStorage.setItem('allmovies', JSON.stringify(allMovies));
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn, allMovies]);

  useEffect(() => {
    const filtredMovies = allMovies.filter(movie =>
      movie.nameRU.toLowerCase().includes(searchInputString.toLowerCase())
    );

    setFiltredMovies(filtredMovies);
  }, [searchInputString]);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main>
        <SearchForm value={searchInputString} onChange={search} />
        <MoviesCardList movies={filtredMovies} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
