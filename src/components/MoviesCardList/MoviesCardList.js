import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
  const { pathname } = useLocation();
  const { moviesState } = props;
  return (
    <section className="movies-cardList">
      <div className="movies-cardList__container">
        <div className="movies-cardList__card">
          {pathname === "/movies"
            ? moviesState.movies.length
              ? moviesState.movies.map((movie) => {
                  return (
                    <MoviesCard
                      trailerLink={movie.trailerLink}
                      url={"https://api.nomoreparties.co" + movie.image.url}
                      key={movie.id}
                      title={movie.nameRU}
                      subtitle={movie.duration + " мин"}
                      movie={movie}
                      moviesState={moviesState}
                    />
                  );
                })
              : null
            : moviesState.likedMovies.length
            ? moviesState.likedMovies.map((likedMovie) => {
                return (
                  <MoviesCard
                    trailerLink={likedMovie.trailerLink}
                    url={likedMovie.image}
                    key={likedMovie.id}
                    title={likedMovie.nameRU}
                    subtitle={likedMovie.duration + " мин"}
                    movie={likedMovie}
                    moviesState={moviesState}
                  />
                );
              })
            : null}
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;
