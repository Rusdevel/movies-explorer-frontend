import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute";
import * as auth from "../../utils/auth";
import "./App.css";
import api from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import NotFound from "../NotFound/NotFound";
import InfoTooltip from "../PopapComplate/InfoTooltip";
import NotFoundMovie from "../NotFoundMovie/NotFoundMovie";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [formError, setFormError] = React.useState({
    registerError: false,
    errorMessage: "",
  });
  const [profileUpdateMessage, setProfileUpdateMessage] = React.useState("");
  const [isPreloaderActive, setPreloaderStatus] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [moviesState, setMoviesState] = React.useState({
    search: { line: "", isShort: false, isLiked: false },
    allMovies: [],
    allLikedMovies: [],
    movies: [],
    likedMovies: [],

    //  функция поиска фильмов, которая исаользуется на сабмите формы в компоненте SearchForm
    searchMovies: async ({ search, paging }) => {
      const { line, isShort, isLiked } = search;
      setMoviesState((oldMoviesState) => {
        // делит карточки фильмов на страницы
        const { index, size } = paging;

        console.log(index * size);
        // if (moviesState.movies.length === 0) {
        // setPreloaderStatus(true);
        // }
        const newMoviesState = {
          ...oldMoviesState,
          search: search,
          movies: oldMoviesState.allMovies
            .filter((movie) => !isShort || movie.duration <= 40)
            .filter(
              (movie) =>
                //const targetMovie = movie.nameRU.toLowerCase();
                // показывает все фильмы по поиску
                movie.nameEN.toLowerCase().includes(line.toLowerCase()) ||
                movie.nameRU.toLowerCase().includes(line.toLowerCase())
            )
            .slice(0, index * size), // режет массив так как нам нужно

          // показывает сохраненные фильмы по поиску
          likedMovies: oldMoviesState.allLikedMovies

            .filter((movie) => !isShort || movie.duration <= 40)
            .filter(
              (movie) =>
                movie.nameEN.toLowerCase().includes(line.toLowerCase()) ||
                movie.nameRU.toLowerCase().includes(line.toLowerCase())
            )
            .slice(0, index * size), // режет массив так как нам нужно
        };
        // сохраняем в localStorage текст запроса, найденные фильмы и состояние переключателя короткометражек
        localStorage.setItem("movies", JSON.stringify(newMoviesState.movies));
        localStorage.setItem("search", JSON.stringify(search));
        console.log(localStorage.getItem("search"));
        console.log(localStorage.getItem("movies"));
        if (isLiked && newMoviesState.likedMovies.length === 0) {
          console.log(JSON.stringify(search));
          history.push("/notfoundmovie");
        } else if (newMoviesState.movies.length === 0) {
          console.log(JSON.stringify(search));
          //  localStorage.setItem("movies", JSON.stringify(search));
          // console.log(localStorage.setItem(localStorage.getItem('token')));
          history.push("/notfoundmovie");
        }

        return newMoviesState;
      });
      // если фильм в списке ненайден, то выдает ошибку
    },

    // запись в базу фильма который лайкнул
    updateLikedMoviesIds: (movie) => {
      return api
        .saveMovie(movie)
        .then((data) => {
          setMoviesState((oldMoviesState) => {
            return {
              ...oldMoviesState,
              likedMovies: oldMoviesState.likedMovies.concat(data),
            };
          });
        })
        .catch((err) => {
          console.log("Что то то пошло не так в лайке карточки" + err);
          // setAlertMessageWraper("Что-то пошло не так... попробуйте еще раз...");
        });
    },

    //удаление из Бд фильма который понравился
    deleteLikedMoviesIds: (movie) => {
      return api
        .deleteMovie(movie._id)
        .then(() => {
          moviesState.allLikedMovies.filter((c) => c !== movie);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  //Авторизация
  const [loggedIn, setLoggedIn] = React.useState(false); // проверка вошел ли пользователь в учетку
  const [userEmail, setUserEmail] = React.useState(""); // переменная для вывода почты в шапку
  const history = useHistory();

  // хуки значения попапа ошибки
  const [NotFoundPopupOpen, setNotFoundPopupOpen] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      const promises = [api.getUserInfo(), moviesApi.getInitialMovies()];

      Promise.all(promises)
        .then(([userData, initialMovies]) => {
          // данные профиля
          console.log(userData.data.name, userData.data.email);
          setCurrentUser({
            name: userData.data.name,
            email: userData.data.email,
          });
          // данные фильмов
          console.log(initialMovies);
          setMoviesState((oldMovies) => {
            if (moviesState.allMovies !== 0) {
              setPreloaderStatus(false);
            }
            //  все фильмы запишутся в allMovies
            return { ...oldMovies, allMovies: initialMovies };
          });
        })
        .catch((result) => console.log(`${result} при загрузке данных`));
    }
  }, [loggedIn]);

  // обработка регистрации
  function register(name, email, password) {
    auth
      .register(name, email, password)
      .then((data) => {
        login(data.email, password);
        //console.log(data);
        //history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обработка входа
  function login(email, password) {
    auth
      .authorization(email, password)
      .then((data) => {
        //localStorage.setItem("token", data.token);
        // console.log(localStorage.getItem("token"));
        setUserEmail(email);
        setLoggedIn(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltipPopupOpen(!isInfoTooltipPopupOpen);
  }
  // функция закрытия попапа
  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);
  }

  //обновляем профиль
  function handleUpdateUser({ name, email }) {
    api
      .editeUserDate(name, email)
      .then((data) => {
        setIsSuccess(true);
        handleInfoTooltipPopupOpen();
        console.log(data);
        setCurrentUser({ ...currentUser, name: data.name, email: data.email });
      })
      .catch((err) => {
        setIsSuccess(false);
        handleInfoTooltipPopupOpen();
        console.log(err);
      });
  }
  // очищает всплытие ошибок валидации
  function clearFormError() {
    setFormError({
      registerError: false,
      errorMessage: "",
    });
  }

  // выход из учетной записи
  function signOut() {
    auth.signOut().then(() => {
      setLoggedIn(false);
      history.push("/");
      localStorage.removeItem("search");
      localStorage.removeItem("movies");
      setMoviesState({
        search: {
          line: "",
          isShort: false,
          isLiked: false,
        },
        allMovies: [],
        allLikedMovies: [],
        movies: [],
        likedMovies: [],
      });
      console.log(localStorage.getItem("search"));
      console.log(localStorage.getItem("movies"));
      //localStorage.removeItem("token");
    });
  }

  //function hidden() {
  // history.push('/error');
  //};
  // проверка токена для допуска к фильмам
  const checkToken = React.useCallback(() => {
    auth
      .checkToken()
      .then((data) => {
        setLoggedIn(true);

        setUserEmail(data.data.email);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);
  // если пользователь зарегестрирован, показываем все понравившиеся фильмы
  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAllLikedMovie()
        .then((data) => {
          setMoviesState((oldMoviesState) => {
            return {
              ...oldMoviesState,
              // все сохранненые фильмы запишутся в oldMoviesState для его дальнейшего использования в фильтации фильмов
              allLikedMovies: data,
              // при открытии saved-movies отобразятся все сохраненные фильмы
              likedMovies: data,
            };
          });
        })
        .catch((err) => {
          console.log("res err", err);
        });
    }
    // } else {
    //   // setLikedMoviesByServer([]);
    // }
  }, [loggedIn]);
  /*
  useEffect(() => {
    const tempArr = likedMoviesByServer.map((item) => {
      return item.movieId;
    });
    setLikedMoviesIds(tempArr);
  }, [likedMoviesByServer]);
*/
  // понравившиеся фильмы

  /*api
        .deleteLikedMovie(tempObj._id, token)
        .then((data) => {
          const tempArr = likedMoviesByServer.filter((item) => {
            return item._id !== tempObj._id;
          });

          setLikedMoviesByServer(tempArr);
        })
        .catch((err) => {
          setAlertMessageWraper("Что-то пошло не так... попробуйте еще раз...");
          // console.log('deleteLikedMovie res err', err)
        });
    */

  //функция открытия попапа ошибки
  function handleNotFoundPopupOpen() {
    setNotFoundPopupOpen(!NotFoundPopupOpen);
  }

  React.useEffect(() => {
    checkToken();
  }, [checkToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            moviesState={moviesState}
            isPreloaderActive={isPreloaderActive}
            setPreloaderStatus={setPreloaderStatus}
            // updateLikedMoviesIds={updateLikedMoviesIds}
            // likedMoviesIds={likedMoviesIds}
          />
          <ProtectedRoute
            path="/profile"
            handleUpdateUser={handleUpdateUser}
            formError={formError}
            loggedIn={loggedIn}
            onSignOut={signOut}
            component={Profile}
            clearFormError={clearFormError}
            profileUpdateMessage={profileUpdateMessage}
            setProfileUpdateMessage={setProfileUpdateMessage}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            moviesState={moviesState}
            isPreloaderActive={isPreloaderActive}
            setPreloaderStatus={setPreloaderStatus}
            // updateLikedMoviesIds={updateLikedMoviesIds}
            // likedMoviesIds={likedMoviesIds}
          />
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <Route path="/error">
            <NotFound isOpen={NotFoundPopupOpen} />
          </Route>
          <Route path="/notfoundmovie">
            <NotFoundMovie isOpen={NotFoundPopupOpen} />
          </Route>
          <Route path="/signin">
            <Login onLogin={login} />
          </Route>
          <Route path="/signup">
            <Register onRegister={register} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/" />}
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
