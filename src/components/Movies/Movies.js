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
  // настройка кнопки 'ещё'
  function nextPage() {
    const { movies, search, searchMovies } = props.moviesState;
    setPaging(() => {
      const { moviesStartCount, addMoviesCount } = getParamsByScreenWidth();
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
      <MoviesCardList moviesState={props.moviesState} />
      <div className="movies-cardList__container">
        <button className="movies-cardList__button" onClick={nextPage}>
          Ещё
        </button>
      </div>
      <Footer />
    </main>
  );
}

export default Movies;
