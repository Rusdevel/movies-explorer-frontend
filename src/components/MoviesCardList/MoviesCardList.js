import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
  const { pathname } = useLocation();
  const { moviesState, setMoviesState } = props;

  // React.useEffect(() => {
  //   // if (!isLiked && storageSerch !== null) {
  //   //   setSearch(storageSerch.line);
  //   //   setShort(storageSerch.isShort);
  //   moviesState;
  //   // }
  // }, [moviesState]);
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
                      setMoviesState={setMoviesState}
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
                    setMoviesState={setMoviesState}
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
