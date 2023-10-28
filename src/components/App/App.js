import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SideBar from '../SideBar/SideBar';
import mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpenSideBar(open => !open);

  const [currentUser, setCurrentUser] = useState({});
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Регистрация
  function handleRegisterSubmit(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        console.log();
        navigate('/signin');
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  //Авторизация
  function handleLoginSubmit(email, password) {
    mainApi
      .login(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  //Выход
  async function handleSignOut() {
    await setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/');
  }

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserData()
        .then(userInfo => {
          setCurrentUser(userInfo);
        })
        .catch(err => console.log(err));
    }
  }, [isLoggedIn]);

  function handleUpdateUser(data) {
    const token = localStorage.getItem('jwt');
    mainApi
      .editProfile(data.name, data.email, token)
      .then(currentUserInfo => {
        setCurrentUser(currentUserInfo);
        console.log(currentUserInfo);
      })
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi
        .checkToken(token)
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch(err => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/signin' element={<Login onLogin={handleLoginSubmit} />} />
          <Route path='/signup' element={<Register onRegister={handleRegisterSubmit} />} />
          <Route
            path='/profile'
            element={
              <Profile
                toggleSidebar={toggleSidebar}
                onSignOut={handleSignOut}
                onUpdateUser={handleUpdateUser}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={<SavedMovies toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='/movies'
            element={<Movies toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path='/'
            element={<Main toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} />}
          />
          <Route path='*' element={<PageNotFound isLoggedIn={isLoggedIn} />} />
        </Routes>
        <SideBar isOpen={isOpenSideBar} toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
