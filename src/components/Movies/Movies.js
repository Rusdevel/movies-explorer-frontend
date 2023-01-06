import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";

function Movies(props) {
  const [paging, setPaging] = React.useState({ index: 1, size: 6 });

  function nextPage() {
    setPaging((oldPaging) => {
      return { ...oldPaging, index: oldPaging.index + 1 };
    });
  }

  return (
    <main className="main__movies">
      <Header />
      <SearchForm moviesState={props.moviesState} paging={paging} />
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
