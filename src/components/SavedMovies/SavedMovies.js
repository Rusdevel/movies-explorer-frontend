import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { getParamsByScreenWidth } from "../../utils/getParamsByScreenWidth";

function SavedMovies(props) {
  const [paging, setPaging] = React.useState({ index: 1, size: 12 });
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
    <main className="main__save-movies">
      <Header />
      <SearchForm
        moviesState={props.moviesState}
        setPreloaderStatus={props.setPreloaderStatus}
        paging={paging}
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

export default SavedMovies;
