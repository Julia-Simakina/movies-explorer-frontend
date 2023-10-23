import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
//import { Context } from '../../contexts/Context';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SideBar from '../SideBar/SideBar';

function App() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleSidebar = () => setIsOpenSideBar(open => !open);

  return (
    <div className='page'>
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/profile' element={<Profile toggleSidebar={toggleSidebar} />} />
        <Route path='/saved-movies' element={<SavedMovies toggleSidebar={toggleSidebar} />} />
        <Route path='/movies' element={<Movies toggleSidebar={toggleSidebar} />} />
        <Route path='/' element={<Main toggleSidebar={toggleSidebar} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <SideBar isOpen={isOpenSideBar} toggleSidebar={toggleSidebar} />
    </div>
  );
}
export default App;
