import './Portfolio.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__project-list'>
        <li className='portfolio__project'>
          <a
            className='portfolio__project-link'
            href='https://github.com/Julia-Simakina/how-to-learn'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li className='portfolio__project'>
          <a
            className='portfolio__project-link'
            href='https://github.com/Julia-Simakina/russian-travel'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
        <li className='portfolio__project'>
          <a
            className='portfolio__project-link'
            href='https://github.com/Julia-Simakina/react-mesto-api-full-gha'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение <span className='portfolio__arrow'>↗</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
