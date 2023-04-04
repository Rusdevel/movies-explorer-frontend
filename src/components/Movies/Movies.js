import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import { getParamsByScreenWidth } from "../../utils/getParamsByScreenWidth";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
  const [paging, setPaging] = React.useState({ index: 1, size: 12 });
  const { movies, search, searchMovies } = props.moviesState;
  const { moviesStartCount, addMoviesCount } = getParamsByScreenWidth();
  const [isMoreHide, setMoreHide] = React.useState(false);

  React.useEffect(() => {
    const indexMovies = (paging.index - 1) * addMoviesCount;
    const newPaging = {
      size: addMoviesCount,
      index: movies.length / addMoviesCount + 1,
    };
    addMoviesCount;
    moviesStartCount;
    movies.length;
    if (
      movies.length !== 0 &&
      movies.length !== indexMovies &&
      movies.length >= moviesStartCount
    ) {
      setMoreHide(false);
    } else {
      setMoreHide(true);
    }
  });
  // настройка кнопки 'ещё'
  function nextPage() {
    setPaging(() => {
      const newPaging = {
        size: addMoviesCount,
        index: movies.length / addMoviesCount + 1,
      };
      console.log(moviesStartCount);
      console.log(movies.length);
      console.log(addMoviesCount);
      searchMovies({ search, paging: newPaging });
      return newPaging;
    });
  }

  return (
    <main className="main__movies">
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        moviesState={props.moviesState}
        paging={paging}
        setPreloaderStatus={props.setPreloaderStatus}
      />
      {props.isPreloaderActive && <Preloader />}
      <MoviesCardList
        moviesState={props.moviesState}
        setMoviesState={props.setMoviesState}
      />
      {props.moviesState.hasMore ? (
        <div className="movies-cardList__container">
          <button className="movies-cardList__button" onClick={nextPage}>
            Ещё
          </button>
        </div>
      ) : null}

      <Footer />
    </main>
  );
}

export default Movies;
