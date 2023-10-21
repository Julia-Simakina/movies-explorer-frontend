import './AboutProject.css';
import Heading from '../Heading/Heading';

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <Heading name='О проекте' />
      <ul className='about-project__descriptions'>
        <li className='about-project__descriptions-item'>
          <h3 className='about-project__descriptions-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__descriptions-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </li>
        <li className='about-project__descriptions-item'>
          <h3 className='about-project__descriptions-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__descriptions-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </li>
      </ul>

      <div className='about-project__graphs'>
        <div className='about-project__graph about-project__graph_time_back-end'>
          <figure className='about-project__figure about-project__figure_color_black'>
            1 неделя
          </figure>
          <figcaption className='about-project__figcaption'>Back-end</figcaption>
        </div>
        <div className='about-project__graph about-project__graph_time_front-end'>
          <figure className='about-project__figure about-project__figure_color_gray '>
            4 недели
          </figure>
          <figcaption className='about-project__figcaption'>Front-end</figcaption>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
