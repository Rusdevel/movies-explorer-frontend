import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  const { moviesState } = props;
  return (
    <section className="movies-cardList">
      <div className="movies-cardList__container">
        <div className="movies-cardList__card">
          {moviesState.movies.length
            ? moviesState.movies.map((movie) => {
                return (
                  <MoviesCard
                    url={"https://api.nomoreparties.co" + movie.image.url}
                    key={movie.id}
                    title={movie.nameRU}
                    subtitle={movie.duration + " мин"}
                    movie={movie}
                    moviesState={moviesState}
                  />
                );
              })
            : null}
        </div>
        {/*<button className='movies-cardList__button'>Ещё</button>*/}
      </div>
    </section>
  );
}

export default MoviesCardList;
