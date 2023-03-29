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
import PopapMoviesNotFound from "../PopapMoviesNotFound/PopapMoviesNotFound";
import { useLocation } from "react-router-dom";

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
  const [isPopapMoviesNotFoundOpen, setPopapMoviesNotFoundOpen] =
    React.useState(false);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [moviesState, setMoviesState] = React.useState({
    search: { line: "", isShort: false, isLiked: false },
    allMovies: [],
    allLikedMovies: [],
    movies: [],
    likedMovies: [],

    //  функция поиска фильмов, которая используется на сабмите формы в компоненте SearchForm
    searchMovies: async ({ search, paging }) => {
      const { line, isShort, isLiked } = search;
      setMoviesState((oldMoviesState) => {
        // делит карточки фильмов на страницы
        const { index, size } = paging;

        const moviesSearch = oldMoviesState.allMovies
          .filter((movie) => !isShort || movie.duration <= 40)
          .filter(
            (movie) =>
              movie.nameEN.toLowerCase().includes(line.toLowerCase()) ||
              movie.nameRU.toLowerCase().includes(line.toLowerCase())
          );

        const newMoviesState = {
          ...oldMoviesState,
          search: search,
          movies: moviesSearch.slice(0, index * size), // режет массив так как нам нужно
          hasMore: index * size < moviesSearch.length,
          // показывает сохраненные фильмы по поиску
        };
        // сохраняем в localStorage текст запроса, найденные фильмы и состояние переключателя короткометражек

        if (newMoviesState.movies.length === 0) {
          handlePopapMoviesNotFoundOpen();
        }

        return newMoviesState;
      });
      // если фильм в списке ненайден, то выдает ошибку
    },

    searchMoviesLiked: async ({ search }) => {
      const { line, isShort, isLiked } = search;
      setMoviesState((oldMoviesState) => {
        const newMoviesState = {
          ...oldMoviesState,
          search: search,

          // показывает сохраненные фильмы по поиску
          likedMovies: oldMoviesState.allLikedMovies

            .filter((movie) => !isShort || movie.duration <= 40)
            .filter(
              (movie) =>
                movie.nameEN.toLowerCase().includes(line.toLowerCase()) ||
                movie.nameRU.toLowerCase().includes(line.toLowerCase())
            ),
        };

        if (isLiked && newMoviesState.likedMovies.length === 0) {
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
              allLikedMovies: oldMoviesState.allLikedMovies.concat(data),
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
  const { pathname } = useLocation();
  const isLiked = pathname === "/saved-movies";
  React.useEffect(() => {
    if (loggedIn) {
      const promises = [
        api.getUserInfo(),
        moviesApi.getInitialMovies(),
        api.getAllLikedMovie(),
      ];

      Promise.all(promises)
        .then(([userData, initialMovies, allLikedMoviesData]) => {
          // данные профиля
          console.log(userData.data.name, userData.data.email);
          setCurrentUser({
            name: userData.data.name,
            email: userData.data.email,
          });
          // данные фильмов
          console.log(initialMovies);
          console.log(allLikedMoviesData);
          localStorage.setItem(
            "likedMovies",
            JSON.stringify(allLikedMoviesData)
          );
          // localStorage.setItem("movies", JSON.stringify(moviesState.movies));
          setMoviesState((oldMovies) => {
            if (moviesState.movies !== 0) {
              setPreloaderStatus(false);
            }
            // const localStorageSearch = JSON.parse(
            //   localStorage.getItem("search")
            // );
            // if (localStorageSearch !== null) {
            //   moviesState.search = {
            //     line: localStorageSearch.line,
            //     isShort: localStorageSearch.isShort,
            //     isLiked: localStorageSearch.isLiked,
            //   };
            // }

            //  все фильмы запишутся в allMovies
            return {
              ...oldMovies,
              allMovies: initialMovies,
              movies:
                JSON.parse(localStorage.getItem("movies")) ||
                oldMovies.movies ||
                initialMovies,
              likedMovies: allLikedMoviesData,
              searchMovies: async ({ search, paging }) => {
                const { line, isShort, isLiked } = search;

                setMoviesState((oldMoviesState) => {
                  // делит карточки фильмов на страницы
                  const { index, size } = paging;
                  const moviesSearch = oldMoviesState.allMovies
                    .filter((movie) => !isShort || movie.duration <= 40)
                    .filter(
                      (movie) =>
                        movie.nameEN
                          .toLowerCase()
                          .includes(line.toLowerCase()) ||
                        movie.nameRU.toLowerCase().includes(line.toLowerCase())
                    );

                  const newMoviesState = {
                    ...oldMoviesState,
                    search: search,
                    movies: moviesSearch.slice(0, index * size), // режет массив так как нам нужно
                    hasMore: index * size < moviesSearch.length,
                    // показывает сохраненные фильмы по поиску
                  };
                  // сохраняем в localStorage текст запроса, найденные фильмы и состояние переключателя короткометражек

                  if (newMoviesState.movies.length === 0) {
                    handlePopapMoviesNotFoundOpen();
                  }
                  //записываем данные поиска в хранилище
                  localStorage.setItem("search", JSON.stringify(search));
                  localStorage.setItem(
                    "movies",
                    JSON.stringify(newMoviesState.movies)
                  );
                  return newMoviesState;
                });
                // если фильм в списке ненайден, то выдает ошибку
              },

              searchMoviesLiked: async ({ search }) => {
                const { line, isShort, isLiked } = search;
                setMoviesState((oldMoviesState) => {
                  const newMoviesLikeState = {
                    ...oldMoviesState,
                    search: search,

                    // показывает сохраненные фильмы по поиску
                    likedMovies: oldMoviesState.allLikedMovies

                      .filter((movie) => !isShort || movie.duration <= 40)
                      .filter(
                        (movie) =>
                          movie.nameEN
                            .toLowerCase()
                            .includes(line.toLowerCase()) ||
                          movie.nameRU
                            .toLowerCase()
                            .includes(line.toLowerCase())
                      ),
                  };
                  // сохраняем в localStorage текст запроса, найденные фильмы и состояние переключателя короткометражек

                  if (isLiked && newMoviesLikeState.likedMovies.length === 0) {
                    handlePopapMoviesNotFoundOpen();
                  }

                  return newMoviesLikeState;
                });
                // если фильм в списке ненайден, то выдает ошибку
              },
              updateLikedMoviesIds: (movie) => {
                return api
                  .saveMovie(movie)
                  .then((data) => {
                    setMoviesState((oldMoviesState) => {
                      return {
                        ...oldMoviesState,
                        allLikedMovies:
                          oldMoviesState.allLikedMovies.concat(data),
                      };
                    });
                  })
                  .catch((err) => {
                    console.log(
                      "Что то то пошло не так в лайке карточки" + err
                    );
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
            };
          });
        })
        .catch((result) => console.log(`${result} при загрузке данных`));
    }
  }, [pathname]);

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
  function handlePopapMoviesNotFoundOpen() {
    setPopapMoviesNotFoundOpen(!isPopapMoviesNotFoundOpen);
  }
  // функция закрытия попапа
  function closeAllPopups() {
    setIsInfoTooltipPopupOpen(false);
    setPopapMoviesNotFoundOpen(false);
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
  }, [loggedIn]);

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
            setMoviesState={setMoviesState}
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
            setMoviesState={setMoviesState}
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
            <Login
              onLogin={login}
              formError={formError}
              clearFormError={clearFormError}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={register}
              formError={formError}
              clearFormError={clearFormError}
            />
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
        <PopapMoviesNotFound
          isOpen={isPopapMoviesNotFoundOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
