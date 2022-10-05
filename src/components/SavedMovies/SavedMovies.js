import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <main className="main__save-movies">
      <Header />
      <SearchForm />
      <MoviesCardList movies={props.moviesState} />
      <Footer />
    </main>
  );
}

export default SavedMovies;
