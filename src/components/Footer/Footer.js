import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__year'>&copy; 2023</p>
        <nav>
          <ul className='footer__nav-bar'>
            <li>
              <a
                target='_blank'
                className='footer__nav-link'
                href='https://practicum.yandex.ru/'
                rel='noreferrer'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                target='_blank'
                className='footer__nav-link'
                href='https://github.com/Julia-Simakina'
                rel='noreferrer'
              >
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
export default Footer;
