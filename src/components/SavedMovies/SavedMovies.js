import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function SavedMovies({ toggleSidebar }) {
  return (
    <>
      <Header name='logged' toggleSidebar={toggleSidebar} />
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList savedMovies={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
