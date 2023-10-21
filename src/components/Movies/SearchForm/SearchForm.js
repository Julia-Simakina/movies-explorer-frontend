import './SearchForm.css';
import SearchIcon from '../../../images/search-icon.svg';

function SearchForm() {
  return (
    <section className='search-form-section'>
      <form className='search-form'>
        <div className='search-form__container'>
          <div className='search-form__input-container'>
            <img src={SearchIcon} alt='Иконка поиска' className='search-form__icon' />
            <input className='search-form__input' placeholder='Фильм' />
          </div>
          <button type='submit' className='search-form__submit-btn'>
            Найти
          </button>
          <div className='search-form__decor-line'></div>
        </div>

        <div className='filter-checkbox'>
          <label className='filter-checkbox__tumbler'>
            <input type='checkbox' id='checkbox' className='filter-checkbox__inp' />
            <span className='filter-checkbox__span'>Короткометражки</span>
          </label>
        </div>
      </form>
      <div className='search-form__separator'></div>
    </section>
  );
}

export default SearchForm;
