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

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  // const [movies, setMovies] = React.useState([]);
  // const [likedMoviesIds, setLikedMoviesIds] = React.useState([]);
  //const [likedMoviesByServer, setLikedMoviesByServer] = React.useState([]);
  // const [alertMessage, setAlertMessage] = React.useState('');
  const [moviesState, setMoviesState] = React.useState({
    allMovies: [],
    allLikedMovies: [],
    movies: [],
    likedMovies: [],

    //  функция поиска фильмов, которая исаользуется на сабмите формы в компоненте SearchForm
    searchMovies: ({ search, paging, isShort, isLiked }) => {
      setMoviesState((oldMoviesState) => {
        // делит карточки фильмов на страницы
        const { index, size } = paging;

        console.log(index * size);

        const newMoviesState = {
          ...oldMoviesState,
          movies: oldMoviesState.allMovies
            //.files((movie) => !isShort || movie.duration <= 40)
            .filter(
              (movie) =>
                // показывает все фильмы по поиску
                movie.nameEN.includes(search) || movie.nameRU.includes(search)
            )
            .slice(0, index * size), // режет массив так как нам нужно

          // показывает сохраненные фильмы по поиску
          likedMovies: oldMoviesState.allLikedMovies
            .filter(
              (movie) =>
                movie.nameEN.includes(search) || movie.nameRU.includes(search)
            )
            .slice(0, index * size), // режет массив так как нам нужно
        };
        if (isLiked && newMoviesState.likedMovies.length === 0) {
          history.push("/error");
        } else if (newMoviesState.movies.length === 0) {
          history.push("/error");
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
            //  все фильмы запишутся в allMovies
            return { ...oldMovies, allMovies: initialMovies };
          });
        })
        .catch((result) => console.log(`${result} при загрузке данных`));
    }
  }, [loggedIn]);

  // функция рендеринга сохраненных фильмов
  //function getAllLikedMovie() {
  // api.getAllLikedMovie().then((data) => {
  //   likedMoviesByServer(data);
  //   console.log(likedMoviesByServer);
  //   setLoggedIn(true);
  //   });
  //}

  // обработка регистрации
  function register(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        history.push("/signin");
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
        setUserEmail(email);
        setLoggedIn(true);
        console.log(setLoggedIn);
        history.push("/movies");
      })
      .catch((err) => {
        history.push("/error");
        console.log("ошибка");
      });
  }

  //обновляем профиль
  function handleUpdateUser({ name, email }) {
    api
      .editeUserDate(name, email)
      .then((data) => {
        console.log(data);
        setCurrentUser({ ...currentUser, name: data.name, email: data.email });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // выход из учетной записи
  function signOut() {
    auth.signOut().then(() => {
      setLoggedIn(false);
      history.push("/signin");
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
            // updateLikedMoviesIds={updateLikedMoviesIds}
            // likedMoviesIds={likedMoviesIds}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            onSignOut={signOut}
            component={Profile}
            onUpdateUser={handleUpdateUser}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            moviesState={moviesState}
            // updateLikedMoviesIds={updateLikedMoviesIds}
            // likedMoviesIds={likedMoviesIds}
          />
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/error">
            <NotFound isOpen={NotFoundPopupOpen} />
          </Route>
          <Route path="/signin">
            <Login onLogin={login} />
          </Route>
          <Route path="/signup">
            <Register onRegister={register} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
