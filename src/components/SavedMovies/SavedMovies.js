import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({ toggleSidebar }) {
  const movies = [];
  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList movies={movies} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
