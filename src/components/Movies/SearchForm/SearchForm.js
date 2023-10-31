import './SearchForm.css';
import SearchIcon from '../../../images/search-icon.svg';
import useFormValidation from '../../../hooks/useFormValidation';

function SearchForm() {
  const {
    formValues,
    formErrors,
    handleChange,
    setFormValues,
    formIsValid,
    setFormIsValid,
    resetForm
  } = useFormValidation();

  // function onSubmit(e) {
  //   e.preventDefault();
  //   if (e.target.value) {
  //     searchMovies(e.target.value);
  //   }
  // }

  // const handleSearch = e => {
  // e.preventDefault();
  // if (formState.search) {
  //     onMoviesSearch(formState)
  // } else {
  //     setError(true)
  // }
  // };

  return (
    <section className='search-form-section'>
      <form className='search-form'>
        <div className='search-form__container'>
          <div className='search-form__input-container'>
            <img src={SearchIcon} alt='Иконка поиска' className='search-form__icon' />
            <input className='search-form__input' placeholder='Фильм' name='search' />
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
      <span className='form-error'>{formErrors.search}</span>
      <div className='search-form-section__separator'></div>
    </section>
  );
}

export default SearchForm;
