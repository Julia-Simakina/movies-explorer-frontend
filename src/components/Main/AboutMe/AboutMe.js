import './AboutMe.css';
import Heading from '../Heading/Heading';
import avatar from '../../../images/avatar.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <Heading name='Студент' />
      <div className='about-me__student-info'>
        <div className='about-me__text'>
          <h3 className='about-me__name'>Юлия</h3>
          <p className='about-me__prof'>Фронтенд-разработчик, 24 года</p>
          <p className='about-me__info'>
            Я около 10 лет живу в Таганроге. Здесь много IT-компаний и людей из этой сферы, что
            помогло мне сделать выбор в сторону фронтенд-разработки. У меня есть своенравная кошка
            Кейси и заботливый муж. Я очень люблю кофе, поэтому каждый день пропадаю в уютных
            кофейнях.
          </p>
          <a
            target='_blank'
            className='about-me__githab'
            href='https://github.com/Julia-Simakina'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img className='about-me__avatar' src={avatar} alt='Студент' />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;
