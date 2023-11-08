import { Link, useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PagNotFound() {
  const navigate = useNavigate();
  return (
    <main className='not-found'>
      <section className='not-found__content'>
        <h1 className='not-found__code'>404</h1>
        <p className='not-found__message'>Страница не найдена</p>
        <Link onClick={() => navigate(-1)} className='not-found__redirect-btn'>
          Назад
        </Link>
      </section>
    </main>
  );
}

export default PagNotFound;
