import './Promo.css';
import logo from '../../../images/promo_logo.svg';

function Promo() {
  return (
    <section className='promo'>
      <img className='promo__logo' src={logo} alt='Логотип Яндекс Практикум '></img>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
    </section>
  );
}

export default Promo;
