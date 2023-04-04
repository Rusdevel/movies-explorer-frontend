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

  return (
    <main className="main__save-movies">
      <Header loggedIn={props.loggedIn} />
      <SearchForm
        moviesState={props.moviesState}
        setPreloaderStatus={props.setPreloaderStatus}
        paging={paging}
      />
      {props.isPreloaderActive && <Preloader />}
      <MoviesCardList
        moviesState={props.moviesState}
        setMoviesState={props.setMoviesState}
      />
      <div className="movies-cardList__container"></div>
      <Footer />
    </main>
  );
}

export default SavedMovies;
