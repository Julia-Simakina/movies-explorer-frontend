import './SearchForm.css';
import SearchIcon from '../../../images/search-icon.svg';

function SearchForm({ value, onChange, onSubmit, checked, handleChange, isValid }) {
  return (
    <section className='search-form-section'>
      <form className='search-form' onSubmit={onSubmit}>
        <div className='search-form__container'>
          <div className='search-form__input-container'>
            <img src={SearchIcon} alt='Иконка поиска' className='search-form__icon' />
            <input
              className='search-form__input'
              placeholder='Фильм'
              name='search'
              onChange={onChange}
              value={value}
            />
          </div>
          <button type='submit' className='search-form__submit-btn'>
            Найти
          </button>
          <div className='search-form__decor-line'></div>
        </div>

        <div className='filter-checkbox'>
          <label className='filter-checkbox__tumbler'>
            <input
              type='checkbox'
              id='checkbox'
              className='filter-checkbox__inp'
              onChange={handleChange}
              checked={checked}
            />
            <span className='filter-checkbox__span'>Короткометражки</span>
          </label>
        </div>
      </form>
      <span className={`search-form__error ${!isValid && 'search-form__error_type_active'}`}>
        Нужно ввести ключевое слово
      </span>
      <div className='search-form-section__separator'></div>
    </section>
  );
}

export default SearchForm;
