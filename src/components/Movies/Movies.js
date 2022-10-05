import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies(props) {
  return (
    <main className="main__movies">
      <Header />
      <SearchForm />
      <MoviesCardList moviesState={props.moviesState} />
      <div className="movies-cardList__container">
        <button className="movies-cardList__button">Ещё</button>
      </div>
      <Footer />
    </main>
  );
}

export default Movies;
