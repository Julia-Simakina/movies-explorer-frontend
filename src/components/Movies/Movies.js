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

  useEffect(() => {
    if (isLoggedIn) {
      moviesApi
        .getMovies()
        .then(data => {
          setAllMovies(data);
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (allMovies) {
      localStorage.setItem('allmovies', JSON.stringify(allMovies));
    }
  }, [allMovies]);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main>
        <SearchForm />
        <MoviesCardList allMovies={allMovies} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
