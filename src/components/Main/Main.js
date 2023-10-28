import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';

function Main({ isLoggedIn, toggleSidebar }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} toggleSidebar={toggleSidebar} />
      <main className='main'>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
