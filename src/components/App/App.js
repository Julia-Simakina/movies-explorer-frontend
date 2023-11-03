import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation, Navigate } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { LoginContext } from '../../contexts/LoginContext';

import './App.css';
import PageNotFound from '../PageNotFound/PageNotFound';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SideBar from '../SideBar/SideBar';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Movies/Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const navigate = useNavigate();
  const pathname = useLocation();
  const toggleSidebar = () => setIsOpenSideBar(open => !open);

  const [currentUser, setCurrentUser] = useState({});
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorText, setErrortext] = useState('');
  const [success, setSuccess] = useState('');
  const [appIsReady, setAppIsReady] = useState(false);

  //Регистрация
  function handleRegisterSubmit(data) {
    mainApi
      .register(data.name, data.email, data.password)
      .then(() => {
        setErrortext('');
        handleLoginSubmit(data);
        // navigate('/signin');
      })
      .catch(err => {
        setErrortext(err);
      });
  }

  //Авторизация
  function handleLoginSubmit(data) {
    mainApi
      .login(data.email, data.password)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setErrortext('');
        setIsLoggedIn(true);
        navigate('/movies');
      })
      .catch(err => {
        setErrortext(err);
      });
  }

  //Выход
  async function handleSignOut() {
    await setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    // setAppIsReady(false);
    navigate('/');
  }

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     moviesApi
  //       .getMovies()
  //       .then(data => {
  //         setAllMovie(data);
  //       })
  //       .catch(err => {
  //         console.log(`Ошибка: ${err}`);
  //       });
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserData()
        .then(userInfo => {
          setCurrentUser(userInfo);
          setAppIsReady(true);
        })
        .catch(err => console.log(err));
      setAppIsReady(true);
    }
  }, [isLoggedIn, appIsReady]);

  //обнуляет сообщение об ошибке при смене роута на signin/signup и в профиле
  useEffect(() => {
    setErrortext('');
    setSuccess('');
  }, [pathname]);

  function handleUpdateUser(data) {
    const token = localStorage.getItem('jwt');
    mainApi
      .editProfile(data.name, data.email, token)
      .then(currentUserInfo => {
        setCurrentUser(currentUserInfo);
        console.log(currentUserInfo);
        setSuccess('Данные профиля изменены');
      })
      .catch(err => {
        setSuccess('Ошибка при сохранении');
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
          setAppIsReady(true);
        });
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('jwt');
  //   if (token) {
  //     mainApi
  //       .getSavedMovies(token)
  //       .then(() => {})
  //       .catch(err => {
  //         console.log(`Ошибка: ${err}`);
  //       });
  //   }
  // }, []);

  return !appIsReady ? (
    <Preloader />
  ) : (
    <LoginContext.Provider value={{ isLoggedIn }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
          <Routes>
            <Route
              path='/signin'
              element={
                isLoggedIn ? (
                  <Navigate to='/movies' replace />
                ) : (
                  <Login
                    onLogin={handleLoginSubmit}
                    errorText={errorText}
                    isLoggedIn={isLoggedIn}
                  />
                )
              }
            />
            <Route
              path='/signup'
              element={
                isLoggedIn ? (
                  <Navigate to='/movies' replace />
                ) : (
                  <Register
                    onRegister={handleRegisterSubmit}
                    errorText={errorText}
                    isLoggedIn={isLoggedIn}
                  />
                )
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Profile}
                  toggleSidebar={toggleSidebar}
                  onSignOut={handleSignOut}
                  onUpdateUser={handleUpdateUser}
                  success={success}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  toggleSidebar={toggleSidebar}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/movies'
              element={
                <ProtectedRoute
                  element={Movies}
                  toggleSidebar={toggleSidebar}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/'
              element={<Main toggleSidebar={toggleSidebar} isLoggedIn={isLoggedIn} />}
            />
            <Route path='*' element={<PageNotFound isLoggedIn={isLoggedIn} />} />
          </Routes>
          <SideBar
            isOpen={isOpenSideBar}
            toggleSidebar={toggleSidebar}
            isLoggedIn={isLoggedIn}
            onClick={toggleSidebar}
          />
        </div>
      </CurrentUserContext.Provider>
    </LoginContext.Provider>
  );
}
export default App;
